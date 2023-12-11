package Users;

public class Estagiario extends Usuario{
    public Estagiario() {
    }

    public Estagiario(Integer idUsuario, String email, String senha, String nome, String sobrenome, Integer fkEmpresa, Boolean ativo, Integer fkCargo) {
        super(idUsuario, email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo);
    }
}
