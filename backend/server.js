import express from "express";

const app = express();
const PORT = 5050;

app.get("/", (req, res) => {
  res.send("NhatHuy");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
