package Conexao;

import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.webhook.Payload;
import com.github.seratch.jslack.api.webhook.WebhookResponse;

public class ConexaoSlack {

    private static String webHooksUrl = "https://hooks.slack.com/services/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";

    private static String oAuthToken = "xoxb-6136281862566-6155995734580-gJcAhuc9bKxuldAqQe8F2Ujz";
    private static String canalSlack = "aviso-duck";

     public void enviandoMsgSlack(String mensagem) {
        try {
            StringBuilder msgBuilder = new StringBuilder();

            msgBuilder.append(mensagem);

            Payload payload =  Payload.builder().channel(canalSlack).text(msgBuilder.toString()).build();

            WebhookResponse webResp = Slack.getInstance().send(webHooksUrl, payload);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
