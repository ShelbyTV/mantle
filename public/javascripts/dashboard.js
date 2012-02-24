Dashboard = {
  loadedTopics:[],
  currentTopics:{},
  init : function(){
    this.initSearch();
  },
  initSearch : function(){
    var self = this;
    $('#topic-search-input').keyup(function(event){
      var term = $('#topic-search-input').val();
      if (event.keyCode===13 && self.loadedTopics.indexOf(term)!==-1){
        self.addTopic(term);
        //self.doTopicSearch($('#topic-search-input').val(), self.renderTopicStats)
      }
    });
    API.getTopics(function(topics){
      self.loadedTopics = topics;
      $('#topic-search-input').typeahead({
        source : self.loadedTopics,
        items : 15
      });
    });
  },
  recomputeTopics : function(stats){
    var self = this;
    //$('#topic-stats-cont').html('');
    Object.keys(stats).forEach(function(topic){
      self.currentTopics[topic] = stats[topic];
      self.renderTopicStats(topic, stats[topic]);
      $(".alert").alert()
    });
    this.initCloseListeners();
  },
  initCloseListeners : function(){
    var self = this;
    $('.close').click(function(ev){
      var topic = $(this).attr('topic');
      self.deleteTopic(topic); 
    });
  },
  addTopic : function(topic){
    var self = this;
    $('#topic-search-input').val('')
    this.currentTopics[topic] = true;
    API.getStats(topic, function(stats){
      self.recomputeTopics(stats);
    });
  },
  deleteTopic : function(topic){
    delete this.currentTopics[topic];
    Dashboard.computeTotals();
  },
  renderTopicStats : function(topic, topicStats){
    //Dashboard.toggleLoading();
    topicStats.topic = topic;
    topicStats.cpm = topicStats.kscore / topicStats.influencers;
    var topicEl = UI.prepend('#topic-stats-template', '#topic-stats-cont', topicStats);
    this.initOrderInputs(topic);
  },
  doTopicSearch:function(topic, cb){
    if (this.loadedTopics.indexOf(topic)===-1){
      return false;
    } else {
      this.toggleLoading(true);
      API.getStats(topic, cb);
    }
  },
  toggleLoading : function(show){
    var fn = show ? 'show' : 'hide';
    $('#search-loading-img')[fn]();
  },
  computeTotals : function(){
    var money = 0;
    var reach = 0;
    Object.keys(this.currentTopics).forEach(function(topic){
      var _reach = $('#'+topic.split(' ').join()+'-reach-input').val()/1;
      var _money = $('#'+topic.split(' ').join()+'-money-input').val()/1;
      money+=_money;
      reach+=_reach;
    });
    var budget = $('#dashboard-total-budget').text()/1;
    console.log('budget', budget);
    if (money>budget){
      $('#dashboard-total-spend').addClass('red-text');
    } else {
      $('#dashboard-total-spend').removeClass('red-text');
    }
    $('#dashboard-total-spend').text(money);
    $('#dashboard-total-reach').text(reach);
  },
  initOrderInputs : function(topic){
    var self = this;
    var _topic = topic.split(' ').join('');
    var money = function(reach, topic){
      var cpm = Dashboard.currentTopics[topic].cpm;
      var milles = reach/1000;
      return Math.ceil(cpm*milles);
    };
    var reach = function(money, topic){
      var cpm = Dashboard.currentTopics[topic].cpm;
      var milles = money/cpm;
      return Math.ceil(milles*1000);
    };
    var _cb = function(read, write, calcFn){
      var input = read.val()/1;
      if (input){
        var write_val = calcFn(input, topic);
        write.val(write_val);
      } else {
        write.val('');
      }
      self.computeTotals();
    };
    var reachIn = $('#'+_topic+'-reach-input');
    var moneyIn = $('#'+_topic+'-money-input');
    reachIn.keyup(function(){
      console.log('reach input');
      _cb(reachIn, moneyIn, money);
    });
    //console.log('#'+topic+'-money-input');
    moneyIn.keyup(function(){
      _cb(moneyIn, reachIn, reach);
    });
    $('#order-butoon').show();
    $('#order-button').click(function(){
      window.location.href = '/seed?reach='+$('#dashboard-total-reach').text();
    });
  }
};
