const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://surbhi:surbhi123@ac-guim29i-shard-00-00.cqpb1y1.mongodb.net:27017,ac-guim29i-shard-00-01.cqpb1y1.mongodb.net:27017,ac-guim29i-shard-00-02.cqpb1y1.mongodb.net:27017/?ssl=true&replicaSet=atlas-1lh6jv-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successfull");
  });
