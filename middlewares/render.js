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
  console.log(res.locals);
  const template = {
    title: `${CourseCode}/info`,
    courseCode: CourseCode,
    content: res.locals.course.info,
    currentPage: 'info'
  };
  Object.assign(res.locals.template, template);
  res.render('info', res.locals.template);
};

/*
    Ez a MW rendereli ki a feladat értékelés oldalt.
 */
exports.RenderSingleTaskMW = function(req, res, next) {
  const taskId = req.param('id');
  const template = {
    title: `${CourseCode}/task ${taskId}`,
    courseCode: CourseCode,
    currentPage: 'singleTask',
    taskId: taskId,
    ratings: [
      {
        neptun: 'ABC123',
        isLate: true,
        result: 'OK',
        comment: 'S\'okay...'
      },
      {
        neptun: 'DEF456',
        isLate: false,
        result: 'BAD',
        comment: 'Not okay'
      },
      {
        neptun: 'ZXY123',
        isLate: false,
        result: 'OK',
        comment: ''
      }
    ]
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
    currentPage: 'tasks',
    tasks: [
      {
        name: 'Alapok',
        deadline: (new Date()).toJSON().slice(0,-5),
        id: 1,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the\n' +
        'industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and\n' +
        'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into\n' +
        'electronic typesetting, remaining essentially unchanged.'
      },
      {
        name: 'Fejlesztés',
        deadline: (new Date()).toJSON().slice(0,-5),
        id: 2,
        description: 'Fejlessz'
      },
      {
        name: 'Végleges',
        deadline: (new Date()).toJSON().slice(0,-5),
        id: 3,
        description: 'Add be.'
      }
    ]
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
    uploadStatus: req.query.status,
    tasks: [
      {
        id: 1,
        name: 'Alapok'
      },
      {
        id: 2,
        name: 'Fejlesztés'
      },
      {
        id: 3,
        name: 'Végleges'
      }
    ]
  };
  Object.assign(res.locals.template, template);
  res.render('upload', res.locals.template);
};