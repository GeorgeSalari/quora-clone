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
end
