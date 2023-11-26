package Banco;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBanco {
    private JdbcTemplate conexaoBanco;

    private JdbcTemplate conexaoBancoAWS;

    public ConexaoBanco(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://127.0.0.1:3306/Ducktetive");
        dataSource.setUsername("root");
        dataSource.setPassword("997849791abc");

        conexaoBanco = new JdbcTemplate(dataSource);

        BasicDataSource dataSourceAWS = new BasicDataSource();
        dataSourceAWS.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSourceAWS.setUrl("jdbc:sqlserver://44.203.84.7:1433;databaseName=Ducktetive");
        dataSourceAWS.setUsername("sa");
        dataSourceAWS.setPassword("urubu100");

        conexaoBancoAWS = new JdbcTemplate(dataSourceAWS);

    }

    public JdbcTemplate getConexaoBancoAWS() {
        return conexaoBancoAWS;
    }

    public JdbcTemplate getConexaoBanco(){
        return conexaoBanco;
    }
}
