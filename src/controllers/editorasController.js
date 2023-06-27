import { editoras } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class EditoraController {
  static listarEditoras = async (req, res, next) => {
    try {
      const editorasResultado = await editoras.find();
      res.status(200).json(editorasResultado);
    } catch (err) {
      next(err);
    }
  };

  static listarEditoraPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const editora = await editoras.findById(id);
      if (editora !== null) {
        res.status(200).json(editora);
      } else {
        next(new NaoEncontrado(`A editora com ID ${req.params.id} não foi localizada`));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarEditora = async (req, res, next) => {
    try {
      const editoraStance = new editoras(req.body);
      const editora = await editoraStance.save();
      res.status(200).json(editora);
    } catch (err) {
      next(err);
    }
  };

  static atualizarEditora = async (req, res, next) => {
    try {
      const id = req.params.id;
      const editora = await editoras.findByIdAndUpdate(id, { $set: req.body });
      if (editora !== null) {
        res.status(200).json(editora);
      } else {
        next(new NaoEncontrado(`A editora com ID ${req.params.id} não foi localizada`));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarEditora = async (req, res, next) => {
    try {
      const id = req.params.id;
      const editora = await editoras.findByIdAndDelete(id);
      if (editora !== null) {
        res.status(200).json(editora);
      } else {
        next(new NaoEncontrado(`A editora com ID ${req.params.id} não foi localizada`));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default EditoraController;
