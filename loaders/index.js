const app = require("./server");
const db = require("./db");

const http = require("http");
const server = http.createServer(app);

module.exports = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });

  db();
};
