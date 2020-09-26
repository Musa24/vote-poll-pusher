const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pusher = require('pusher');

//Load a model
const Vote = require('../models/Vote');

//configuring a Pusher
const pusher = new Pusher({
  appId: '1079833',
  key: '89259f67dec6904e068c',
  secret: 'e9f0377c7abb0cdd2bc7',
  cluster: 'eu',
  encrypted: true,
});

router.get('/', (req, res) => {
  Vote.find().then((votes) => {
    return res.json({ success: true, votes: votes });
  });
});

router.post('/', (req, res) => {
  const newVote = { os: req.body.os, points: 1 };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger('os-polls', 'os-vote', {
      point: parseInt(vote.points),
      os: vote.os,
    });
    return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;
