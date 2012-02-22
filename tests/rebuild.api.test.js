/*
 * Rebuild API test
 */

var graph_client = require('../lib/graph_client.js');

var params = {
  days : 0.1 
};

var graph_url = graph_client.rebuild(params, function(e, num_nodes){
  if (!e && typeof num_nodes !== undefined){
    console.log('PASS: received', num_nodes, 'nodes');
  } else {
    console.log('FAIL: error', e, 'data', num_nodes);
  }
});
