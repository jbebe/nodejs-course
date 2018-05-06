const crypto = require('crypto');
const { CourseCode, AdminPassword } = require("../config");

const adminPasswordHash = crypto.createHmac('sha256', AdminPassword).digest('hex');

exports.PartialRenderMenuMW = function(req, res, next){
  res.locals.template = res.locals.template || {};
  Object.assign(res.locals.template, { tasks: res.locals.tasks });
  next();
};

/*
    Ez a MW adja hozzá az ejs behelyettesítésekhez az admin kapcsolót.
 */
exports.PartialRenderAdminMW = function(req, res, next){
  const isAdmin = ('admin-pass' in req.cookies) && req.cookies['admin-pass'] === adminPasswordHash;
  res.locals.template = res.locals.template || {};
  Object.assign(res.locals.template, { isAdmin: isAdmin });
  next();
};

/*
    Ez a MW rendereli ki az index oldalt.
 */
exports.RenderIndexMW = function(req, res, next){
  const template = {
    title: `${CourseCode}/info`,
    courseCode: CourseCode,
    content: res.locals.course.info || "&gt;empty&lt;",
    currentPage: 'info'
  };
  Object.assign(res.locals.template, template);
  res.render('info', res.locals.template);
};

/*
    Ez a MW rendereli ki a feladat értékelés oldalt.
 */
exports.RenderSingleTaskMW = function(req, res, next) {
  const taskId = req.params.id;
  const template = {
    title: `${CourseCode}/task ${taskId}`,
    courseCode: CourseCode,
    currentPage: 'singleTask',
    taskId: taskId
  };
  Object.assign(res.locals.template, template);
  res.render('singleTask', res.locals.template);
};

/*
    Ez a MW rendereli ki a feladatkiírások odlalát.
 */
exports.RenderTasksMW = function(req, res, next) {
  const template = {
    title: `${CourseCode}/tasks`,
    courseCode: CourseCode,
    currentPage: 'tasks'
  };
  Object.assign(res.locals.template, template);
  res.render('tasks', res.locals.template);
};

/*
    Ez a MW rendereli ki a feltöltő oldalt.
 */
exports.RenderUploadMW = function(req, res, next) {
  const template = {
    title: `${CourseCode}/upload`,
    courseCode: CourseCode,
    currentPage: 'upload',
    uploadStatus: req.query.status
  };
  Object.assign(res.locals.template, template);
  res.render('upload', res.locals.template);
};