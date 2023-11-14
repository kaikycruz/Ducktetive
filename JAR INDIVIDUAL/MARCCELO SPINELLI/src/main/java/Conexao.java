import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
public class Conexao {
    private JdbcTemplate conexaoBanco;

<<<<<<< HEAD
    public Conexao(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/Ducktetive100?autoReconnect=true&useSSL=false");
        dataSource.setUsername("root");
        dataSource.setPassword("urubu100");
=======
    public Conexao() {
        BasicDataSource dataSourceServer = new BasicDataSource();
        dataSourceServer.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceServer.setUrl("jdbc:mysql://localhost:3306/Ducktetive?autoReconnect=true&useSSL=false");
        dataSourceServer.setUsername("root");
        dataSourceServer.setPassword("urubu100");
>>>>>>> refs/remotes/origin/main

        conexaoBanco = new JdbcTemplate(dataSourceServer);
    }

    public JdbcTemplate getConexaoBanco() {
        return conexaoBanco;
    }
}
