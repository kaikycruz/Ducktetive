import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TesteLoginUser {
    public static void main(String[] args) {
        Scanner Scannerlogin = new Scanner(System.in);
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
        String login = Scannerlogin.nextLine().toUpperCase();

        Scanner ScannerSenha = new Scanner(System.in);
        System.out.println("Digite sua senha: ");
        String senha = ScannerSenha.nextLine();

        for (int i = 0; i < emails.size(); i++) {

            if (login.equals(emails.get(i)) && senha.equals(senhas.get(i))) {
                mensagem = "Bem vindo novamente senhor";
            }
        }
        System.out.println(mensagem);

    }
}
