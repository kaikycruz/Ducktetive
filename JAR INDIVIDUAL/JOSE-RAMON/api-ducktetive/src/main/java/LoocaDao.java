import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Date;
import java.util.List;

public class LoocaDao {
    Conexao conexao = new Conexao();
    Metrica metrica = new Metrica();

    Inovacao inovacao = new Inovacao();
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

    void exibirInovação(String componente, String servidor){
        List<Inovacao>inovacaoList = con.query("SELECT s.nome AS nomeServidor, c.nome AS nomeComponente, maximo, valor, dataHora FROM servidor s JOIN servidor_componente sc ON s.idServidor = sc.fkServidor JOIN componente c ON sc.fkComponente = c.idComponente JOIN parametro p ON c.idComponente = p.fkComponenteParametro LEFT JOIN metrica m ON c.idComponente = m.fkComponenteMetrica where s.nome like ? and DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and c.nome like ?;",
                new BeanPropertyRowMapper<>(Inovacao.class), servidor, componente);
        for (Inovacao inovacao: inovacaoList) {
            System.out.println(inovacao);

        }
    }
}
