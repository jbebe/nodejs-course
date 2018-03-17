const crypto = require('crypto');
const { CourseCode, AdminPassword } = require("../config");
const express = require('express');
const { PartialRenderAdminMW, RenderSingleTaskMW, RenderIndexMW, RenderTasksMW, RenderUploadMW } = require("../middlewares/render");
const site = express.Router();

site.get(['/', `/${CourseCode}`], PartialRenderAdminMW, RenderIndexMW);

site.get('/task/:id', PartialRenderAdminMW, RenderSingleTaskMW);

site.get('/tasks', PartialRenderAdminMW, RenderTasksMW);

site.get('/upload', PartialRenderAdminMW, RenderUploadMW);

module.exports = site;
