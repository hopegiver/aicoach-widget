export default {
  html: `
    <!-- 체크인 (진행 상황) 화면 -->
    <div class="aicoach-view" data-view="checkin" style="display: none;">
      <div class="aicoach-content">
        <p class="aicoach-subtitle">이번 주 진행 상황을 확인하고 오늘의 기분을 체크해보세요</p>

        <!-- 통계 카드들 -->
        <div class="aicoach-stats-grid">
          <div class="aicoach-stat-card">
            <div class="aicoach-stat-icon">📊</div>
            <div class="aicoach-stat-content">
              <div class="aicoach-stat-value" id="checkin-completion">0%</div>
              <div class="aicoach-stat-label">주간 달성률</div>
            </div>
          </div>
          <div class="aicoach-stat-card">
            <div class="aicoach-stat-icon">🔥</div>
            <div class="aicoach-stat-content">
              <div class="aicoach-stat-value" id="checkin-streak">0일</div>
              <div class="aicoach-stat-label">연속 달성</div>
            </div>
          </div>
          <div class="aicoach-stat-card">
            <div class="aicoach-stat-icon">✅</div>
            <div class="aicoach-stat-content">
              <div class="aicoach-stat-value" id="checkin-actions">0개</div>
              <div class="aicoach-stat-label">완료한 행동</div>
            </div>
          </div>
        </div>

        <!-- 기분 체크 -->
        <div class="aicoach-mood-section">
          <h3>오늘의 기분은 어떠신가요?</h3>
          <div class="aicoach-mood-buttons">
            <button class="aicoach-mood-btn" data-mood="5">😄</button>
            <button class="aicoach-mood-btn" data-mood="4">🙂</button>
            <button class="aicoach-mood-btn" data-mood="3">😐</button>
            <button class="aicoach-mood-btn" data-mood="2">😔</button>
            <button class="aicoach-mood-btn" data-mood="1">😢</button>
          </div>
        </div>

        <!-- 코멘트 -->
        <div class="aicoach-form-group">
          <label class="aicoach-label">오늘 하루 어떠셨나요? (선택)</label>
          <textarea
            id="checkin-comment"
            class="aicoach-textarea"
            placeholder="오늘의 소감을 자유롭게 적어보세요..."
            rows="3"
          ></textarea>
        </div>

        <button class="aicoach-btn aicoach-btn-primary" id="checkin-submit">
          체크인 완료
        </button>
      </div>
    </div>
  `,

  styles: `
    .aicoach-view[data-view="checkin"] {
      overflow-x: hidden;
    }

    .aicoach-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 24px;
      width: 100%;
    }

    .aicoach-stat-card {
      background: linear-gradient(135deg, #f9fafb, #ffffff);
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
    }

    .aicoach-stat-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .aicoach-stat-content {
      width: 100%;
    }

    .aicoach-stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .aicoach-stat-label {
      font-size: 11px;
      color: #6b7280;
      line-height: 1.3;
    }

    .aicoach-mood-section {
      background: #f9fafb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      width: 100%;
      box-sizing: border-box;
    }

    .aicoach-mood-section h3 {
      font-size: 15px;
      color: #1f2937;
      margin-bottom: 16px;
      text-align: center;
    }

    .aicoach-mood-buttons {
      display: flex;
      justify-content: space-between;
      gap: 6px;
    }

    .aicoach-mood-btn {
      flex: 1;
      height: 50px;
      font-size: 24px;
      padding: 0;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aicoach-mood-btn:hover {
      transform: scale(1.05);
      border-color: #4f46e5;
    }

    .aicoach-mood-btn.selected {
      border-color: #4f46e5;
      background: #eef2ff;
      transform: scale(1.05);
    }

    .aicoach-view[data-view="checkin"] .aicoach-btn-primary {
      width: 100%;
    }
  `
};
