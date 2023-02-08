const express = require("express")
const Contact = require("../models/contactModels")
const router = require("express").Router();
router.use(express.json())

router.post("/contacts", async (req, res) => {
    try {
       
        const contact = await Contact.create(req.body)
        res.status(201).json({
            status: "Success",
            contact
        });
    }
  
    catch (e) {
        res.status(500).json({ 
            status: "Failed",
            message: e.message,
        });
    }
  });


//adding allcontacts 
router.get('/contacts',async (req,res)=>{
    try {
      const allcontact = await Contact.find()  
      res.status(200).json({
          status: 'Success',  
          allcontact
      })
    } catch (e) {
      res.status(500).json({
          status: 'Failed',
          messege: e.messege
      })
    }
  })



  //get search contact 
router.get('/search/:email',async (req,res)=>{
    try {
      const email = req.params.email
          const allcontact = await Contact.find({email:email})
      res.status(200).json({
          status: 'Success',  
          allcontact
      })
    } catch (error) {       
      res.status(500).json({
          status: 'Failed',
          messege: error.messege
      })
    }
  })
  
  router.delete("/contacts", async (req, res) => {
    try {
        const ids = req.body;
    await Contact.deleteMany(
      {
        _id: {$in: ids},
      })
        res.status(201).json({
            status: "Success",
            message: "Records deleted"
        });
    }
  
    catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message,
        });
    }
  }); 

  module.exports = router;
  
