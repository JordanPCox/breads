const express = require('express')

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


const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

app.get('*', (req, res) => {
    res.send('404')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})