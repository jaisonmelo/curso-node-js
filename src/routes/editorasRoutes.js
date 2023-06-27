import express from "express";
import EditoraController from "../controllers/editorasController.js";

const router = express.Router();

router.get("/editoras", EditoraController.listarEditoras);
router.get("/editoras/:id", EditoraController.listarEditoraPorId);
router.post("/editoras", EditoraController.cadastrarEditora);
router.put("/editoras/:id", EditoraController.atualizarEditora);
router.delete("/editoras/:id", EditoraController.deletarEditora);

export default router;
