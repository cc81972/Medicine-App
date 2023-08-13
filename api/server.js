const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const MongoUser = process.env.MongoUser
const MongoPw = process.env.MongoPw
const MedModel = require('./models/medicine')
const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${MongoUser}:${MongoPw}@cluster0.4ossk3n.mongodb.net/test1?retryWrites=true&w=majority`)// MongoDB Connection

    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log('Error Connecting to MongoDB', error);
    });
;

app.get("/getMedicine", async (req,res) => {
    try {
        const meds = await MedModel.find(); // Wait for the query execution
        res.json(meds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

app.post("/createMedicine", async (req, res) => {
    const medicine = req.body
    const newMedicine = new MedModel(medicine);
    await newMedicine.save();

    res.json(medicine)
});

app.delete("/deleteMedicine/:id", async (req,res) => {
    const result = await MedModel.findByIdAndDelete(req.params.id);
    res.json(result)
})

app.listen(3001, () => {
    console.log("Server Running");
});
