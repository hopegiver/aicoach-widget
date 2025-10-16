export default {
  html: `
    <!-- 홈 화면 -->
    <div class="aicoach-view" data-view="home">
      <div class="aicoach-welcome">
        <h2>안녕하세요! 👋</h2>
        <p>AI 코치와 함께 목표를 달성해보세요</p>
      </div>
      <div class="aicoach-menu">
        <button class="aicoach-btn aicoach-btn-primary" id="aicoach-diagnostic">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          성향 진단하기
        </button>
        <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-start">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          코칭 시작하기
        </button>
        <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-history">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3h18v18H3zM9 3v18M3 9h18M3 15h18"></path>
          </svg>
          코칭 이력 조회
        </button>
        <button class="aicoach-btn aicoach-btn-highlight" id="aicoach-daily-action">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>오늘의 활동</span>
          <span class="aicoach-badge" id="daily-action-badge" style="display: none;">New</span>
        </button>
        <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-checkin">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          활동 진행 상황
        </button>
        <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-report">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
          </svg>
          성과 리포트
        </button>
      </div>
    </div>
  `,

  styles: `
    .aicoach-welcome {
      text-align: center;
      margin-bottom: 30px;
    }

    .aicoach-welcome h2 {
      margin: 0 0 10px 0;
      font-size: 24px;
      color: #1f2937;
    }

    .aicoach-welcome p {
      margin: 0;
      color: #6b7280;
    }

    .aicoach-menu {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `
};
