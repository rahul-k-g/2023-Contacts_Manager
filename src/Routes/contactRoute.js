const express = require("express")
const Contact = require("../models/contactModels")
const User = require("../models/userModel")
const router = require("express").Router();
router.use(express.json())
