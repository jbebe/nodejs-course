const { validationResult } = require('express-validator/check');

exports.ValidateUploadParamsMW = function(req, res, next){
  const error = validationResult(req);
  if (!error.isEmpty() || req.files.file === undefined){
    console.log(JSON.stringify(error.mapped()));
    res.redirect('/upload?status=error');
  } else {
    next();
  }
};

exports.ExportUploadParamsMW = function(req, res, next){
  res.locals.neptunCode = req.body.neptun;
  res.locals.taskName = req.body.task;
  res.locals.file = req.body.file;
  next();
};

exports.UploadToDbMW = function(req, res, next){
  console.log('uploading data to db...');
  res.redirect('/upload?status=ok');
};