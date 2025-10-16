export default {
  html: `
    <!-- 주제 선택 화면 -->
    <div class="aicoach-view" data-view="topic-selection" style="display: none;">
      <div class="aicoach-content">
        <div class="aicoach-goal-header">
          <h3 id="selected-goal-name">프레젠테이션 능력 향상</h3>
          <p class="aicoach-goal-progress" id="selected-goal-progress">3/10 회차</p>
        </div>

        <p class="aicoach-subtitle">오늘은 어떤 주제로 진행할까요?</p>

        <div class="aicoach-topic-mode">
          <label class="aicoach-topic-mode-label">
            <input type="radio" name="topic-mode" value="ai" checked />
            <span>🤖 AI가 추천하는 다음 단계로 진행</span>
          </label>
          <label class="aicoach-topic-mode-label">
            <input type="radio" name="topic-mode" value="custom" />
            <span>✏️ 오늘의 주제 직접 선택</span>
          </label>
        </div>

        <div class="aicoach-ai-topics" id="ai-suggested-topics">
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">AI 추천 주제:</p>
          <!-- AI 추천 주제가 동적으로 추가됩니다 -->
        </div>

        <div class="aicoach-custom-topic" id="custom-topic-input" style="display: none;">
          <textarea
            id="topic-custom-input"
            class="aicoach-textarea"
            placeholder="오늘 다루고 싶은 주제를 입력하세요..."
            rows="3"
          ></textarea>
        </div>

        <button class="aicoach-btn aicoach-btn-primary" id="topic-start-coaching">
          코칭 시작하기
        </button>
      </div>
    </div>
  `,

  styles: `
    .aicoach-goal-header {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #e5e7eb;
    }

    .aicoach-goal-header h3 {
      color: #1f2937;
      font-size: 18px;
      margin: 0 0 8px 0;
    }

    .aicoach-goal-progress {
      color: #4f46e5;
      font-size: 14px;
      font-weight: 600;
    }

    .aicoach-topic-mode {
      margin-bottom: 20px;
      width: 100%;
    }

    .aicoach-topic-mode-label {
      display: flex;
      align-items: center;
      padding: 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      box-sizing: border-box;
    }

    .aicoach-topic-mode-label input[type="radio"] {
      margin-right: 10px;
    }

    .aicoach-topic-mode-label:has(input:checked) {
      border-color: #4f46e5;
      background: #eef2ff;
    }

    .aicoach-ai-topics {
      margin-bottom: 20px;
      width: 100%;
    }

    .aicoach-topic-option {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      color: #1f2937;
      width: 100%;
      box-sizing: border-box;
    }

    .aicoach-topic-option:hover {
      border-color: #4f46e5;
      background: #eef2ff;
    }

    .aicoach-topic-option.selected {
      border-color: #4f46e5;
      background: #eef2ff;
      font-weight: 600;
    }
  `
};
