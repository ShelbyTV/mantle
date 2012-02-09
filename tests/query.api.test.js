/*
 * Query API test
 */

var graph_client = require('../lib/graph_client.js');

var params = {
  url : 'http://www.youtube.com/watch?v=uGi_r9xlvqE'
};

var graph_url = graph_client.query(params, function(e, data){
  if (!e && Array.isArray(data)){
    console.log('PASS: received', data.length, 'docs');
  } else {
    console.log('FAIL: error', e, 'data', data);
  }
});
