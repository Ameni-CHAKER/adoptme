const categoryController = require('../Controllers/categoryController')
const route = require('express').Router()

    /* add category and test db creation */
route.post('/add',categoryController.addCategory)

    /* get all Categories */
route.get('/getAllCategories',categoryController.getAllCategories)

 /* get all Categories */
 route.get('/getAllCategoriesNames',categoryController.getAllCategoriesNames)


    /* delete Category by id */
route.delete('/delete/:id',categoryController.deleteCategoryById)

    /* update Category by id */
route.put('/put/:id',categoryController.updateCategoryById)


module.exports=route