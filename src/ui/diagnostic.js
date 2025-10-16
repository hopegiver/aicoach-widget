export default {
  html: `
    <!-- 진단 화면 -->
    <div class="aicoach-view" data-view="diagnostic" style="display: none;">
      <div class="aicoach-content">
        <div class="aicoach-diagnostic-intro">
          <p class="aicoach-subtitle">당신의 성향을 분석하여 맞춤형 코칭을 제공합니다</p>
          <div class="aicoach-diagnostic-info">
            <div class="aicoach-info-item">
              <strong>📝 질문 수</strong>
              <p>총 20개의 질문 (약 5-10분 소요)</p>
            </div>
            <div class="aicoach-info-item">
              <strong>📊 분석 영역</strong>
              <p>커뮤니케이션 스타일, 학습 선호도, 목표 달성 방식, 스트레스 대처법</p>
            </div>
            <div class="aicoach-info-item">
              <strong>🎯 활용</strong>
              <p>진단 결과를 바탕으로 맞춤형 코칭을 제공합니다</p>
            </div>
          </div>
          <button class="aicoach-btn aicoach-btn-primary" id="aicoach-diagnostic-start">
            진단 시작하기
          </button>
        </div>
        <div class="aicoach-diagnostic-questions" style="display: none;">
          <div class="aicoach-diagnostic-progress">
            <div class="aicoach-progress-bar">
              <div class="aicoach-progress-fill" id="diagnostic-progress" style="width: 0%;"></div>
            </div>
            <p class="aicoach-progress-text">
              <span id="diagnostic-current">1</span> / <span id="diagnostic-total">20</span>
            </p>
          </div>
          <h3 id="diagnostic-question-text" style="color: #1f2937; margin-bottom: 20px; width: 100%;"></h3>
          <div id="diagnostic-options" style="display: flex; flex-direction: column; gap: 12px; width: 100%;"></div>
        </div>
      </div>
    </div>
    <!-- 진단 결과 화면 -->
    <div class="aicoach-view" data-view="diagnostic-result" style="display: none;">
      <div class="aicoach-result-container">
        <div class="aicoach-result-header">
          <h2 id="diagnostic-result-type">분석 완료</h2>
          <p id="diagnostic-result-subtitle" style="color: #6b7280; margin-top: 8px;"></p>
        </div>
        <div id="diagnostic-result-details">
          <!-- 결과 상세 정보가 동적으로 추가됩니다 -->
        </div>
        <div class="aicoach-result-actions">
          <button class="aicoach-btn aicoach-btn-primary" id="aicoach-start-with-result">
            코칭 시작하기
          </button>
          <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-result-home">
            홈으로
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .aicoach-diagnostic-intro {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .aicoach-diagnostic-intro .aicoach-btn {
      max-width: 280px;
      width: 100%;
    }
    .aicoach-diagnostic-info {
      background: #f9fafb;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
      width: 100%;
    }
    .aicoach-info-item {
      margin-bottom: 16px;
    }
    .aicoach-diagnostic-questions {
      width: 100%;
    }
    .aicoach-diagnostic-progress {
      margin-bottom: 24px;
      width: 100%;
    }
    .aicoach-progress-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .aicoach-progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      transition: width 0.3s ease;
    }
    .aicoach-progress-text {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }
    .aicoach-option {
      width: 100%;
      padding: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      transition: all 0.2s;
    }
    .aicoach-option:hover {
      border-color: #4f46e5;
      background: #eef2ff;
    }
    .aicoach-result-container {
      width: 100%;
    }
    .aicoach-result-header {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e5e7eb;
    }
    .aicoach-result-header h2 {
      font-size: 24px;
      color: #1f2937;
      margin-bottom: 8px;
    }
    .aicoach-result-section {
      margin-bottom: 20px;
    }
    .aicoach-result-section h3 {
      font-size: 16px;
      color: #1f2937;
      margin-bottom: 12px;
    }
    .aicoach-result-section p {
      color: #6b7280;
      line-height: 1.6;
    }
    .aicoach-result-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 30px;
      width: 100%;
    }
    .aicoach-result-actions .aicoach-btn {
      width: 100%;
    }
  `
};
