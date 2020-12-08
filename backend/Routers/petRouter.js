const petController = require('../Controllers/petController')
const route = require('express').Router()
const upload= require('../middelwaire/upload')
    /* add pet and test db creation */
route.post('/add',petController.addPet)

    /* get all pets */
route.get('/getAllPets',petController.getAllPets)

    /* get pet by id */
route.get('/getPetById/:id',petController.getPetById)

    /* get pet by cat */
route.get('/getPetByCat/:categories',petController.getPetByCat)

    /* delete pet by id */
route.delete('/deletePetById/:id',petController.deletePetById)

    /* update pet by id */
route.put('/put/:id',upload.single('image'),petController.updatePetById)

/* upload file  */
route.post('/addPetWithImage',upload.single('image'),petController.create)

module.exports=route