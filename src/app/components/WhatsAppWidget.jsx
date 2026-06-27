"use client";
import { useState, useEffect, useRef } from "react";
import { portfolioData } from "../../../lib/portfolioData";
import "./WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const widgetRef = useRef(null);
  const chatWindowRef = useRef(null);
  const chatBodyRef = useRef(null);
  const messageInputRef = useRef(null);
  const { personal } = portfolioData;

  useEffect(() => {
    // Show widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Close widget when clicking outside
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard visibility
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;
        const isKeyboardOpen = heightDiff > 150; // Threshold for keyboard
        setIsKeyboardVisible(isKeyboardOpen);

        if (chatWindowRef.current) {
          if (isKeyboardOpen) {
            chatWindowRef.current.classList.add("keyboard-visible");
            // Scroll to bottom of chat body
            setTimeout(() => {
              if (chatBodyRef.current) {
                chatBodyRef.current.scrollTop =
                  chatBodyRef.current.scrollHeight;
              }
            }, 100);
          } else {
            chatWindowRef.current.classList.remove("keyboard-visible");
          }
        }
      }
    };

    // Use visualViewport API for better keyboard detection
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (messageInputRef.current) {
          messageInputRef.current.focus();
        }
      }, 300);
    }
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setNotificationCount(0);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappNumber = personal.whatsapp.replace("+", "");
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank",
      );
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    setMessage(reply);
    // Focus input after setting message
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }, 100);
  };

  const quickReplies = [
    "Hi! I'm interested in your services",
    "I'd like to discuss a project",
    "Can you tell me about your experience?",
    "I have a question about your portfolio",
  ];

  return (
    <>
      {isVisible && (
        <div className="whatsapp-widget" ref={widgetRef}>
          {/* Chat Button */}
          <button
            className={`whatsapp-button ${isOpen ? "active" : ""}`}
            onClick={toggleWidget}
            aria-label="Chat on WhatsApp"
          >
            <div className="whatsapp-icon-wrapper">
              <i className="fab fa-whatsapp"></i>
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </div>
          </button>

          {/* Chat Window */}
          {isOpen && (
            <div className="whatsapp-chat-window" ref={chatWindowRef}>
              {/* Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="header-text">
                    <h4>{personal.name}</h4>
                    <span className="online-status">
                      <span className="status-dot"></span>
                      Online
                    </span>
                  </div>
                </div>
                <button className="close-chat" onClick={() => setIsOpen(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Chat Body */}
              <div className="chat-body" ref={chatBodyRef}>
                {/* Welcome Message */}
                <div className="message received">
                  <div className="message-content">
                    <p>👋 Hi there! I'm {personal.name}</p>
                    <span className="message-time">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="message received">
                  <div className="message-content">
                    <p>
                      I'd love to connect with you! Feel free to ask me anything
                      about my work or projects.
                    </p>
                    <span className="message-time">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Quick Replies */}
                <div className="quick-replies">
                  <p className="quick-reply-label">Quick replies:</p>
                  <div className="quick-reply-buttons">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        className="quick-reply-btn"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Footer */}
              <div className="chat-footer">
                <textarea
                  ref={messageInputRef}
                  className="message-input"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={1}
                />
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
