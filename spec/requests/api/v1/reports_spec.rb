require 'swagger_helper'

RSpec.describe 'Reports API', type: :request do
  path '/api/v1/reports/weekly' do
    get 'Get weekly report' do
      tags 'Reports'
      produces 'application/json'

      response '200', 'weekly report found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            period_start: { type: :string },
            period_end: { type: :string },
            average_score: { type: :number },
            vocabulary_count: { type: :integer },
            generated_summary: { type: :string, nullable: true },
            created_at: { type: :string },
            updated_at: { type: :string }
          },
          required: ['id', 'period_start', 'period_end', 'average_score', 'vocabulary_count']

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to have_key('average_score')
          expect(data).to have_key('vocabulary_count')
          expect(data).to have_key('period_start')
          expect(data).to have_key('period_end')
        end
      end
    end
  end
end

