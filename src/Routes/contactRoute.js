const express = require("express")
const Contact = require("../models/contactModels")
const User = require("../models/userModel")
const router = require("express").Router();
router.use(express.json())

router.post("/contacts/:email", async (req, res) => {
  try {
    const email = req.params.email
    const data = await User.find({ email: email }, { _id: 1 })
    let contacts;
    const created_by = data[0]._id;
    req.body.forEach(async function (table) {
      
      contacts = await Contact.insertMany({
        name: table.name,
        designation: table.designation,
        company: table.company,
        industry: table.industry,
        email: table.email,
        phoneNumber: table.phoneNumber,
        Country: table.Country,
        date: table.date,
        created_by: created_by
      })
    });
    /*const contact = await Contact.create(req.body)*/
    res.status(201).json({
      status: "Success",
      contacts
    });
  }

  catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});


// getting all contacts created by user
router.get('/contacts/:email', async (req, res) => {
  try {
    const email = req.params.email
    const allcontact = await Contact.find({ email: email })
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



//geting all contacts with email
router.get('/search/:email', async (req, res) => {
  try {
    const email = req.params.email
    const allcontact = await Contact.find({ email: email })
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
        _id: { $in: ids },
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

