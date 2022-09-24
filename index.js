const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
// const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
// const verify = require('jsonwebtoken/verify');
// const { response } = require('express');




app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hkgwt2w.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const reviewsCollection = client.db('world-traveler').collection('reviews')


        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        });

        // review
        app.post('/reviews', async (req, res) => {
            const newReview = req.body
            console.log(newReview);
            const result = await reviewsCollection.insertOne(newReview)
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('All Ok')
})

app.listen(port, () => {
    console.log(`World Traveler listening on port ${port}`)
})