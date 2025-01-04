const express = require('express');
const { Create, FetchAll, FetchId, Delete, DeleteId, Update } = require('../controller/contactcontroller');
const upload = require('../middleware/contactmiddel');

const route = express.Router();

route.post('/create',upload, Create);
route.get('/getall', FetchAll);
route.get('/getId/:id', FetchId);
route.delete('/delall', Delete);
route.delete('/delId/:id', DeleteId);
route.put('/update/:id',upload, Update);

module.exports = route;
