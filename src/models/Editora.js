import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
  {
    id: { type: "string" },
    nome: { type: "String", required: [true, "O nome da editora é obrigatório"] },
    cidade: { type: "String" },
  },
  {
    versionKey: false,
  }
);

const editoras = mongoose.model("editoras", editoraSchema);
export default editoras;
