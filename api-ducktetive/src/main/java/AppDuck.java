import Banco.ConexaoBanco;
import Slack.BotSlack;
import Users.Usuario;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;

public class AppDuck {

    public static void main(String[] args) {
        Looca looca = new Looca();
        ConexaoBanco conexao = new ConexaoBanco();
        JdbcTemplate con = conexao.getConexaoBanco();
        Scanner in = new Scanner(System.in);
        Timer timer = new Timer();
        inserirDadosMetrica(con, looca, timer);
        //pausarProcessos(looca, con);
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


    public static void inserirDadosMetrica(JdbcTemplate con,  Looca looca, Timer timer) {
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

                        Integer idServidor = servidoresAtivos.get(0).getIdServidor();

                        List<ParametroAlerta> parametroAlertas = con.query("SELECT * FROM ParametroAlerta WHERE fkServidor = ?;", new BeanPropertyRowMapper<>(ParametroAlerta.class), (idServidor));

                        List<Config> config2 = con.query("SELECT * FROM Configuracao WHERE fkServidor = ?;", new BeanPropertyRowMapper<>(Config.class), idServidor);


                        // Formatar a data para o formato desejado (opcional)
                        Date data = new Date();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        String dataFormatada = sdf.format(data);

                        String sql = "INSERT INTO Metrica (valor, dataHora, fkConfigComponente, fkConfigServidor, fkEspecMetrica) VALUES (?, ?, ?, ?, ?);";



                        // INSERT PROCESSOS && SLACK PROCESSOS
//                        try {
//                            monitoraProcessos(looca, parametroAlertas.get(0).getMaximo(), parametroAlertas.get(1).getMaximo(), servidoresAtivos.get(0).getIdServidor(), con, servidoresAtivos.get(0).getNome());
//                        } catch (IOException e) {
//                            throw new RuntimeException(e);
//                        } catch (InterruptedException e) {
//                            throw new RuntimeException(e);
//                        }

                        // INSERT CPU
                        double usoDouble = looca.getProcessador().getUso();
                        int valorCpu = (int) Math.round(usoDouble);


                        con.update(sql, valorCpu, dataFormatada, 1, servidoresAtivos.get(0).getIdServidor(), 2);

                        // SLACK CPU
//                        try {
//                            verificarLimite(servidoresAtivos.get(0).getNome(), valorCpu, parametroAlertas.get(0).getMaximo(), "CPU", config2.get(0));
//                        } catch (IOException e) {
//                            throw new RuntimeException(e);
//                        } catch (InterruptedException e) {
//                            throw new RuntimeException(e);
//                        }


                        // INSERT RAM
                        long valorRam = looca.getMemoria().getEmUso();
                        con.update(sql, valorRam, dataFormatada, 2, servidoresAtivos.get(0).getIdServidor(), 1);

                        // SLACK RAM
//                        try {
//                            verificarLimite(servidoresAtivos.get(0).getNome(), valorRam , parametroAlertas.get(1).getMaximo(), "RAM", config2.get(1));
//                        } catch (IOException e) {
//                            throw new RuntimeException(e);
//                        } catch (InterruptedException e) {
//                            throw new RuntimeException(e);
//                        }

                        // INSERT DISCO
                        for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {

                            long tamanhoTotal = disco.getBytesDeEscritas();

                            con.update(sql, tamanhoTotal, dataFormatada, 3, servidoresAtivos.get(0).getIdServidor(), 1);


                            // SLACK DISCO
//                            try {
//                                verificarLimite(servidoresAtivos.get(0).getNome(), tamanhoTotal , parametroAlertas.get(2).getMaximo(), "DISCO", config2.get(2));
//                            }catch (IOException e) {
//                                throw new RuntimeException(e);
//                            } catch (InterruptedException e) {
//                                throw new RuntimeException(e);
//                            }
                        }

                        // INSERT REDE
                        for (RedeInterface r : looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                            if (r.getPacotesRecebidos() != 0) {
                                long valorRede = r.getBytesRecebidos() ;

                                con.update(sql, valorRede, dataFormatada, 4, servidoresAtivos.get(0).getIdServidor(), 1);

                                // SLACK REDE
//                                try {
//                                    verificarLimite(servidoresAtivos.get(0).getNome(), valorRede , parametroAlertas.get(3).getMaximo(), "REDE", config2.get(3));
//                                } catch (IOException e) {
//                                    throw new RuntimeException(e);
//                                } catch (InterruptedException e) {
//                                    throw new RuntimeException(e);
//                                }
                            }
                        }
                    }
                }
            }
        }, 2000, 5000);
    }


    public static void logar(JdbcTemplate con, Scanner in, Looca looca, Timer timer) {
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
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }


        List<Usuario> usuarios = con.query("SELECT idUsuario ,email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo FROM Usuario WHERE email = ? AND senha = ?;", new BeanPropertyRowMapper<>(Usuario.class), email, senha);
        if (usuarios.size() > 0) {
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
                                for (Disco disco : looca.getGrupoDeDiscos().getDiscos()) {
                                    if (disco.getBytesDeEscritas() != null) {
                                        serial = disco.getSerial();
                                    }
                                }
                                long redeTotal = 0;
                                String nomeRede = null;
                                for (RedeInterface r: looca.getRede().getGrupoDeInterfaces().getInterfaces()) {
                                    redeTotal = r.getBytesRecebidos() + r.getBytesEnviados();
                                    nomeRede = r.getNomeExibicao();
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
                }, 20000, 50000); // 5000 milissegundos = 5 segundos
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
                }, 20000, 50000); // 5000 milissegundos = 5 segundos
            }
        }

    }

    public static void verificarLimite(String servidor, long valorCaptura, Double limite, String componente, Config config) throws IOException, InterruptedException {
        final Boolean[] timeoutAtivo = {false};
        Double porcetagem = 0.0;
        if (componente.equals("RAM")){
            porcetagem = (double) valorCaptura / config.getTamanhoTotal() * 100;
            System.out.println("RAM" + porcetagem);
        } else if (componente.equals("DISCO")){
            porcetagem = (double) valorCaptura / config.getTamanhoTotal() * 100;
            System.out.println("DISCO" + porcetagem);
        } else if (componente.equals("REDE")){
           porcetagem =(double) valorCaptura / config.getTamanhoTotal() * 100;
            System.out.println("rede" + porcetagem);
        }

        System.out.println(porcetagem + " > " +limite);
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

    public static void pausarProcessos(Looca looca, JdbcTemplate con){
        List<Processo> processos = con.query("SELECT * FROM Processo WHERE fkAcaoProcesso != 3;", new BeanPropertyRowMapper<>(Processo.class));

        String nomeProcesso = processos.get(0).getNome();
        for (Processo p: looca.getGrupoDeProcessos().getProcessos()){

            if (p.getNome().equals(nomeProcesso)){

                String pId = String.valueOf(p.getPid());
                if (looca.getSistema().getSistemaOperacional().equals("Windows")){
                    kilProcessWindows(pId);

                } else {
                    pauseProcessUbuntu(pId);
                    // Aguarde por um tempo (apenas para ilustração)
                    try {
                        Thread.sleep(5000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    // Continue o mesmo processo
                    resumeProcessUbuntu(pId);
                }
            }
        }

    }

    public static void kilProcessWindows(String pId){
        String processoParaEncerrar = pId;

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("taskkill", "/F", "/IM", processoParaEncerrar);
            Process process = processBuilder.start();

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Processo encerrado com sucesso.");
            } else {
                System.out.println("Erro ao encerrar o processo. Código de saída: " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void pauseProcessUbuntu(String pid) {
        try {
            // Construa o comando para pausar o processo
            String[] command = {"kill", "-STOP", pid};
            Process process = new ProcessBuilder(command).start();

            // Aguarde o término do processo
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Processo com PID " + pid + " pausado com sucesso.");
            } else {
                System.out.println("Erro ao pausar o processo com PID " + pid + ". Código de saída: " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void resumeProcessUbuntu(String pid) {
        try {
            // Construa o comando para continuar o processo
            String[] command = {"kill", "-CONT", pid};
            Process process = new ProcessBuilder(command).start();

            // Aguarde o término do processo
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Processo com PID " + pid + " continuado com sucesso.");
            } else {
                System.out.println("Erro ao continuar o processo com PID " + pid + ". Código de saída: " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

}
