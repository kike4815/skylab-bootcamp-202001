const { MongoClient, ObjectId } = require('mongodb')

let client, db

module.exports = {
    connect(url) {
        return MongoClient.connect(url, { useUnifiedTopology: true })
            .then(_client => {
                client = _client

                db = client.db()
            })
    },
    collection(name) {
        return db.collection(name)
    },
    disconnect() {
        return client.close()
    },
    ObjectId
}