import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const mensagensErro = Object.values(erro.errors)
      .map((err) => err.message)
      .join("; ");
    super(`Os seguintes erro foram encontrados: ${mensagensErro}`);
  }
}

export default ErroValidacao;
