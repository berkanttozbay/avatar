module Api
  module V1
    class VideosController < BaseController
      # Sabit test verileri
      VIDEOS_DATA = [
        { 
          id: 1, 
          subject_id: 1, 
          title: 'Meeting Basics', 
          video_url: 'https://example.com/videos/meeting-basics.mp4', 
          transcript: 'Hello, welcome to our lesson on meeting basics. Today we will learn how to participate effectively in business meetings. Let\'s start with common phrases used in meetings...', 
          duration_seconds: 300,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: 2, 
          subject_id: 1, 
          title: 'Email Writing', 
          video_url: 'https://example.com/videos/email-writing.mp4', 
          transcript: 'When writing professional emails, it is important to be clear and concise. Let us start with the subject line. A good subject line should summarize the content...', 
          duration_seconds: 450,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: 3, 
          subject_id: 2, 
          title: 'Greetings and Introductions', 
          video_url: 'https://example.com/videos/greetings.mp4', 
          transcript: 'In this lesson, we will learn common greetings and how to introduce yourself in English. Let\'s start with basic greetings like "Hello", "Hi", and "Good morning"...', 
          duration_seconds: 240,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: 4, 
          subject_id: 2, 
          title: 'Ordering at a Restaurant', 
          video_url: 'https://example.com/videos/restaurant.mp4', 
          transcript: 'Today we will practice ordering food at a restaurant. This is a very useful skill for daily life. Let\'s learn common phrases like "I would like to order..."', 
          duration_seconds: 360,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: 5, 
          subject_id: 3, 
          title: 'Essay Structure', 
          video_url: 'https://example.com/videos/essay-structure.mp4', 
          transcript: 'Academic essays follow a specific structure. We will learn about introduction, body paragraphs, and conclusion. The introduction should present your thesis statement...', 
          duration_seconds: 600,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: 6, 
          subject_id: 3, 
          title: 'Citation and References', 
          video_url: 'https://example.com/videos/citations.mp4', 
          transcript: 'Proper citation is essential in academic writing. Today we will cover APA and MLA formats. Let\'s start with in-text citations...', 
          duration_seconds: 540,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ].freeze

      def index
        if params[:subject_id]
          videos = VIDEOS_DATA.select { |v| v[:subject_id] == params[:subject_id].to_i }
          render json: videos
        else
          render json: VIDEOS_DATA
        end
      end

      def show
        video = VIDEOS_DATA.find { |v| v[:id] == params[:id].to_i }
        if video
          render json: video
        else
          render json: { error: 'Video not found' }, status: :not_found
        end
      end
    end
  end
end
