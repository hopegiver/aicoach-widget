export default {
  html: `
    <!-- 성과 리포트 화면 -->
    <div class="aicoach-view" data-view="report" style="display: none;">
      <div class="aicoach-content">
        <!-- 기간 선택 버튼 -->
        <div class="aicoach-period-selector">
          <button class="aicoach-period-btn active" data-period="week">주간</button>
          <button class="aicoach-period-btn" data-period="month">월간</button>
          <button class="aicoach-period-btn" data-period="all">전체</button>
        </div>

        <!-- KPI 카드들 -->
        <div class="aicoach-kpi-grid">
          <div class="aicoach-kpi-card">
            <div class="aicoach-kpi-label">총 세션</div>
            <div class="aicoach-kpi-value" id="kpi-sessions">0</div>
          </div>
          <div class="aicoach-kpi-card">
            <div class="aicoach-kpi-label">목표 달성률</div>
            <div class="aicoach-kpi-value" id="kpi-achievement">0%</div>
          </div>
          <div class="aicoach-kpi-card">
            <div class="aicoach-kpi-label">연속 달성</div>
            <div class="aicoach-kpi-value" id="kpi-streak">0일</div>
          </div>
          <div class="aicoach-kpi-card">
            <div class="aicoach-kpi-label">완료 행동</div>
            <div class="aicoach-kpi-value" id="kpi-completed">0개</div>
          </div>
        </div>

        <!-- 활동 추이 차트 -->
        <div class="aicoach-chart-section">
          <h3>📈 활동 추이</h3>
          <div class="aicoach-chart-container">
            <canvas id="aicoach-activity-chart"></canvas>
          </div>
        </div>

        <!-- 카테고리 분포 차트 -->
        <div class="aicoach-chart-section">
          <h3>📊 카테고리 분포</h3>
          <div class="aicoach-chart-container" style="max-width: 300px; margin: 0 auto;">
            <canvas id="aicoach-category-chart"></canvas>
          </div>
        </div>

        <!-- 분석 인사이트 -->
        <div class="aicoach-insights-box">
          <h3>💡 인사이트</h3>
          <div class="aicoach-insight-row">
            <span class="aicoach-insight-label">가장 활발한 시간대:</span>
            <span class="aicoach-insight-value" id="analysis-peak-time">-</span>
          </div>
          <div class="aicoach-insight-row">
            <span class="aicoach-insight-label">주요 카테고리:</span>
            <span class="aicoach-insight-value" id="analysis-top-category">-</span>
          </div>
          <div class="aicoach-insight-row">
            <span class="aicoach-insight-label">평균 달성률:</span>
            <span class="aicoach-insight-value" id="analysis-avg-completion">-</span>
          </div>
        </div>

        <!-- PDF 출력 버튼 -->
        <button class="aicoach-btn aicoach-btn-primary" id="report-export-pdf">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          PDF 출력하기
        </button>
      </div>
    </div>
  `,

  styles: `
    .aicoach-period-selector {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      background: #f9fafb;
      padding: 6px;
      border-radius: 10px;
    }

    .aicoach-period-btn {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: #6b7280;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .aicoach-period-btn:hover {
      background: #e5e7eb;
    }

    .aicoach-period-btn.active {
      background: white;
      color: #4f46e5;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .aicoach-kpi-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .aicoach-kpi-card {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }

    .aicoach-kpi-label {
      font-size: 13px;
      opacity: 0.9;
      margin-bottom: 8px;
    }

    .aicoach-kpi-value {
      font-size: 28px;
      font-weight: 700;
    }

    .aicoach-chart-section {
      background: #f9fafb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .aicoach-chart-section h3 {
      font-size: 16px;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .aicoach-chart-container {
      background: white;
      padding: 16px;
      border-radius: 8px;
    }

    .aicoach-insights-box {
      background: #f9fafb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      width: 100%;
      box-sizing: border-box;
    }

    .aicoach-insights-box h3 {
      font-size: 16px;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .aicoach-insight-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .aicoach-insight-row:last-child {
      border-bottom: none;
    }

    .aicoach-insight-label {
      font-size: 14px;
      color: #6b7280;
    }

    .aicoach-insight-value {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }

    .aicoach-view[data-view="report"] .aicoach-btn-primary {
      width: 100%;
    }
  `
};
