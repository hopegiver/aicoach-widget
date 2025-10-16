export default {
  html: `
    <!-- 목표 선택 화면 -->
    <div class="aicoach-view" data-view="goal-list" style="display: none;">
      <div class="aicoach-content">
        <p class="aicoach-subtitle">어떤 목표로 코칭을 시작할까요?</p>
        <div class="aicoach-goal-list" id="aicoach-goal-list">
          <!-- 목표 목록이 동적으로 추가됩니다 -->
        </div>
        <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-add-goal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          새로운 목표 추가하기
        </button>
      </div>
    </div>
  `,

  styles: `
    .aicoach-goal-list {
      margin-bottom: 20px;
      width: 100%;
    }

    .aicoach-goal-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      box-sizing: border-box;
    }

    .aicoach-goal-card:hover {
      border-color: #4f46e5;
      background: #eef2ff;
      transform: translateY(-2px);
    }

    .aicoach-goal-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .aicoach-goal-card h4 {
      color: #1f2937;
      font-size: 16px;
      margin: 0;
    }

    .aicoach-goal-card-progress {
      font-size: 13px;
      color: #6b7280;
      font-weight: 600;
    }

    .aicoach-goal-card-info {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.5;
    }

    .aicoach-goal-status {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      margin-left: 8px;
    }

    .aicoach-goal-status.active {
      background: #10b981;
      color: white;
    }

    .aicoach-goal-status.completed {
      background: #6b7280;
      color: white;
    }
  `
};
