package Slack;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ConfigSlack {

    private static final HttpClient client = HttpClient.newHttpClient();
        private static String URL = "https://hooks.slack.com/services/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";

    public static void sendMessage(JSONObject content) throws IOException, InterruptedException{

        HttpRequest request = HttpRequest.newBuilder(
                        URI.create(URL))
                .header("accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

}
