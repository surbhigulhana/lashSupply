var multer = require("multer");
var uniqid = require("uniqid");

const serverPath = multer.diskStorage({
    destination: function(req, file, path){
        path(null, "public/uploads");
    },
    filename: function(req, filename, path){
        const name = uniqid() + "." + filename.originalname.substring(filename.originalname.indexOf("."));
        req.body.myfilename = name;
        path(null, name);
    },
    
  
    

})

var upload = multer({storage: serverPath});

module.exports = upload;











