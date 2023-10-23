import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Date;
import java.util.List;

public class LoocaDao {
    Conexao conexao = new Conexao();
    Servidor servidor = new Servidor();
    Metrica metrica = new Metrica();
    JdbcTemplate con = conexao.getConexaoBanco();



    void cadastrarMetricas(Integer idComponente, Double valor, String data, String tipo) {
        String sql = "INSERT INTO Metrica (fkComponenteMetrica, valor, dataHora, tipo) VALUES (?, ?, ?, ?)";
        con.update(sql, idComponente, valor, data, tipo);
    };


    void exibirMetricas (String nome){
        List<Metrica>metricasDoBanco = con.query("SELECT m.idMetrica, c.nome, m.dataHora, m.tipo, m.valor, p.maximo FROM metrica m JOIN componente c ON m.fkComponenteMetrica = c.idComponente JOIN parametro p ON p.fkComponenteParametro = c.idComponente WHERE m.valor > p.maximo and DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and nome like ?",
                new BeanPropertyRowMapper<>(Metrica.class),  nome);

        for (Metrica metrica: metricasDoBanco) {
            System.out.println(metrica);

        }
    }

    void atividadeDoServidor () {
        String select = String.format("""
                SELECT idServidor, nome as nomeServidor, status FROM servidor WHERE servidor.status like "Ativo"
                """);
        List<Servidor>metricasDoServidor = con.query(select, new BeanPropertyRowMapper<>(Servidor.class));
        for (Servidor servidor: metricasDoServidor) {
            System.out.println(servidor);
        }
    }
}
