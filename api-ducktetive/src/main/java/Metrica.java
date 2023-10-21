import java.util.Date;

public class Metrica {
    private Integer idMetrica;
    private Double valor;
    private Date dataHora;
    private String tipo;
    private String nome;


    public Metrica() {
    }

    public Metrica(Integer idMetrica, Double valor, Date dataHora, String tipo, String nome) {
        this.idMetrica = idMetrica;
        this.valor = valor;
        this.dataHora = dataHora;
        this.tipo = tipo;
        this.nome = nome;
    }


    public Integer getIdMetrica() {
        return idMetrica;
    }

    public void setIdMetrica(Integer idMetrica) {
        this.idMetrica = idMetrica;
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


    @Override
    public String toString() {
        return """
                ------------------
                |    Metrica     |
                +----------------+
                | ID: %d         
                | Valor: %.2f    
                | Data: %s      
                | Tipo: %s       
                | Nome: %s       
                +----------------+
                """.formatted(idMetrica, valor, dataHora, tipo, nome);
    }
}
