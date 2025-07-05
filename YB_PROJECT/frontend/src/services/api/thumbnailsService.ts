import { API_CONFIG, getAuthHeaders, buildApiUrl } from "../../config/api";

export interface ThumbnailGenerationRequest {
  prompt: string;
  style: string;
  count: number;
}

export interface ThumbnailOption {
  id: string;
  url: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface ThumbnailGenerationResponse {
  success: boolean;
  thumbnails: ThumbnailOption[];
  message?: string;
}

export interface ChatThumbnailRequest {
  message: string;
  style: string;
  count?: number;
}

export interface ChatThumbnailResponse {
  success: boolean;
  reply: string;
  thumbnails?: ThumbnailOption[];
  message?: string;
}

class ThumbnailsService {
  async generateThumbnails(request: ThumbnailGenerationRequest): Promise<ThumbnailGenerationResponse> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.THUMBNAILS.GENERATE), {
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
      console.error("Error generating thumbnails:", error);
      throw error;
    }
  }

  async chatThumbnailRequest(request: ChatThumbnailRequest): Promise<ChatThumbnailResponse> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.THUMBNAILS.CHAT), {
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
      console.error("Error in chat thumbnail request:", error);
      throw error;
    }
  }

  async getThumbnailHistory(): Promise<ThumbnailOption[]> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.THUMBNAILS.HISTORY), {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.thumbnails || [];
    } catch (error) {
      console.error("Error fetching thumbnail history:", error);
      // Return empty array for fallback
      return [];
    }
  }

  async deleteThumbnail(thumbnailId: string): Promise<boolean> {
    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.THUMBNAILS.DELETE}/${thumbnailId}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting thumbnail:", error);
      throw error;
    }
  }

  async downloadThumbnail(thumbnailUrl: string, filename: string): Promise<void> {
    try {
      const response = await fetch(thumbnailUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading thumbnail:", error);
      throw error;
    }
  }

  // Mock data generators for development
  generateMockThumbnails(request: ThumbnailGenerationRequest): ThumbnailGenerationResponse {
    const mockThumbnails: ThumbnailOption[] = [];
    
    // Create realistic thumbnail URLs based on style
    const styleImages = {
      modern: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=225&fit=crop'
      ],
      gaming: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop'
      ],
      minimalist: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=225&fit=crop'
      ],
      colorful: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=225&fit=crop'
      ],
      professional: [
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=225&fit=crop'
      ],
      creative: [
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=225&fit=crop'
      ]
    };

    const styleImageSet = styleImages[request.style as keyof typeof styleImages] || styleImages.modern;
    
    for (let i = 0; i < request.count; i++) {
      mockThumbnails.push({
        id: `mock-${Date.now()}-${i}`,
        url: styleImageSet[i % styleImageSet.length],
        prompt: request.prompt,
        style: request.style,
        createdAt: new Date().toISOString(),
      });
    }

    return {
      success: true,
      thumbnails: mockThumbnails,
      message: "Thumbnails generated successfully",
    };
  }

  generateMockChatResponse(request: ChatThumbnailRequest): ChatThumbnailResponse {
    const responses = [
      "I'll create some amazing thumbnails for you! Let me generate a few options based on your description.",
      "Great idea! I'm generating some eye-catching thumbnails that will help your video stand out.",
      "Perfect! I'm creating some thumbnails that match your vision. Here are a few options:",
      "Excellent concept! Let me design some thumbnails that will grab viewers' attention.",
    ];

    const mockThumbnails = this.generateMockThumbnails({
      prompt: request.message,
      style: request.style,
      count: request.count || 3,
    });

    return {
      success: true,
      reply: responses[Math.floor(Math.random() * responses.length)],
      thumbnails: mockThumbnails.thumbnails,
      message: "Chat response generated successfully",
    };
  }
}

export const thumbnailsService = new ThumbnailsService();
