public class ProcessoI {
    private Integer idProcesso;
    private String pId;
    private String nome;
    private Double consumoCpu;
    private Double consumoMem;
    private Integer fkServidor;
    private Integer fkStatusProce;
    private Integer fkAcao;

    public ProcessoI() {
    }

    public ProcessoI(Integer idProcesso, String pId, String nome, Double consumoCpu, Double consumoMem, Integer fkServidor, Integer fkStatusProce, Integer fkAcao) {
        this.idProcesso = idProcesso;
        this.pId = pId;
        this.nome = nome;
        this.consumoCpu = consumoCpu;
        this.consumoMem = consumoMem;
        this.fkServidor = fkServidor;
        this.fkStatusProce = fkStatusProce;
        this.fkAcao = fkAcao;
    }

    public Integer getIdProcesso() {
        return idProcesso;
    }

    public void setIdProcesso(Integer idProcesso) {
        this.idProcesso = idProcesso;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getConsumoCpu() {
        return consumoCpu;
    }

    public void setConsumoCpu(Double consumoCpu) {
        this.consumoCpu = consumoCpu;
    }

    public Double getConsumoMem() {
        return consumoMem;
    }

    public void setConsumoMem(Double consumoMem) {
        this.consumoMem = consumoMem;
    }

    public Integer getFkServidor() {
        return fkServidor;
    }

    public void setFkServidor(Integer fkServidor) {
        this.fkServidor = fkServidor;
    }

    public Integer getFkStatusProce() {
        return fkStatusProce;
    }

    public void setFkStatusProce(Integer fkStatusProce) {
        this.fkStatusProce = fkStatusProce;
    }

    public Integer getFkAcao() {
        return fkAcao;
    }

    public void setFkAcao(Integer fkAcao) {
        this.fkAcao = fkAcao;
    }

    @Override
    public String toString() {
        return "ProcessoI{" +
                "idProcesso=" + idProcesso +
                ", pId='" + pId + '\'' +
                ", nome='" + nome + '\'' +
                ", consumoCpu=" + consumoCpu +
                ", consumoMem=" + consumoMem +
                ", fkServidor=" + fkServidor +
                ", fkStatusProce=" + fkStatusProce +
                ", fkAcao=" + fkAcao +
                '}';
    }
}
