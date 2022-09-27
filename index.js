const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
// const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const destinationListCollection = client.db('world-traveler').collection('destinationList')
        const tourListCollection = client.db('world-traveler').collection('tourList')
        const bookingCollection = client.db('world-traveler').collection('booking')


        // review
        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        });


        app.post('/reviews', async (req, res) => {
            const newReview = req.body
            console.log(newReview);
            const result = await reviewsCollection.insertOne(newReview)
            res.send(result)
        })


        // destinationListCollection

        app.get('/destinationList', async (req, res) => {
            const query = {}
            const cursor = destinationListCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/destinationList/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const destinationList = await destinationListCollection.findOne(query);
            res.send(destinationList);
        })


        // tour package list

        app.get('/tourList', async (req, res) => {
            const query = {}
            const cursor = tourListCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/tourList/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tourList = await tourListCollection.findOne(query);
            res.send(tourList);
        })


        // booking area

        app.get('/booking', async (req, res) => {
            const email = req.query.email;
            const authorization = req.headers.authorization
            console.log(authorization);
            const query = { email: email }
            const bookings = await bookingCollection.find(query).toArray()
            res.send(bookings)
        })


        app.post('/booking', async (req, res) => {
            const bookings = req.body
            const result = await bookingCollection.insertOne(bookings)
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