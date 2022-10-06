const asyncHandler = require('express-async-handler')

const Secret = require('../models/secretModel')

const getSecrets = asyncHandler(async (req,res) =>{
    const secrets = await Secret.find({user: req.user.id})
    res.status(200).json({secrets})
})

const getHearsay = asyncHandler(async (req,res) =>{
    const hearsay = await Secret.find({})
    res.status(200).json({hearsay})
})

const setSecret = asyncHandler(async (req,res)=>{
    if (!req.body.text){
        res.status(400)
        throw new Error('Text field empty. Please add text into field.')
    }

    const secret = await Secret.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(secret);
    console.log(req.body.text)
    //to use body like this, you need middleware. in server.js
    //app.use for json, and urlencoded
})

const updateSecret = asyncHandler(async (req,res)=>{
    const secret = await Secret.findById(req.params.id)

    if (!secret) {
        res.status(400)
        throw new Error('Secret not found')
    }

    //check for user
    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if (secret.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedSecret = await Secret.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedSecret)
})

const deleteSecret = asyncHandler(async (req,res)=>{
    const secret = await Secret.findById(req.params.id)
    if (!secret) {
        res.status(400)
        throw new Error('Secret not found')
    }
    //check for user
    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if (secret.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await secret.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getSecrets,
    getHearsay,
    setSecret,
    updateSecret,
    deleteSecret
}