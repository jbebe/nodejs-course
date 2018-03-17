const { validationResult } = require('express-validator/check');

/*
    Ez a MW validálja a feltöltéshez szükséges paramétereket
    és közben ellenőrzi a file paramétert is.
    A files-t nem nézi meg az express-validator, ezért kell kézzel megtenni.
 */
exports.ValidateUploadParamsMW = function(req, res, next){
  const error = validationResult(req);
  if (!error.isEmpty() || req.files.file === undefined){
    console.log(JSON.stringify(error.mapped()));
    res.redirect('/upload?status=error');
  } else {
    next();
  }
};

/*
    Ez a MW exportálja ki a változókat a http kérésből.
 */
exports.ExportUploadParamsMW = function(req, res, next){
  res.locals.neptunCode = req.body.neptun;
  res.locals.taskName = req.body.task;
  res.locals.file = req.body.file;
  next();
};

/*
    Ez a MW tölti fel a DB-be a feltöltés paramétereit.
 */
exports.UploadToDbMW = function(req, res, next){
  console.log('uploading data to db...');
  res.redirect('/upload?status=ok');
};