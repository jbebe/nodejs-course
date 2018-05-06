const express = require('express');
const { check } = require('express-validator/check');

const {
  ExportUploadParamsMW,
  ValidateUploadParamsMW,
  ValidateUploadDeadlineMW,
  UploadToDbMW
} = require("../middlewares/upload");
const {
  ApiLoginAdminMW,
  ApiLogoutAdminMW,
  AdminApiWallMW
} = require("../middlewares/auth");
const {
  InfoToDbMW,
  ValidateApiParamsMW,
  DeleteTaskMW, UploadTaskParamsToDbMW,
  UploadNewTaskToDbMW,
  UploadSubmissionParamsToDbMW,
  DownloadSubmissionMW
} = require("../middlewares/api");

const api = express.Router();

api.post('/admin', ApiLoginAdminMW);

api.delete('/admin', ApiLogoutAdminMW);

api.get('/upload/:task/:neptun',
  DownloadSubmissionMW
);

api.post('/upload',
  [
    check('neptun').matches(/^[a-zA-Z\d]{6}$/),
    check('task').isInt()
  ],
  ValidateUploadDeadlineMW,
  ValidateUploadParamsMW,
  ExportUploadParamsMW,
  UploadToDbMW
);

api.put('/info', [check('content').exists()],
  AdminApiWallMW,
  ValidateApiParamsMW,
  InfoToDbMW
);

api.delete('/task/:id', [check('id').exists()],
  AdminApiWallMW,
  ValidateApiParamsMW,
  DeleteTaskMW
);

api.put('/task/:id',
  AdminApiWallMW,
  UploadTaskParamsToDbMW
);

api.post('/task',
  [
    check('title').exists(),
    check('date').exists(),
    check('description').exists()
  ],
  AdminApiWallMW,
  ValidateApiParamsMW,
  UploadNewTaskToDbMW
);

api.put('/submission/:taskId',
  AdminApiWallMW,
  UploadSubmissionParamsToDbMW
);

module.exports = api;
