import Banco.ConexaoBanco;
import Slack.BotSlack;
import Users.Usuario;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.processos.Processo;
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
    public static Log log = new Log();
    public static void main(String[] args) {
        Looca looca = new Looca();
        ConexaoBanco conexao = new ConexaoBanco();
        JdbcTemplate con = conexao.getConexaoBanco();
        Scanner in = new Scanner(System.in);
        Timer timer = new Timer();
        inserirDadosMetrica(con, looca, timer);
        pausarProcessos(looca, con);
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
                    logar(con, in, looca, timer);
                    log.gravar("Metodo main() caiu no caso 1 na linha 42", "system");
                    break;
                case 2:
                    System.out.println("Saindo....");
                    System.exit(0);
                    log.gravar("Metodo main() caiu no caso 2 na linha 46", "system");
                    break;
                default:
                    System.out.println("Invalido");
                    log.gravar("Metodo main() ouve uma exeção, usuário inseriu valor invalido", "erro");
            }

        } while (opcao != 2);

    }


    public static void inserirDadosMetrica(JdbcTemplate con, Looca looca, Timer timer) {
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
                    log.gravar("Exito ao executar o for no metodo inserirDadosMetrica() > run(), na linha 68 a 72", "system");
                }catch (ArithmeticException e){
                    log.gravar("Falha ao executar o for no metodo inserirDadosMetrica() > run(), na linha 68 a 72", "erro");
                }
                List<Config> config = con.query("SELECT * FROM Configuracao WHERE serialDisco LIKE ?;", new BeanPropertyRowMapper<>(Config.class), serial);

                if (!config.isEmpty()) {
                    log.gravar("Exito ao executar a condição do metodo inserirDadosMetrica() > run(), na linha 79", "system");
                    List<Servidor> servidoresAtivos = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor WHERE Servidor.idServidor = ?;", new BeanPropertyRowMapper<>(Servidor.class), config.get(0).fkServidor);
                    if (servidoresAtivos.get(0).getStatus().equals("Ativo")) {
                        log.gravar("Exito ao executar a condição do metodo inserirDadosMatrica() > run(), na linha 82","system");
                        Integer idServidor = servidoresAtivos.get(0).getIdServidor();

                        List<ParametroAlerta> parametroAlertas = con.query("SELECT * FROM ParametroAlerta WHERE fkServidor = ?;", new BeanPropertyRowMapper<>(ParametroAlerta.class), (idServidor));

                        List<Config> config2 = con.query("SELECT * FROM Configuracao WHERE fkServidor = ?;", new BeanPropertyRowMapper<>(Config.class), idServidor);


                        // Formatar a data para o formato desejado (opcional)
                        Date data = new Date();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        String dataFormatada = sdf.format(data);

                        String sql = "INSERT INTO Metrica (valor, dataHora, fkConfigComponente, fkConfigServidor, fkEspecMetrica) VALUES (?, ?, ?, ?, ?);";


                        // INSERT CPU
                        double usoDouble = looca.getProcessador().getUso();
                        int valorCpu = (int) Math.round(usoDouble);


                        con.update(sql, valorCpu, dataFormatada, 1, servidoresAtivos.get(0).getIdServidor(), 2);

                        // SLACK CPU
//                        try {
//                            verificarLimite(servidoresAtivos.get(0).getNome(), valorCpu, parametroAlertas.get(0).getMaximo(), "CPU", config2.get(0));
//                            log.gravar("Exito ao executar verificarLimite() na linha 107 a 115", "system");
//                        } catch (IOException e) {
//                            throw new RuntimeException(e);
//                        } catch (InterruptedException e) {
//                            throw new RuntimeException(e);
//                        }catch (ArithmeticException e){
//                            log.gravar("Erro ao executar verificarLimite() na linha 107 a 115", "erro");
//                        }


                        // INSERT RAM
                        long valorRam = looca.getMemoria().getEmUso();
                        try {
                            con.update(sql, valorRam, dataFormatada, 2, servidoresAtivos.get(0).getIdServidor(), 1);
                            log.gravar("Exito ao executar update()  na linha 122", "system");
                        }catch (ArithmeticException e){
                            log.gravar("Erro ao executar update() na linha 122", "erro");
                        }
                        // SLACK RAM
//                        try {
//                            verificarLimite(servidoresAtivos.get(0).getNome(), valorRam, parametroAlertas.get(1).getMaximo(), "RAM", config2.get(1));
//                            log.gravar("Exito ao executar verificarLimite() na linha 129", "system");
//                        } catch (IOException e) {
//                            throw new RuntimeException(e);
//                        } catch (InterruptedException e) {
//                            throw new RuntimeException(e);
//                        }catch (ArithmeticException e){
//                            log.gravar("Erro ao executar verificarLimite() na linha 129", "erro");
//                        }

                        // INSERT DISCO
                        try {
                            for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {

                                long tamanhoTotal = disco.getBytesDeEscritas();

                                try {
                                    con.update(sql, tamanhoTotal, dataFormatada, 3, servidoresAtivos.get(0).getIdServidor(), 1);
                                    log.gravar("Exito ao executa update() na linha 146", "system");
                                }catch (ArithmeticException e){
                                    log.gravar("Erro ao executar update() na linha 146", "erro");
                                }
                                // SLACK DISCO
//                                try {
//                                    verificarLimite(servidoresAtivos.get(0).getNome(), tamanhoTotal, parametroAlertas.get(2).getMaximo(), "DISCO", config2.get(2));
//                                    log.gravar("Exito ao executar verificarLimite() na linha 149", "system");
//                                } catch (IOException e) {
//                                    throw new RuntimeException(e);
//                                } catch (InterruptedException e) {
//                                    throw new RuntimeException(e);
//                                }catch (ArithmeticException e){
//                                    log.gravar("Erro ao executar verificarLimite() na linha 149", "erro");
//                                }
                            }
                            log.gravar("Exito ao executar o for na linha 141", "system");
                        }catch (ArithmeticException e){
                            log.gravar("Erro ao executar o for na linha 141","erro");
                        }

                        // INSERT REDE
                        try {
                            for (RedeInterface r : looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                                if (r.getPacotesRecebidos() != 0) {
                                    long valorRede = r.getBytesRecebidos();

                                    try {
                                        con.update(sql, valorRede, dataFormatada, 4, servidoresAtivos.get(0).getIdServidor(), 1);
                                        log.gravar("Exito ao executar update() na linha 175", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar update() na linha 175",  "erro");
                                    }
                                    // SLACK REDE
//                                    try {
//                                        verificarLimite(servidoresAtivos.get(0).getNome(), valorRede, parametroAlertas.get(3).getMinimo(), "REDE", config2.get(3));
//                                        log.gravar("Exito ao executar verificarLimite() na linha 178", "system");
//                                    } catch (IOException e) {
//                                        throw new RuntimeException(e);
//                                    } catch (InterruptedException e) {
//                                        throw new RuntimeException(e);
//                                    }catch (ArithmeticException e){
//                                        log.gravar("Erro ao executar verificarLimite() na linha 178", "erro");
//                                    }
                                }
                            }
                            log.gravar("Exito ao executar o for na linha 170", "system");
                        }catch (ArithmeticException e){
                            log.gravar("Erro ao executar o for na linha 170", "erro");
                        }

                        // INSERT PROCESSOS && SLACK PROCESSOS
                        try {
                            monitoraProcessos(looca, parametroAlertas.get(0).getMaximo(), parametroAlertas.get(1).getMaximo(), servidoresAtivos.get(0).getIdServidor(), con, servidoresAtivos.get(0).getNome(), config2.get(1).getTamanhoTotal());
                            log.gravar("Exito ao executar monitorarProcessos() na linha 201", "system");
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }catch (ArithmeticException e){
                            log.gravar("Erro ao executar monitorarProcessos() na linha 201", "erro");
                        }

                    }
                }
            }
        }, 1000, 7000);
    }


    public static void logar(JdbcTemplate con, Scanner in, Looca looca, Timer timer) {
        Scanner leitor = new Scanner(System.in);
        System.out.println("Insira seu email:");
        String email = leitor.nextLine();
        Usuario usuario;
        while (!email.contains("@")) {
            System.out.println("Email invalido! Deve conter '@'");
            log.gravar("Usuario inseriu valor incorreto na email", "erro");
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
            try {
                for (byte hashByte : hashBytes) {
                    hexStringBuilder.append(String.format("%02x", hashByte));
                }
                log.gravar("Exito ao executar o for na linha 241", "system");
            }catch (ArithmeticException e){
                log.gravar("Erro ao executar o for na linha 241", "erro");
            }

            senha = hexStringBuilder.toString();
            log.gravar("Exito ao executar a codificação na linha 233", "system");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }catch (ArithmeticException e){
            log.gravar("Erro ao executar a codificação na linha 233", "erro");
        }


        List<Usuario> usuarios = con.query("SELECT idUsuario ,email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo FROM Usuario WHERE email = ? AND senha = ?;", new BeanPropertyRowMapper<>(Usuario.class), email, senha);
        if (usuarios.size() > 0) {
            log.gravar("Exito ao executar a condição da linha 259", "system");
            if (usuarios.get(0).getFkCargo() != 3) {
                log.gravar("Exito ao executar a condição na linha 261", "system");
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
                            log.gravar("O metodo logar() caiu no caso 1 na linha 276", "system");
                            String serial2 = null;
                            try {
                                for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                                    if (disco.getBytesDeEscritas() != null) {
                                        serial2 = disco.getSerial();
                                    }
                                }
                                log.gravar("Exito ao executar o for na linha 280", "system");
                            }catch (ArithmeticException e){
                                log.gravar("Erro ao executar o for na linha 280", "erro");
                            }
                            List<Servidor> servidorsAtivo = con.query("SELECT serialDisco, idServidor, nome, fkStatusServ FROM Configuracao c JOIN Servidor s ON c.fkServidor = s.idServidor WHERE c.serialDisco = ? AND s.fkStatusServ = 1;", new BeanPropertyRowMapper<>(Servidor.class), serial2);

                            if (servidorsAtivo.isEmpty() || servidorsAtivo.get(0).getFkStatusServ() != 1) {
                                log.gravar("Exito ao executar condição na linha 290", "system");
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
                                    log.gravar("Exito ao executar o for na linha 304", "system");
                                }catch (ArithmeticException e){
                                    log.gravar("Erro ao executar o for na linha 304", "erro");
                                }
                                long redeTotal = 0;
                                String nomeRede = null;
                                try {
                                    for (RedeInterface r : looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                                        redeTotal = r.getBytesRecebidos() + r.getBytesEnviados();
                                        nomeRede = r.getNomeExibicao();
                                    }
                                    log.gravar("Exito ao executar o for na linha 316", "system");
                                }catch (ArithmeticException a){
                                    log.gravar("Erro ao executar o for na linha 316", "erro");
                                }
                                List<Config> config = con.query("SELECT * FROM Configuracao WHERE serialDisco LIKE ?;", new BeanPropertyRowMapper<>(Config.class), serial);
                                if (config.isEmpty()) {
                                    log.gravar("Exito ao executar a condição na linha 325", "system");
                                    String sqlConfig = "INSERT INTO Configuracao (fkComponente, fkServidor, tamanhoTotal,serialDisco, cpuLogica, cpuFisica, nomeRede) VALUES (?, ?, ?, ?, ?, ?, ?);";

                                    // CONFIGS
                                    //CPU
                                    try {
                                        con.update(sqlConfig, 1, servidoresAtivos.get(0).getIdServidor(), null, null, looca.getProcessador().getNumeroCpusLogicas(), looca.getProcessador().getNumeroCpusFisicas(), null);
                                        log.gravar("Exito ao executr update() de config na linha 332", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar update() de config na linha 332",  "erro");
                                    }
                                    //RAM
                                    try {
                                        con.update(sqlConfig, 2, servidoresAtivos.get(0).getIdServidor(), looca.getMemoria().getTotal(), null, null, null, null);
                                        log.gravar("Exito ao executar o update() de config na linha 339", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar o update() de config na linha 339", "erro");
                                    }
                                    //DISCO
                                    try {
                                        con.update(sqlConfig, 3, servidoresAtivos.get(0).getIdServidor(), looca.getGrupoDeDiscos().getTamanhoTotal(), serial, null, null, null);
                                        log.gravar("Exito ao executar o update() de config na linha 346", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar o update() de config na linha 346", "erro");
                                    }
                                    //REDE
                                    try {
                                        con.update(sqlConfig, 4, servidoresAtivos.get(0).getIdServidor(), redeTotal, null, null, null, nomeRede);
                                        log.gravar("Exito ao executar o update() de config na linha 353", "system");
                                    }catch (ArithmeticException e){
                                        log.gravar("Erro ao executar o update() de config na linha 353", "erro");
                                    }

                                }
                                System.out.println(servidoresAtivos.get(0));
                                log.gravar("Exito ao ativar o servidor", "system");
                                break;
                            } else {
                                System.out.println("Este servidor já está ativo! Para alterar Desative em sua Dashboard");
                                log.gravar("Erro ao ativar o servidor, servidor ja ativo", "erro");
                                break;
                            }

                        case 2:
                            log.gravar("O metodo logar caiu no caso 2 na linha 371", "system");
                            List<Servidor> servidores2 = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor JOIN Empresa ON Servidor.fkEmpresa = Empresa.idEmpresa JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.idUsuario = ? AND Servidor.fkStatusServ != 1;", new BeanPropertyRowMapper<>(Servidor.class), usuarios.get(0).getIdUsuario());
                            System.out.println(servidores2);
                            break;
                        case 3:
                            log.gravar("O metodo logar() caiu no caso 3 na linha 375", "system");
                            System.out.println("Saindo....");
                            System.exit(0);
                            break;
                        default:
                            log.gravar("Usuario inseriu valor invalido nos casos da linha 380", "erro");
                            System.out.println("Invalido");
                    }

                } while (opcaoAdm != 3);
            } else {
                log.gravar("Caiu no else do metodo logar() na linha 386", "system");
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
                            log.gravar("Caiu no caso 1 do metodo logar() na linha 401","system");
                            List<Servidor> servidores = con.query("SELECT Servidor.idServidor, Servidor.nome, StatusServidor.nome AS status FROM Servidor JOIN StatusServidor ON Servidor.fkStatusServ = StatusServidor.idStatusServidor JOIN Empresa ON Servidor.fkEmpresa = Empresa.idEmpresa JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.idUsuario = ? AND Servidor.fkStatusServ != 1;", new BeanPropertyRowMapper<>(Servidor.class), usuarios.get(0).getIdUsuario());
                            System.out.println(servidores);
                            break;
                        case 2:
                            log.gravar("Caiu no caso 2 do metodo logar() na linha 406", "system");
                            System.out.println("Saindo....");
                            log.gravar("Usuario fez logout", "system");
                            System.exit(0);
                            break;
                        default:
                            log.gravar("Usurio inseriu um valor invalido para os casos na linha 412", "erro");
                            System.out.println("Invalido");
                    }
                } while (opcaoEstag != 2);
            }
        } else {
            System.out.println("Email ou senha invalidos!");
            log.gravar("Usuario informou informações invalidar na hora do login como senha ou email","erro");
        }
    }


    public static void monitoraProcessos(Looca looca, Double cpuLimite, Double ramLimite, Integer servidor, JdbcTemplate con, String nomeServidor, Long tamanhoRam) throws IOException, InterruptedException {
        log.gravar("Executando o metodo monitoraProcessos()", "system");
        List<ProcessoI> processos = con.query("SELECT * FROM Processo WHERE fkAcaoProcesso = 3;", new BeanPropertyRowMapper<>(ProcessoI.class));
        Double totalRam = tamanhoRam / 1073741824.0;

        if (!processos.isEmpty()){
            log.gravar("Exito ao executar a condição no metodo monitoraProcesso() na linha 429", "system");
            try {
                for (Processo processoLooca : looca.getGrupoDeProcessos().getProcessos()) {

                    Double usoRam = processoLooca.getUsoMemoria() / 1073741824.0;
                    Double usoCpu = processoLooca.getUsoCpu() ;


                    Double porcemtagemRam = usoRam / totalRam * 100;

                    if (usoCpu > (cpuLimite / 2) || porcemtagemRam > (ramLimite / 2)){

                        Boolean existePid = processos.stream().noneMatch(processoI -> processoI.getpId().equals(processoLooca.getPid()));
                        Boolean existeNome = processos.stream().noneMatch(processoI -> processoI.getNome().equals(processoLooca.getNome()));


                        if (processoLooca.getPid() != 0) {
                            if (existePid || existeNome) {
                                // Processo não encontrado no banco de dados, insira no banco e envie mensagem
                                String sql = "INSERT INTO Processo (pId, nome, consumoCPU, consumoMem, fkServidor, fkStatusProce, fkAcaoProcesso) VALUES (?, ?, ?, ?, ?, ?, ?)";

                                Double consumoRam = processoLooca.getUsoMemoria();
                                Double consumoCpu = processoLooca.getUsoCpu();
                                con.update(sql, processoLooca.getPid(),
                                        processoLooca.getNome(), consumoCpu, consumoRam,
                                        servidor, 1, 3);

//                                BotSlack botSlack = new BotSlack();
//                                try {
//                                    botSlack.msgProcesso(processoLooca.getNome(), nomeServidor);
//                                    log.gravar("Exito ao executar botSlack na linha 455", "system");
//                                } catch (IOException | InterruptedException e) {
//                                    throw new RuntimeException(e);
//                                }catch (ArithmeticException e){
//                                    log.gravar("Erro ao executar botSlack na linha 455", "erro");
//                                }
                                break;
                            }
                            break;
                        }
                        break;
                    }
                }
                log.gravar("Exito ao executar o for do metodo monitoraProcesso() na linha 432", "system");
            }catch (ArithmeticException e){
                log.gravar("Erro ao executar o for do metodo monitoraProcesso() na linha 432","erro");
            }
        } else {
            log.gravar("Condição teve exito ao cair no else na linha 473", "system");
            try {
                for (Processo processoLooca : looca.getGrupoDeProcessos().getProcessos()) {
                    Double usoRam = processoLooca.getUsoMemoria() / 1073741824.0;
                    Double porcemtagemRam = usoRam / totalRam * 100;
                    Double usoCpu = processoLooca.getUsoCpu() ;

                    if (processoLooca.getUsoCpu() > (cpuLimite / 2) || porcemtagemRam > (ramLimite / 3)) {
                        log.gravar("Exito ao executar a condiçao na linha 478", "system");
                        if (processoLooca.getPid() != 0) {
                            log.gravar("Caiu na condição na linha 482","systemi");
                            // Processo não encontrado no banco de dados, insira no banco e envie mensagem
                            String sql = "INSERT INTO Processo (pId, nome, consumoCPU, consumoMem, fkServidor, fkStatusProce, fkAcaoProcesso) VALUES (?, ?, ?, ?, ?, ?, ?)";

                            Double consumoRam = processoLooca.getUsoMemoria();
                            Double consumoCpu = processoLooca.getUsoCpu();

                            con.update(sql, processoLooca.getPid(),
                                    processoLooca.getNome(), consumoCpu, consumoRam,
                                    servidor, 1, 3);

//                            BotSlack botSlack = new BotSlack();
//                            try {
//                                botSlack.msgProcesso(processoLooca.getNome(), nomeServidor);
//                                log.gravar("Exito ao executar o botSlack na linha 495", "system");
//                            } catch (IOException | InterruptedException e) {
//                                throw new RuntimeException(e);
//                            }catch (ArithmeticException e){
//                                log.gravar("Erro ao executar o botSlack na linha 495", "erro");
//                            }

                            break; // Saia do loop interno após encontrar e processar um processo
                        }
                        break;

                    }
                }
                log.gravar("Exito ao executar o for na linha 476", "system");
            }catch (ArithmeticException e){
                log.gravar("Erro ao executar o for na linha 476", "erro");
            }
        }

    }


    public static void verificarLimite(String servidor, long valorCaptura, Double limite, String componente, Config config) throws IOException, InterruptedException {
        log.gravar("Executando o metodo verificarLimite()","system");
        final Boolean[] timeoutAtivo = {false};
        Double porcetagem = 0.0;
        if (componente.equals("RAM")) {
            porcetagem = (double) valorCaptura / config.getTamanhoTotal() * 100;
            log.gravar("Fazendo o calculo da memoria ram", "system");
        } else if (componente.equals("DISCO")) {
            porcetagem = (double) valorCaptura / config.getTamanhoTotal() * 100;
            log.gravar("Fazendo o calculo do disco", "system");
        } else if (componente.equals("REDE")) {
            porcetagem = (double) valorCaptura / config.getTamanhoTotal() * 100;
            log.gravar("Fazendo o calculo da rede", "system");
        }

        if (porcetagem >= limite) {

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
                }, 1000, 5000); // 5000 milissegundos = 5 segundos
                log.gravar("Exito ao executar a condição de porcentagem na linha 533", "system");
            }
        }

    }

    public static void pausarProcessos(Looca looca, JdbcTemplate con) {
        log.gravar("Executando o metodo pausarProcessos()","system");
        List<ProcessoI> processos = con.query("SELECT * FROM Processo WHERE fkAcaoProcesso != 3;", new BeanPropertyRowMapper<>(ProcessoI.class));
        if (processos.size() > 0) {
            log.gravar("Executando a condição na linha 557","system");
            String nomeProcesso = processos.get(0).getNome();
            try {
                for (Processo p : looca.getGrupoDeProcessos().getProcessos()) {

                    if (p.getNome().equals(nomeProcesso)) {
                        log.gravar("Exito ao executar condição do metodo pausarProcesso na linha 563","system");
                        String pId = String.valueOf(p.getPid());
                        if (looca.getSistema().getSistemaOperacional().equals("Windows")) {
                            log.gravar("Exito ao executar a condição do metodo pausarProcesso() na linha 566","system");
                            kilProcessWindows(pId);

                        } else {
                            log.gravar("Exito ao executar a condição else do metodo pausarProcesso() na linha 570","system");
                            pauseProcessUbuntu(pId);

                            resumeProcessUbuntu(pId);
                        }
                    }
                }
                log.gravar("Exito ao executar o for do metodo pausarProcesso() na linha 561", "system");
            }catch (ArithmeticException e){
                log.gravar("Erro ao executar for do metodo pausarProcesso() na linha 561","erro");
            }
        }
    }

    public static void kilProcessWindows(String pId) {
        log.gravar("Executando o metodo kilProcessWindows", "system");
        String processoParaEncerrar = pId;

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("taskkill", "/F", "/IM", processoParaEncerrar);
            Process process = processBuilder.start();

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Processo encerrado com sucesso.");
                log.gravar("Exito ao executar a condição do metodo kilProcessWindows() na linha 594","system");
            } else {
                System.out.println("Erro ao encerrar o processo. Código de saída: " + exitCode);
                log.gravar("Exito ao executar a condição else do metodo kilProcessWindows() na linha 597", "system");
            }
            log.gravar("Exito ao executar ProcessBilder no metodo kilProcessWindows() na linha 589", "system");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }catch (ArithmeticException e){
            log.gravar("Erro ao executar o ProcessBuilder no metodo kilProcessWindows() na linha 589", "erro");
        }
    }

    public static void pauseProcessUbuntu(String pid) {
        log.gravar("Executando o metodoo pauseProcessUbuntu()","system");
        try {
            // Construa o comando para pausar o processo
            String[] command = {"kill", "-STOP", pid};
            Process process = new ProcessBuilder(command).start();

            // Aguarde o término do processo
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Processo com PID " + pid + " pausado com sucesso.");
                log.gravar("Exito ao executar condição do metodo pauseProcessUbuntu() na linha 619","system");
            } else {
                System.out.println("Erro ao pausar o processo com PID " + pid + ". Código de saída: " + exitCode);
                log.gravar("Exito ao executar a codição else do metodo pauseProcessUbuntu() na linha 622", "system");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }catch (ArithmeticException e){
            log.gravar("Erro ao executar a pauseProcessUbuntu()", "erro");
        }
    }

    public static void resumeProcessUbuntu(String pid) {
        log.gravar("Executando o metodo resumeProcessUbuntu()","system");
        try {
            // Construa o comando para continuar o processo
            String[] command = {"kill", "-CONT", pid};
            Process process = new ProcessBuilder(command).start();

            // Aguarde o término do processo
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Processo com PID " + pid + " continuado com sucesso.");
                log.gravar("Exito ao executar a condição do metodo resumeProcessUbuntu() na linha 643","system");
            } else {
                System.out.println("Erro ao continuar o processo com PID " + pid + ". Código de saída: " + exitCode);
                log.gravar("Exito ao executar a condição else do metodo resumeProcessUbuntu() na linha 646","system");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }catch (ArithmeticException e){
            log.gravar("Erro ao executar o metodo resumeProcessUbuntu()","system");
        }
    }

}
