const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost/todo-list")
  .then(() => console.log("Conectado ao mongoDB"))
  .catch((err) => console.error(err));
