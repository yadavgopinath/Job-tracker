const express = require('express');
 const router= express.Router();
 const controller = require('../controller/application');
 const userAuthentication = require('../middleware/auth');

 router.post('/applications',userAuthentication.authenticate,controller.addApplication);
 router.get('/applications',userAuthentication.authenticate,controller.getApplications);



 router.delete('/applications/:id',userAuthentication.authenticate,controller.deleteApplication);
 
 module.exports = router;