const connectDb = require("./apis/events/DB/databases");
const express = require("express");
const eventRoutes = require("./apis/events/routes");

const app = express();

app.use(express.json());
app.use("/api/events", eventRoutes);
connectDb();

const port = 8000;
app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});
