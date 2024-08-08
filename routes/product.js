const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const { getProduct, getProductID, postProduct, updateProduct, deleteProduct } = require("../controller/productcontroller");

 router.get("/", authenticateToken, getProduct);
 router.get("/:id", authenticateToken, getProductID);
 router.post("/", authenticateToken, postProduct);
 router.put("/:id", authenticateToken, updateProduct);
 router.delete("/:id", authenticateToken, deleteProduct);



module.exports = router;
