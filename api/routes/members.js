const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import member schema
const Member = require('../models/member');

// Get all members
router.get('/', (req, res, next) => {
    Member.find()
      .exec()
      .then(docs => {
          console.log(docs);
          res.status(200).json(docs);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })
      });
});

// Create a new member if member doesn't exist
router.post('/', (req, res, next) => {
    const member = new Member({
        _id: new mongoose.Types.ObjectId(),
        fid: req.body.userFbId,
        name: req.body.fullName,
        gtag: 'Temp',
        status: 1,
        rank: 0
    });
    member
      .save()
      .then(result => {
          console.log(result);
      })
      .catch(err => console.log(err));
    res.status(201).json({
        message: 'Member has be added',
        createdMember: member
    });
});

// Update member information
router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to PATCH',
        id: id
    })
});

// Get one member
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // Member.$where(_id: id)
    Member.findById(id)
      .exec()
      .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;