const express = require('express');
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();
server.use(express.json());
server.use('/api/projects', projectsRouter);

module.exports = server;