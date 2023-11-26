package Users;

public class Analista extends Usuario{
    public Analista() {
    }

    public Analista(Integer idUsuario, String email, String senha, String nome, String sobrenome, Integer fkEmpresa, Boolean ativo, Integer fkCargo) {
        super(idUsuario, email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo);
    }
}
