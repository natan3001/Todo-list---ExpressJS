const express = require("express");

const router = express.Router();

const Checklist = require("./../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res.status(500).render("pages/error", { err: "Erro ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", {
      checklist: checklist,
    });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { err: "Erro ao carregar o formulário" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { err: "Erro ao exibir a edição de tarefas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate("tasks");
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { err: "Erro ao exibir a lista de tarefas" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body.checklist;
  const checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("/checklists/new", { checklist: { ...checklist, error } });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);

  try {
    await checklist.updateOne({ name });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklists/edit", { checklist: { ...checklist, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { err: "Erro ao deletar a Lista de tarefas" });
  }
});

module.exports = router;
