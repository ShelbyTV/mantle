var Create = {
  init : function(){
    this.initSubmit();  
  },
  initSubmit : function(){
    console.log('initting submit');
    $('#create-submit').click(function(){
      window.location.href = '/dashboard?title='+escape($('#title-input').val())+'&video='+escape($('#video-input').val())+'&budget='+escape($('#budget-input').val());
    });
  }
};
