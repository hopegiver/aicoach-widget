export default {
  html: `
    <!-- 목표 추가 화면 -->
    <div class="aicoach-view" data-view="goal-create" style="display: none;">
      <div class="aicoach-content">
        <p class="aicoach-subtitle">새로운 코칭 목표를 설정해보세요</p>

        <div class="aicoach-form-group">
          <label class="aicoach-label">📝 목표명</label>
          <input
            type="text"
            id="goal-name-input"
            class="aicoach-text-input"
            placeholder="예: 프레젠테이션 능력 향상"
          />
          <button class="aicoach-btn aicoach-btn-secondary aicoach-btn-small" id="goal-ai-suggest" style="margin-top: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            AI가 목표 추천받기
          </button>
        </div>

        <div class="aicoach-form-group">
          <label class="aicoach-label">🎯 희망 회차</label>
          <select id="goal-sessions-input" class="aicoach-select">
            <option value="4">4회 (단기)</option>
            <option value="8" selected>8회 (권장)</option>
            <option value="12">12회 (장기)</option>
            <option value="16">16회 (심화)</option>
          </select>
          <p class="aicoach-hint">평균적으로 8-12회 정도가 효과적입니다</p>
        </div>

        <div class="aicoach-form-group">
          <label class="aicoach-label">🔍 현재 수준</label>
          <div class="aicoach-radio-group">
            <label class="aicoach-radio-label">
              <input type="radio" name="goal-level" value="beginner" checked />
              <span>초급</span>
            </label>
            <label class="aicoach-radio-label">
              <input type="radio" name="goal-level" value="intermediate" />
              <span>중급</span>
            </label>
            <label class="aicoach-radio-label">
              <input type="radio" name="goal-level" value="advanced" />
              <span>고급</span>
            </label>
          </div>
        </div>

        <div class="aicoach-form-group">
          <label class="aicoach-label">💭 구체적인 니즈 (선택)</label>
          <textarea
            id="goal-description-input"
            class="aicoach-textarea"
            placeholder="예: 대중 앞에서 떨지 않고 자신감 있게 발표하고 싶습니다"
            rows="3"
          ></textarea>
        </div>

        <button class="aicoach-btn aicoach-btn-primary" id="goal-create-submit">
          목표 등록하기
        </button>
      </div>
    </div>
  `,

  styles: `
    .aicoach-view[data-view="goal-create"] .aicoach-btn-primary {
      width: 100%;
    }
    .aicoach-view[data-view="goal-create"] .aicoach-btn-secondary {
      width: 100%;
    }
  `
};
