/*
 * Query API test
 */

var graph_client = require('../lib/graph_client.js');

var params = {
  days : 1000 
};

var graph_url = graph_client.rebuild(params, function(e, num_nodes){
  if (!e && num_nodes){
    console.log('PASS: received', num_nodes);
  } else {
    console.log('FAIL: error', e, 'data', num_nodes);
  }
});
