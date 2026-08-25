const app = require("./app.cjs");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mini Message Board is running at http://localhost:${PORT}`);
});
