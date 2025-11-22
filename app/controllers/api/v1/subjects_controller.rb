module Api
  module V1
    class SubjectsController < BaseController
      # Sabit test verileri
      SUBJECTS_DATA = [
        { id: 1, title: 'Business English', level: 3, icon_url: 'https://example.com/icons/business.png', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        { id: 2, title: 'Daily Conversation', level: 2, icon_url: 'https://example.com/icons/daily.png', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        { id: 3, title: 'Academic Writing', level: 4, icon_url: 'https://example.com/icons/academic.png', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' }
      ].freeze

      def index
        render json: SUBJECTS_DATA
      end

      def show
        subject = SUBJECTS_DATA.find { |s| s[:id] == params[:id].to_i }
        if subject
          render json: subject
        else
          render json: { error: 'Subject not found' }, status: :not_found
        end
      end
    end
  end
end
