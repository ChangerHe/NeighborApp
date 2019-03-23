
const express = require('express');
const router = express.Router();

const CODE = require('../constant/code')
const category = require('../data/category')
const intro = require('../data/intro')
const delegation = require('../data/delegation')

const resSuccess = (res, data) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    code: CODE.SUCCESS,
    message: 'success',
    data
  })
}

router.get('/', (req, res) => {
  res.send('neighbor route')
})

router.get('/category', (req, res) => {
  resSuccess(res, category)
});

router.get('/intro', (req, res) => {
  resSuccess(res, intro)
})

router.get('/delegation', (req, res) => {
  resSuccess(res, delegation)
})

module.exports = router;
