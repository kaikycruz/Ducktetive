package Users;

public class Dono extends Usuario{

    public Dono() {
    }

    public Dono(Integer idUsuario, String email, String senha, String nome, String sobrenome, Integer fkEmpresa, Boolean ativo, Integer fkCargo) {
        super(idUsuario, email, senha, nome, sobrenome, fkEmpresa, ativo, fkCargo);
    }
}
