API = {
  handleResponse : function(res, cb){
    return cb(JSON.parse(res).data);
  },
  getTopics : function(cb){
    var self = this;
    $.get('http://localhost:3001/topics', function(res){
      self.handleResponse(res, cb);
    });
  },
  getStats : function(topic, cb){
    var self = this;
    $.get('http://localhost:3001/stats?topic='+escape(topic), function(res){
      setTimeout(function(){
        return cb(topic, JSON.parse(res).data);
      }, 500);
    });
  }
};
