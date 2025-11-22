require 'swagger_helper'

RSpec.describe 'Videos API', type: :request do
  let!(:subject) { Subject.create!(title: 'Business English', level: 3, icon_url: 'https://example.com/icon1.png') }

  path '/api/v1/subjects/{subject_id}/videos' do
    get 'List videos for a subject' do
      tags 'Videos'
      produces 'application/json'
      parameter name: :subject_id, in: :path, type: :string

      response '200', 'videos found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              subject_id: { type: :integer },
              title: { type: :string },
              video_url: { type: :string },
              transcript: { type: :string, nullable: true },
              duration_seconds: { type: :integer },
              created_at: { type: :string },
              updated_at: { type: :string }
            },
            required: ['id', 'subject_id', 'title', 'video_url', 'duration_seconds']
          }

        let(:subject_id) { subject.id }
        let!(:video1) { Video.create!(subject: subject, title: 'Meeting Basics', video_url: 'https://example.com/video1.mp4', transcript: 'Hello, welcome to...', duration_seconds: 300) }
        let!(:video2) { Video.create!(subject: subject, title: 'Email Writing', video_url: 'https://example.com/video2.mp4', transcript: 'When writing emails...', duration_seconds: 450) }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(2)
        end
      end
    end
  end
end

