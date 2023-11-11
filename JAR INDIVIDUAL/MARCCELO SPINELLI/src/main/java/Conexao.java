import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {
    private JdbcTemplate conexaoBanco;

    public Conexao(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://127.0.0.1:3306/Ducktetive");
        dataSource.setUsername("root");
        dataSource.setPassword("sptech");


        BasicDataSource dataSourceServer = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://18.212.67.32:3306/Ducktetive");
        dataSource.setUsername("root");
        dataSource.setPassword("urubu100");


        conexaoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoBanco(){
        return conexaoBanco;
    }
}


