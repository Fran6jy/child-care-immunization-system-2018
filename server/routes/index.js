const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const ControllerPolicy = require("../policies/ControllerPolicy");
const jwt = require("jsonwebtoken");
const appdetails = require("../config/appdetails");
const FunctionController = require("../controllers/FunctionController");
const moment = require('moment');
const Admin = require('../models/adminModel');
const DataController = require('../controllers/DataController');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Immu BackEnd" });
  console.log('Lets get started');
});

router.get("/api", function (req, res, next) {
    res.send({msg: "hello world"});
})

//adminlogin
router.post("/api/adminlogin", AuthController.adminLogin);

//getChildNo
router.get("/api/getchildno", DataController.getChildNo);

//getParentNo
router.get("/api/getparentno", DataController.getParentNo);

//getImmuNo
router.get("/api/getimmuno", DataController.getImmunizationNo); 

//getActiveImmuNo
router.get("/api/getactiveimmuno", DataController.getActiveImmunizationNo); 

//getChild
router.get("/api/getchild", DataController.getChild);

//getParent
router.get("/api/getparent", DataController.getParent);

//getImmu
router.get("/api/getimmu", DataController.getImmunization);

//route middleware to authenticate and check token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-auth"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    try {
      var decoded = jwt.verify(token, appdetails.jwtSecret);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token."
      });
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

//add parents
router.post("/api/addparents", FunctionController.createParent);
//add child
router.post("/api/addchild", FunctionController.createChild);
//add immu
router.post("/api/addimmu", FunctionController.createImmu);

//link immu
router.post("/api/linkimmu", FunctionController.linkImmu);

//checking explicitly
router.get("/api/check", function(req, res) {
  res.json(req.decoded);
});

//protected routes
router.get("/api/standard", function(req, res) {
  res.send("standard");
});

//registeradmin
router.post(
  "/api/registeradmin",
  ControllerPolicy.registerAdmin,
  AuthController.registerAdmin
);

//admin-update-pass
router.post(
  "/api/adminpassupdate",
  ControllerPolicy.adminPassUpdate,
  AuthController.adminPassUpdate
);

module.exports = router;
