const express = require('express');
const { set } = require('mongoose');
const router = express.Router();
const {
    getSecrets,
    getHearsay, 
    setSecret, 
    updateSecret, 
    deleteSecret
    } = require('../controllers/secretsController');

const {protect} = require('../middleware/authMiddleware')

router.route("/").get(protect, getSecrets).post(protect, setSecret)

router.route("/:id").put(protect, updateSecret).delete(protect, deleteSecret)

router.route('/hearsay').get(getHearsay)

module.exports = router