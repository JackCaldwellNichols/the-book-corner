const router = require('express').Router()
const User = require('../Models/User.js')
const bcrypt = require('bcrypt')

//update profile

router.put('/:id', async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new:true})
            const {password, ...others} = updateUser._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("Not authorised")
    }
})


//delete profile


module.exports = router