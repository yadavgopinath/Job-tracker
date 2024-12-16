
 const express = require('express');
const router = express.Router();
const reminderController = require('../controller/remmainder');
const userAuthentication = require('../middleware/auth');

// Create a new reminder
router.post('/createremainder',userAuthentication.authenticate,reminderController.createReminder);

module.exports = router;