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
        List<Metrica>metricasDoBanco = con.query("SELECT m.idMetrica, c.nome, m.dataHora, m.tipo, m.valor, p.maximo FROM metrica m JOIN componente c ON m.fkComponenteMetrica = c.idComponente JOIN parametro p ON p.fkComponenteParametro = c.idComponente WHERE m.valor > p.maximo and DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and nome like ?",
                new BeanPropertyRowMapper<>(Metrica.class),  nome);

        for (Metrica metrica: metricasDoBanco) {
            System.out.println(metrica);
        }
    }


    void exibirRelatorio (String nome) {
        List<Metrica>relatorioComponente = con.query("SELECT metrica.idMetrica, componente.nome, metrica.valor, metrica.dataHora FROM metrica JOIN componente ON metrica.fkComponenteMetrica = componente.idComponente WHERE componente.nome = ? AND metrica.dataHora >= DATE_SUB(NOW(), INTERVAL 30 DAY);", new BeanPropertyRowMapper<>(Metrica.class), nome);

        for (Metrica metrica : relatorioComponente) {
            System.out.println(metrica);
        }
    }

}
