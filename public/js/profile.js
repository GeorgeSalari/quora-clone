$('.trigger-menu').click(function(event){
  $('.menu').each(function(index, item){
    if(!$(item).hasClass('hidden')){
      $(item).addClass('hidden')
    }
  })
  // debugger
  var target = $(event.target).data('open')
  $('#' + target).removeClass('hidden')
})
