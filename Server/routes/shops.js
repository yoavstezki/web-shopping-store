const express = require('express');
const router = express.Router();

router.get('/list',(req,res,next) => {
    console.log("Server - get  shops/list");
    res.send("shops - get");
});

module.exports = router;
