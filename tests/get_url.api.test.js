var graph_client = require('../lib/graph_client.js');
var expected_url = 'http://127.0.0.1:3000/popular?limit=100';
var url = '/popular';
var params = {
  limit : 100
};
var graph_url = graph_client._get_url(url, params);
var result = (graph_url === expected_url) ? 'PASS' : 'FAIL';
console.log('TEST', result, 'expected', expected_url, 'got', graph_url);
