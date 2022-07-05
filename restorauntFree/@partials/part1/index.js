const app = require("./server");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const url = process.env.RESTREVIEWS_DB_URI;
const port = process.env.PORT || 8000;
const RestaurantsDAO = require("./dataAccesObject/restaurantsDAO");

MongoClient.connect(url, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
      console.log("connected");
    });
  });
