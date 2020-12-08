const ownerController = require('../Controllers/ownerController')
const route = require('express').Router()

    /* add owner and test db creation */
route.post('/add',ownerController.addOwner)

    /* get all owners */
route.get('/getAllPets',ownerController.getAllOwners)

    /* get owner by id */
route.get('/getPetById/:id',ownerController.getOwnerById)

    /* delete owner by id */
route.delete('/deletePetById/:id',ownerController.deleteOwnerById)

    /* update owner by id */
route.put('/put/:id',ownerController.updateOwnerById)



module.exports=route