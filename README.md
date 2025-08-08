# DialogueX - Modern AI Chatbot Website

DialogueX is a sleek, modern AI chatbot website inspired by ChatGPT. Built with HTML, Tailwind CSS, and JavaScript, it features a professional design with dark/light mode, markdown support, and OpenAI integration.

## 🚀 Features

- **Professional Landing Page** - Clean, modern design with DialogueX branding
- **Stylish Chat Interface** - Distinct user and AI message bubbles with smooth animations
- **Dark/Light Mode Toggle** - Persistent theme preference using localStorage
- **Markdown & Code Support** - Full markdown rendering with syntax-highlighted code blocks
- **Typing Animation** - Realistic typing indicators for better UX
- **Mobile Responsive** - Optimized for all screen sizes with mobile-first approach
- **Chat History** - Automatic persistence using localStorage
- **OpenAI Integration** - Ready for API key insertion with demo mode
- **Accessibility** - Built with accessibility considerations
- **Modern Animations** - Smooth transitions and fade-in effects

## 🛠️ Technology Stack

- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **Vanilla JavaScript** - No framework dependencies
- **Marked.js** - Markdown parsing and rendering
- **Prism.js** - Syntax highlighting for code blocks
- **OpenAI API** - AI response generation (requires API key)

## 📁 Project Structure

```
dialoguex/
├── index.html              # Landing page
├── chat.html               # Chat interface
├── assets/
│   ├── css/
│   │   └── styles.css      # Custom styles and animations
│   ├── js/
│   │   ├── main.js         # Landing page functionality
│   │   ├── chat.js         # Chat interface logic
│   │   ├── theme.js        # Dark/light mode management
│   │   └── api.js          # OpenAI API integration
│   └── images/
│       └── logo.svg        # DialogueX logo
└── README.md               # Project documentation
```

## 🚀 Getting Started

1. **Clone or download** the repository
2. **Open `index.html`** in your web browser
3. **Click "Start Chatting"** to access the chat interface
4. **Try the demo responses** or configure your OpenAI API key

### Setting up OpenAI Integration

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open `assets/js/api.js`
3. Replace `this.apiKey = null;` with `this.apiKey = 'your-api-key-here';`
4. Reload the page

**Security Note**: For production use, implement server-side API calls to keep your API key secure.

## 💡 Usage

### Landing Page
- Navigate between sections using smooth scrolling
- Toggle between dark and light themes
- Click "Start Chatting" to access the chat interface

### Chat Interface
- Type messages in the input field
- Press Enter or click send to submit
- Use Shift+Enter for new lines
- View chat history automatically saved locally
- Clear chat history using the clear button
- Try suggestion prompts for quick starts

### Demo Mode
When no API key is configured, DialogueX runs in demo mode with intelligent responses to:
- "hello" - Welcome message
- "help" - Feature overview
- "code" or "javascript" - Code examples
- "api" - Setup instructions
- "features" - Feature list

## 🎨 Customization

### Themes
- Modify color schemes in the Tailwind config section
- Add custom CSS in `assets/css/styles.css`
- Theme preferences are automatically saved

### API Configuration
- Change models, temperature, and max tokens in `api.js`
- Add custom system prompts
- Implement streaming responses

### Animations
- Customize animation durations in the CSS
- Modify fade-in effects and transitions
- Add new animation keyframes

## 📱 Responsive Design

DialogueX is fully responsive with:
- Mobile-first design approach
- Optimized touch targets
- Adaptive layouts for all screen sizes
- Smooth scrolling and interactions

## ♿ Accessibility

Built with accessibility in mind:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences

## 🔧 Technical Details

### Browser Support
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight vanilla JavaScript
- CDN-hosted dependencies
- Optimized images and assets
- Efficient DOM manipulation

### Security
- No sensitive data in localStorage
- Client-side API calls (demo only)
- Input sanitization for XSS prevention

## 🚀 Deployment

DialogueX is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload the files to your hosting provider.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check the demo responses for common questions
- Review the code documentation

---

Built with ❤️ for the AI community. Experience the future of conversational interfaces with DialogueX!
