export default {
  html: `
    <!-- 오늘의 행동 화면 -->
    <div class="aicoach-view" data-view="daily-action" style="display: none;">
      <div class="aicoach-content">
        <div class="aicoach-streak-badge">
          🔥 <span id="daily-streak-count">0</span>일 연속 달성 중!
        </div>

        <!-- 행동 카드 -->
        <div class="aicoach-action-card">
          <h3 id="daily-action-date">오늘</h3>
          <p id="daily-action-text" class="aicoach-action-text">오늘의 행동을 불러오는 중...</p>

          <div class="aicoach-action-buttons">
            <button class="aicoach-btn aicoach-btn-primary" id="daily-action-complete">
              ✅ 완료했어요!
            </button>
            <button class="aicoach-btn aicoach-btn-secondary" id="daily-action-skip">
              나중에 하기
            </button>
          </div>
        </div>

        <!-- 완료 메시지 -->
        <div id="daily-action-completed" style="display: none;">
          <div class="aicoach-completed-message">
            <div class="aicoach-completed-icon">🎉</div>
            <h3>잘하셨어요!</h3>
            <p>오늘의 행동을 완료했습니다.<br>내일도 함께 성장해요!</p>
            <button class="aicoach-btn aicoach-btn-secondary" id="daily-action-back">
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  `,

  styles: `
    .aicoach-streak-badge {
      background: linear-gradient(135deg, #f59e0b, #f97316);
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      text-align: center;
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 24px;
    }

    .aicoach-action-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
    }

    .aicoach-action-card h3 {
      color: #1f2937;
      font-size: 16px;
      margin-bottom: 16px;
    }

    .aicoach-action-text {
      color: #1f2937;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.6;
      margin-bottom: 24px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aicoach-action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .aicoach-action-buttons .aicoach-btn {
      width: 100%;
    }

    .aicoach-completed-message {
      text-align: center;
      padding: 40px 20px;
    }

    .aicoach-completed-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .aicoach-completed-message h3 {
      color: #1f2937;
      font-size: 24px;
      margin-bottom: 12px;
    }

    .aicoach-completed-message p {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .aicoach-completed-message .aicoach-btn {
      max-width: 280px;
      width: 100%;
    }
  `
};
