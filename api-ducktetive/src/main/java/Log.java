import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;

public class Log {
    private LocalDateTime dataAtual = LocalDateTime.now();
    private File pasta = new File(".\\src\\log");
    private File file = new File(".\\src\\log\\%d_%s_%d.txt".formatted(dataAtual.getYear(), dataAtual.getMonth(), dataAtual.getDayOfMonth()));

    public void gravar(String info) {
        // Verifica se o arquivo já existe
        if (file.exists()) {
//            se o arquivo ja existir ele vai inserir no arquivo de texto
            escreverNoArquivo("%d:%d - %s".formatted(dataAtual.getHour(),dataAtual.getMinute(),info));
//            System.out.println("Texto inserido no arquivo com sucesso.");
        } else {
            try {
                file.createNewFile();
//                se o arquivo não existir ele vai criar e logo em seguida vai inserir no arquivo de texto
                escreverNoArquivo("%d:%d - %s".formatted(dataAtual.getHour(),dataAtual.getMinute(),info));
//                System.out.println("Texto inserido no arquivo com sucesso.");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        System.out.println(Arrays.toString(pasta.listFiles()));
    }

    private void escreverNoArquivo(String texto) {
        try (FileWriter writer = new FileWriter(file, true)) {
            writer.write(texto + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        Log cadastro = new Log();

        cadastro.gravar("test");
    }
}
