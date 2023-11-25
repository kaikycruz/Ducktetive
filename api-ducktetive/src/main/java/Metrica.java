import Banco.ConexaoBanco;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.SystemInfo;

import java.util.Date;
import java.util.List;

public class Metrica {
    private Integer idMetrica;
    private Double valor;
    private Date dataHora;
    private Integer fkConfigComponente;
    private Integer fkConfigServidor;
    private Integer fkEspecMetrica;

    Looca looca = new Looca();
    ConexaoBanco conexao = new ConexaoBanco();
    JdbcTemplate con = conexao.getConexaoBanco();
    Memoria memoria = looca.getMemoria();
    RedeInterfaceGroup redeInterfaceGroup = new RedeInterfaceGroup(new SystemInfo());
    Processador processador = looca.getProcessador();
    ProcessoGrupo processoGrupo = new ProcessoGrupo();
    DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
    List<Disco> discos = grupoDeDiscos.getDiscos();


    public Metrica(Integer idMetrica, Double valor, Date dataHora, Integer fkConfigComponente, Integer fkConfigServidor, Integer fkEspecMetrica) {
        this.idMetrica = idMetrica;
        this.valor = valor;
        this.dataHora = dataHora;
        this.fkConfigComponente = fkConfigComponente;
        this.fkConfigServidor = fkConfigServidor;
        this.fkEspecMetrica = fkEspecMetrica;
    }

    public Metrica() {
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

    public Integer getFkConfigComponente() {
        return fkConfigComponente;
    }

    public void setFkConfigComponente(Integer fkConfigComponente) {
        this.fkConfigComponente = fkConfigComponente;
    }

    public Integer getFkConfigServidor() {
        return fkConfigServidor;
    }

    public void setFkConfigServidor(Integer fkConfigServidor) {
        this.fkConfigServidor = fkConfigServidor;
    }

    public Integer getFkEspecMetrica() {
        return fkEspecMetrica;
    }

    public void setFkEspecMetrica(Integer fkEspecMetrica) {
        this.fkEspecMetrica = fkEspecMetrica;
    }

    @Override
    public String toString() {
        return String.format("""
                    Metrica
                ID: %d
                Valor: %.2f
                Data Hora: %s
                FkComponente: %d
                FkServidor: %d
                FkEspecMetrica: %d
                """, idMetrica, valor, dataHora, fkConfigComponente, fkConfigServidor, fkEspecMetrica);
    }
}
