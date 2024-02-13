const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("router form user . the data is here : ", req.body);
  return res.status(200).send("this is user router");
});

router.get("/delete", (req, res) => {
  return res.status(200).send("delete user");
});

module.exports = router;
