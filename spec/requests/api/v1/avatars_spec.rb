require 'swagger_helper'

RSpec.describe 'Avatars API', type: :request do
  path '/api/v1/avatars' do
    get 'List all avatars' do
      tags 'Avatars'
      produces 'application/json'

      response '200', 'avatars found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              personality_prompt: { type: :string, nullable: true },
              voice_id: { type: :string },
              image_url: { type: :string, nullable: true },
              created_at: { type: :string },
              updated_at: { type: :string }
            },
            required: ['id', 'name', 'voice_id']
          }

        let!(:avatar1) { Avatar.create!(name: 'Emma', personality_prompt: 'Friendly and encouraging', voice_id: 'voice_001', image_url: 'https://example.com/emma.png') }
        let!(:avatar2) { Avatar.create!(name: 'John', personality_prompt: 'Professional and clear', voice_id: 'voice_002', image_url: 'https://example.com/john.png') }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(2)
        end
      end
    end
  end
end

