package Conexao;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBanco {
    private JdbcTemplate conexaoBanco;

    public ConexaoBanco(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://0.0.0.0:3306/Ducktetive?autoReconnect=true&useSSL=false");
        dataSource.setUsername("root");
        dataSource.setPassword("urubu100");

        conexaoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoBanco(){
        return conexaoBanco;
    }
}
