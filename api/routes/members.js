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
    const f_id = req.body.userFbId;
    Member.findOne({fid: f_id})
      .exec()
      .then(doc => {
          if(!doc){
            const member = new Member({
                _id: new mongoose.Types.ObjectId(),
                fid: req.body.userFbId,
                name: req.body.fullName
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
          } else {
            console.log(doc);
            res.status(200).json({
                message: "That member already exist.",
                todo: "To update member call the following url",
                method: 'PATCH',
                url: 'http//locolhost:3000/' + f_id
            });
          }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
});

// Update member information
router.patch('/:fid', (req, res, next) => {
    const id = req.params.fid;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.updateMem] = ops.value;
    }
    console.log(updateOps);
    Member.update({fid: id}, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
        });
    //   res.status(200).json({
    //     message: 'Welcome to PATCH',
    //     id: id
    //   });
});

// Get one member
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // Member.$where(_id: id)
    Member.findOne({fid: id})
      .exec()
      .then(doc => {
          if(!doc){
            console.log(doc);
            res.status(200).json({
                message: "That member doesn't exist."
            });
          } else {
            console.log(doc);
            res.status(200).json(doc);
          }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Bulk add members, with array of objects (keys must match keys in schema)
router.post('/bulk', (req, res, next) => {
    Member.collection.insert(req.body, (err, docs) => {
        if (err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                status: 'Successful',
                recordsEntered: docs.insertedCount,
                insertedIds: docs.insertedIds
            })
        }
    });
});


module.exports = router;