$('#edit_answer').click(function(){
  $('.edit_delete').each(function(index, item){
    if(!$(item).hasClass('hidden')){
      $(item).addClass('hidden');
    }
  })
  $('#form_edit_answer').removeClass('hidden')
}),

$('#question_upvote_active').submit(function(event){
  event.preventDefault();
  var p_count = $('#question_count_votes').text();
  $.ajax({
    url: '/question_upvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) + 1;
      $('#question_count_votes').text(p_count);
      $('#question_upvote_active').hide();
      $('#question_downvote_active').hide();
      $("#pressed_upvote").removeClass('hidden');
    }
  })
}),


$('#question_downvote_active').submit(function(event){
  event.preventDefault();
  var p_count = $('#question_count_votes').text();
  $.ajax({
    url:'/question_downvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) - 1;
      $('#question_count_votes').text(p_count);
      $('#question_upvote_active').hide();
      $('#question_downvote_active').hide();
      $("#pressed_downvote").removeClass('hidden');
    }
  })
}),

$('#question_downvoted').submit(function(event){
  event.preventDefault();
  var p_count = $('#question_count_votes').text();
  $.ajax({
    url:'/question_downvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) + 1;
      $('#question_count_votes').text(p_count);
      $('#question_downvoted').hide();
      $("#question_upvote_active_base").removeClass('hidden');
      $("#question_downvote_active_base").removeClass('hidden');
    }
  })
}),

$('#question_upvoted').submit(function(event){
  event.preventDefault();
  var p_count = $('#question_count_votes').text();
  $.ajax({
    url:'/question_upvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) - 1;
      $('#question_count_votes').text(p_count);
      $('#question_upvoted').hide();
      $("#question_upvote_active_base").removeClass('hidden');
      $("#question_downvote_active_base").removeClass('hidden');
    }
  })
})
