public class Config {

    Integer fkComponente;
    Integer fkServidor;
    String serialDisco;

    public Config() {
    }

    public Config(Integer fkComponente, Integer fkServidor, String serialDisco) {
        this.fkComponente = fkComponente;
        this.fkServidor = fkServidor;
        this.serialDisco = serialDisco;
    }


    public Integer getFkComponente() {
        return fkComponente;
    }

    public void setFkComponente(Integer fkComponente) {
        this.fkComponente = fkComponente;
    }

    public Integer getFkServidor() {
        return fkServidor;
    }

    public void setFkServidor(Integer fkServidor) {
        this.fkServidor = fkServidor;
    }

    public String getSerialDisco() {
        return serialDisco;
    }

    public void setSerialDisco(String serialDisco) {
        this.serialDisco = serialDisco;
    }

    @Override
    public String toString() {

        return String.format("""
                
                +-----------------------+
                |      CONFIGURAÇÃO                  
                | fkComponente: %d      
                | fkServidor: %d                   
                | StaserialDisco: %s            
                +-----------------------+
                """, fkComponente, fkServidor, serialDisco);
    }
}
