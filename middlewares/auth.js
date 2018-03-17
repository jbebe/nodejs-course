const crypto = require('crypto');
const { CourseCode, AdminPassword } = require("../config");

const PassHash = crypto.createHmac('sha256', AdminPassword).digest('hex');

exports.ApiLoginAdminMW = function(req, res, next) {
  const reqPassword = req.body.password;
  if (reqPassword === AdminPassword){
    res.cookie('admin-pass', PassHash);
    console.log(`admin hash set in cookie: ${PassHash}`);
  } else {
    res.status(404);
  }
  res.end();
};

exports.ApiLogoutAdminMW = function(req, res, next) {
  res.clearCookie('admin-pass');
  res.end();
};

exports.AdminApiWallMW = function(req, res, next){
  const adminHash = req.cookies['admin-pass'];
  if (adminHash !== PassHash){
    res.status(404);
    res.end();
  }
  next();
};