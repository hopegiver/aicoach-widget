export default {
  html: `
    <!-- 채팅 화면 -->
    <div class="aicoach-view aicoach-chat-view" data-view="chat" style="display: none;">
      <div class="aicoach-messages-container">
        <div class="aicoach-messages"></div>
      </div>
    </div>
  `,

  styles: `
    .aicoach-messages {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 100%;
    }

    .aicoach-message {
      display: flex;
      gap: 12px;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .aicoach-message-ai {
      flex-direction: row;
    }

    .aicoach-message-user {
      flex-direction: row-reverse;
    }

    .aicoach-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }

    .aicoach-message-ai .aicoach-avatar {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
    }

    .aicoach-message-user .aicoach-avatar {
      background: #f3f4f6;
    }

    .aicoach-bubble {
      padding: 12px 16px;
      border-radius: 16px;
      max-width: 70%;
      line-height: 1.5;
    }

    .aicoach-message-ai .aicoach-bubble {
      background: #f3f4f6;
      color: #1f2937;
      border-bottom-left-radius: 4px;
    }

    .aicoach-message-user .aicoach-bubble {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .aicoach-typing {
      display: flex;
      gap: 4px;
      padding: 12px;
    }

    .aicoach-typing span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #9ca3af;
      animation: typing 1.4s infinite;
    }

    .aicoach-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .aicoach-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 1;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }
  `
};
