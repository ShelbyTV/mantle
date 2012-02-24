/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.dashboard = function(req, res){
  console.log(req.query);
  res.render('dashboard', req.query);
};

exports.analytics = function(req, res){
  //do some validation here
  /*var stats = JSON.parse(req.query.stats);
  stats.reach = req.query.reach;
  stats.video_url = req.query.v;
  console.log(stats);*/
  res.render('analytics');
};

exports.create = function(req, res){
  res.render('create');  
};

exports.seed = function(req, res){
  res.render('seed', req.query);
};
