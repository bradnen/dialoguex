/**
 * Chat interface functionality for DialogueX
 * Handles message sending, receiving, history management, and UI interactions
 */

class ChatInterface {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.messageIdCounter = 0;
        this.init();
    }

    init() {
        this.setupElements();
        this.loadChatHistory();
        this.setupEventListeners();
        this.setupAutoResize();
        this.checkWelcomeState();
    }

    setupElements() {
        this.chatContainer = document.getElementById('chat-container');
        this.chatMessages = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        this.chatForm = document.getElementById('chat-form');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.welcomeMessage = document.getElementById('welcome-message');
        this.clearChatButton = document.getElementById('clear-chat');
        this.charCount = document.getElementById('char-count');
        this.statusMessage = document.getElementById('status-message');
    }

    setupEventListeners() {
        // Form submission
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Input events
        this.messageInput.addEventListener('input', () => {
            this.updateCharCount();
            this.toggleSendButton();
        });

        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Clear chat button
        this.clearChatButton.addEventListener('click', () => {
            this.clearChat();
        });

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(button => {
            button.addEventListener('click', () => {
                const suggestion = button.querySelector('.text-xs').textContent;
                this.messageInput.value = suggestion;
                this.updateCharCount();
                this.toggleSendButton();
                this.messageInput.focus();
            });
        });
    }

    setupAutoResize() {
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    updateCharCount() {
        const count = this.messageInput.value.length;
        this.charCount.textContent = count;
        
        if (count > 1800) {
            this.charCount.classList.add('text-red-500');
        } else if (count > 1500) {
            this.charCount.classList.add('text-yellow-500');
            this.charCount.classList.remove('text-red-500');
        } else {
            this.charCount.classList.remove('text-red-500', 'text-yellow-500');
        }
    }

    toggleSendButton() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText || this.isTyping;
    }

    async sendMessage() {
        const messageText = this.messageInput.value.trim();
        if (!messageText || this.isTyping) return;

        // Hide welcome message
        this.hideWelcomeMessage();

        // Add user message
        const userMessage = {
            id: ++this.messageIdCounter,
            sender: 'user',
            content: messageText,
            timestamp: new Date().toISOString()
        };

        this.addMessage(userMessage);
        this.chatHistory.push(userMessage);

        // Clear input
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.updateCharCount();
        this.toggleSendButton();

        // Show typing indicator
        this.showTyping();

        try {
            // Get AI response
            const formattedMessages = window.openaiAPI.formatMessages(this.chatHistory);
            const aiResponse = await window.openaiAPI.sendMessage(formattedMessages);

            // Add AI message
            const aiMessage = {
                id: ++this.messageIdCounter,
                sender: 'ai',
                content: aiResponse,
                timestamp: new Date().toISOString()
            };

            this.hideTyping();
            this.addMessage(aiMessage);
            this.chatHistory.push(aiMessage);

            // Save to localStorage
            this.saveChatHistory();

        } catch (error) {
            this.hideTyping();
            this.showError(`Error: ${error.message}`);
        }
    }

    addMessage(message) {
        const messageElement = this.createMessageElement(message);
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add fade-in animation
        requestAnimationFrame(() => {
            messageElement.classList.add('fade-in-up');
        });
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${message.sender} animate-fade-in`;
        messageDiv.setAttribute('data-message-id', message.id);

        const isUser = message.sender === 'user';
        const alignmentClass = isUser ? 'justify-end' : 'justify-start';
        const avatarGradient = isUser 
            ? 'from-blue-500 to-purple-600' 
            : 'from-blue-500 to-purple-600';

        const avatar = isUser ? 
            `<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>` :
            `<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"/>
            </svg>`;

        const timestamp = this.formatTimestamp(message.timestamp);
        const processedContent = this.processMessageContent(message.content);

        messageDiv.innerHTML = `
            <div class="flex items-start space-x-3 ${alignmentClass}">
                ${!isUser ? `
                    <div class="w-8 h-8 bg-gradient-to-r ${avatarGradient} rounded-full flex items-center justify-center flex-shrink-0">
                        ${avatar}
                    </div>
                ` : ''}
                <div class="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div class="message-content rounded-2xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'} px-4 py-3 shadow-sm">
                        ${processedContent}
                    </div>
                    <div class="timestamp text-xs text-gray-500 dark:text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}">
                        ${timestamp}
                    </div>
                </div>
                ${isUser ? `
                    <div class="w-8 h-8 bg-gradient-to-r ${avatarGradient} rounded-full flex items-center justify-center flex-shrink-0">
                        ${avatar}
                    </div>
                ` : ''}
            </div>
        `;

        return messageDiv;
    }

    processMessageContent(content) {
        // Process markdown using marked.js
        if (typeof marked !== 'undefined') {
            // Configure marked for security and features
            marked.setOptions({
                highlight: function(code, lang) {
                    if (typeof Prism !== 'undefined' && lang && Prism.languages[lang]) {
                        return Prism.highlight(code, Prism.languages[lang], lang);
                    }
                    return code;
                },
                breaks: true,
                gfm: true
            });

            return marked.parse(content);
        }
        
        // Fallback: simple text processing
        return this.simpleMarkdownProcessor(content);
    }

    simpleMarkdownProcessor(text) {
        // Basic markdown processing as fallback
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        
        return date.toLocaleDateString();
    }

    showTyping() {
        this.isTyping = true;
        this.typingIndicator.classList.remove('hidden');
        this.toggleSendButton();
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        this.typingIndicator.classList.add('hidden');
        this.toggleSendButton();
    }

    hideWelcomeMessage() {
        if (this.welcomeMessage && !this.welcomeMessage.classList.contains('hidden')) {
            this.welcomeMessage.style.transition = 'opacity 0.3s ease-out';
            this.welcomeMessage.style.opacity = '0';
            setTimeout(() => {
                this.welcomeMessage.classList.add('hidden');
            }, 300);
        }
    }

    checkWelcomeState() {
        if (this.chatHistory.length > 0) {
            this.hideWelcomeMessage();
        }
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        });
    }

    saveChatHistory() {
        try {
            localStorage.setItem('dialoguex-chat-history', JSON.stringify(this.chatHistory));
        } catch (error) {
            console.error('Failed to save chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('dialoguex-chat-history');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
                this.messageIdCounter = Math.max(...this.chatHistory.map(m => m.id), 0);
                
                // Render saved messages
                this.chatHistory.forEach(message => {
                    this.addMessage(message);
                });
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
            this.chatHistory = [];
        }
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
            this.chatHistory = [];
            this.chatMessages.innerHTML = '';
            this.welcomeMessage.classList.remove('hidden');
            this.welcomeMessage.style.opacity = '1';
            this.messageIdCounter = 0;
            
            // Clear localStorage
            localStorage.removeItem('dialoguex-chat-history');
            
            this.showStatus('Chat history cleared', 'success');
        }
    }

    showError(message) {
        const errorMessage = {
            id: ++this.messageIdCounter,
            sender: 'ai',
            content: `❌ **Error**: ${message}\n\nPlease try again or check your connection.`,
            timestamp: new Date().toISOString()
        };
        
        this.addMessage(errorMessage);
    }

    showStatus(message, type = 'info') {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `mt-2 text-sm text-center ${
            type === 'success' ? 'text-green-600 dark:text-green-400' :
            type === 'error' ? 'text-red-600 dark:text-red-400' :
            'text-gray-500 dark:text-gray-400'
        }`;
        this.statusMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.statusMessage.classList.add('hidden');
        }, 3000);
    }
}

// Initialize chat interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatInterface = new ChatInterface();
});

// Also initialize immediately in case script is loaded after DOM
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    window.chatInterface = new ChatInterface();
}