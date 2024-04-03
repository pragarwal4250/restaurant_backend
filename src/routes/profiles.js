const profilesController = require('../controllers/profiles')
const express = require('express');

const router = express.Router();

router.get('/profiles', profilesController.getProfiles);
router.post('/profiles', profilesController.postProfiles);

module.exports = router;