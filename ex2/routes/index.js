var express = require('express');
var axios = require('axios');
var router = express.Router();


router.get('/', function(req, res) {
  axios.post("http://clav-api.di.uminho.pt/v2/users/login",  { username: 'daw2020@teste.uminho.pt', password: '232' })
    .then(data => {
        res.cookie('token', data.data.token, {
          expires: new Date(Date.now() + '1d'),
          secure: false,
          httpOnly: true
        });
        res.render('mainpage')
    })
    .catch(e => res.render('error', {err: e}))
});

router.get('/termosIndice', function(req, res, next) {
  var token = req.cookies.token
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
    .then(data => res.render('termosIndice', {termos: data.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/classes', function(req, res, next) {
  var token = req.cookies.token
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(data => res.render('classespage', {classes: data.data}))
    .catch(e => res.render('error', {err: e}))
});

router.get('/classe/:id', function(req, res, next) {
  var token = req.cookies.token
  var classe = req.params.id
  axios.get('http://clav-api.di.uminho.pt/v2/classes/'+ classe + '?token='+ token)
    .then(clas => {
      axios.get('http://clav-api.di.uminho.pt/v2/classes/'+ classe + '/descendencia?token=' + token)
            .then(des => { 
              res.render('classepage', {classe: clas.data, desc: des.data})
            })
            .catch(e => res.render('error', {err: e}))
    })
    .catch(e => res.render('error', {err: e}))
});

module.exports = router;
