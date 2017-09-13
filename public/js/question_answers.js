$('#edit_answer').click(function(event){
  $('.edit_delete').each(function(index, item){
    if(!$(item).hasClass('hidden')){
      $(item).addClass('hidden')
    }
  })
  $('#form_edit_answer').removeClass('hidden')
})

