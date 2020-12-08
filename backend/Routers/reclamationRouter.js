const reclamationController = require('../Controllers/reclamationController')
const route = require('express').Router()

    /* add reclamation and test db creation */
route.post('/add',reclamationController.addrecl)

    /* get all reclamations */
route.get('/getAllRecs',reclamationController.getAllRecs)

    /* get reclamation by id */
route.get('/getReclById/:id',reclamationController.getReclById)

    /* delete reclamation by id */
route.delete('/deleteReclById/:id',reclamationController.deleteReclById)

    /* update reclamation by id */
route.put('/put/:id',reclamationController.updateReclById)


module.exports=route