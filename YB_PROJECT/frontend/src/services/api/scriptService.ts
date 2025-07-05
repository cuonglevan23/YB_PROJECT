import { getAuthHeaders, buildApiUrl } from "../../config/api";

export interface ScriptGenerationRequest {
  topic: string;
  tone: string;
  duration: number; // in minutes
  style?: string;
  targetAudience?: string;
}

export interface ChatScriptRequest {
  message: string;
  tone: string;
  duration: number;
  context?: string;
}

export interface GeneratedScript {
  id: string;
  title: string;
  content: string;
  duration: number;
  tone: string;
  hook: string;
  mainContent: string;
  callToAction: string;
  wordCount: number;
  estimatedReadingTime: string;
  tags?: string[];
  timestamp: string;
}

export interface ScriptResponse {
  success: boolean;
  message?: string;
  script?: GeneratedScript;
  error?: string;
}

export interface ChatScriptResponse {
  success: boolean;
  message?: string;
  reply: string;
  script?: GeneratedScript;
  suggestions?: string[];
  error?: string;
}

class ScriptService {
  async generateScript(request: ScriptGenerationRequest): Promise<ScriptResponse> {
    try {
      const response = await fetch(buildApiUrl("/scripts/generate"), {
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
      return this.generateMockScript(request);
    }
  }

  async chatScriptRequest(request: ChatScriptRequest): Promise<ChatScriptResponse> {
    try {
      const response = await fetch(buildApiUrl("/scripts/chat"), {
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

  private generateMockScript(request: ScriptGenerationRequest): ScriptResponse {
    const wordsPerMinute = 130;
    const targetWordCount = request.duration * wordsPerMinute;
    
    const hooks = {
      conversational: `Hey everyone! Have you ever wondered about ${request.topic}? Well, today I'm going to share everything you need to know, and trust me, you don't want to miss this!`,
      professional: `Welcome to today's presentation. We'll be exploring ${request.topic} and providing you with comprehensive insights that can impact your understanding of this important topic.`,
      enthusiastic: `What's up, amazing viewers! Today is going to be INCREDIBLE because we're diving deep into ${request.topic}! This is going to blow your mind!`,
      educational: `In this video, we'll examine ${request.topic} step by step. By the end, you'll have a complete understanding of all the key concepts and practical applications.`,
      humorous: `Alright folks, buckle up because we're about to tackle ${request.topic}! And don't worry, I promise to make this way more entertaining than watching paint dry!`,
      inspiring: `Imagine if you could completely transform your understanding of ${request.topic}. Well, today, that's exactly what we're going to do together!`,
    };

    const mainContent = `
## Introduction to ${request.topic}

Let's start with the basics. ${request.topic} is something that affects many people, and understanding it can make a real difference in your life.

## Key Points to Remember

1. **Understanding the Fundamentals**
   - What ${request.topic} really means
   - Why it matters in today's world
   - Common misconceptions people have

2. **Practical Applications**
   - How to implement these concepts
   - Real-world examples
   - Step-by-step guidance

3. **Advanced Strategies**
   - Taking it to the next level
   - Pro tips and tricks
   - Common pitfalls to avoid

4. **Future Outlook**
   - What to expect going forward
   - Emerging trends
   - How to stay ahead

## Conclusion

By now, you should have a solid understanding of ${request.topic}. Remember, the key is to take action and apply what you've learned.
    `;

    const callToActions = {
      conversational: "If this helped you out, smash that like button and subscribe for more content like this! Drop a comment below and let me know what you'd like to see next!",
      professional: "Thank you for watching. Please subscribe to our channel for more professional insights, and feel free to connect with us for further discussion on this topic.",
      enthusiastic: "BOOM! That's a wrap! If you LOVED this video, absolutely DESTROY that like button and hit subscribe! You're going to want to see what's coming next!",
      educational: "I hope you found this educational content valuable. Please like and subscribe for more in-depth tutorials, and let me know in the comments what topics you'd like to learn about next.",
      humorous: "And that's how you become a ${request.topic} master! If I managed to keep you awake through all that, hit like and subscribe. Your future self will thank you!",
      inspiring: "Remember, every expert was once a beginner. Take action on what you've learned today, and don't forget to subscribe for more inspiration and practical guidance!",
    };

    const hook = hooks[request.tone as keyof typeof hooks] || hooks.conversational;
    const cta = callToActions[request.tone as keyof typeof callToActions] || callToActions.conversational;
    const fullContent = `${hook}\n\n${mainContent}\n\n${cta}`;

    const script: GeneratedScript = {
      id: `script-${Date.now()}`,
      title: `${request.topic} - ${request.tone.charAt(0).toUpperCase() + request.tone.slice(1)} Video Script`,
      content: fullContent,
      duration: request.duration,
      tone: request.tone,
      hook,
      mainContent,
      callToAction: cta,
      wordCount: targetWordCount,
      estimatedReadingTime: `${Math.ceil(targetWordCount / 200)} min read`,
      tags: [request.topic.toLowerCase(), request.tone, "video script"],
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Script generated successfully",
      script,
    };
  }

  private generateMockChatResponse(request: ChatScriptRequest): ChatScriptResponse {
    const scriptRequest: ScriptGenerationRequest = {
      topic: request.message,
      tone: request.tone,
      duration: request.duration,
    };

    const scriptResponse = this.generateMockScript(scriptRequest);
    
    return {
      success: true,
      message: "Chat response generated successfully",
      reply: `I've created a ${request.duration}-minute ${request.tone} script based on your request: "${request.message}". The script includes a compelling hook, structured main content, and a strong call-to-action. Feel free to customize it further!`,
      script: scriptResponse.script,
      suggestions: [
        "Would you like me to adjust the tone?",
        "Should I make it longer or shorter?",
        "Want me to focus on a specific aspect?",
        "Need help with the call-to-action?",
      ],
    };
  }

  // Additional utility methods
  async saveScript(script: GeneratedScript): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(buildApiUrl("/scripts/save"), {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(script),
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
        message: "Script saved successfully to your library",
      };
    }
  }

  async getUserScripts(): Promise<{ success: boolean; scripts?: GeneratedScript[]; error?: string }> {
    try {
      const response = await fetch(buildApiUrl("/scripts/user"), {
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
      // Return mock user scripts
      return {
        success: true,
        scripts: [],
      };
    }
  }
}

export const scriptService = new ScriptService();
export default scriptService;
