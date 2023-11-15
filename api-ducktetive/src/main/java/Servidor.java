public class Servidor {
    private Integer idServidor;
    private String nome;

    private Integer fkStatusServ;
    private String status;


    public Servidor() {
    }

    public Servidor(Integer idServidor, String nome, Integer fkStatusServ, String status) {
        this.idServidor = idServidor;
        this.nome = nome;
        this.fkStatusServ = fkStatusServ;
        this.status = status;
    }

    public Integer getIdServidor() {
        return idServidor;
    }

    public void setIdServidor(Integer idServidor) {
        this.idServidor = idServidor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getFkStatusServ() {
        return fkStatusServ;
    }

    public void setFkStatusServ(Integer fkStatusServ) {
        this.fkStatusServ = fkStatusServ;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {

        return String.format("""
                
                +-----------------------+
                |       SERVIDOR        
                | ID: %d                
                | Nome: %s              
                | Status: %s     
                | Fk Status: %d       
                +-----------------------+
                """, idServidor, nome, status, fkStatusServ);
    }
}
