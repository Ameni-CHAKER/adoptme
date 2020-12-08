const requestController = require('../Controllers/requestController')
const route = require('express').Router()

    /* add request and test db creation */
route.post('/add',requestController.addReq)

    /* get all requests */
route.get('/getAllReq',requestController.getAllReq)

    /* get request by id */
route.get('/getReqById/:id',requestController.getReqById)

    /* delete request by id */
route.delete('/deleteReqById/:id',requestController.deleteReqById)

    /* update request by id */
route.put('/put/:id',requestController.updateReqById)


module.exports=route