
const customerController = require('../Controllers/customerController')

const route = require('express').Router()

    /* add customer and test db creation */
route.post('/add',customerController.addCustomer)

    /* get all customers */
route.get('/getAllCustomers',customerController.getAllCustomers)

    /* get customer by id */
route.get('/getCustomerById/:id',customerController.getCustomerById)

    /* delete customer by id */
route.delete('/deleteCustomerById/:id',customerController.deleteCustomerById)

    /* update customer by id */
route.put('/put/:id',customerController.updateCustomerById)



module.exports=route