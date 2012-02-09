/*
 * Popular API test
 */

var graph_client = require('../lib/graph_client.js');
var params = {
  limit : 2
};
var graph_url = graph_client.popular(params, function(e, data){
  if (!e && Array.isArray(data) && data.length===params.limit){
    console.log('PASS: received', data.length, 'docs');
  } else {
    console.log('FAIL: error', e, 'data', data);
  }
});
