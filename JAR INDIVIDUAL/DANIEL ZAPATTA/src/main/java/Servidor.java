public class Servidor {

    private String status, nomeServidor;

    private Integer idServidor;

    public Servidor () {
    }

    public Servidor(String status, String nomeServidor, Integer idServidor) {
        this.status = status;
        this.nomeServidor = nomeServidor;
        this.idServidor = idServidor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNomeServidor() {
        return nomeServidor;
    }

    public void setNomeServidor(String nomeServidor) {
        this.nomeServidor = nomeServidor;
    }

    public Integer getIdServidor() {
        return idServidor;
    }

    public void setIdServidor(Integer idServidor) {
        this.idServidor = idServidor;
    }

    @Override
    public String toString() {
        return String.format("""
                idServidor: %d
                Nome do servidor: %s
                Status do servidor:  %s
                """, idServidor, nomeServidor, status);
    }
}
