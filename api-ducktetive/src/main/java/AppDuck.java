import Banco.ConexaoBanco;
import Slack.BotSlack;
import Users.Usuario;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import org.checkerframework.checker.units.qual.A;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;
public class AppDuck {
    private static Log log = new Log();

    public static void main(String[] args) {
        Looca looca = new Looca();
        ConexaoBanco conexao = new ConexaoBanco();
        JdbcTemplate con = conexao.getConexaoBanco();
        Scanner in = new Scanner(System.in);
        Timer timer = new Timer();
        inserirDadosMetrica(con, looca, timer);

        Integer opcao;
        try {
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
                        try{
                            System.out.println();
                            logar(con, in, looca, timer);
                            log.gravar("fazendo login no metodo main da classe AppDuck", "system");
                        }catch (ArithmeticException e){
                            log.gravar("opção 1 do metodo main na classe AppDuck não conseguiu ser executado", "erro");
                        }
                        break;
                    case 2:
                        try{
                            System.out.println("Saindo....");
                            log.gravar("opção 2 do metodo main na classe AppDuck foi executado com exito.","system");
                        }catch (ArithmeticException e){
                            log.gravar("opção 2 do metodo main na classe AppDuck não conseguiu ser executado.", "erro");
                        }
                        System.exit(0);
                        break;
                    default:
                        System.out.println("Invalido");
                }

            } while (opcao != 2);
        }catch (ArithmeticException e){
            log.gravar("metodo main da classe AppDuck não conseguiu ser executado", "erro");
        }


    }

    public static void inserirDadosMetrica (JdbcTemplate con, Looca looca, Timer timer){
        try {
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    String serial = null;
                    try {
                        for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                            if (disco.getBytesDeEscritas() != null) {
                                serial = disco.getSerial();
                            }
                        }
                    }catch (ArithmeticException e){
                        log.gravar("Erro ao executar o for do metodo inserirDadosMetrica() > run(). Da linha 77 a 85.", "erro");
                    }

                    List<Config> config = con.query("SELECT * FROM Configuracao WHERE serialDisco LIKE ?;", new BeanPropertyRowMapper<>(Config.class), serial);


                    if (!config.isEmpty()) {
                        List<Servidor> servidoresAtivos = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor WHERE Servidor.idServidor = ?;", new BeanPropertyRowMapper<>(Servidor.class), config.get(0).fkServidor);
                        log.gravar("config passou na validação. Na linha 91 da classe AppDuck", "system");
                        if (servidoresAtivos.get(0).getStatus().equals("Ativo")) {
                            log.gravar("servidoresAtivos passou na validação. Na linha 94 da classe AppDuck", "system");
                            Integer idServidor = servidoresAtivos.get(0).getIdServidor();

                            List<ParametroAlerta> parametroAlertas = con.query("SELECT * FROM ParametroAlerta WHERE fkServidor = ?;", new BeanPropertyRowMapper<>(ParametroAlerta.class), (idServidor));

                            List<Config> config2 = con.query("SELECT * FROM Configuracao WHERE fkServidor = ?;", new BeanPropertyRowMapper<>(Config.class), idServidor);


                            // Formatar a data para o formato desejado (opcional)
                            Date data = new Date();
                            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                            String dataFormatada = sdf.format(data);

                            String sql = "INSERT INTO Metrica (valor, dataHora, fkConfigComponente, fkConfigServidor, fkEspecMetrica) VALUES (?, ?, ?, ?, ?);";


                            // INSERT PROCESSOS && SLACK PROCESSOS
                            try {
                                monitoraProcessos(looca, parametroAlertas.get(0).getMaximo(), parametroAlertas.get(1).getMaximo(), servidoresAtivos.get(0).getIdServidor(), con, servidoresAtivos.get(0).getNome());
                                log.gravar("Exito ao inserir dados dos processos no banco na classe AppDuck", "system");
                                log.gravar("Exito ao enviar os dados dos processos para o SLACK na classe AppDuck", "system");
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            } catch (InterruptedException e) {
                                throw new RuntimeException(e);
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao inserir dados dos processos no banco. Na linha 110 a 119 na classe AppDuck", "erro");
                                log.gravar("Erro ao enviar as informações dos processos para o SLACK. Na linha 110 a 119 na classe AppDuck", "system");
                            }

                            // INSERT CPU
                            double usoDouble = looca.getProcessador().getUso();
                            int valorCpu = (int) Math.round(usoDouble);
                            try {
                                con.update(sql, valorCpu, dataFormatada, 1, servidoresAtivos.get(0).getIdServidor(), 2);
                                log.gravar("Exito ao inserir osa dados da CPU no banco de dados.", "system");
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao inserir os dados da CPU no banco de dados. Na linha 120 a 126 na classe AppDuck", "erro");
                            }
                            // SLACK CPU
                            try {
                                verificarLimite(servidoresAtivos.get(0).getNome(), valorCpu, parametroAlertas.get(0).getMaximo(), "CPU", config2.get(0));
                                log.gravar("Exito ao enviar informações da CPU para o SALCK na classe AppDuck.", "system");
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            } catch (InterruptedException e) {
                                throw new RuntimeException(e);
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao enviar informações da CPU para o SALCK. Na linha 127 a 135 na classe AppDuck", "erro");
                            }


                            // INSERT RAM
                            long valorRam = looca.getMemoria().getEmUso();
                            try {
                                con.update(sql, valorRam, dataFormatada, 2, servidoresAtivos.get(0).getIdServidor(), 1);
                                log.gravar("Exito ao inserir informações da ram no banco na classe AppDuck", "system");
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao inserir informações de RAM no banco. Na linha 137 a 141 na classe AppDuck", "erro");
                            }
                            // SLACK RAM
                            try {
                                verificarLimite(servidoresAtivos.get(0).getNome(), valorRam, parametroAlertas.get(1).getMaximo(), "RAM", config2.get(1));
                                log.gravar("Exito ao enviar informções da ram para o SLACK na classe AppDuck.", "system");
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            } catch (InterruptedException e) {
                                throw new RuntimeException(e);
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao enviar informações da RAM para o SLACK. Na linha 141 a 149 na classe AppDuck", "erro");
                            }

                            // INSERT DISCO
                            try {
                                for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {

                                    long tamanhoTotal = disco.getBytesDeEscritas() + disco.getBytesDeLeitura();

                                    con.update(sql, tamanhoTotal, dataFormatada, 3, servidoresAtivos.get(0).getIdServidor(), 1);

                                    // SLACK DISCO
                                    try {
                                        verificarLimite(servidoresAtivos.get(0).getNome(), tamanhoTotal, parametroAlertas.get(2).getMaximo(), "DISCO", config2.get(2));
                                        log.gravar("Exito ao enviar infomações do dispara o SLACK na classe AppDuck", "system");
                                    } catch (IOException e) {
                                        throw new RuntimeException(e);
                                    } catch (InterruptedException e) {
                                        throw new RuntimeException(e);
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao enviar SLACK de disco. Na linha 158 a 165 na classe AppDuck", "erro");
                                    }
                                }
                                log.gravar("Exito ao inserir informações de disco no banco na classe AppDuck.", "system");
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao inserir informações do disco no banco. Na linha 154 a 171 na classe AppDucl", "erro");
                            }

                            // INSERT REDE
                            try {
                                for (RedeInterface r : looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                                    if (r.getPacotesRecebidos() != 0) {
                                        long valorRede = r.getBytesRecebidos();

                                        con.update(sql, valorRede, dataFormatada, 4, servidoresAtivos.get(0).getIdServidor(), 1);

                                        // SLACK REDE
                                        try {
                                            verificarLimite(servidoresAtivos.get(0).getNome(), valorRede, parametroAlertas.get(3).getMaximo(), "REDE", config2.get(3));
                                            log.gravar("Exito ao enviar informações de rede para o SLACK.", "system");
                                        } catch (IOException e) {
                                            throw new RuntimeException(e);
                                        } catch (InterruptedException e) {
                                            throw new RuntimeException(e);
                                        }catch (ArithmeticException e){
                                            log.gravar("Erro ao enviar o SLACK de rede. Na linha 168 a 183 na classe AppDuck", "erro");
                                        }
                                    }
                                }
                                log.gravar("Exito ao inserir dados na tabela rede.", "system");
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao tentar inserir os dados na tabela rede. Na linha 168 a 184 na clase AppDuck" , "erro");
                            }
                        }
                    }
                }
            }, 1000, 1000);
            log.gravar("Metodo indosMserirDaetrica() > run() executado com exito", "system");
        } catch (ArithmeticException e) {
            log.gravar("Erro ao tentar executar o metodo indosMserirDaetrica() > run()", "erro");
        }
    }


    public static void logar(JdbcTemplate con, Scanner in, Looca looca, Timer timer) {
        Scanner leitor = new Scanner(System.in);
        System.out.println("Insira seu email:");
        String email = leitor.nextLine();
        Usuario usuario;
        log.gravar("Executando o metodo logar", "system");
        while (!email.contains("@")) {
            System.out.println("Email invalido! Deve conter '@'");
            log.gravar("Erro nas informações inseridas pelo usuario", "erro");
            email = leitor.nextLine();
        }

        System.out.println("Digite sua senha:");
        String senha = leitor.nextLine();
        try {
            // Obtendo a instância de MessageDigest para SHA-256
            MessageDigest sha256 = MessageDigest.getInstance("SHA-256");

            // Convertendo a string para bytes e atualizando o digest
            byte[] hashBytes = sha256.digest(senha.getBytes());

            // Convertendo bytes para representação hexadecimal
            StringBuilder hexStringBuilder = new StringBuilder();
            for (byte hashByte : hashBytes) {
                hexStringBuilder.append(String.format("%02x", hashByte));
            }

            senha = hexStringBuilder.toString();
            log.gravar("Exito ao fazer login", "system");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }catch (ArithmeticException e){
            log.gravar("Erro ao fazer login. Na linha 241 a 159", "erro");
        }


        List<Usuario> usuarios = con.query("SELECT idUsuario ,email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo FROM Usuario WHERE email = ? AND senha = ?;", new BeanPropertyRowMapper<>(Usuario.class), email, senha);
        if (usuarios.size() > 0) {
            try{
                if (usuarios.get(0).getFkCargo() != 3) {
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
                                    try {
                                        for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                                            if (disco.getBytesDeEscritas() != null) {
                                                serial = disco.getSerial();
                                            }
                                        }
                                        log.gravar("Exito ao executar o for na linha 303", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar o for na linha 303", "erro");
                                    }
                                    long redeTotal = 0;
                                    String nomeRede = null;
                                    try {
                                        for (RedeInterface r : looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                                            redeTotal = r.getBytesRecebidos() + r.getBytesEnviados();
                                            nomeRede = r.getNomeExibicao();
                                        }
                                        log.gravar("Exito ao executar o for na linha 315", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar o for na linha 315", "erro");
                                    }
                                    List<Config> config = con.query("SELECT * FROM Configuracao WHERE serialDisco LIKE ?;", new BeanPropertyRowMapper<>(Config.class), serial);
                                    if (config.isEmpty()) {
                                        String sqlConfig = "INSERT INTO Configuracao (fkComponente, fkServidor, tamanhoTotal,serialDisco, cpuLogica, cpuFisica, nomeRede) VALUES (?, ?, ?, ?, ?, ?, ?);";

                                        // CONFIGS
                                        //CPU
                                        con.update(sqlConfig, 1, servidoresAtivos.get(0).getIdServidor(), null ,null, looca.getProcessador().getNumeroCpusLogicas(), looca.getProcessador().getNumeroCpusFisicas(), null);
                                        //RAM
                                        con.update(sqlConfig, 2, servidoresAtivos.get(0).getIdServidor(), looca.getMemoria().getTotal() ,null, null, null, null);
                                        //DISCO
                                        con.update(sqlConfig, 3, servidoresAtivos.get(0).getIdServidor(), looca.getGrupoDeDiscos().getTamanhoTotal() ,serial, null, null, null);
                                        //REDE
                                        con.update(sqlConfig, 4, servidoresAtivos.get(0).getIdServidor(), redeTotal,null, null, null, nomeRede);



                                    }
                                    System.out.println(servidoresAtivos.get(0));
                                    break;
                                } else {
                                    System.out.println("Este servidor já está ativo! Para alterar Desative em sua Dashboard");
                                    log.gravar("Este servidor já está ativo! Para alterar Desative em sua Dashboard", "sysem");
                                    log.gravar("Exito ao executar case1 na linha 281", "system");
                                    break;
                                }

                            case 2:
                                List<Servidor> servidores2 = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor JOIN Empresa ON Servidor.fkEmpresa = Empresa.idEmpresa JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.idUsuario = ? AND Servidor.fkStatusServ != 1;", new BeanPropertyRowMapper<>(Servidor.class), usuarios.get(0).getIdUsuario());
                                System.out.println(servidores2);
                                log.gravar("Exito ao executar o case2 na liha 349", "system");
                                break;
                            case 3:
                                System.out.println("Saindo....");
                                System.exit(0);
                                log.gravar("Exito ao executar o case3 na linha 355", "system");
                                break;
                            default:
                                System.out.println("Invalido");
                                log.gravar("Informação invalida no caso da linha 159", "system");
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
                                log.gravar("Caiu no caso 1. Na linha 364", "system");
                                break;
                            case 2:
                                System.out.println("Saindo....");
                                System.exit(0);
                                log.gravar("Caiu no caso 2. Na linha 369", "system");
                                break;
                            default:
                                System.out.println("Invalido");
                        }
                    } while (opcaoEstag != 2);
                }
            }catch (ArithmeticException e){
                log.gravar("Erro executar tarefa. Na linha 267 a 378", "erro");
            }
        } else {
            System.out.println("Email ou senha invalidos!");
            log.gravar("Erro nas credenciais inseridas pelo usuario", "erro");
        }
    }

    public static void monitoraProcessos(Looca looca, Double cpuLimite, Double ramLimite, Integer servidor, JdbcTemplate con, String nomeServidor) throws IOException, InterruptedException {

        for (int i = 0; i < looca.getGrupoDeProcessos().getProcessos().size() ; i++) {
            if (looca.getGrupoDeProcessos().getProcessos().get(i).getUsoCpu() > cpuLimite){
                Timer timer = new Timer();
                int finalI = i;
                timer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        if (looca.getGrupoDeProcessos().getProcessos().get(finalI).getUsoCpu() > cpuLimite){
                            String sql = "INSERT INTO Processo (pId, nome, consumoCPU, consumoMem, fkServidor, fkStatusProce, fkAcaoProcesso) VALUES (?, ?, ?, ?, ?, ?, ?)";
                            con.update(sql, looca.getGrupoDeProcessos().getProcessos().get(finalI).getPid(),
                                    looca.getGrupoDeProcessos().getProcessos().get(finalI).getNome(),
                                    looca.getGrupoDeProcessos().getProcessos().get(finalI).getUsoCpu(),
                                    looca.getGrupoDeProcessos().getProcessos().get(finalI).getUsoMemoria(), servidor,1, 3);

                            BotSlack botSlack = new BotSlack();
                            try {
                                botSlack.msgProcesso(looca.getGrupoDeProcessos().getProcessos().get(finalI).getNome(), nomeServidor, "CPU");
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            } catch (InterruptedException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    }
                }, 20000, 30000); // 5000 milissegundos = 5 segundos
            }

            if (looca.getGrupoDeProcessos().getProcessos().get(i).getUsoMemoria() > ramLimite){
                Timer timer = new Timer();
                int finalI = i;
                timer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        if (looca.getGrupoDeProcessos().getProcessos().get(finalI).getUsoMemoria() > ramLimite){
                            String sql = "INSERT INTO Processo (pId, nome, consumoCPU, consumoMem, fkServidor, fkStatusProce, fkAcaoProcesso) VALUES (?, ?, ?, ?, ?, ?, ?)";
                            con.update(sql, looca.getGrupoDeProcessos().getProcessos().get(finalI).getPid(),
                                    looca.getGrupoDeProcessos().getProcessos().get(finalI).getNome(),
                                    looca.getGrupoDeProcessos().getProcessos().get(finalI).getUsoCpu(),
                                    looca.getGrupoDeProcessos().getProcessos().get(finalI).getUsoMemoria(), servidor,1, 3);




                            BotSlack botSlack = new BotSlack();
                            try {
                                botSlack.msgProcesso(looca.getGrupoDeProcessos().getProcessos().get(finalI).getNome(), nomeServidor, "RAM");
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            } catch (InterruptedException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    }
                }, 20000, 30000); // 5000 milissegundos = 5 segundos
            }
        }

    }

    public static void verificarLimite(String servidor, long valorCaptura, Double limite, String componente, Config config) throws IOException, InterruptedException {
        final Boolean[] timeoutAtivo = {false};
        Double porcetagem = 0.0;
        if (componente.equals("RAM")){
            double bytes = valorCaptura / 8.0;
            double gb = bytes / (1024.0 * 1024.0 * 1024.0);
            porcetagem = gb / config.getTamanhoTotal();
        } else if (componente.equals("DISCO")){
            double bytes = valorCaptura / 8.0;
            double gb = bytes / (1024.0 * 1024.0 * 1024.0);
            porcetagem = gb / config.getTamanhoTotal();
        } else if (componente.equals("REDE")){
            porcetagem =(double) valorCaptura / config.getTamanhoTotal() * 100;
        }

        if (porcetagem >= limite){

            if (!timeoutAtivo[0]) {
                timeoutAtivo[0] = true;
                BotSlack botSlack = new BotSlack();
                botSlack.msgComponente(componente, servidor);
                Timer timer = new Timer();
                timer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        timeoutAtivo[0] = false;
                    }
                }, 10000, 30000); // 5000 milissegundos = 5 segundos
            }
        }

    }

}
