# DialogueX

A sleek, modern AI chatbot website inspired by ChatGPT. Built with HTML, Tailwind CSS, and JavaScript featuring dark/light mode, markdown support, and OpenAI integration.

![DialogueX](https://img.shields.io/badge/DialogueX-AI%20Chatbot-blue?style=for-the-badge&logo=openai)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 Modern Design
- **Professional Landing Page** with DialogueX branding and compelling CTA
- **Sleek Chat Interface** with user and AI message bubbles
- **Futuristic, Minimalist Theme** with gradient backgrounds and modern typography
- **Mobile-Responsive Layout** that works perfectly on desktop, tablet, and mobile

### 🌓 Theme Support
- **Light/Dark Mode Toggle** with persistent preference storage
- **Smooth Transitions** between themes
- **System Theme Detection** respects user's OS preference

### 💬 Chat Features
- **Real-time Typing Animations** while AI generates responses
- **Markdown Support** with syntax highlighting for code blocks
- **Copy Code Functionality** for easy code snippet sharing
- **Message Timestamps** for better conversation tracking
- **Auto-scroll** to latest messages
- **Fade-in Animations** for new messages

### 💾 Data Persistence
- **LocalStorage Integration** for persistent chat history
- **Multiple Chat Sessions** with automatic title generation
- **Chat History Sidebar** for easy navigation between conversations

### 🔧 Technical Features
- **OpenAI API Integration** ready for API key insertion
- **Comprehensive Error Handling** with user-friendly messages
- **Loading States** and animations for better UX
- **Accessibility Compliance** with proper ARIA labels and keyboard navigation
- **Performance Optimized** with efficient DOM manipulation

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/bradnen/dialoguex.git
cd dialoguex
```

### 2. Open in Browser
Simply open `index.html` in your web browser to see the landing page, or `chat.html` for the chat interface.

### 3. Configure OpenAI API (Optional)
To enable real AI responses:
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Open `script.js` and replace `YOUR_OPENAI_API_KEY_HERE` with your actual API key
3. Save the file and refresh the chat interface

```javascript
// In script.js, line ~340
const apiKey = 'your-actual-openai-api-key-here';
```

## 📁 File Structure

```
dialoguex/
├── index.html          # Professional landing page
├── chat.html           # Main chat interface
├── script.js           # Core application logic
├── styles.css          # Custom styles and animations
└── README.md           # Project documentation
```

## 🛠️ Built With

- **HTML5** - Semantic markup and accessibility
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **JavaScript (ES6+)** - Modern JavaScript with classes and async/await
- **Font Awesome** - Beautiful icons
- **Marked.js** - Markdown parser for message formatting
- **Prism.js** - Syntax highlighting for code blocks
- **OpenAI API** - AI-powered responses (requires API key)

## 🎯 Key Components

### Landing Page (`index.html`)
- Hero section with compelling value proposition
- Feature showcase with beautiful cards
- Dark/light theme toggle
- Responsive navigation
- Call-to-action button leading to chat interface

### Chat Interface (`chat.html`)
- Clean, modern chat layout
- Sidebar with chat history
- Message input with auto-resize
- Typing indicators and animations
- Mobile-responsive with collapsible sidebar

### Core Application (`script.js`)
- `DialogueX` class managing the entire application
- Chat history management with localStorage
- OpenAI API integration with error handling
- Theme management and persistence
- Message rendering with markdown support
- Mobile-responsive sidebar controls

### Custom Styling (`styles.css`)
- Custom animations and transitions
- Message bubble styling
- Code block formatting with copy buttons
- Responsive design utilities
- Accessibility enhancements
- Print styles and high contrast support

## 🌟 Usage Examples

### Starting a New Chat
1. Navigate to the landing page (`index.html`)
2. Click "Start Chatting" to open the chat interface
3. Type your message and press Enter or click Send
4. Enjoy the beautiful typing animation while the AI responds

### Using Markdown
DialogueX supports full markdown formatting:

```markdown
**Bold text** and *italic text*
- Bullet points
- [Links](https://example.com)
- `Inline code`

```javascript
// Code blocks with syntax highlighting
function greet() {
    console.log("Hello, DialogueX!");
}
```
```

### Managing Chats
- Click "New Chat" to start a fresh conversation
- Previous chats are automatically saved in the sidebar
- Click any chat in the history to resume the conversation
- Chat titles are automatically generated from the first message

## 🔧 Customization

### Themes and Colors
Modify the Tailwind configuration in the HTML files to customize colors:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    // Customize primary colors here
                }
            }
        }
    }
}
```

### API Configuration
Replace the placeholder API key in `script.js`:

```javascript
// Line ~340 in script.js
const apiKey = 'your-actual-openai-api-key-here';
```

### Adding New Features
The modular structure makes it easy to add new features:
- Extend the `DialogueX` class in `script.js`
- Add new styles in `styles.css`
- Update the UI in the HTML files

## 📱 Browser Support

DialogueX works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- **No Data Collection** - All chat history is stored locally
- **Secure API Communication** - HTTPS-only requests to OpenAI
- **No Third-party Tracking** - Privacy-focused design
- **Local Storage Only** - Your conversations never leave your device (except for API calls)

## 🚧 Roadmap

- [ ] Voice input/output support
- [ ] File upload and image analysis
- [ ] Chat export functionality
- [ ] Plugin system for extensibility
- [ ] Multi-language support
- [ ] Advanced chat search
- [ ] Custom AI model support

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by ChatGPT's clean interface design
- Built with love for the developer community
- Thanks to OpenAI for providing the AI capabilities
- Tailwind CSS for making beautiful designs accessible

---

**Ready to start chatting?** Open `index.html` in your browser and experience the future of AI conversation! 🚀
