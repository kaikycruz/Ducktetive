import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {
    private JdbcTemplate conexaoBanco;

    public Conexao() {
        BasicDataSource dataSourceServer = new BasicDataSource();
        dataSourceServer.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceServer.setUrl("jdbc:mysql://127.0.0.1:3306/Ducktetive");
        dataSourceServer.setUsername("root");
        dataSourceServer.setPassword("urubu100");

        conexaoBanco = new JdbcTemplate(dataSourceServer);
    }

    public JdbcTemplate getConexaoBanco() {
        return conexaoBanco;
    }
}
