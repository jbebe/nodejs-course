const { validationResult } = require('express-validator/check');
const { Submission, Task } = require('./../db');
const path = require('path');
const { CourseCode } = require("../config");

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
  res.locals.file = req.files.file;
  next();
};

/*
    Ez a MW tölti fel a DB-be a feltöltés paramétereit.
 */
exports.UploadToDbMW = function(req, res, next){
  console.log('uploading data to db...');
  const dir = path.join(__dirname, '..', 'submissions');
  const extension = res.locals.file.name.match(/((?:\.[^.]+)?\.[^.]+)$/g)[0];
  const filePath = path.join(
    dir,
    `${CourseCode}-${res.locals.taskName}-${res.locals.neptunCode}${extension}`
  );
  res.locals.file.mv(filePath, function(err){
    if (err){
      return res.status(500).send(err);
    } else {
      const submission = new Submission({
        path: `/api/upload/${res.locals.taskName}/${res.locals.neptunCode}`,
        neptun: res.locals.neptunCode,
        late: false,
        rating: 'Bad',
        comment: 'No comment yet',
        task: res.locals.taskName
      });
      submission.save();
      res.redirect('/upload?status=ok');
    }
  });
};