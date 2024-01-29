const express = require('express')
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imagereducer} = require('../controllers/fileupload')

// router.post('/imageUpload', imageUpload)
// router.post('/videoUpload', videoUpload)
// router.post('/imageReducerupload', imaimageReduceruploadgeUpload)
router.post('/localFileUpload', localFileUpload)
router.post('/imageUpload',imageUpload)
router.post('/videoUpload',videoUpload)
router.post('/imagereducer',imagereducer)



module.exports= router;