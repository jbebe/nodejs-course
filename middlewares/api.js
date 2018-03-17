const { validationResult } = require('express-validator/check');

exports.ValidateApiParamsMW = function(req, res, next){
  const error = validationResult(req);
  if (!error.isEmpty()){
    console.log(JSON.stringify(error.mapped()));
    res.status(404);
    res.json(error.mapped());
  } else {
    next();
  }
};

exports.InfoToDbMW = function(req, res, next){
  console.log('putting info content into db...');
  res.end();
};

exports.DeleteTaskMW = function(req, res, next){
  console.log('Deleting task ' + req.params.id + '...');
  res.end();
};

exports.UploadTaskParamsToDbMW = function(req, res, next){
  if (req.body.date){
    console.log(`Uploading date (${new Date(req.body.date)}) to DB...`);
  }
  if (req.body.title){
    console.log(`Uploading title (${req.body.title}) to DB...`);
  }
  res.end();
};

exports.UploadNewTaskToDbMW = function(req, res, next){
  console.log('Uploading to DB... ' + JSON.stringify(req.body));
  res.end();
};

exports.UploadSubmissionParamsToDbMW = function(req, res, next){
  if (req.body.late){
    console.log(`Uploading task (${req.params.id}) property: late (${req.body.late}) to DB...`);
  }
  if (req.body.rating){
    console.log(`Uploading task (${req.params.id}) property: rating (${req.body.rating}) to DB...`);
  }
  if (req.body.comment){
    console.log(`Uploading task (${req.params.id}) property: comment (${req.body.comment}) to DB...`);
  }
  res.end();
};