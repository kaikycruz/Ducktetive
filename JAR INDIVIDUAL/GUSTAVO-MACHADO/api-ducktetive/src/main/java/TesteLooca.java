import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;

import com.github.britooo.looca.api.util.Conversor;
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

                double valorMemoria = (double) memoria.getEmUso() / 1000000000;

                loocaDao.cadastrarMetricas(1, valorMemoria, dataFormatada, "Uso");
                loocaDao.cadastrarMetricas(2, processador.getUso(), dataFormatada, "Uso");

                for (RedeInterface r : redeInterfaceGroup.getInterfaces()) {
                    if (r.getPacotesRecebidos() != 0) {
                        double valorRede = (double) r.getPacotesRecebidos()/ 1000000;
                        loocaDao.cadastrarMetricas(4, valorRede, dataFormatada, "QtdRecebidos");

                    }
                }
                for (Disco disco : grupoDeDiscos.getDiscos()) {
                    double valorDisco = (double) disco.getBytesDeEscritas() / 1000000000;
                    loocaDao.cadastrarMetricas(3, valorDisco, dataFormatada, "Uso");
                }

            }
        };

        // Agenda a tarefa para ser executada após um atraso de 2 segundos
        // e, em seguida, a cada 5 segundos após o primeiro disparo
        timer.schedule(task, 50000, 5000);

        Scanner leitorNum = new Scanner(System.in);
        Scanner leitortring = new Scanner(System.in);

        Integer operacao = 0;
        Integer usuAtual = null;
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


        for (int i = 0; i < emails.size(); i++) {
            if (login.equals(emails.get(i)) && senha.equals(senhas.get(i))) {
                mensagem = "Bem vindo senhor(a)";
                usuAtual = i;
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
                            | 5) Listar usuarios              |
                            | 6) Atualizar senha              |
                            | 7) Sair                         |
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
                    System.out.println("Lista de usuarios cadastrados");
                    for (int i = 0; i < emails.size(); i++) {
                        System.out.println("""
                                %d - %s
                                """.formatted(i+1, emails.get(i)));
                    }
                    break;
                case 6:
                    System.out.println("Atualizar Senha:");
                    for (int i = 0; i < emails.size(); i++) {
                        System.out.println("Digite sua senha:");
                        String confSenha = leitortring.nextLine();
                        if (senhas.get(usuAtual).equals(confSenha)){
                            System.out.println("Digite a nova senha:");
                            String novaSenha = leitortring.nextLine();

                            senhas.set(usuAtual, novaSenha);
                            System.out.println("SENHA ATUALIZADA COM SUCESSO!");
                            break;
                        }else{
                            System.out.println("Senha incorreta!");
                        }
                    }
                    break;
                case 7:
                    System.out.println("Atualizar email:");
                            System.out.println("Digite seu novo email:");
                            String novoEmail = leitortring.nextLine();

                            emails.set(usuAtual, novoEmail);
                            System.out.println("EMAIL ATUALIZADA COM SUCESSO!");
                            break;
                case 8:
                    System.out.println("Saindo...");
                    exit(0);
                    break;
            }
        } while (operacao != 8);

    }
}

