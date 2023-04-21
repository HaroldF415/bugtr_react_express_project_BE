// DEPENDENCIES
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
