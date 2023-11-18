import Conexao.ConexaoBanco;
import Conexao.ConexaoSlack;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.text.SimpleDateFormat;
import java.util.*;

public class AppDuck {

    public static void main(String[] args) {

        Looca looca = new Looca();
        ConexaoBanco conexao = new ConexaoBanco();
        JdbcTemplate con = conexao.getConexaoBanco();
        Scanner in = new Scanner(System.in);
        ConexaoSlack conexaoSlack = new ConexaoSlack();
        Timer timer = new Timer();
        inserirDadosMetrica(con, conexaoSlack, looca, timer);
        Integer opcao;
        do {
            System.out.println("""
                    +---------------------------------+
                    |      BEM VINDO DUCKTETIVE       |   
                    +---------------------------------+
                    | ESCOLHA UMA DAS OPÇÕES:         |
                    | 1) Login                        |
                    | 2) Sair                         |
                    +---------------------------------+
                    """);
            opcao = in.nextInt();

            switch (opcao) {
                case 1:
                    System.out.println();
                    logar(con, in, looca, conexaoSlack, timer);
                    break;
                case 2:
                    System.out.println("Saindo....");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalido");
            }

        } while (opcao != 2);

    }


    public static void inserirDadosMetrica(JdbcTemplate con, ConexaoSlack conSlack, Looca looca, Timer timer) {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                String serial = null;
                for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                    if (disco.getBytesDeEscritas() != null) {
                        serial = disco.getSerial();
                    }
                }
                List<Config> config = con.query("SELECT * FROM Configuracao WHERE serialDisco LIKE ?;", new BeanPropertyRowMapper<>(Config.class), serial);

                if (!config.isEmpty()) {
                    List<Servidor> servidoresAtivos = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor WHERE Servidor.idServidor = ?;", new BeanPropertyRowMapper<>(Servidor.class), config.get(0).fkServidor);
                    if (servidoresAtivos.get(0).getStatus().equals("Ativo")) {

                        //            conSlack.enviandoMsgSlack("TESTE 02");
                        // Formatar a data para o formato desejado (opcional)
                        Date data = new Date();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        String dataFormatada = sdf.format(data);


                        String sql = "INSERT INTO Metrica (valor, dataHora, fkConfigComponente, fkConfigServidor, fkEspecMetrica) VALUES (?, ?, ?, ?, ?);";

                        double valorMemoria = (double) looca.getMemoria().getEmUso() / 1000000000;

                        con.update(sql, looca.getProcessador().getUso(), dataFormatada, 1, servidoresAtivos.get(0).getIdServidor(), 1);// cpu
                        con.update(sql, valorMemoria, dataFormatada, 2, servidoresAtivos.get(0).getIdServidor(), 2);// ram
                        for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                            double valorDisco = (double) disco.getBytesDeEscritas() / 1000000000;
                            con.update(sql, valorDisco, dataFormatada, 3, servidoresAtivos.get(0).getIdServidor(), 2);// disco
                        }
                        for (RedeInterface r : looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                            if (r.getPacotesRecebidos() != 0) {
                                double valorRede = (double) r.getPacotesRecebidos() / 100000;
                                con.update(sql, valorRede, dataFormatada, 4, servidoresAtivos.get(0).getIdServidor(), 3); // rede
                            }
                        }

                    }
                }
            }
        }, 1000, 5000);
    }


    public static void logar(JdbcTemplate con, Scanner in, Looca looca, ConexaoSlack conexaoSlack, Timer timer) {
        Scanner leitor = new Scanner(System.in);
        System.out.println("Insira seu email:");
        String email = leitor.nextLine();
        Usuario usuario;
        while (!email.contains("@")) {
            System.out.println("Email invalido! Deve conter '@'");
            email = leitor.nextLine();
        }

        System.out.println("Digite sua senha:");
        String senha = leitor.nextLine();

        List<Usuario> usuarios = con.query("SELECT idUsuario ,email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo FROM usuario WHERE email = ? AND senha = ?;", new BeanPropertyRowMapper<>(Usuario.class), email, senha);
        if (usuarios.size() > 0) {
            if (usuarios.get(0) != null && usuarios.get(0).getFkCargo() == 1) {
                System.out.println("Bem vindo " + usuarios.get(0).getNome());
                Integer opcaoAdm;
                do {
                    System.out.println("""
                            +---------------------------------+
                            | ESCOLHA UMA DAS OPÇÕES:         |
                            | 1) Ativar Servidor              |
                            | 2) Exibir Servidores Inativos   |
                            | 3) Sair                         |
                            +---------------------------------+       
                            """);
                    opcaoAdm = in.nextInt();
                    switch (opcaoAdm) {
                        case 1:
                            String serial2 = null;
                            for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                                if (disco.getBytesDeEscritas() != null) {
                                    serial2 = disco.getSerial();
                                }
                            }
                            List<Servidor> servidorsAtivo = con.query("SELECT serialDisco, idServidor, nome, fkStatusServ FROM Configuracao c JOIN Servidor s ON c.fkServidor = s.idServidor WHERE c.serialDisco = ? AND s.fkStatusServ = 1;", new BeanPropertyRowMapper<>(Servidor.class), serial2);

                            if (servidorsAtivo.isEmpty() || servidorsAtivo.get(0).getFkStatusServ() != 1) {
                                List<Servidor> servidores = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor JOIN Empresa ON Servidor.fkEmpresa = Empresa.idEmpresa JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.idUsuario = ? AND Servidor.fkStatusServ != 1;", new BeanPropertyRowMapper<>(Servidor.class), usuarios.get(0).getIdUsuario());

                                System.out.println(servidores);
                                System.out.println("Insira o ID do Servidor que deseja Ativar: ");
                                Integer idAtivar = in.nextInt();
                                String sql = "UPDATE Servidor SET fkStatusServ = 1 WHERE idServidor = ?;";
                                con.update(sql, idAtivar);

                                List<Servidor> servidoresAtivos = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor WHERE Servidor.idServidor = ?;", new BeanPropertyRowMapper<>(Servidor.class), idAtivar);
                                String serial = null;
                                for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                                    if (disco.getBytesDeEscritas() != null) {
                                        serial = disco.getSerial();
                                    }
                                }
                                List<Config> config = con.query("SELECT * FROM Configuracao WHERE serialDisco LIKE ?;", new BeanPropertyRowMapper<>(Config.class), serial);
                                if (config.isEmpty()) {
                                    String sqlConfig = "INSERT INTO Configuracao (fkComponente, fkServidor, serialDisco) VALUES (?, ?, ?);";
                                    con.update(sqlConfig, 1, servidoresAtivos.get(0).getIdServidor(), null);
                                    con.update(sqlConfig, 2, servidoresAtivos.get(0).getIdServidor(), null);
                                    con.update(sqlConfig, 3, servidoresAtivos.get(0).getIdServidor(), serial);
                                    con.update(sqlConfig, 4, servidoresAtivos.get(0).getIdServidor(), null);
                                }
                                System.out.println(servidoresAtivos.get(0));
                                break;
                            } else {
                                System.out.println("Este servidor já está ativo! Para alterar Desative em sua Dashboard");
                                break;
                            }

                        case 2:
                            List<Servidor> servidores2 = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor JOIN Empresa ON Servidor.fkEmpresa = Empresa.idEmpresa JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.idUsuario = ? AND Servidor.fkStatusServ != 1;", new BeanPropertyRowMapper<>(Servidor.class), usuarios.get(0).getIdUsuario());
                            System.out.println(servidores2);
                            break;
                        case 3:
                            System.out.println("Saindo....");
                            System.exit(0);
                            break;
                        default:
                            System.out.println("Invalido");
                    }

                } while (opcaoAdm != 3);
            } else {
                System.out.println("Bem vindo " + usuarios.get(0).getNome());
                Integer opcaoEstag;
                do {
                    System.out.println("""
                            +---------------------------------+
                            | ESCOLHA UMA DAS OPÇÕES:         |
                            | 1) Exibir Servidores Inativos   |
                            | 2) Sair                         |
                            +---------------------------------+       
                            """);
                    opcaoEstag = in.nextInt();

                    switch (opcaoEstag) {
                        case 1:
                            List<Servidor> servidores = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor JOIN Empresa ON Servidor.fkEmpresa = Empresa.idEmpresa JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.idUsuario = ? AND Servidor.fkStatusServ != 1;", new BeanPropertyRowMapper<>(Servidor.class), usuarios.get(0).getIdUsuario());
                            System.out.println(servidores);
                            break;
                        case 2:
                            System.out.println("Saindo....");
                            System.exit(0);
                            break;
                        default:
                            System.out.println("Invalido");
                    }
                } while (opcaoEstag != 2);
            }
        } else {
            System.out.println("Email ou senha invalidos!");

        }
    }
}



