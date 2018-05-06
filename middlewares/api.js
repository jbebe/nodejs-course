const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator/check');
const {Task, Submission, Course} = require('../database/schema');
const { CourseCode } = require("../config");

/*
    Ez a MW validálja a bejövő paramétereket a route-on megadott constraint-ek alapján.
    Ha nincs kitöltve egy paraméter, akkor hibával visszatérünk,
    ellenkező esetben tovább adja a futást a függvény.
 */
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

/*
    Ez a MW fog gondoskodni a biztosan elérhető 'info' paraméter DB-be kerüléséről.
 */
exports.InfoToDbMW = function(req, res, next){
  Course.update({ _id: CourseCode }, { $set: { info: req.body.content } }, console.log);
  console.log('putting info content into db');
  res.end();
};

/*
    Ez a MW fogja törölnli a taskot a DB-ből.
 */
exports.DeleteTaskMW = function(req, res, next){
  console.log('Deleting task ' + req.params.id + ' and its submissions...');
  Submission.remove({ task: req.params.id }).exec();
  Task.remove({ _id: req.params.id }).exec();
  res.end();
};

/*
    Ez a MW ha talál egy felhasználható paramétert, akkor azt update-eli a DB-ben a task-ot.
    Emiatt nincs validálás, hiszen nem tudjuk előre, hogy melyik paramétert fogjuk a DB-be rakni.
 */
exports.UploadTaskParamsToDbMW = function(req, res, next){
  const taskId = req.params.id;
  if (req.body.date){
    console.log(`Uploading date (${new Date(req.body.date)}) to DB...`);
    Task.update({ _id: taskId }, { $set: { deadline: req.body.date } }, console.log);
  }
  if (req.body.title){
    console.log(`Uploading title (${req.body.title}) to DB...`);
    Task.update({ _id: taskId }, { $set: { name: req.body.title } }, console.log);
  }
  res.end();
};

/*
    Egy teljes taszk létrehozása a DB-ben.
 */
exports.UploadNewTaskToDbMW = function(req, res, next){
  console.log('Uploading to DB... ' + JSON.stringify(req.body));
  Task.find().sort({ _id: -1 }).limit(1).exec((err, maxTask) =>{
    if (err){
      res.json(err);
      return;
    }
    const maxId = +((maxTask[0] || { _id: -1 })._id);
    console.log('max id: ' + JSON.stringify(maxId));
    const id = maxId + 1;
    console.log('Id for next task is: ' + id);
    const task = new Task({
      _id: id,
      name: req.body.title,
      deadline: req.body.date,
      description: req.body.description,
      submissions: [],
      course: CourseCode
    });
    task.save().catch(console.log);
    res.end();
  });
};

/*
    Ez az MW ha talál egy felhasználható paramétert, akkor update-eli a DB-ben a submission-t.
 */
exports.UploadSubmissionParamsToDbMW = function(req, res, next){
  console.log('Changing submission...');
  const taskId = req.params.taskId;
  const neptunId = req.body.neptun;
  if (req.body.late !== undefined){
    console.log(`Uploading task (${req.params.taskId}) property: late (${req.body.late}) to DB...`);
    Submission.update({ task: taskId, neptun: neptunId }, { $set: { late: req.body.late } }).exec();
  }
  if (req.body.rating !== undefined){
    console.log(`Uploading task (${req.params.taskId}) property: rating (${req.body.rating}) to DB...`);
    Submission.update({ task: taskId, neptun: neptunId }, { $set: { rating: req.body.rating } }).exec();
  }
  if (req.body.comment !== undefined){
    console.log(`Uploading task (${req.params.taskId}) property: comment (${req.body.comment}) to DB...`);
    Submission.update({ task: taskId, neptun: neptunId }, { $set: { comment: req.body.comment } }).exec();
  }
  res.end();
};

exports.DownloadSubmissionMW = function(req, res, next){
  const taskName = req.params.task;
  const neptunCode = req.params.neptun;
  const dir = path.join(__dirname, '..', 'submissions');
  fs.readdir(dir, (err, files) => {
    console.log(err);
    const file = files.find((fileName) =>
      fileName.indexOf(`${CourseCode}-${taskName}-${neptunCode}`) === 0
    );
    if (file){
      res.sendFile(path.join(dir, file), {
        headers: {
          'Content-Disposition': `attachment; filename="${file}"`
        }
      });
    } else {
      res.status(404).send({
        error: `Cannot find file! (${dir}\\${CourseCode}-${taskName}-${neptunCode}.ext)`,
        files: files.join(', ')
      });
    }
  });
};