import java.util.Date;

public class Inovacao {
    private String nomeServidor;
    private String nomeComponente;
    private Double maximo;
    private Double valor;

    private Date dataHora;

    public Inovacao() {
    }


    public Inovacao(String nomeServidor, String nomeComponente, Double maximo, Double valor, Date dataHora) {
        this.nomeServidor = nomeServidor;
        this.nomeComponente = nomeComponente;
        this.maximo = maximo;
        this.valor = valor;
        this.dataHora = dataHora;
    }

    public String getNomeServidor() {
        return nomeServidor;
    }

    public void setNomeServidor(String nomeServidor) {
        this.nomeServidor = nomeServidor;
    }

    public String getNomeComponente() {
        return nomeComponente;
    }

    public void setNomeComponente(String nomeComponente) {
        this.nomeComponente = nomeComponente;
    }

    public Double getMaximo() {
        return maximo;
    }

    public void setMaximo(Double maximo) {
        this.maximo = maximo;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Date getDataHora() {
        return dataHora;
    }

    public void setDataHora(Date dataHora) {
        this.dataHora = dataHora;
    }

    @Override
    public String toString() {
        return """
                ------------------
                |    Metrica     |
                +----------------+
                | Servidor: %s 
                | Componente: %s       
                | Valor: %.2f   
                | Maximo: %.2f 
                | Data: %s      
                +----------------+
                """.formatted(nomeServidor, nomeComponente, valor,  maximo,dataHora );
    }
}
