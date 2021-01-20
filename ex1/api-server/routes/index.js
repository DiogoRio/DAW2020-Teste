var express = require('express');
var router = express.Router();

var Batismo = require('../controllers/batismos')

router.get('/api/batismos/progenitores', function(req, res, next) {
  Batismo.progenitores()
  .then(data => res.status(200).jsonp({batismos: data}))
  .catch(err => res.status(500).jsonp({erro: err}))
});


router.get('/api/batismos/batisado', function(req, res, next) {
  Batismo.listTitle()
  .then(data => {
    var nomes = []
    data.forEach(i => {
      var tmp = i.title.split(": ")[1]
      var nome = tmp.split(".")[0]
      if(!nomes.includes(nome))
        nomes.push(nome)
    });
    res.status(200).jsonp({batisados: nomes})
  })
  .catch(err => res.status(500).jsonp({erro: err}))
});

router.get('/api/batismos/stats', function(req, res, next) {
  Batismo.listaQueryByYear()
  .then(data => {
    res.status(200).jsonp({batisados: data})
  })
  .catch(err => res.status(500).jsonp({erro: err}))
});


router.get('/api/batismos/:id', function(req, res, next) {
  Batismo.search(req.params.id)
  .then(data => res.status(200).jsonp({batismos: data}))
  .catch(err => res.status(500).jsonp({erro: err}))
});

router.get('/api/batismos', function(req, res, next) {
  if(req.query.ano != null)
    Batismo.listQueryYear(req.query.ano)
    .then(data => res.status(200).jsonp({batismos: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
  else
    Batismo.list()
    .then(data => res.status(200).jsonp({batismos: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
  });



module.exports = router;


