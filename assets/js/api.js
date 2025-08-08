/**
 * OpenAI API integration for DialogueX
 * Placeholder implementation ready for API key insertion
 */

class OpenAIAPI {
    constructor() {
        // TODO: Replace with your actual OpenAI API key
        this.apiKey = null; // Set to null for demo mode
        this.baseURL = 'https://api.openai.com/v1';
        this.model = 'gpt-3.5-turbo';
        this.maxTokens = 1000;
        this.temperature = 0.7;
    }

    /**
     * Set the OpenAI API key
     * @param {string} apiKey - Your OpenAI API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Check if API key is configured
     * @returns {boolean} - True if API key is set
     */
    isConfigured() {
        return this.apiKey !== null && this.apiKey.trim() !== '';
    }

    /**
     * Send a message to OpenAI API
     * @param {Array} messages - Array of message objects
     * @returns {Promise<string>} - AI response
     */
    async sendMessage(messages) {
        if (!this.isConfigured()) {
            return this.getDemoResponse(messages);
        }

        try {
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    max_tokens: this.maxTokens,
                    temperature: this.temperature,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content;
            } else {
                throw new Error('No response from API');
            }
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to get AI response. Please check your API key and connection.');
        }
    }

    /**
     * Get a demo response when API key is not configured
     * @param {Array} messages - Array of message objects
     * @returns {Promise<string>} - Demo response
     */
    async getDemoResponse(messages) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const lastMessage = messages[messages.length - 1];
        const userMessage = lastMessage.content.toLowerCase();

        // Demo responses based on user input
        const demoResponses = {
            hello: "Hello! I'm the DialogueX AI assistant. I'm currently running in demo mode since no OpenAI API key is configured. To enable full AI functionality, please add your OpenAI API key to the configuration.",
            
            help: "I'd be happy to help! Here are some things I can assist with when properly configured:\n\n• **Code explanations** - Explain programming concepts\n• **Writing assistance** - Help improve your writing\n• **Problem solving** - Break down complex problems\n• **General questions** - Answer questions on various topics\n\n*Note: I'm in demo mode. Add your OpenAI API key for full functionality.*",
            
            code: "Here's a simple JavaScript function example:\n\n```javascript\nfunction greetUser(name) {\n    return `Hello, ${name}! Welcome to DialogueX.`;\n}\n\n// Usage\nconsole.log(greetUser('Developer'));\n```\n\nThis function takes a name parameter and returns a personalized greeting. When you add your OpenAI API key, I can help with much more complex coding tasks!",
            
            javascript: "JavaScript is a versatile programming language! Here are some key concepts:\n\n• **Variables**: `let`, `const`, `var`\n• **Functions**: Regular and arrow functions\n• **Objects**: `{ key: 'value' }`\n• **Arrays**: `[1, 2, 3]`\n• **Promises**: For asynchronous operations\n\n```javascript\n// Example: Async function\nasync function fetchData() {\n    try {\n        const response = await fetch('/api/data');\n        return await response.json();\n    } catch (error) {\n        console.error('Error:', error);\n    }\n}\n```",
            
            api: "To configure the OpenAI API:\n\n1. **Get an API key** from [OpenAI's website](https://platform.openai.com/api-keys)\n2. **Set your key** in the `api.js` file:\n   ```javascript\n   this.apiKey = 'your-api-key-here';\n   ```\n3. **Reload the page** and start chatting!\n\n**Security Note**: In production, store API keys securely on your server, not in client-side code.",
            
            features: "DialogueX includes these awesome features:\n\n✨ **Dark/Light Mode** - Toggle with persistent preference\n📝 **Markdown Support** - Full markdown rendering\n🎨 **Code Highlighting** - Syntax highlighting for code blocks\n💾 **Chat History** - Automatic localStorage persistence\n📱 **Responsive Design** - Works on all devices\n⚡ **Fast & Modern** - Built with Tailwind CSS\n🔧 **OpenAI Ready** - Easy API integration\n\nTry asking about code, writing help, or general questions!"
        };

        // Find matching response or provide default
        for (const [keyword, response] of Object.entries(demoResponses)) {
            if (userMessage.includes(keyword)) {
                return response;
            }
        }

        // Check for code-related keywords
        if (userMessage.includes('function') || userMessage.includes('write') || userMessage.includes('python') || userMessage.includes('html') || userMessage.includes('css')) {
            return demoResponses.code;
        }

        // Default response
        return `Thanks for your message! I'm currently in demo mode since no OpenAI API key is configured.\n\n**Your message:** "${lastMessage.content}"\n\nTo get real AI responses, please:\n1. Get an OpenAI API key from https://platform.openai.com/\n2. Add it to the configuration in \`assets/js/api.js\`\n3. Reload the page\n\nTry asking about "help", "code", "javascript", "api", or "features" to see some demo responses!`;
    }

    /**
     * Format messages for OpenAI API
     * @param {Array} chatHistory - Chat history from localStorage
     * @returns {Array} - Formatted messages for API
     */
    formatMessages(chatHistory) {
        const systemMessage = {
            role: 'system',
            content: 'You are a helpful AI assistant integrated into DialogueX, a modern chat interface. Provide helpful, accurate, and engaging responses. Format your responses using markdown when appropriate, including code blocks with syntax highlighting.'
        };

        const formattedMessages = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
        }));

        return [systemMessage, ...formattedMessages];
    }

    /**
     * Get available models (for future implementation)
     * @returns {Array} - List of available models
     */
    getAvailableModels() {
        return [
            { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
            { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
            { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Faster GPT-4' }
        ];
    }

    /**
     * Set model configuration
     * @param {string} model - Model name
     * @param {number} temperature - Temperature (0-1)
     * @param {number} maxTokens - Max tokens
     */
    configure(model, temperature = 0.7, maxTokens = 1000) {
        this.model = model;
        this.temperature = temperature;
        this.maxTokens = maxTokens;
    }
}

// Initialize API instance
window.openaiAPI = new OpenAIAPI();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OpenAIAPI;
}