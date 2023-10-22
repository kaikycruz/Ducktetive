import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;

import oshi.SystemInfo;


import java.text.SimpleDateFormat;
import java.util.*;

import static java.lang.System.exit;

public class TesteLooca {

    public static void main(String[] args) {

        Looca looca = new Looca();

        LoocaDao loocaDao = new LoocaDao();

        Conexao conexao = new Conexao();

        Memoria memoria = looca.getMemoria();

        RedeInterfaceGroup redeInterfaceGroup = new RedeInterfaceGroup(new SystemInfo());

        Processador processador = looca.getProcessador();

        ProcessoGrupo processoGrupo = new ProcessoGrupo();

        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();

        List<Disco> discos = grupoDeDiscos.getDiscos();

        Timer timer = new Timer();


        // Cria uma tarefa TimerTask
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                // Código a ser executado quando a tarefa for disparada

                // Formatar a data para o formato desejado (opcional)
                Date data = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String dataFormatada = sdf.format(data);

                double valorMemoria = (double) memoria.getEmUso();
                loocaDao.cadastrarMetricas(1, valorMemoria, dataFormatada, "Uso");
                loocaDao.cadastrarMetricas(2, processador.getUso(), dataFormatada, "Uso");

                for (RedeInterface r : redeInterfaceGroup.getInterfaces()) {
                    if (r.getPacotesRecebidos() != 0) {
                        double valorRede = (double) r.getPacotesRecebidos();
                        loocaDao.cadastrarMetricas(4, valorRede, dataFormatada, "QtdRecebidos");

                    }
                }
                for (Disco disco : grupoDeDiscos.getDiscos()) {
                    double valorDisco = (double) disco.getBytesDeEscritas();
                    loocaDao.cadastrarMetricas(3, valorDisco, dataFormatada, "Uso");
                }

            }
        };

        // Agenda a tarefa para ser executada após um atraso de 2 segundos
        // e, em seguida, a cada 5 segundos após o primeiro disparo
        timer.schedule(task, 50000, 5000);

        Scanner leitorNum = new Scanner(System.in);
        Scanner leitortring = new Scanner(System.in);
        Scanner leitorData = new Scanner(System.in);


        Integer operacao = 0;
        List emails = new ArrayList<String>();
        List senhas = new ArrayList<String>();
        String mensagem = "Usuario não encontrado!";

        emails.add("EDUARDO@EMAIL.COM");
        emails.add("MARIANA@EMAIL.COM");
        emails.add("WADMIR@EMAIL.COM");

        senhas.add("123");
        senhas.add("cyber2077");
        senhas.add("senha123");

        System.out.println("Digite seu Login: ");
        String login = leitortring.nextLine().toUpperCase();


        System.out.println("Digite sua senha: ");
        String senha = leitortring.nextLine();

        String data;

        for (int i = 0; i < emails.size(); i++) {
            if (login.equals(emails.get(i)) && senha.equals(senhas.get(i))) {
                mensagem = "Bem vindo senhor(a)";
                break;
            } else {
                System.out.println(mensagem);
                exit(0);
            }
        }
        System.out.println(mensagem);
        do {
            System.out.println("""
                            +---------------------------------+
                            |           DUCKTETIVE            |
                            +---------------------------------+
                            |     MONITORAMENTO DE DADOS      |
                            +---------------------------------+
                            | 1) Ultima hora - RAM            |
                            | 2) Ultima hora - CPU            |
                            | 3) Ultima hora - DISCO          |
                            | 4) Ultima hora - REDE           |
                            | 5) Dados captados - por data    |
                            | 6) Sair                         |
                            +---------------------------------+
                            """);
                operacao = leitorNum.nextInt();
            switch (operacao) {
                case 1:
                    loocaDao.exibirMetricas("ram");
                    break;
                case 2:
                    loocaDao.exibirMetricas("cpu");
                    break;
                case 3:
                    loocaDao.exibirMetricas("disco");
                    break;
                case 4:
                    loocaDao.exibirMetricas("rede");
                    break;
                case 5:
                    System.out.println("Informe a data que deseja (YYYY-MM-DD)");
                    data = leitorData.nextLine();
                    if (data != ""){
                        System.out.println("""
                            +---------------------------------+
                            |           DUCKTETIVE            |
                            +---------------------------------+
                            |         DADOS POR DATA          |
                            +---------------------------------+
                            | 1) RAM                          |
                            | 2) CPU                          |
                            | 3) DISCO                        |
                            | 4) REDE                         |
                            | 5) Sair                         |
                            +---------------------------------+
                            """);
                        Integer metrica;
                        metrica = leitorNum.nextInt();
                        switch (metrica) {
                            case 1:
                                loocaDao.exibirMetricas2("ram", data);
                                break;
                            case 2:
                                loocaDao.exibirMetricas2("cpu", data);
                                break;
                            case 3:
                                loocaDao.exibirMetricas2("disco", data);
                                break;
                            case 4:
                                loocaDao.exibirMetricas2("rede", data);
                                break;
                            case 5:
                                System.out.println("Saindo...");
                                exit(0);
                                break;
                        }
                    }
                    break;
                case 6:
                    System.out.println("Saindo...");
                    exit(0);
                    break;
            }
        } while (operacao != 6);

    }
}

