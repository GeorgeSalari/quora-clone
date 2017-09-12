class Answer < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
  validates :content, presence: true
  belongs_to :user
  has_many :answer_votes#,dependent: :destroy -> destroy all answer_votes if destroy answer

  def upvote_answer
    self.update(votes_count: self.votes_count + 1)
  end

  def downvote_answer
    self.update(votes_count: self.votes_count - 1)
  end

  def destroy_all
    self.answer_votes.destroy_all
    self.destroy
  end

  def upvoted?(user) #answer.upvoted?(current_user)
    return_value = false
    all_votes = self.answer_votes
    all_votes.each do |vote|
      return_value = true if vote.user_id == user && vote.action == "upvote"
    end
    return_value
  end

  def downvoted?(user)
    return_value = false
    all_votes = self.answer_votes
    all_votes.each do |vote|
      return_value = true if vote.user_id == user && vote.action == "downvote"
    end
    return_value
  end

end
