require('dotenv').config();
const express = require('express');
const router = express.Router();
const Doctors = require('../model/Doctor');

router.get('/',(req,res)=>{
    Doctors.find({})
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json({"Error":err})
    });
});

router.post('/doctor',(req,res)=>{
    let fee = req.body.Fees;
    let specialized = req.body.Specialization;
    if(fee!="NaN"){
        Doctors.find({
            Specialization:specialized,Fees:fee})
        .then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json({"Error":err})
        });
    }
    else{
        Doctors.find({
            Specialization:specialized})
        .then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json({"Error":err})
        });
    }
});

module.exports = router;