/**
 * DialogueX - AI Chatbot Application
 * A modern, responsive chatbot interface with advanced features
 */

class DialogueX {
    constructor() {
        this.chatHistory = {};
        this.currentChatId = null;
        this.isTyping = false;
        this.messageCounter = 0;
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.loadChatHistory();
        this.setupEventListeners();
        this.setupTheme();
        this.createNewChat();
        
        // Setup auto-resize for textarea
        this.setupAutoResize();
        
        // Setup markdown renderer
        this.setupMarkdown();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // New chat button
        const newChatBtn = document.getElementById('new-chat-btn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => this.createNewChat());
        }

        // Message input and send button
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
        
        if (messageInput && sendButton) {
            messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
            messageInput.addEventListener('input', () => this.handleInputChange());
            sendButton.addEventListener('click', () => this.sendMessage());
        }

        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebarOverlay && sidebar) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
            sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        }
    }

    /**
     * Setup theme functionality
     */
    setupTheme() {
        const savedTheme = localStorage.getItem('dialoguex-theme') || 'light';
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const html = document.documentElement;
        html.classList.toggle('dark');
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('dialoguex-theme', currentTheme);
    }

    /**
     * Setup auto-resize functionality for textarea
     */
    setupAutoResize() {
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 120) + 'px';
            });
        }
    }

    /**
     * Setup markdown renderer with syntax highlighting
     */
    setupMarkdown() {
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true,
                highlight: function(code, lang) {
                    if (typeof Prism !== 'undefined' && lang && Prism.languages[lang]) {
                        try {
                            return Prism.highlight(code, Prism.languages[lang], lang);
                        } catch (e) {
                            console.warn('Syntax highlighting failed:', e);
                        }
                    }
                    return code;
                }
            });
        }
    }

    /**
     * Handle keyboard events
     */
    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    /**
     * Handle input changes
     */
    handleInputChange() {
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
        
        if (messageInput && sendButton) {
            const hasContent = messageInput.value.trim().length > 0;
            sendButton.disabled = !hasContent || this.isTyping;
        }
    }

    /**
     * Load chat history from localStorage
     */
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('dialoguex-chat-history');
            this.chatHistory = saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading chat history:', error);
            this.chatHistory = {};
        }
        this.renderChatHistory();
    }

    /**
     * Save chat history to localStorage
     */
    saveChatHistory() {
        try {
            localStorage.setItem('dialoguex-chat-history', JSON.stringify(this.chatHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    /**
     * Create a new chat
     */
    createNewChat() {
        const chatId = 'chat_' + Date.now();
        this.currentChatId = chatId;
        
        this.chatHistory[chatId] = {
            id: chatId,
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.clearChatInterface();
        this.showWelcomeMessage();
        this.renderChatHistory();
        this.saveChatHistory();
    }

    /**
     * Clear the chat interface
     */
    clearChatInterface() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.innerHTML = '';
        }
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.innerHTML = `
                <div id="welcome-message" class="text-center py-12">
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-robot text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to DialogueX</h3>
                    <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                        I'm your AI assistant. Ask me anything and I'll do my best to help you!
                    </p>
                </div>
            `;
        }
    }

    /**
     * Send a message
     */
    async sendMessage() {
        const messageInput = document.getElementById('message-input');
        if (!messageInput || this.isTyping) return;

        const message = messageInput.value.trim();
        if (!message) return;

        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        this.handleInputChange();

        // Add user message
        this.addMessage('user', message);
        
        // Remove welcome message if it exists
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            this.addMessage('assistant', response);
            
            // Update chat title if it's the first message
            if (this.chatHistory[this.currentChatId].messages.length === 2) {
                this.updateChatTitle(message);
            }
            
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        }

        // Save chat history
        this.saveChatHistory();
        this.renderChatHistory();
    }

    /**
     * Add a message to the chat
     */
    addMessage(sender, content, timestamp = null) {
        const messageId = ++this.messageCounter;
        const messageTimestamp = timestamp || new Date().toISOString();
        
        const message = {
            id: messageId,
            sender,
            content,
            timestamp: messageTimestamp
        };

        // Add to chat history
        if (this.currentChatId && this.chatHistory[this.currentChatId]) {
            this.chatHistory[this.currentChatId].messages.push(message);
            this.chatHistory[this.currentChatId].updatedAt = messageTimestamp;
        }

        // Render message
        this.renderMessage(message);
        
        // Auto-scroll to bottom
        this.scrollToBottom();
    }

    /**
     * Render a message in the chat interface
     */
    renderMessage(message) {
        const chatContainer = document.getElementById('chat-container');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message-bubble ${message.sender} p-4 mb-4 animate-fade-in`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (message.sender === 'assistant' && typeof marked !== 'undefined') {
            // Render markdown for assistant messages
            contentDiv.innerHTML = marked.parse(message.content);
            
            // Add copy buttons to code blocks
            this.addCopyButtonsToCodeBlocks(contentDiv);
        } else {
            // Plain text for user messages
            contentDiv.textContent = message.content;
        }
        
        messageDiv.appendChild(contentDiv);
        
        // Add timestamp
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp text-xs opacity-60 mt-2';
        timestampDiv.textContent = this.formatTimestamp(message.timestamp);
        messageDiv.appendChild(timestampDiv);
        
        chatContainer.appendChild(messageDiv);
    }

    /**
     * Add copy buttons to code blocks
     */
    addCopyButtonsToCodeBlocks(container) {
        const codeBlocks = container.querySelectorAll('pre code');
        codeBlocks.forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
            
            pre.parentElement.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            wrapper.appendChild(copyButton);
        });
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        this.isTyping = true;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
        }
        this.scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.classList.add('hidden');
        }
        this.handleInputChange();
    }

    /**
     * Get AI response from OpenAI API
     */
    async getAIResponse(message) {
        // Replace with your actual OpenAI API key
        const apiKey = 'YOUR_OPENAI_API_KEY_HERE';
        
        // If no API key is provided, return a placeholder response
        if (apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
            return this.getPlaceholderResponse(message);
        }
        
        try {
            // Build conversation context from current chat
            const chatMessages = [];
            if (this.chatHistory[this.currentChatId]) {
                const recentMessages = this.chatHistory[this.currentChatId].messages.slice(-10);
                recentMessages.forEach(msg => {
                    chatMessages.push({
                        role: msg.sender === 'user' ? 'user' : 'assistant',
                        content: msg.content
                    });
                });
            }
            
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

    /**
     * Get placeholder response when no API key is configured
     */
    getPlaceholderResponse(message) {
        const responses = [
            `Thank you for your message: "${message}". This is a **placeholder response** since no OpenAI API key is configured. 

To enable real AI responses:
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Replace \`YOUR_OPENAI_API_KEY_HERE\` in the script.js file
3. Enjoy intelligent conversations!

## Features Available:
- ✅ **Markdown rendering** (like this formatted text)
- ✅ **Code syntax highlighting**
- ✅ **Dark/Light mode toggle**
- ✅ **Chat history persistence**
- ✅ **Mobile responsive design**
- ✅ **Typing animations**

\`\`\`javascript
// Example code block
function setupDialogueX() {
    const apiKey = 'your-actual-api-key-here';
    return new DialogueX(apiKey);
}
\`\`\``,
            
            `I received your message about "${message}". Since this is a **demo version**, I'm providing sample responses to showcase the interface features.

### What you can test:
- **Markdown formatting** with *italics* and **bold**
- Code blocks with syntax highlighting
- Lists and other formatting
- The beautiful chat interface!

> This is a blockquote example to show how nicely formatted text appears in the chat.

Try typing different messages to see various placeholder responses!`,

            `Hello! You asked about "${message}". This is DialogueX's demo mode showing off the beautiful interface and features.

## Interface Features:
1. **Message Bubbles** - Clean, modern design
2. **Timestamps** - See when messages were sent
3. **Auto-scroll** - Always stays at the latest message
4. **Responsive Design** - Works on all devices

\`\`\`python
# Sample code with syntax highlighting
def greet_user(name):
    return f"Hello {name}, welcome to DialogueX!"

print(greet_user("Developer"))
\`\`\`

**Ready to connect to real AI?** Just add your OpenAI API key!`
        ];

        // Simulate AI thinking time
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                resolve(randomResponse);
            }, 1000 + Math.random() * 2000);
        });
    }

    /**
     * Update chat title based on first message
     */
    updateChatTitle(firstMessage) {
        if (this.currentChatId && this.chatHistory[this.currentChatId]) {
            const title = firstMessage.length > 30 
                ? firstMessage.substring(0, 30) + '...' 
                : firstMessage;
            this.chatHistory[this.currentChatId].title = title;
        }
    }

    /**
     * Render chat history in sidebar
     */
    renderChatHistory() {
        const chatHistoryContainer = document.getElementById('chat-history');
        if (!chatHistoryContainer) return;

        const chats = Object.values(this.chatHistory)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        chatHistoryContainer.innerHTML = '';

        if (chats.length === 0) {
            chatHistoryContainer.innerHTML = `
                <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                    <i class="fas fa-comments text-3xl mb-2"></i>
                    <p>No chat history yet</p>
                </div>
            `;
            return;
        }

        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = `chat-history-item ${chat.id === this.currentChatId ? 'active' : ''}`;
            chatItem.innerHTML = `
                <div class="font-medium text-gray-900 dark:text-white truncate">${chat.title}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${this.formatTimestamp(chat.updatedAt)}
                </div>
            `;
            
            chatItem.addEventListener('click', () => this.loadChat(chat.id));
            chatHistoryContainer.appendChild(chatItem);
        });
    }

    /**
     * Load a specific chat
     */
    loadChat(chatId) {
        if (!this.chatHistory[chatId] || this.isTyping) return;

        this.currentChatId = chatId;
        this.clearChatInterface();
        
        const chat = this.chatHistory[chatId];
        if (chat.messages.length === 0) {
            this.showWelcomeMessage();
        } else {
            chat.messages.forEach(message => this.renderMessage(message));
            this.scrollToBottom();
        }
        
        this.renderChatHistory();
        this.closeSidebar();
    }

    /**
     * Format timestamp for display
     */
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    }

    /**
     * Scroll to bottom of chat
     */
    scrollToBottom() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    }

    /**
     * Toggle sidebar for mobile
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('hidden');
        }
    }

    /**
     * Close sidebar
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        }
    }
}

// Initialize DialogueX when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the chat page
    if (document.getElementById('chat-container')) {
        window.dialogueX = new DialogueX();
    }
});