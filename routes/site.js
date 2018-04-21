const crypto = require('crypto');
const { CourseCode, AdminPassword } = require("../config");
const express = require('express');
const { DbLoadIndex, DbLoadTasks } = require("../middlewares/database");
const { PartialRenderMenuMW, PartialRenderAdminMW, RenderSingleTaskMW, RenderIndexMW, RenderTasksMW, RenderUploadMW } = require("../middlewares/render");
const site = express.Router();

site.get(['/', `/${CourseCode}`], DbLoadIndex, DbLoadTasks, PartialRenderMenuMW, PartialRenderAdminMW, RenderIndexMW);

site.get('/task/:id', DbLoadTasks, PartialRenderMenuMW, PartialRenderAdminMW, RenderSingleTaskMW);

site.get('/tasks', DbLoadTasks, PartialRenderMenuMW, PartialRenderAdminMW, RenderTasksMW);

site.get('/upload', DbLoadTasks, PartialRenderMenuMW, PartialRenderAdminMW, RenderUploadMW);

module.exports = site;
