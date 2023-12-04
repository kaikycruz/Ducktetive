package Banco;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexaoBanco {
    private JdbcTemplate conexaoBanco;
    // ALTERAR DEV PARA INSERIR NO BANCO
    // dev = true; <- INSERINDO LOCAL
    // dev = false; < - INSERINDO SQL Server
    private Boolean dev = false;


    public ConexaoBanco() {

        if (dev) {
            // CONEXÃO LOCAL
            BasicDataSource dataSource = new BasicDataSource();
            dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
            dataSource.setUrl("jdbc:mysql://127.0.0.1:3306/Ducktetive");
            dataSource.setUsername("root");
            dataSource.setPassword("997849791abc");

            conexaoBanco = new JdbcTemplate(dataSource);
        } else {
            BasicDataSource dataSourceAWS = new BasicDataSource();
            dataSourceAWS.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            dataSourceAWS.setUrl("jdbc:sqlserver://3.232.45.65;" +
                    "database=Ducktetive;" +
                    "user=sa;" +
                    "password=urubu100;" +
                    "trustServerCertificate=true;");
            dataSourceAWS.setUsername("sa");
            dataSourceAWS.setPassword("urubu100");

            conexaoBanco = new JdbcTemplate(dataSourceAWS);
        }
    }

    public JdbcTemplate getConexaoBanco() {
        return conexaoBanco;
    }

    public void setConexaoBanco(JdbcTemplate conexaoBanco) {
        this.conexaoBanco = conexaoBanco;
    }

    public Boolean getDev() {
        return dev;
    }

    public void setDev(Boolean dev) {
        this.dev = dev;
    }

}

