get '/' do
  if logged_in?
    erb :"static/profile"
  else
    erb :"static/index"
  end
end

get '/profile' do
  if logged_in?
    @all_user_questions = Question.where(user_id: current_user.id)
    @all_user_answers = User.find(current_user.id).answers
    erb :"static/profile"
  end
end

get '/question' do
  if logged_in?
    @all_questions = Question.paginate(:page => params[:page], :per_page => 10).order("votes_count DESC")
    erb :"static/questions"
  end
end

get '/user/:user_id/question/:question_id' do
  if logged_in?
    @question = Question.find(params[:question_id])
    @answers = @question.answers.order(created_at: :desc)
    @question.increase_views
    erb :"static/question_answers"
  end
end

post '/user' do
  user = User.new(params[:user])
  if user.save
    redirect '/'
  else
    user.errors
  end
end

post '/login' do
  user = User.find_by(email: params[:email]).try(:authenticate, params[:password])
  if user
    session[:current_user_id] = user.id
    redirect "/profile"
  else
    user.errors
  end
end

post '/logout' do
  session[:current_user_id] = nil
  redirect '/'
end

post '/question' do
  question = Question.new(params[:question])
  if question.save
    redirect '/profile'
  else
    question.errors
  end
end

post '/answer' do
  answer = Answer.new(params[:answer])
  if answer.save
    redirect "/user/#{answer.user_id}/question/#{answer.question_id}"
  else
    question.errors
  end
end

post '/question_upvote' do
  upvote = QuestionVote.find_or_initialize_by(params[:upvote])
  if upvote.id
    upvote.question.downvote_question
    upvote.destroy
    redirect '/question'
  elsif upvote.save
    upvote.question.upvote_question
    redirect '/question'
  else
    redirect '/question'
  end
end

post '/question_downvote' do
  downvote = QuestionVote.find_or_initialize_by(params[:downvote])
  if downvote.id
    downvote.question.upvote_question
    downvote.destroy
    redirect '/question'
  elsif downvote.save
    downvote.question.downvote_question
    redirect '/question'
  else
    redirect '/question'
  end
end

post '/answer_upvote' do
  upvote = AnswerVote.find_or_initialize_by(params[:upvote])
  if upvote.id
    upvote.answer.downvote_answer
    upvote.destroy
    redirect "/user/#{params[:upvote][:user_id]}/question/#{Answer.find(upvote.answer_id).question_id}"
  elsif upvote.save
    upvote.answer.upvote_answer
    redirect "/user/#{params[:upvote][:user_id]}/question/#{Answer.find(upvote.answer_id).question_id}"
  else
    redirect '/profile'
  end
end

post '/answer_downvote' do
  downvote = AnswerVote.find_or_initialize_by(params[:downvote])
  if downvote.id
    downvote.answer.upvote_answer
    downvote.destroy
    redirect "/user/#{params[:downvote][:user_id]}/question/#{Answer.find(downvote.answer_id).question_id}"
  elsif downvote.save
    downvote.answer.downvote_answer
    redirect "/user/#{params[:downvote][:user_id]}/question/#{Answer.find(downvote.answer_id).question_id}"
  else
    redirect '/profile'
  end
end

patch '/question/:question_id' do
    question = Question.find(params[:question_id])
    if current_user.id == question.user_id
      question.update(params[:question])
      redirect "/profile"
    end
end

delete '/question/:question_id' do
  question = Question.find(params[:question_id])
  if current_user.id == question.user_id
    question.destroy_all
  end
end

patch '/answer/:answer_id' do
  answer = Answer.find(params[:answer_id])
  if current_user.id == answer.user_id
    answer.update(content: params[:content])
    redirect "/user/#{answer.user_id}/question/#{answer.question_id}"
  end
end

delete '/answer/:answer_id' do
  answer = Answer.find(params[:answer_id])
  user_id = answer.user_id
  question_id = answer.question_id
  if current_user.id == answer.user_id
    answer.destroy_all
    redirect "/user/#{user_id}/question/#{question_id}"
  end
end
