const { validationResult } = require('express-validator/check');

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
  console.log('putting info content into db...');
  res.end();
};

/*
    Ez a MW fogja törölnli a taskot a DB-ből.
 */
exports.DeleteTaskMW = function(req, res, next){
  console.log('Deleting task ' + req.params.id + '...');
  res.end();
};

/*
    Ez a MW ha talál egy felhasználható paramétert, akkor azt update-eli a DB-ben a task-ot.
    Emiatt nincs validálás, hiszen nem tudjuk előre, hogy melyik paramétert fogjuk a DB-be rakni.
 */
exports.UploadTaskParamsToDbMW = function(req, res, next){
  if (req.body.date){
    console.log(`Uploading date (${new Date(req.body.date)}) to DB...`);
  }
  if (req.body.title){
    console.log(`Uploading title (${req.body.title}) to DB...`);
  }
  res.end();
};

/*
    Egy teljes taszk létrehozása a DB-ben.
 */
exports.UploadNewTaskToDbMW = function(req, res, next){
  console.log('Uploading to DB... ' + JSON.stringify(req.body));
  res.end();
};

/*
    Ez az MW ha talál egy felhasználható paramétert, akkor update-eli a DB-ben a submission-t.
 */
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