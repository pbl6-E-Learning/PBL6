class Ability
  include CanCan::Ability

  def initialize account
    account ||= Account.new(roles: :user)
    set_permissions(account)
  end

  private

  def set_permissions account
    if account.admin?
      can :manage, :all
      nil
    elsif account.teacher?
      set_teacher_permissions(account)
    elsif account.user?
      set_user_permissions(account)
    end
  end

  def set_teacher_permissions account
    can :read, Course
    can :manage, Lesson, teacher_id: account.id
    can :manage, Comment, lesson: {teacher_id: account.id}
    can :manage, Flashcard, lesson: {teacher_id: account.id}
    can :read, User
  end

  def set_user_permissions account
    return unless account.user?

    can :read, Course
    can :read, Lesson
    can :create, Comment, user_id: account&.user&.id
    can :create, Follow, user_id: account&.user&.id
    can :read, Teacher
    can :read, Category
    can :manage, User, account_id: account.id
    can :manage, Account, id: account.id
  end
end
