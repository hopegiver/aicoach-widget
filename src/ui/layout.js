export default {
  html: `
    <!-- 토글 버튼 -->
    <button class="aicoach-toggle" aria-label="AI Coach 열기">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>

    <!-- 챗봇 컨테이너 -->
    <div class="aicoach-chat">
      <!-- 헤더 -->
      <div class="aicoach-header">
        <button class="aicoach-header-back" id="aicoach-header-back" style="display: none;" aria-label="뒤로 가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div class="aicoach-title">
          <svg class="aicoach-title-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <span class="aicoach-title-text">AI 코치</span>
        </div>
        <button class="aicoach-close" aria-label="닫기">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 화면들이 여기에 들어감 -->
      {{SCREENS}}

      <!-- 메시지 입력창 (전체 레이아웃 하단 고정) -->
      <div class="aicoach-input-area-fixed">
        <textarea class="aicoach-input" placeholder="메시지를 입력하세요..." rows="2"></textarea>
        <button class="aicoach-btn aicoach-send">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `,

  styles: `
    /* 공통 스타일 */
    .aicoach-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .aicoach-toggle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, opacity 0.2s;
      z-index: 10;
    }

    .aicoach-toggle:hover {
      transform: scale(1.1);
    }

    /* 위젯이 열리면 토글 버튼 숨기기 */
    .aicoach-widget.widget-open .aicoach-toggle {
      opacity: 0;
      pointer-events: none;
    }

    .aicoach-chat {
      position: absolute;
      bottom: 0;
      right: 0;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(10px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .aicoach-chat.open {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }

    .aicoach-header {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .aicoach-header-back {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      opacity: 0.9;
      transition: opacity 0.2s;
    }

    .aicoach-header-back:hover {
      opacity: 1;
    }

    .aicoach-title {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      justify-content: center;
    }

    .aicoach-title-text {
      font-size: 16px;
      font-weight: 600;
    }

    .aicoach-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aicoach-view {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .aicoach-chat-view {
      flex: 1;
      padding: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }

    .aicoach-messages-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 20px;
      min-height: 0;
    }

    /* 공통 버튼 스타일 */
    .aicoach-btn {
      padding: 14px 20px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: transform 0.2s;
    }

    .aicoach-btn-primary {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
    }

    .aicoach-btn-primary:hover {
      transform: translateY(-2px);
    }

    .aicoach-btn-secondary {
      background: #f9fafb;
      color: #1f2937;
      border: 2px solid #e5e7eb;
    }

    .aicoach-btn-secondary:hover {
      transform: translateY(-2px);
    }

    .aicoach-btn-small {
      padding: 8px 12px;
      font-size: 13px;
    }

    .aicoach-btn-highlight {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      position: relative;
    }

    .aicoach-btn-highlight:hover {
      transform: translateY(-2px);
    }

    /* 공통 콘텐츠 스타일 */
    .aicoach-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .aicoach-content textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      font-family: inherit;
      margin: 20px 0;
      resize: vertical;
    }

    .aicoach-content .aicoach-btn {
      max-width: 280px;
      width: 100%;
    }

    .aicoach-subtitle {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    /* 공통 폼 요소 스타일 */
    .aicoach-form-group {
      margin-bottom: 20px;
      width: 100%;
    }

    .aicoach-label {
      display: block;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .aicoach-text-input,
    .aicoach-select,
    .aicoach-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .aicoach-text-input:focus,
    .aicoach-select:focus,
    .aicoach-textarea:focus {
      outline: none;
      border-color: #4f46e5;
    }

    .aicoach-textarea {
      resize: vertical;
    }

    .aicoach-hint {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }

    .aicoach-radio-group {
      display: flex;
      gap: 12px;
    }

    .aicoach-radio-label {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .aicoach-radio-label input[type="radio"] {
      margin-right: 6px;
    }

    .aicoach-radio-label:has(input:checked) {
      border-color: #4f46e5;
      background: #eef2ff;
      color: #4f46e5;
      font-weight: 600;
    }

    /* 입력창 스타일 */
    .aicoach-input-area-fixed {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: none;
      gap: 10px;
      background: white;
      flex-shrink: 0;
    }

    /* 채팅 화면에서만 입력창 표시 */
    .aicoach-chat[data-current-view="chat"] .aicoach-input-area-fixed {
      display: flex !important;
    }

    .aicoach-input {
      flex: 1;
      padding: 10px 12px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      font-family: inherit;
      resize: none;
    }

    .aicoach-input:focus {
      outline: none;
      border-color: #4f46e5;
    }

    .aicoach-send {
      width: 44px;
      height: 44px;
      padding: 0;
    }

    /* 유틸리티 */
    .aicoach-badge {
      position: absolute;
      top: -8px;
      right: 8px;
      background: #ef4444;
      color: white;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: 700;
    }
  `
};
