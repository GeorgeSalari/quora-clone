class Question < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
  validates :title, presence: true
  has_many :answers#, dependent: :destroy -> destroy all answers if destroy question
  has_many :question_votes#, dependent: :destroy -> destpy all question_vote if destroy question

  def upvote_question
    self.update(votes_count: self.votes_count + 1)
  end

  def downvote_question
    self.update(votes_count: self.votes_count - 1)
  end

  def increase_views
    self.update(views_count: self.views_count + 1)
  end

  def destroy_all
    answers = self.answers
    answers.each do |answer|
      answer.answer_votes.destroy_all
    end
    answers.destroy_all
    self.question_votes.destroy_all
    self.destroy
  end

  def upvoted?(user) #question.upvoted?(current_user)
    return_value = false
    all_votes = self.question_votes
    all_votes.each do |vote|
      return_value = true if vote.user_id == user && vote.action == "upvote"
    end
    return_value
  end

  def downvoted?(user)
    return_value = false
    all_votes = self.question_votes
    all_votes.each do |vote|
      return_value = true if vote.user_id == user && vote.action == "downvote"
    end
    return_value
  end
end
