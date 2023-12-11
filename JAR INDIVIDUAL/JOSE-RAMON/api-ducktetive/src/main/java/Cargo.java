public class Cargo {
    private Integer idCargo;

    private String nome;
    private String nivelPermissao;

    public Cargo() {
    }

    public Cargo(Integer idCargo, String nome, String nivelPermissao) {
        this.idCargo = idCargo;
        this.nome = nome;
        this.nivelPermissao = nivelPermissao;
    }

    public Integer getIdCargo() {
        return idCargo;
    }

    public void setIdCargo(Integer idCargo) {
        this.idCargo = idCargo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNivelPermissao() {
        return nivelPermissao;
    }

    public void setNivelPermissao(String nivelPermissao) {
        this.nivelPermissao = nivelPermissao;
    }

    @Override
    public String toString() {
        return String.format("""
                
                +-----------------------+
                |       CARGO           |
                | ID: %d                |
                | Nome: %s              |
                | Permissão: %s         |
                +-----------------------+
                """, idCargo, nome, nivelPermissao);
    }
}
