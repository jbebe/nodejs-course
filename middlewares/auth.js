const crypto = require('crypto');
const { AdminPassword } = require("../config");

const PassHash = crypto.createHmac('sha256', AdminPassword).digest('hex');

/*
    Ez a MW állítja be sütiként, hogy a felhasználó mostantól admin jogot kap.
 */
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

/*
    Ez a MW veszi el az admin jogosultságot.
 */
exports.ApiLogoutAdminMW = function(req, res, next) {
  res.clearCookie('admin-pass');
  res.end();
};

/*
    Ez a MW api hívásoknál állítja meg azokat, akiknek nincs admin jogosultságuk.
 */
exports.AdminApiWallMW = function(req, res, next){
  const adminHash = req.cookies['admin-pass'];
  if (adminHash !== PassHash){
    res.status(404);
    res.end();
  }
  next();
};