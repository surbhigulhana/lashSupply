  const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://surbhi:surbhi@123@cluster0.cqpb1y1.mongodb.net/Lash?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successfull");
  });
