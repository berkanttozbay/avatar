module Api
  module V1
    class ReportsController < BaseController
      # Sabit test verileri
      REPORTS_DATA = [
        {
          id: 1,
          period_start: 1.week.ago.beginning_of_week.iso8601,
          period_end: 1.week.ago.end_of_week.iso8601,
          average_score: 82.5,
          vocabulary_count: 120,
          generated_summary: "This week you have shown excellent progress! Your average score improved from 78% to 82.5%. You learned 120 new words, particularly focusing on business vocabulary. Keep practicing your pronunciation, especially with longer words. Great job!",
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          period_start: Time.current.beginning_of_week.iso8601,
          period_end: Time.current.end_of_week.iso8601,
          average_score: 85.5,
          vocabulary_count: 150,
          generated_summary: "This week you've made great progress! Your average score is 85.5% and you've learned 150 new words. Keep up the good work!",
          created_at: Time.current.iso8601,
          updated_at: Time.current.iso8601
        }
      ].freeze

      def weekly
        # Haftalık raporu döndür (en güncel olanı)
        report = REPORTS_DATA.last
        render json: report
      end

      def index
        render json: REPORTS_DATA
      end
    end
  end
end
