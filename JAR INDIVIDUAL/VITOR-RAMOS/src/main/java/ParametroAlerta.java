public class ParametroAlerta {
    private Integer idParametro;
    private Double maximo;
    private Double minimo;
    private Integer fkComponente;
    private Integer fkServidor;


    public ParametroAlerta(Integer idParametro, Double maximo, Double minimo, Integer fkComponente, Integer fkServidor) {
        this.idParametro = idParametro;
        this.maximo = maximo;
        this.minimo = minimo;
        this.fkComponente = fkComponente;
        this.fkServidor = fkServidor;
    }

    public ParametroAlerta() {
    }

    public Integer getIdParametro() {
        return idParametro;
    }

    public void setIdParametro(Integer idParametro) {
        this.idParametro = idParametro;
    }

    public Double getMaximo() {
        return maximo;
    }

    public void setMaximo(Double maximo) {
        this.maximo = maximo;
    }

    public Double getMinimo() {
        return minimo;
    }

    public void setMinimo(Double minimo) {
        this.minimo = minimo;
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

    @Override
    public String toString() {
        return String.format("""
                    Parametro Alerta
                idParametro: %d
                maximo: %.2f
                minimo: %.2f
                fkComponente: %d
                fkServidor: %d
                """, idParametro, maximo, maximo, fkComponente, fkServidor);
    }
}
