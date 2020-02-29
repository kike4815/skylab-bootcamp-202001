const { MongoClient } = require('mongodb')

// MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
//     .then(client => {
//         debugger
//     })

const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true })

client.connect()
    .then(() => {
        const db = client.db('events')

        const users = db.collection('users')

        // let's CRUD

        // CREATE

        // users.insertOne({ name: 'Menga', surname: 'Nota', email: 'menganita@gmail.com', password: '123' })
        //     .then(result => {
        //         debugger
        //         console.log(result)
        //     })

        // ; (function insert(count) {
        //     count < 100 && users
        //         .insertOne({ name: 'Menga-' + count, surname: 'Nota', email: 'menganita@gmail.com', password: '123' })
        //         .then(() => insert(++count))
        //         || console.log('ended')
        // })(0)

        // const _users = []
        // let count = 100
        // while (count--) _users.push({ name: 'Menga-' + count, surname: 'Nota', email: 'menganita@gmail.com', password: '123' })
        // users.insertMany(_users)
        //     .then(() => console.log('ended'))


        // READ

        /*const cursor = users.find()

            // cursor.toArray()
            //     .then(users => users.forEach(user => console.log(user)))

            // cursor.next()
            //     .then(() => cursor.hasNext())
            //     .then(hasNext => console.log(hasNext))
            //     .then(() => cursor.next())
            //     .then(user => console.log(user))
            //     .then(() => cursor.hasNext())
            //     .then(hasNext => console.log(hasNext))
            //     .then(() => cursor.next())
            //     .then(user => console.log(user))
            //     .then(() => cursor.hasNext())
            //     .then(hasNext => console.log(hasNext))
            //     .then(() => cursor.next())
            //     .then(user => console.log(user))
            //     .then(() => cursor.hasNext())
            //     .then(hasNext => console.log(hasNext))
            //     .then(() => cursor.next())
            //     .then(user => console.log(user))
            //     .then(() => cursor.hasNext())
            //     .then(hasNext => console.log(hasNext))
            //     .then(() => cursor.next())
            //     .then(user => console.log(user))
            //     .then(() => cursor.hasNext())
            //     .then(hasNext => console.log(hasNext))

            ; (function print() {
                cursor
                    .hasNext()
                    .then(hasNext => hasNext && cursor.next())
                    .then(result => result && (console.log(result) || print()))
            })()*/

        // CREATE-READ

        users.insertOne({ name: 'Menga', surname: 'Nota', email: 'menganita@gmail.com', password: '123' })
            .then(result => {
                const { insertedId: id } = result

                return users.findOne({ _id: id })
            })
            .then(user => console.log(user))

        // UPDATE?

        // DELETE?
    })