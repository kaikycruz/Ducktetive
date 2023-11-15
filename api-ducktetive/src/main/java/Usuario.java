public class Usuario {

    private Integer idUsuario;

    private String email;
    private String senha;

    private String nome;
    private String sobrenome;

    private Integer fkEmpresa;

    private Integer ativo;

    private Integer fkCargo;

    public Usuario() {
    }

    public Usuario(Integer idUsuario, String email, String senha, String nome, String sobrenome, Integer fkEmpresa, Integer ativo, Integer fkCargo) {
        this.idUsuario = idUsuario;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.fkEmpresa = fkEmpresa;
        this.ativo = ativo;
        this.fkCargo = fkCargo;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    public Integer getAtivo() {
        return ativo;
    }

    public void setAtivo(Integer ativo) {
        this.ativo = ativo;
    }

    public Integer getFkCargo() {
        return fkCargo;
    }

    public void setFkCargo(Integer fkCargo) {
        this.fkCargo = fkCargo;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "idUsuario=" + idUsuario +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", nome='" + nome + '\'' +
                ", sobrenome='" + sobrenome + '\'' +
                ", fkEmpresa=" + fkEmpresa +
                ", ativo=" + ativo +
                ", Cargo=" + fkCargo +
                '}';
    }
}
