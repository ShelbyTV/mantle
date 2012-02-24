UI = {
  _inputTemplate : function(templateId, containerId, locals, input_method){
    var view = $(templateId).html();
    var template = _.template(view);
    var html = $(template(locals));
    $(containerId)[input_method](html);
    return html;
  },
  render : function(templateId, containerId, locals){
    return this._inputTemplate(templateId, containerId, locals, 'html');
  },
  append : function(templateId, containerId, locals){
    return this._inputTemplate(templateId, containerId, locals, 'append');
  },
  prepend : function(templateId, containerId, locals){
    return this._inputTemplate(templateId, containerId, locals, 'prepend');
  }
};
