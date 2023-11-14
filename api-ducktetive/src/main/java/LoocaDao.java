import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Date;
import java.util.List;

public class LoocaDao {
    Conexao conexao = new Conexao();
    Metrica metrica = new Metrica();
    JdbcTemplate con = conexao.getConexaoBanco();
    Log informacao = new Log();



    void cadastrarMetricas(Integer idComponente, Double valor, String data, String tipo) {
        String sql = "INSERT INTO Metrica (fkComponenteMetrica, valor, dataHora, tipo) VALUES (?, ?, ?, ?)";
        con.update(sql, idComponente, valor, data, tipo);
        informacao.gravar("Cadastrando as metricas");
    };


    void exibirMetricas (String nome){
        List<Metrica>metricasDoBanco = con.query("SELECT m.idMetrica, c.nome, m.dataHora, m.tipo, m.valor, p.maximo FROM metrica m JOIN componente c ON m.fkComponenteMetrica = c.idComponente JOIN parametro p ON p.fkComponenteParametro = c.idComponente WHERE m.valor > p.maximo and DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and nome like ?",
                new BeanPropertyRowMapper<>(Metrica.class),  nome);
        informacao.gravar("Exibindo as metricas coletadas pelo banco");
        for (Metrica metrica: metricasDoBanco) {
            System.out.println(metrica);

        }
    }

}
