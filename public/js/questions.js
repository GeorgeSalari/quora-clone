all_button = $('.questions');

$(all_button).submit(function(event){
  event.preventDefault();
  var question_id = $(this).data('id');
  var action = $(this).children().last().attr('id');
  var presed_button = $(this).attr('id');

  switch (presed_button) {
    case 'question_upvote_active_'+question_id :
      $.ajax({
        url: '/question_upvote',
        method: 'post',
        data: $(this).serialize(),
        success: function(){
          var p_count = $("[data-id='" + question_id + "']").last().text();
          p_count = parseInt(p_count) + 1;
          $("[data-id='" + question_id + "']").last().text(p_count);
          $("#question_upvote_active_"+question_id).addClass("hidden");
          $("#question_downvote_active_"+question_id).addClass("hidden");
          $("#question_upvoted_"+question_id).removeClass("hidden");
        }
      })
      break;
    case 'question_downvote_active_'+question_id :
      $.ajax({
        url:'/question_downvote',
        method: 'post',
        data: $(this).serialize(),
        success: function(){
          var p_count = $("[data-id='" + question_id + "']").last().text();
          p_count = parseInt(p_count) - 1;
          $("[data-id='" + question_id + "']").last().text(p_count);
          $("#question_downvote_active_"+question_id).addClass("hidden");
          $("#question_upvote_active_"+question_id).addClass("hidden");
          $("#question_downvoted_"+question_id).removeClass("hidden");
        }
      })
      break;
    case 'question_downvoted_'+question_id :
      $.ajax({
        url:'/question_downvote',
        method: 'post',
        data: $(this).serialize(),
        success: function(){
          var p_count = $("[data-id='" + question_id + "']").last().text();
          p_count = parseInt(p_count) + 1;
          $("[data-id='" + question_id + "']").last().text(p_count);
          $("#question_downvoted_"+question_id).addClass("hidden");
          $("#question_downvote_active_"+question_id).removeClass("hidden");
          $("#question_upvote_active_"+question_id).removeClass("hidden");
        }
      })
      break;
    case 'question_upvoted_'+question_id :
      $.ajax({
        url: '/question_upvote',
        method: 'post',
        data: $(this).serialize(),
        success: function(){
          var p_count = $("[data-id='" + question_id + "']").last().text();
          p_count = parseInt(p_count) - 1;
          $("[data-id='" + question_id + "']").last().text(p_count);
          $("#question_upvoted_"+question_id).addClass("hidden");
          $("#question_downvote_active_"+question_id).removeClass("hidden");
          $("#question_upvote_active_"+question_id).removeClass("hidden");
        }
      })
      break;
  }
})
