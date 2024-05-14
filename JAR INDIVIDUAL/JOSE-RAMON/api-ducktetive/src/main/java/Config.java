public class Config {

    Integer fkComponente;
    Integer fkServidor;
    String serialDisco;
    Long tamanhoTotal;

    public Config() {
    }

    public Config(Integer fkComponente, Integer fkServidor, String serialDisco, Long tamanhoTotal) {
        this.fkComponente = fkComponente;
        this.fkServidor = fkServidor;
        this.serialDisco = serialDisco;
        this.tamanhoTotal = tamanhoTotal;
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

    public Long getTamanhoTotal() {
        return tamanhoTotal;
    }

    public void setTamanhoTotal(Long tamanhoTotal) {
        this.tamanhoTotal = tamanhoTotal;
    }

    @Override
    public String toString() {
        return "Config{" +
                "fkComponente=" + fkComponente +
                ", fkServidor=" + fkServidor +
                ", serialDisco='" + serialDisco + '\'' +
                ", tamanhoTotal=" + tamanhoTotal +
                '}';
    }
}
