import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O titulo é obrigatório"] },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O(a) autor(a) é obrigatório"] },
  editora: { type: mongoose.Schema.Types.ObjectId, ref: "editoras", required: [true, "A editora é obrigatória"] },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de paginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
    },
  },
});

const livros = mongoose.model("livros", livroSchema);
export default livros;
