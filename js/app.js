// ChatGPT Clone - Interactive Functionality
// Handles user interactions, message sending, and UI updates

class ChatGPTClone {
    constructor() {
        this.messageInput = null;
        this.sendBtn = null;
        this.chatMessages = null;
        this.actionButtons = {};
        this.isLoading = false;
        
        this.init();
    }

    init() {
        try {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupElements());
            } else {
                this.setupElements();
            }
        } catch (error) {
            console.error('Error initializing ChatGPT Clone:', error);
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }

    setupElements() {
        try {
            // Get DOM elements
            this.messageInput = document.getElementById('messageInput');
            this.sendBtn = document.getElementById('sendBtn');
            this.chatMessages = document.getElementById('chatMessages');
            
            // Get action buttons
            this.actionButtons = {
                attach: document.getElementById('attachBtn'),
                search: document.getElementById('searchBtn'),
                study: document.getElementById('studyBtn'),
                voice: document.getElementById('voiceBtn')
            };

            // Get auth buttons
            this.authButtons = {
                login: document.querySelector('.btn-primary'),
                signup: document.querySelector('.btn-secondary')
            };

            // Validate elements exist
            if (!this.messageInput || !this.sendBtn || !this.chatMessages) {
                throw new Error('Required DOM elements not found');
            }

            this.setupEventListeners();
            this.setupInputHandling();
            
            // Focus on input field
            this.messageInput.focus();
            
            console.log('ChatGPT Clone initialized successfully');
        } catch (error) {
            console.error('Error setting up elements:', error);
            this.showError('Failed to set up the interface. Please refresh the page.');
        }
    }

    setupEventListeners() {
        try {
            // Send button click
            this.sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSendMessage();
            });

            // Enter key in textarea
            this.messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });

            // Input change to enable/disable send button
            this.messageInput.addEventListener('input', () => {
                this.updateSendButton();
                this.autoResizeTextarea();
            });

            // Action buttons
            Object.entries(this.actionButtons).forEach(([key, button]) => {
                if (button) {
                    button.addEventListener('click', () => this.handleActionButton(key));
                }
            });

            // Auth buttons
            if (this.authButtons.login) {
                this.authButtons.login.addEventListener('click', () => this.handleLogin());
            }
            if (this.authButtons.signup) {
                this.authButtons.signup.addEventListener('click', () => this.handleSignup());
            }

            // Prevent form submission on Enter
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target === this.messageInput && !e.shiftKey) {
                    e.preventDefault();
                }
            });

        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    setupInputHandling() {
        try {
            // Auto-resize textarea
            this.messageInput.style.height = 'auto';
            this.messageInput.style.overflowY = 'hidden';
            
            // Initial button state
            this.updateSendButton();
        } catch (error) {
            console.error('Error setting up input handling:', error);
        }
    }

    updateSendButton() {
        try {
            const hasText = this.messageInput.value.trim().length > 0;
            this.sendBtn.disabled = !hasText || this.isLoading;
        } catch (error) {
            console.error('Error updating send button:', error);
        }
    }

    autoResizeTextarea() {
        try {
            this.messageInput.style.height = 'auto';
            const scrollHeight = this.messageInput.scrollHeight;
            const maxHeight = 120; // Max height in pixels
            
            if (scrollHeight > maxHeight) {
                this.messageInput.style.height = maxHeight + 'px';
                this.messageInput.style.overflowY = 'auto';
            } else {
                this.messageInput.style.height = scrollHeight + 'px';
                this.messageInput.style.overflowY = 'hidden';
            }
        } catch (error) {
            console.error('Error auto-resizing textarea:', error);
        }
    }

    async handleSendMessage() {
        try {
            const message = this.messageInput.value.trim();
            
            if (!message || this.isLoading) {
                return;
            }

            // Set loading state
            this.setLoading(true);
            
            // Add user message
            this.addMessage(message, 'user');
            
            // Clear input
            this.messageInput.value = '';
            this.autoResizeTextarea();
            this.updateSendButton();
            
            // Simulate AI response
            await this.simulateAIResponse();
            
        } catch (error) {
            console.error('Error handling send message:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    addMessage(content, type = 'user') {
        try {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = content;
            
            messageDiv.appendChild(messageContent);
            this.chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            this.scrollToBottom();
            
        } catch (error) {
            console.error('Error adding message:', error);
        }
    }

    async simulateAIResponse() {
        try {
            // Show typing indicator
            const typingDiv = this.addTypingIndicator();
            
            // Simulate network delay
            await this.delay(1000 + Math.random() * 2000);
            
            // Remove typing indicator
            if (typingDiv && typingDiv.parentNode) {
                typingDiv.parentNode.removeChild(typingDiv);
            }
            
            // Add AI response
            const responses = [
                "I'm a demo version of ChatGPT. This is a simulated response to show the interface functionality.",
                "Hello! I'm here to help. Please note this is a clone interface for demonstration purposes.",
                "Thanks for your message! This is a sample response from the ChatGPT clone interface.",
                "I understand you're testing the interface. Everything seems to be working correctly!",
                "This is a demonstration of how the ChatGPT interface works. The actual AI functionality would require integration with OpenAI's API."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(randomResponse, 'assistant');
            
        } catch (error) {
            console.error('Error simulating AI response:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
        }
    }

    addTypingIndicator() {
        try {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message assistant typing';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            
            this.chatMessages.appendChild(typingDiv);
            this.scrollToBottom();
            
            return typingDiv;
        } catch (error) {
            console.error('Error adding typing indicator:', error);
            return null;
        }
    }

    scrollToBottom() {
        try {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        } catch (error) {
            console.error('Error scrolling to bottom:', error);
        }
    }

    setLoading(loading) {
        try {
            this.isLoading = loading;
            this.updateSendButton();
            
            if (loading) {
                document.body.classList.add('loading');
            } else {
                document.body.classList.remove('loading');
            }
        } catch (error) {
            console.error('Error setting loading state:', error);
        }
    }

    handleActionButton(action) {
        try {
            const messages = {
                attach: 'File attachment feature would be implemented here.',
                search: 'Search functionality would be implemented here.',
                study: 'Study mode feature would be implemented here.',
                voice: 'Voice input feature would be implemented here.'
            };
            
            console.log(`${action} button clicked`);
            
            // Show a temporary message
            this.showTemporaryMessage(messages[action] || 'Feature not implemented yet.');
            
        } catch (error) {
            console.error(`Error handling ${action} button:`, error);
        }
    }

    handleLogin() {
        try {
            console.log('Login button clicked');
            this.showTemporaryMessage('Login functionality would redirect to authentication page.');
        } catch (error) {
            console.error('Error handling login:', error);
        }
    }

    handleSignup() {
        try {
            console.log('Signup button clicked');
            this.showTemporaryMessage('Signup functionality would redirect to registration page.');
        } catch (error) {
            console.error('Error handling signup:', error);
        }
    }

    showTemporaryMessage(message) {
        try {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.className = 'temporary-notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--text-primary);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                z-index: 1000;
                font-size: 14px;
                max-width: 300px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                animation: fadeInUp 0.3s ease-out;
            `;
            
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 3000);
            
        } catch (error) {
            console.error('Error showing temporary message:', error);
        }
    }

    showError(message) {
        try {
            console.error('Application error:', message);
            
            // Create error notification
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-notification';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #ff6b6b;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                z-index: 1001;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            `;
            
            document.body.appendChild(errorDiv);
            
            // Remove after 5 seconds
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 5000);
            
        } catch (error) {
            console.error('Error showing error message:', error);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Additional CSS for typing indicator and notifications
const additionalStyles = `
    .typing-indicator {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 8px 0;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--text-muted);
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .temporary-notification,
    .error-notification {
        transition: all 0.3s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
const chatApp = new ChatGPTClone();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatGPTClone;
}
