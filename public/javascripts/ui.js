UI = {
  render : function(templateId, containerId, locals){
    var view = $(templateId).html();
    var template = _.template(view);
    $(containerId).html(template(locals));
  }
};
