import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NaoEncontrado(`O autor com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autorStance = new autores(req.body);
      const autor = await autorStance.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NaoEncontrado(`O autor com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndDelete(id);
      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NaoEncontrado(`O autor com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
