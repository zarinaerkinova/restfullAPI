const Joi = require('joi')
const { Router } = require('express')
const router = Router()
const User = require('../model/User')
const modelUser = new User()

router.get('/', async (req, res) => {
    const data = await modelUser.getData()

    res.status(200).send(data.users)
})

router.get('/user', async (req, res) => {
    const data = await modelUser.getData()
    const user = data.users.find(val => val.age === +req.query.age)
    res.status(200).send(user)
})

router.get('/:id', async (req, res) => {
    const data = await modelUser.getData()
    const user = data.users.find(val => val.id === +req.params.id)
    res.status(200).send(user)
})

router.post('/add', async (req, res) => {
    const check = validation(req.body)

    if (!!check.error) {
        return res.status(400).send(validation.error.message)
    }

    const user = {
        name: req.body.name,
        age: req.body.age
    }

    await modelUser.create(user)

    res.status(201).send('User created')
})

function validation(body) {
    const schema = Joi.object({
        name: Joi.string().trim().required().min(3),
        age: Joi.number().integer().required().min(6).max(100)
    })

    return schema.validate(body)
}

// delete // update
router.delete('/delete/:id', async (req, res) => {
    const data = await modelUser.getData()
    const id = +req.params.id
    const idx = data.users.findIndex((val) => val.id === id)

    if (idx < 0) {
        return res.status(400).send('Id not found')
    }

    data.users.splice(idx, 1)

    await modelUser.save(data)

    res.status(200).send('User deleted')
})

router.put('/update/:id', async (req, res) => {
    const data = await modelUser.getData()
    const id = +req.params.id
    const idx = data.users.findIndex((val, index) => val.id === id)

    if (idx < 0) {
        return res.status(400).send('Id not found')
    }

    if (!req.body.name) {
        req.body.name = data.users[idx].name
    }

    req.body.id = id
    data.users[idx] = req.body

    await modelUser.save(data)

    res.status(200).send('User updated')
})

module.exports = router