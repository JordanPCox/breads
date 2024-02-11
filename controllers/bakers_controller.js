// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
})

// index
baker.get('/', async (req, res) => {
    try {
        const foundBakers = await Baker.find().populate('breads')
        res.send(foundBakers)
    } catch(error) {
        res.status(500).send({ error: 'Server error' })
    }
})

// show
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
    .populate({
        path: 'breads',
        options: { limit: 5 }
    })
    .then(foundBaker => {
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
})

// delete
baker.delete('/:id', async (req, res) => {
    try {
        const deletedBaker = await Baker.findByIdAndDelete(req.params.id)
        res.status(303).redirect('/breads')
    } catch (error) {
        res.status(500).send({ error: 'Server error'})
    }
})

// export
module.exports = baker                    
