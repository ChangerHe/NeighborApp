
const express = require('express');
const router = express.Router();

const category = require('../data/category')
const intro = require('../data/intro')
const delegation = require('../data/delegation')

router.get('/', (req, res) => {
  res.send('neighbor route')
})

router.get('/category', (req, res) => {
  res.json(category);
});

router.get('/intro', (req, res) => {
  res.json()
})

router.get('/delegation', (req, res) => {
  res.json()  
})

module.exports = router;
