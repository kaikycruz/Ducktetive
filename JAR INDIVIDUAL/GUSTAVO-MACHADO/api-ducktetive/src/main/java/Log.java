import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class Log {
    private LocalDateTime dataAtual = LocalDateTime.now();
    private String dataFormat = ("%d_%s_%d".formatted(dataAtual.getYear(), dataAtual.getMonthValue(), dataAtual.getDayOfMonth()));
    private File file = new File(".\\src\\log\\%s.txt".formatted(dataFormat));

    public void gravar(String info, String tipo) {


        if (tipo.equals("erro")){
            if(dataAtual.getHour() <= 12){
                file = new File(".\\src\\log\\[error][primeira metade dia] %s.txt".formatted(dataFormat));
                if (file.exists()) {
                    escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                } else {
                    try {
                        file.createNewFile();
                        escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }else{
                file = new File(".\\src\\log\\[error][segunda metade dia] %s.txt".formatted(dataFormat));
                if (file.exists()) {
                    escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                } else {
                    try {
                        file.createNewFile();
                        escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

        }else{
            if(dataAtual.getHour() <= 12){
                file = new File(".\\src\\log\\[system][primeira metade dia] %s.txt".formatted(dataFormat));
                if (file.exists()) {
                    escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                } else {
                    try {
                        file.createNewFile();
                        escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }else{
                file = new File(".\\src\\log\\[system][segunda metade dia] %s.txt".formatted(dataFormat));
                if (file.exists()) {
                    escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                } else {
                    try {
                        file.createNewFile();
                        escreverNoArquivo("[%s - %d:%d]  %s".formatted(dataFormat,dataAtual.getHour(),dataAtual.getMinute(),info));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }

    }

    private void escreverNoArquivo(String texto) {
        try (
                FileWriter writer = new FileWriter(file, true)) {
            writer.write(texto + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
