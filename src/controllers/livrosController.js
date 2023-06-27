import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id).populate("autor", "nome").populate("editora").exec();
      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NaoEncontrado(`O livro com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livroResultado = livros.find(busca).populate("autor");
        if (livroResultado !== null) {
          req.resultado = livroResultado;
          next();
        } else {
          next(new NaoEncontrado(`O livro com ID ${req.params.id} não foi localizado`));
        }
      } else {
        res.status(200).json([]);
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livroStance = new livros(req.body);
      const livro = await livroStance.save();
      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NaoEncontrado(`O livro com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NaoEncontrado(`O livro com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findByIdAndDelete(id);
      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NaoEncontrado(`O livro com ID ${req.params.id} não foi localizado`));
      }
    } catch (err) {
      next(err);
    }
  };
}

async function processaBusca(paramentros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = paramentros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }
  return busca;
}

export default LivroController;
