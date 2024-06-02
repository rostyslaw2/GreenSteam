const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
