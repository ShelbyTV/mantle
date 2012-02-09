graph_conf = {
  'development':{
    host : '127.0.0.1',
    port : 3000
  },
  'production':{
    host : '127.0.0.1',
    port : 5000
  }
};

module.exports = graph_conf[process.env.NODE_ENV];
