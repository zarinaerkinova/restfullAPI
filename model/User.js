const fs = require('fs')
const path = require('path')

class User {
    async getData() {
        return await new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'db.json'),
                'utf-8',
                (err, data) => {
                    if (err) reject(err)
                    resolve(JSON.parse(data))
                })
        })
    }

    async create(user) {
        const data = await this.getData()

        user.id = data.users.length + 1

        data.users.push(user)

        return await new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(data),
                (err) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    async save(data) {
        return await new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(data),
                (err) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }
}

module.exports = User