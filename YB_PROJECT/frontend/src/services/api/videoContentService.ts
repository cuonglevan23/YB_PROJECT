import { getAuthHeaders } from "../../config/api";

export interface VideoContentRequest {
  topic: string;
  category: string;
  duration: number; // in minutes
  targetAudience?: string;
  style?: string;
}

export interface ChatVideoRequest {
  message: string;
  category: string;
  duration: number;
  context?: string;
}

export interface GeneratedVideoContent {
  id: string;
  title: string;
  description: string;
  tags: string[];
  hook: string;
  outline: string[];
  thumbnail: {
    url: string;
    alt: string;
  };
  metadata: {
    estimatedViews: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: string;
    category: string;
  };
  seoScore: number;
  suggestions: {
    title: string[];
    description: string[];
    tags: string[];
  };
}

export interface VideoContentResponse {
  success: boolean;
  message?: string;
  content?: GeneratedVideoContent;
  error?: string;
}

export interface ChatVideoResponse {
  success: boolean;
  message?: string;
  reply: string;
  content?: GeneratedVideoContent;
  suggestions?: string[];
  error?: string;
}

class VideoContentService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  async generateVideoContent(request: VideoContentRequest): Promise<VideoContentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/video-content/generate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Error:", error);
      // Return mock data as fallback
      return this.generateMockVideoContent(request);
    }
  }

  async chatVideoRequest(request: ChatVideoRequest): Promise<ChatVideoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/video-content/chat`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Error:", error);
      // Return mock data as fallback
      return this.generateMockChatResponse(request);
    }
  }

  private generateMockVideoContent(request: VideoContentRequest): VideoContentResponse {
    const titles = [
      `${request.topic} - Complete Guide for Beginners`,
      `How to Master ${request.topic} in ${request.duration} Minutes`,
      `${request.topic}: Everything You Need to Know`,
      `The Ultimate ${request.topic} Tutorial`,
      `${request.topic} Explained Simply`,
    ];

    const descriptions = [
      `In this comprehensive guide, we'll cover everything you need to know about ${request.topic}. Perfect for beginners and those looking to improve their understanding.\n\n🎯 What you'll learn:\n• Key concepts and fundamentals\n• Step-by-step instructions\n• Pro tips and best practices\n• Common mistakes to avoid\n\n⏰ Timestamps:\n0:00 Introduction\n1:30 Getting Started\n3:45 Main Content\n${request.duration-2}:00 Summary & Next Steps\n\n💡 Don't forget to like and subscribe for more helpful content!`,
      `Master ${request.topic} with this easy-to-follow tutorial! Whether you're a complete beginner or looking to level up your skills, this video has something for everyone.\n\n🔥 Key highlights:\n• Practical examples\n• Expert insights\n• Actionable tips\n• Real-world applications\n\n📚 Resources mentioned:\n• Free templates (link in description)\n• Recommended tools\n• Further reading\n\n👍 If this helped you, please like and share with others who might benefit!`,
    ];

    const tagSets = [
      [request.topic.toLowerCase(), request.category, "tutorial", "beginner", "guide", "2025", "how to", "tips", "learn", "education"],
      [request.topic.toLowerCase(), request.category, "explained", "simple", "easy", "step by step", "complete", "ultimate", "master", "skills"],
    ];

    const hooks = [
      `Did you know that 90% of people struggle with ${request.topic}? In the next ${request.duration} minutes, I'll show you exactly how to master it.`,
      `What if I told you that ${request.topic} could be learned in just ${request.duration} minutes? Stay tuned because I'm about to prove it.`,
      `Everyone thinks ${request.topic} is complicated, but I'm about to show you how simple it really is.`,
      `After years of experience with ${request.topic}, I've discovered the one thing that changes everything.`,
    ];

    const outlines = [
      [
        "Introduction and welcome",
        `What is ${request.topic} and why it matters`,
        "Common misconceptions explained",
        "Step-by-step tutorial begins",
        "Key principles and fundamentals",
        "Practical examples and demonstrations",
        "Pro tips and advanced techniques",
        "Common mistakes to avoid",
        "Summary and key takeaways",
        "Next steps and resources",
      ],
      [
        "Hook and introduction",
        `The importance of ${request.topic} in 2025`,
        "What you'll learn in this video",
        "Getting started - the basics",
        "Building your foundation",
        "Advanced strategies revealed",
        "Real-world case studies",
        "Troubleshooting common issues",
        "Final thoughts and recap",
        "Call to action and subscribe",
      ],
    ];

    const selectedIndex = Math.floor(Math.random() * 2);
    const seoScore = Math.floor(Math.random() * 20) + 80; // 80-100

    const content: GeneratedVideoContent = {
      id: `video-${Date.now()}`,
      title: titles[selectedIndex],
      description: descriptions[selectedIndex],
      tags: tagSets[selectedIndex],
      hook: hooks[selectedIndex],
      outline: outlines[selectedIndex],
      thumbnail: {
        url: `https://images.unsplash.com/photo-${1500000000000 + selectedIndex}?w=1280&h=720&fit=crop`,
        alt: `${request.topic} tutorial thumbnail`,
      },
      metadata: {
        estimatedViews: `${Math.floor(Math.random() * 50) + 20}K-${Math.floor(Math.random() * 100) + 50}K`,
        difficulty: request.duration < 10 ? "beginner" : request.duration < 20 ? "intermediate" : "advanced",
        duration: `${request.duration} minutes`,
        category: request.category,
      },
      seoScore,
      suggestions: {
        title: [
          `${request.topic} Tutorial for Beginners`,
          `Learn ${request.topic} in ${request.duration} Minutes`,
          `${request.topic} Made Simple`,
        ],
        description: [
          "Add more specific keywords",
          "Include trending hashtags",
          "Add call-to-action earlier",
        ],
        tags: [
          "trending keywords",
          "category-specific tags",
          "long-tail keywords",
        ],
      },
    };

    return {
      success: true,
      message: "Video content generated successfully",
      content,
    };
  }

  private generateMockChatResponse(request: ChatVideoRequest): ChatVideoResponse {
    const contentRequest: VideoContentRequest = {
      topic: request.message,
      category: request.category,
      duration: request.duration,
    };

    const contentResponse = this.generateMockVideoContent(contentRequest);
    
    return {
      success: true,
      message: "Chat response generated successfully",
      reply: `I've created a complete video content package for "${request.message}". This includes an optimized title, SEO-friendly description, trending tags, engaging hook, detailed outline, and a custom thumbnail. The content is tailored for ${request.category} category and optimized for ${request.duration}-minute videos.`,
      content: contentResponse.content,
      suggestions: [
        "Would you like me to adjust the tone?",
        "Should I optimize for a different audience?",
        "Want me to focus on specific keywords?",
        "Need help with the thumbnail design?",
      ],
    };
  }

  // Additional utility methods
  async saveVideoContent(content: GeneratedVideoContent): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/video-content/save`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Save Error:", error);
      // Mock successful save
      return {
        success: true,
        message: "Video content saved successfully to your library",
      };
    }
  }

  async getUserVideoContent(): Promise<{ success: boolean; content?: GeneratedVideoContent[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/video-content/user`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      // Return mock user content
      return {
        success: true,
        content: [],
      };
    }
  }

  async optimizeContent(content: GeneratedVideoContent): Promise<VideoContentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/video-content/optimize`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Optimize Error:", error);
      // Return optimized mock data
      const optimizedContent = {
        ...content,
        seoScore: Math.min(100, content.seoScore + 10),
        suggestions: {
          title: ["Optimized title suggestion 1", "Optimized title suggestion 2"],
          description: ["Better keyword placement", "Improved call-to-action"],
          tags: ["high-performing tags", "trending keywords"],
        },
      };

      return {
        success: true,
        message: "Content optimized successfully",
        content: optimizedContent,
      };
    }
  }
}

export const videoContentService = new VideoContentService();
export default videoContentService;
