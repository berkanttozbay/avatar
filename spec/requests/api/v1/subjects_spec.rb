require 'swagger_helper'

RSpec.describe 'Subjects API', type: :request do
  path '/api/v1/subjects' do
    get 'List all subjects' do
      tags 'Subjects'
      produces 'application/json'

      response '200', 'subjects found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              title: { type: :string },
              level: { type: :integer },
              icon_url: { type: :string, nullable: true },
              created_at: { type: :string },
              updated_at: { type: :string }
            },
            required: ['id', 'title', 'level']
          }

        let!(:subject1) { Subject.create!(title: 'Business English', level: 3, icon_url: 'https://example.com/icon1.png') }
        let!(:subject2) { Subject.create!(title: 'Daily Conversation', level: 2, icon_url: 'https://example.com/icon2.png') }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(2)
        end
      end
    end
  end

  path '/api/v1/subjects/{id}' do
    get 'Show a subject' do
      tags 'Subjects'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string

      response '200', 'subject found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            title: { type: :string },
            level: { type: :integer },
            icon_url: { type: :string, nullable: true },
            created_at: { type: :string },
            updated_at: { type: :string }
          },
          required: ['id', 'title', 'level']

        let(:id) { Subject.create!(title: 'Business English', level: 3, icon_url: 'https://example.com/icon1.png').id }
        run_test!
      end

      response '404', 'subject not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end

