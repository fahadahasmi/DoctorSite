require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const docts = require('./src/routes/doctors.js');
const app = express();
const Port = process.env.PORT || 4000;
const { MONGO_URI } = process.env
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDb')
})

app.use('/api/doctors', docts);

app.listen(Port, () => {
    console.log(`Server running at ${Port}`);
});