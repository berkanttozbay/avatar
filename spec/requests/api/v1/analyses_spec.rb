require 'swagger_helper'

RSpec.describe 'Analyses API', type: :request do
  let!(:subject) { Subject.create!(title: 'Business English', level: 3, icon_url: 'https://example.com/icon1.png') }
  let!(:video) { Video.create!(subject: subject, title: 'Meeting Basics', video_url: 'https://example.com/video1.mp4', transcript: 'Hello, welcome to...', duration_seconds: 300) }

  path '/api/v1/analyses' do
    post 'Create an analysis' do
      tags 'Analyses'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :analysis, in: :body, schema: {
        type: :object,
        properties: {
          analysis: {
            type: :object,
            properties: {
              video_id: { type: :integer },
              user_audio_url: { type: :string }
            },
            required: ['video_id', 'user_audio_url']
          }
        }
      }

      response '201', 'analysis created' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            video_id: { type: :integer },
            user_audio_url: { type: :string },
            stt_output: { type: :string, nullable: true },
            grammar_score: { type: :integer },
            pronunciation_feedback: { type: :string, nullable: true },
            created_at: { type: :string },
            updated_at: { type: :string }
          },
          required: ['id', 'video_id', 'user_audio_url', 'grammar_score']

        let(:analysis) { { analysis: { video_id: video.id, user_audio_url: 'https://example.com/audio.mp3' } } }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['video_id']).to eq(video.id)
          expect(data['grammar_score']).to be_between(0, 100)
        end
      end

      response '422', 'invalid request' do
        let(:analysis) { { analysis: { video_id: nil, user_audio_url: nil } } }
        run_test!
      end
    end
  end
end

