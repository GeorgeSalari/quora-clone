var question_upvoted = $('#question_upvoted');
var question_downvoted = $('#question_downvoted');
var question_upvote_active = $('#question_upvote_active');
var question_downvote_active = $('#question_downvote_active');

var answer_upvoted = $('#answer_upvoted');
var answer_downvoted = $('#answer_downvoted');
var answer_upvote_active = $('#answer_upvote_active');
var answer_downvote_active = $('#answer_downvote_active');

$('#edit_answer').click(function(){
  $('.edit_delete').each(function(index, item){
    if(!$(item).hasClass('hidden')){
      $(item).addClass('hidden');
    }
  })
  $('#form_edit_answer').removeClass('hidden')
}),

$(question_upvote_active).submit(function(event){
  event.preventDefault();
  var p_count = $('#question_count_votes').text();
  $.ajax({
    url: '/question_upvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) + 1;
      $('#question_count_votes').text(p_count);
      $(question_upvote_active).addClass("hidden");
      $(question_downvote_active).addClass("hidden");
      $(question_upvoted).removeClass("hidden");
    }
  })
}),


$(question_downvote_active).submit(function(event){
  event.preventDefault();
  var p_count = $(question_count_votes).text();
  $.ajax({
    url:'/question_downvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) - 1;
      $('#question_count_votes').text(p_count);
      $(question_upvote_active).addClass("hidden");
      $(question_downvote_active).addClass("hidden");
      $(question_downvoted).removeClass("hidden");
    }
  })
}),

$(question_downvoted).submit(function(event){
  event.preventDefault();
  var p_count = $(question_count_votes).text();
  $.ajax({
    url:'/question_downvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) + 1;
      $('#question_count_votes').text(p_count);
      $(question_downvoted).addClass("hidden");
      $(question_upvote_active).removeClass("hidden");
      $(question_downvote_active).removeClass("hidden");
    }
  })
}),

$(question_upvoted).submit(function(event){
  event.preventDefault();
  var p_count = $(question_count_votes).text();
  $.ajax({
    url:'/question_upvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) - 1;
      $('#question_count_votes').text(p_count);
      $(question_upvoted).addClass("hidden");
      $(question_upvote_active).removeClass("hidden");
      $(question_downvote_active).removeClass("hidden");
    }
  })
}),

$(answer_upvote_active).submit(function(event){
  event.preventDefault();
  var p_count = $('#answer_count_votes').text();
  $.ajax({
    url: '/answer_upvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) + 1;
      $('#answer_count_votes').text(p_count);
      $(answer_upvote_active).addClass("hidden");
      $(answer_downvote_active).addClass("hidden");
      $(answer_upvoted).removeClass("hidden");
    }
  })
}),


$(answer_downvote_active).submit(function(event){
  event.preventDefault();
  var p_count = $(answer_count_votes).text();
  $.ajax({
    url:'/answer_downvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) - 1;
      $('#answer_count_votes').text(p_count);
      $(answer_upvote_active).addClass("hidden");
      $(answer_downvote_active).addClass("hidden");
      $(answer_downvoted).removeClass("hidden");
    }
  })
}),

$(answer_downvoted).submit(function(event){
  event.preventDefault();
  var p_count = $(answer_count_votes).text();
  $.ajax({
    url:'/answer_downvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) + 1;
      $('#answer_count_votes').text(p_count);
      $(answer_downvoted).addClass("hidden");
      $(answer_upvote_active).removeClass("hidden");
      $(answer_downvote_active).removeClass("hidden");
    }
  })
}),

$(answer_upvoted).submit(function(event){
  event.preventDefault();
  var p_count = $(answer_count_votes).text();
  $.ajax({
    url:'/answer_upvote',
    method: 'post',
    data: $(this).serialize(),
    success: function(data) {
      p_count = parseInt(p_count) - 1;
      $('#answer_count_votes').text(p_count);
      $(answer_upvoted).addClass("hidden");
      $(answer_upvote_active).removeClass("hidden");
      $(answer_downvote_active).removeClass("hidden");
    }
  })
})
