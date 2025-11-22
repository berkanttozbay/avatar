module Api
  module V1
    class AnalysesController < BaseController
      # Sabit test verileri
      ANALYSES_DATA = [
        {
          id: 1,
          video_id: 1,
          user_audio_url: 'https://example.com/audio/user-response-001.mp3',
          stt_output: 'I think the meeting was very productive and we discussed all the important points.',
          grammar_score: 85,
          pronunciation_feedback: 'Your pronunciation is clear. Try to emphasize the word "productive" a bit more for better clarity.',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ].freeze

      def index
        render json: ANALYSES_DATA
      end

      def show
        analysis = ANALYSES_DATA.find { |a| a[:id] == params[:id].to_i }
        if analysis
          render json: analysis
        else
          render json: { error: 'Analysis not found' }, status: :not_found
        end
      end

      def create
        # Yeni analiz oluştur (mock veri)
        new_analysis = {
          id: ANALYSES_DATA.length + 1,
          video_id: params[:analysis][:video_id].to_i,
          user_audio_url: params[:analysis][:user_audio_url],
          stt_output: "Mock STT output for: #{params[:analysis][:user_audio_url]}",
          grammar_score: rand(60..95),
          pronunciation_feedback: "Your pronunciation is good. Try to focus on word stress and intonation patterns.",
          created_at: Time.current.iso8601,
          updated_at: Time.current.iso8601
        }
        
        render json: new_analysis, status: :created
      end

      private

      def analysis_params
        params.require(:analysis).permit(:video_id, :user_audio_url)
      end
    end
  end
end
