const express = require('express');
 const router= express.Router();
 const controller = require('../controller/company');
 const userAuthentication = require('../middleware/auth');

 router.post('/companies',userAuthentication.authenticate,controller.createCompany);
 router.get('/companies',userAuthentication.authenticate,controller.getCompanies);



 router.delete('/companies/:id',userAuthentication.authenticate,controller.deleteCompany);
 
 module.exports = router;