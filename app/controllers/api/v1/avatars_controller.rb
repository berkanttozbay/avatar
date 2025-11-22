module Api
  module V1
    class AvatarsController < BaseController
      # Sabit test verileri
      AVATARS_DATA = [
        { 
          id: 1, 
          name: 'Emma', 
          personality_prompt: 'Friendly, encouraging, and patient. Always provides positive feedback and helps learners feel confident.', 
          voice_id: 'voice_emma_001', 
          image_url: 'https://example.com/avatars/emma.png',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: 2, 
          name: 'John', 
          personality_prompt: 'Professional, clear, and structured. Focuses on business communication and formal language.', 
          voice_id: 'voice_john_001', 
          image_url: 'https://example.com/avatars/john.png',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ].freeze

      def index
        render json: AVATARS_DATA
      end

      def show
        avatar = AVATARS_DATA.find { |a| a[:id] == params[:id].to_i }
        if avatar
          render json: avatar
        else
          render json: { error: 'Avatar not found' }, status: :not_found
        end
      end
    end
  end
end
