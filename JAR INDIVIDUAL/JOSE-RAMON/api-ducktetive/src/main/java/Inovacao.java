public class Inovacao {
    private String nome;
    private String sobrenome;
    private String telefone;
    private String email;
    private String nomeEmpresa;
    private String nomeCargo;

    public Inovacao() {
    }

    public Inovacao(String nome, String sobrenome, String telefone, String email, String nomeEmpresa, String nomeCargo) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
        this.email = email;
        this.nomeEmpresa = nomeEmpresa;
        this.nomeCargo = nomeCargo;
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public String getNomeCargo() {
        return nomeCargo;
    }

    public void setNomeCargo(String nomeCargo) {
        this.nomeCargo = nomeCargo;
    }


    @Override
    public String toString() {
        return String.format("""
                    Inovação
                Nome: %s
                Sobrenome: %s
                Telefone: %s
                Email: %s
                Empresa: %s
                Cargo: %s
                """, nome, sobrenome, telefone, email, nomeEmpresa, nomeCargo);
    }
}
