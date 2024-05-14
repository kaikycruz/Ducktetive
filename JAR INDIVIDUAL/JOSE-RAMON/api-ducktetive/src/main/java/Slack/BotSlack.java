package Slack;


import org.json.JSONObject;
import java.io.IOException;


public class BotSlack {
    public void msgComponente(String componente, String servidor) throws IOException, InterruptedException {
        String msg = String.format("""
                O componente: %s
                Servidor: %s
                Atingiu o seu limite!
                """, componente, servidor);

        JSONObject json = new JSONObject();
        json.put("text",msg) ;
        ConfigSlack.sendMessage(json);
    }

    public void msgProcesso(String nomeProcesso, String servidor) throws IOException, InterruptedException {
        String msg = String.format("""
                O Processo: %s
                Servidor: %s
                Atingiu o seu limite de consumo!
                """, nomeProcesso, servidor);

        JSONObject json = new JSONObject();
        json.put("text",msg);
        ConfigSlack.sendMessage(json);
    }

}
