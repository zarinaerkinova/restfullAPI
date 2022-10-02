const express = require('express')
const app = express()
const morgan = require('morgan')

require('dotenv').config()

const homeRouter = require('./routes/home')
const usersRouter = require('./routes/users')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}

app.use('/', homeRouter)
app.use('/users', usersRouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Server working on port ', port);
})