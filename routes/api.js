const AdminPassword = require("../config").AdminPassword;
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.post('/admin', function(req, res, next) {
  const reqPassword = req.body.password;
  if (reqPassword === AdminPassword){
    const passHash = crypto.createHmac('sha256', AdminPassword).digest('hex');
    res.cookie('admin-pass', passHash);
    console.log(`admin hash set in cookie: ${passHash}`);
    res.status(200);
  } else {
    res.status(404);
  }
  res.end();
});

router.delete('/admin', function(req, res, next) {
  res.clearCookie('admin-pass');
  res.end();
});

module.exports = router;
