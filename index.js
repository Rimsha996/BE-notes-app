require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Notes = require('./models/notes');

const app = express();
const PORT = process.env.PORT || 8000;

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

app.use(express.json());
app.use(cors({
        origin: '*'
    })
);


app.get('/note' , async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const notes = await Notes.find();
    res.json({notes})
});

app.post('/note' , async (req, res) => {
    const reqbody = req.body;
    const newNote = new Notes({
        title: reqbody.title,
        details: reqbody.details
    });

    await newNote.save()
    res.json(true);
})
connectDB().then(() => {
    app.listen(PORT , ()=>{
        console.log('Listening to PORT')
    });
});