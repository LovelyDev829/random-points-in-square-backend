let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

//  Model
let frameSchema = require('../models/Frame.js')

// await classSchema.find().populate({ path: 'studies' })
// CREATE 
router.route('/create-frame').post((req, res, next) => {
    const { frame } = req.body
    console.log("create-frame", req.body)
    frameSchema.find({
        frame: frame
    }, (error, data) => {
        if (error) {
            res.json({ success: false })
        }
        else if (data[0]) {
            // console.log(data[0])
            console.log("Already existing pattern")
            res.json({ success: false })
        } else {
            var today = new Date()
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const commentDateTime = date + ' / ' + time;
            frameSchema.create({...req.body, commentDateTime:commentDateTime }, (error, data) => {
                if (error) {
                    res.json({ success: false })
                } else {
                    console.log("Added a new pattern..")
                    res.json({ success: true })
                }
            })
        }
    })
})

// READ 
router.route('/all-frames').get(async (req, res) => {
    // const tempFrames = await frameSchema.find().populate({ path: 'users' })
    const tempFrames = await frameSchema.find()
    return res.status(200).json(tempFrames)
})

router.route('/delete-frame/:id').delete((req, res, next) => {
    frameSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            res.json({ success: false })
        } else {
            res.json({ success: true })
        }
    })
})


module.exports = router
