module Api::Instructor
  class LessonsController < ApplicationController
    before_action :set_course, only: %i(index create)
    before_action :set_lesson, only: :destroy

    def index
      @q = @course.lessons.ransack(params[:q])
      @pagy, @lessons = pagy(@q.result.includes(:course))

      json_response(
        message: {
          course_title: @course.title,
          lessons: formatted_lessons,
          pagy: pagy_res(@pagy)
        },
        status: :ok
      )
    end

    def create
      unless @course.teacher_id == current_teacher.id
        error_response(
          message: "You are not authorized to add lessons to this course",
          status: :forbidden
        )
        return
      end

      lesson = @course.lessons.new(lesson_params)

      if lesson.save
        if params[:kanji].present?
          create_kanjis_for_lesson(lesson, params[:kanji])
        end

        json_response(message: lesson, status: :ok)
      else
        error_response(message: lesson.errors.full_messages,
                       status: :unprocessable_entity)
      end
    end

    def destroy
      unless @lesson
        return error_response(message: "Lesson not found",
                              status: :not_found)
      end

      if @lesson.destroy
        json_response(
          message: {id: @lesson.id, status: "deleted"},
          status: :ok
        )
      else
        error_response(
          message: "Failed to delete the lesson",
          status: :unprocessable_entity
        )
      end
    end

    private

    def set_course
      @course = Course.find_by id: params[:course_id]
    end

    def set_lesson
      @lesson = Lesson.find_by id: params[:id]
    end

    def lesson_params
      params.require(:lesson).permit(Lesson::VALID_ATTRIBUTES_LESSON)
    end

    def formatted_lessons
      @lessons.map do |lesson|
        {
          id: lesson.id,
          title: lesson.title,
          course_id: lesson.course_id,
          content: lesson.content,
          video_url: lesson.video_url,
          created_at: lesson.created_at,
          updated_at: lesson.updated_at,
          progress_counts: lesson.progress_counts
        }
      end
    end

    def create_kanjis_for_lesson lesson, kanji_array
      kanji_array.each do |kanji_character|
        lesson.kanjis.create(
          character: kanji_character,
          image_url: nil
        )
      end
    end
  end
end
