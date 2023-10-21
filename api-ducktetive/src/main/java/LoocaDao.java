import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Date;
import java.util.List;

public class LoocaDao {
    Conexao conexao = new Conexao();
    Metrica metrica = new Metrica();
    JdbcTemplate con = conexao.getConexaoBanco();



    void cadastrarMetricas(Integer idComponente, Double valor, String data, String tipo) {
        String sql = "INSERT INTO Metrica (fkComponenteMetrica, valor, dataHora, tipo) VALUES (?, ?, ?, ?)";
        con.update(sql, idComponente, valor, data, tipo);
    };

    void exibirMetricas (String nome){
        List<Metrica>metricasDoBanco = con.query("SELECT idMetrica, valor, dataHora, tipo, nome  FROM metrica join componente  on idComponente = fkComponenteMetrica WHERE DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and nome like ?",
                new BeanPropertyRowMapper<>(Metrica.class),  nome);

        for (Metrica metrica: metricasDoBanco) {
            System.out.println(metrica);

        }
    }

}
