async getAIResponse(message) {
    const apiKey = 'sk-abcdef1234567890abcdef1234567890abcdef12';
    
    try {
        // Build conversation context from current chat
        const chatMessages = [];
        if (this.chatHistory[this.currentChatId]) {
            const recentMessages = this.chatHistory[this.currentChatId].messages.slice(-10); // Last 10 messages for context
            recentMessages.forEach(msg => {
                chatMessages.push({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.content
                });
            });
        }
        
        // Add current message
        chatMessages.push({
            role: 'user',
            content: message
        });
        
        // Add system message at the beginning
        chatMessages.unshift({
            role: 'system',
            content: 'You are DialogueX, a helpful, intelligent, and friendly AI assistant. Provide clear, concise, and helpful responses. Format your responses using markdown when appropriate.'
        });

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: chatMessages,
                max_tokens: 1500,
                temperature: 0.7,
                top_p: 0.9,
                frequency_penalty: 0,
                presence_penalty: 0,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from OpenAI API');
        }
        
        return data.choices[0].message.content.trim();
        
    } catch (error) {
        console.error('OpenAI API Error:', error);
        
        // Provide different error messages based on error type
        if (error.message.includes('API key')) {
            return 'Sorry, there\'s an issue with the API configuration. Please check the API key.';
        } else if (error.message.includes('quota') || error.message.includes('billing')) {
            return 'Sorry, the API quota has been exceeded. Please try again later.';
        } else if (error.message.includes('rate limit')) {
            return 'Sorry, too many requests. Please wait a moment and try again.';
        } else {
            return `Sorry, I encountered an error: ${error.message}. Please try again.`;
        }
    }
}