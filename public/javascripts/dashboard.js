Dashboard = {
  loadedTopics:[],
  init : function(){
    this.initSearch();
  },
  initSearch : function(){
    var self = this;
    $('#topic-search-input').keyup(function(event){
      if (event.keyCode===13){
        self.doTopicSearch($('#topic-search-input').val(), self.renderTopicStats)
      }
    });
    API.getTopics(function(topics){
      self.loadedTopics = topics;
      $('#topic-search-input').typeahead({
        source : self.loadedTopics 
      });
    });
  },
  renderTopicStats : function(topic, topicStats){
    Dashboard.toggleLoading();
    console.log(topic, topicStats);
    topic[0] = topic[0].toUpperCase();
    topicStats.topic = topic;
    UI.render('#topic-stats-template', '#topic-stats-cont', topicStats);
  },
  doTopicSearch:function(topic, cb){
    if (this.loadedTopics.indexOf(topic)===-1){
      return false;
    } else {
      this.toggleLoading(true);
      console.log('searching for', topic);
      API.getStats(topic, cb);
    }
  },
  toggleLoading : function(show){
    var fn = show ? 'show' : 'hide';
    $('#search-loading-img')[fn]();
  }
};
