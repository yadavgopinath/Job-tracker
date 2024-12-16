const express = require('express');
const  router = express.Router();
const controler = require('../controller/user');
const userAuthentication = require('../middleware/auth');

router.post('/signup',controler.addUsers);
router.post('/login',controler.userlogin);
router.get('/myprofile',userAuthentication.authenticate,controler.getProfile);
router.put('/myprofile',userAuthentication.authenticate,controler.updateProfile);


module.exports = router;
