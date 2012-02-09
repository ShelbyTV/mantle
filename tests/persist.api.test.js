/*
 * Persist API test
 */

var graph_client = require('../lib/graph_client.js');

var graph_url = graph_client.persist(function(e, data){
  if (!e && data){
    console.log('PASS: received', data);
  } else {
    console.log('FAIL: error', e, 'data', data);
  }
});
