public class Processo {
    private Integer idProcesso;
    private String pId;
    private String nome;
    private Integer fkAcao;
    private Double consumoCpu;
    private Double consumoMem;
    private Integer fkServidor;
    private Integer fkStatusProce;


    public Processo() {
    }



    public Processo(Integer idProcesso, String pId, String nome, Integer fkAcao, Double consumoCpu, Double consumoMem, Integer fkServidor, Integer fkStatusProce) {
        this.idProcesso = idProcesso;
        this.pId = pId;
        this.nome = nome;
        this.fkAcao = fkAcao;
        this.consumoCpu = consumoCpu;
        this.consumoMem = consumoMem;
        this.fkServidor = fkServidor;
        this.fkStatusProce = fkStatusProce;
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

    public Integer getFkAcao() {
        return fkAcao;
    }

    public void setFkAcao(Integer fkAcao) {
        this.fkAcao = fkAcao;
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

    @Override
    public String toString() {
        return String.format("""
                    Processo
                ID: %d
                Pid: %s
                Nome: %s
                FkAção: %d
                Uso Cpu: %.2f
                Uso Ram: %.2f
                FkServidor: %d
                FkStatus: %d
                """, idProcesso, pId, nome ,fkAcao, consumoCpu, consumoMem, fkServidor, fkStatusProce);
    }
}
