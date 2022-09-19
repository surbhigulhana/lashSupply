var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
var upload = require("../config/multer");
const dbConnection = require("../config/dbConnection");
const registration = require("../models/registration");
const attribute = require("../models/attribute");
const category = require("../models/category");
const product = require("../models/Product");
const productData = require("../models/AllProduct");
const Type = require("../models/attributeType");
const Discount =require("../models/Coupon")
const Order =require("../models/Order")
const jwt = require("jsonwebtoken");
const Inquiry =require("../models/Inquiry");
const Ticket =require("../models/Ticket")
const Payment =require("../models/Payment")
const { passwordChangingMail } = require("../mailing");
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// --------------------------------------------------user login signup gorgot---------------
router.post(
  "/api/userRegister",
  upload.single("filename"),
  async function (req, res) {
    const { firstname, Lastname, Phone, email, Password, myfilename } =
      req.body;
    try {
      const hashPassword = await bcrypt.hash(Password, 10);
      const user = registration({
        firstname: firstname,
        Lastname: Lastname,
        Phone: Phone,
        email: email,
        Password: hashPassword,
        filename: myfilename,
      });
      const data = await user.save();
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.post("/api/userlogin", async (req, resp) => {
  try {
    const { email, Password } = req.body;
    if (email && Password) {
      const regUser = await registration.findOne({ email: email });
      if (regUser != null) {
        const isMatch = await bcrypt.compare(Password, regUser.Password);
        if (regUser.email === email && isMatch) {
          ////jwt
          const token = jwt.sign(
            { userID: regUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          /////////////
          resp.send({
            status: "success",

            data: regUser,
            message: "Login Successful",
            token: token,
          });
        } else {
          resp.send({ status: "failed", message: "id or password not valid" });
        }
      } else {
        resp.send({ status: "failed", message: "id not found" });
      }
    } else {
      resp.send({ status: "failed", message: "enter data first" });
    }
  } catch (error) {
    console.log("Error: ", error);
    resp.send({ status: "failed", message: "unable to login" });
  }
});

router.get("/api/sendforgotmail/:email", async (req, res) => {
  try {
    const email1 = req.params.email;
    console.log("hii", email1);
    const result = await passwordChangingMail(email1);
    if (result) res.status(200).json(true);
    else res.status(400).json(false);
  } catch (err) {
    console.log(err);
    res.status(500).json(false);
  }
});

router.post("/api/changepassword", async function (req, res) {
  const { email, Password } = req.body;
  try {
    const userData = await registration.find({ email: email });
    if (userData.length) {
      const hashPassword = await bcrypt.hash(Password, 10);
      await registration.findOneAndUpdate(
        {
          email: email,
        },
        {
          $set: {
            Password: hashPassword,
          },
        }
      );
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, err: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err: err });
  }
});

router.put("/api/updateuser", async function (req, res) {
  const { firstname, Lastname, Phone, email,Status } = req.body;
  try {
    const user = await registration.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          firstname: firstname,
          Lastname: Lastname,
          Phone: Phone,
          Status:Status
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

// router.post("/api/EmailVerify", async (req, resp) => {
//   try {
//     const { email } = req.body;
//     if (email) {
//       const regUser = await registration.findOne({ email: email });
//       if (regUser != null) {

//         if (regUser.email === email) {
//           resp.send({
//             status: "success",
//             data: regUser,
//             message: "Email valid",

//           });
//         } else {
//           resp.send({ status: "failed", message: "email not valid" });
//         }
//       } else {
//         resp.send({ status: "failed", message: "email not valid" });
//       }
//     } else {
//       resp.send({ status: "failed", message: "enter data first" });
//     }
//   } catch (error) {
//     console.log("Error: ", error);
//     resp.send({ status: "failed" });
//   }
// });
router.get("/getuser", async (req, resp) => {
  let result = await registration.find();
  resp.send(result);
});
router.get("/Blocked", async (req, resp) => {
  let result = await registration.find({Status:"Blocked"});
  resp.send(result);
});

router.delete("/deleteUser/:_id", async (req, resp) => {
  let result = await registration.deleteOne(req.params);
  resp.send(result);
});

router.put("/user/:_id", async (req, resp) => {
  let result = await registration.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});
// -----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------------

// ---------------------------------category------------------------

router.post(
  "/api/category",
  upload.single("filename"),
  async function (req, res) {
    const { CateName, desc } = req.body;
    try {
      const result1 = new category({
        CateName: CateName,
        desc: desc,
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/category", async (req, resp) => {
  let result = await category.find();
  resp.send(result);
});

router.delete("/category/:_id", async (req, resp) => {
  let result = await category.deleteOne(req.params);
  resp.send(result);
});
router.put("/category/:_id", async (req, resp) => {
  let result = await category.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post(
  "/api/attribute",
  upload.single("filename"),
  async function (req, res) {
    const { AttributeName } = req.body;
    try {
      const result1 = new attribute({
        AttributeName: AttributeName,
      });
      console.log(result1);
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/attribute", async (req, resp) => {
  let result = await attribute.find();
  resp.send(result);
});

router.get("/MoreAttribute/:AttributeName", async (req, resp) => {
  try {
    const id = req.params.AttributeName;
    console.log("hello", id);
    let result = await attribute.find({ AttributeName: id });
    console.log(result);
    resp.status(200).send(result);
  } catch (err) {
    console.log("err : ", err);
    resp.status(400).json(err);
  }
});

router.delete("/attribute/:_id", async (req, resp) => {
  let result = await attribute.deleteOne(req.params);
  resp.send(result);
});
router.put("/attribute/:_id", async (req, resp) => {
  let result = await attribute.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post("/api/Type", upload.single("filename"), async function (req, res) {
  const { AttributeName, AttributeType } = req.body;
  try {
    const result1 = new Type({
      AttributeName: AttributeName,
      AttributeType: AttributeType,
    });
    console.log(result1);
    const data = await result1.save();
    console.log(data);
    res.status(200).json({ success: true, data: result1 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
router.get("/Type", async (req, resp) => {
  let result = await Type.find();
  resp.send(result);
});

router.get("/More/:AttributeName", async (req, resp) => {
  try {
    const id = req.params.AttributeName;
    console.log("hello", id);
    let result = await Type.find({ AttributeName: id });
    console.log(result);
    resp.status(200).send(result);
  } catch (err) {
    console.log("err : ", err);
    resp.status(400).json(err);
  }
});

router.delete("/Type/:_id", async (req, resp) => {
  let result = await Type.deleteOne(req.params);
  resp.send(result);
});
router.put("/attribute/:_id", async (req, resp) => {
  let result = await attribute.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});

router.get("/display/:id", async (req, res) => [
  Type.find({ AttributeName: req.params.id })
    .populate("AttributeType")
    .exec((err, response) => {
      if (err) console.log(err);
      res.send(response);
    }),
]);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// --------------------------------product-------------------------------
router.post(
  "/api/product",
  upload.single("filename"),
  async function (req, res) {
    const { Name } = req.body;
    try {
      const result1 = new product({
        Name: Name,
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/product", async (req, resp) => {
  let result = await product.find();
  resp.send(result);
});
router.delete("/product/:_id", async (req, resp) => {
  let result = await product.deleteOne(req.params);
  resp.send(result);
});
router.put("/product/:_id", async (req, resp) => {
  let result = await product.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// ---------------------------------------------product data----------------

router.post(
  "/api/productData",
  upload.single("filename"),
  async function (req, res) {
    const {
      Name,
      Desc,
      CateName,
      MinPrice,
      MaxPrice,
      SkuNo,
      AttributeName,
      AttributeType,
      Price,
      Inventory,
      myfilename,
    } = req.body;
    try {
      const result1 = new productData({
        Name: Name,
        Desc: Desc,
        CateName: CateName,
        MinPrice: MinPrice,
        MaxPrice: MaxPrice,
        SkuNo: SkuNo,
        AttributeName: AttributeName,
        AttributeType: AttributeType,
        Price: Price,
        Inventory: Inventory,
        filename: myfilename,
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/productData", async (req, resp) => {
  let result = await productData.find();
  resp.send(result);
});
router.get("/MoreData/:Name", async (req, resp) => {
  try {
    const id = req.params.Name;
    console.log("hello", id);
    let result = await productData.find({ Name: id });
    console.log(result);
    resp.status(200).send(result);
  } catch (err) {
    console.log("err : ", err);
    resp.status(400).json(err);
  }
});
router.delete("/productData/:_id", async (req, resp) => {
  let result = await productData.deleteOne(req.params);
  resp.send(result);
});
// router.put('/productData/:_id',upload.single("filename"),async (req,resp)=>{
//   let result = await productData.updateOne(req.params,{$set:req.body});
//   console.log(req.params);
//   resp.send(result);
// })

router.post(
  "/productData/:_id",
  upload.single("filename"),
  async (req, resp) => {
    const {  Name,
      Desc,
      CateName,
      MinPrice,
      MaxPrice,
      SkuNo,
      AttributeName,
      AttributeType,
      Price,
      Inventory,
      myfilename,} = req.body;
    let result = await productData.updateOne(req.params, {
      $set: {Name:Name,
        Desc:Desc,
        MinPrice:MinPrice,
        MaxPrice:MaxPrice,
        Price:Price,
        SkuNo:SkuNo,
        AttributeName:AttributeName,
        AttributeType:AttributeType,Inventory:Inventory,
         filename: myfilename ,CateName:CateName},
    });
    console.log(req.params);
    resp.send(result);
  }
);
//----------------------------------------------------------------------------------

// --------------------------------discount-------------------------------
router.post(
  "/api/discount",
  upload.single("filename"),
  async function (req, res) {
    const { CouponName,CouponType,DiscountPercent,DiscountAmt,CartValue } = req.body;
    try {
      const result1 = new Discount({
        CouponName: CouponName,
        CouponType:CouponType,
        DiscountPercent:DiscountPercent,
        DiscountAmt:DiscountAmt,
        CartValue:CartValue
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/discount", async (req, resp) => {
  let result = await Discount.find();
  resp.send(result);
});
router.delete("/discount/:_id", async (req, resp) => {
  let result = await Discount.deleteOne(req.params);
  resp.send(result);
});
router.put("/discount/:_id", async (req, resp) => {
  let result = await Discount.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});
// --------------------------------order-------------------------------
router.post(
  "/api/order",
  upload.single("filename"),
  async function (req, res) {
    const {Pname,UserName,Phone,PurchaseDate,TotalAmt,ShipAdd,BillingAdd,myfilename,Status} = req.body;
    try {
      const result1 = new Order({
    Pname:Pname,
    UserName:UserName,
    PurchaseDate:PurchaseDate,
    Phone:Phone,
    ShipAdd:ShipAdd,
    BillingAdd:BillingAdd,
    filename:myfilename,
    Status:Status,
    TotalAmt:TotalAmt
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/order", async (req, resp) => {
  let result = await Order.find();
  resp.send(result);
});
router.get("/MoreOrder/:UserName", async (req, resp) => {
  try {
    const id = req.params.UserName;
    console.log("hello", id);
    let result = await Order.find({ UserName: id });
    console.log(result);
    resp.status(200).send(result);
  } catch (err) {
    console.log("err : ", err);
    resp.status(400).json(err);
  }
});
router.get("/pendingOrder", async (req, resp) => {
  let result = await Order.find({Status:"Pending"});
  resp.send(result);
});
router.get("/completeOrder", async (req, resp) => {
  let result = await Order.find({Status:"Completed"});
  resp.send(result);
});
router.delete("/order/:_id", async (req, resp) => {
  let result = await Order.deleteOne(req.params);
  resp.send(result);
});
router.put("/order/:_id", async (req, resp) => {
  let result = await Order.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});
//-----------------------------------------------------------------------------
router.post(
  "/api/Inquiry",
  upload.single("filename"),
  async function (req, res) {
    const { UserName,UserEmail,Phone,Message } = req.body;
    try {
      const result1 = new Inquiry({
 UserName:UserName,
 UserEmail:UserEmail,
 Phone:Phone,
 Message:Message      
 
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/Inquiry", async (req, resp) => {
  let result = await Inquiry.find();
  resp.send(result);
});

router.delete("/Inquiry/:_id", async (req, resp) => {
  let result = await Inquiry.deleteOne(req.params);
  resp.send(result);
});

//---------------------------------------------------------------------------------
router.post(
  "/api/ticket",
  upload.single("filename"),
  async function (req, res) {
    const {Tnumber,UserName,UserEmail,Phone,Issue,Status} = req.body;
    try {
      const result1 = new Ticket({
    Tnumber:Tnumber,
    UserName:UserName,
   UserEmail:UserEmail,
    Phone:Phone,
  Issue:Issue,
    Status:Status
  
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/ticket", async (req, resp) => {
  let result = await Ticket.find();
  resp.send(result);
});


router.delete("/ticket/:_id", async (req, resp) => {
  let result = await Ticket.deleteOne(req.params);
  resp.send(result);
});
router.put("/ticket/:_id", async (req, resp) => {
  let result = await Ticket.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});
//---------------------------------------------------------------------------------
router.post(
  "/api/payment",
  upload.single("filename"),
  async function (req, res) {
    const { Pname, UserEmail, PurchaseDate, Mode, TotalAmt, Status } = req.body;
    try {
      const result1 = new Payment({
        Pname: Pname,
        UserEmail: UserEmail,
        Mode: Mode,
        PurchaseDate: PurchaseDate,
        TotalAmt: TotalAmt,
        Status: Status,
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);
router.get("/payment", async (req, resp) => {
  let result = await Payment.find();
  resp.send(result);
});

router.delete("/payment/:_id", async (req, resp) => {
  let result = await Payment.deleteOne(req.params);
  resp.send(result);
});
router.put("/payment/:_id", async (req, resp) => {
  let result = await Payment.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});

module.exports = router;
