const express = require('express')
const mongoose = require('mongoose')

  
require('dotenv').config()
const PORT = process.env.PORT
const app = express()


// DEPENDENCIES
const methodOverride = require('method-override')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// MIDDLEWARE
app.use(methodOverride('_method'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.get('/', (req, res) => {
    res.send('Welcome to an awesome app about Breads')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

mongoose.connect(process.env.MONGO_URI).then(() => console.log('connected to mongo: ', process.env.MONGO_URI))


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})