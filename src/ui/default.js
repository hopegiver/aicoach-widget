export default {
  name: 'default',
  version: '1.0.0',
  loadedAt: new Date().toISOString(),
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
            <span>오늘의 행동</span>
            <span class="aicoach-badge" id="daily-action-badge" style="display: none;">New</span>
          </button>
          <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-checkin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            진행 상황
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

      <!-- 채팅 화면 -->
      <div class="aicoach-view aicoach-chat-view" data-view="chat" style="display: none;">
        <div class="aicoach-messages-container">
          <div class="aicoach-messages"></div>
        </div>
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

      <!-- 이력 화면 -->
      <div class="aicoach-view" data-view="history" style="display: none;">
        <div class="aicoach-content">
          <div class="aicoach-history-list"></div>
        </div>
      </div>

      <!-- 진단 화면 -->
      <div class="aicoach-view" data-view="diagnostic" style="display: none;">
        <div class="aicoach-content">
          <div class="aicoach-diagnostic-intro">
            <p class="aicoach-subtitle">총 20개의 질문을 통해 당신의 성향을 분석합니다. (약 5-10분 소요)</p>
            <div class="aicoach-diagnostic-info">
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
            <div class="aicoach-progress">
              <div class="aicoach-progress-bar">
                <div class="aicoach-progress-fill" id="diagnostic-progress" style="width: 0%"></div>
              </div>
              <div class="aicoach-progress-text"><span id="diagnostic-current">1</span> / <span id="diagnostic-total">20</span></div>
            </div>
            <div class="aicoach-question-container">
              <h3 id="diagnostic-question-text" class="aicoach-question-text"></h3>
              <div class="aicoach-options" id="diagnostic-options"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 진단 결과 화면 -->
      <div class="aicoach-view" data-view="diagnostic-result" style="display: none;">
        <div class="aicoach-content">
          <div class="aicoach-diagnostic-result">
            <div class="aicoach-result-header">
              <div class="aicoach-result-icon">✨</div>
              <h2 id="diagnostic-result-type"></h2>
              <p id="diagnostic-result-subtitle"></p>
            </div>
            <div class="aicoach-result-details" id="diagnostic-result-details"></div>
            <div class="aicoach-result-actions">
              <button class="aicoach-btn aicoach-btn-primary" id="aicoach-start-with-result">
                맞춤 코칭 시작하기
              </button>
              <button class="aicoach-btn aicoach-btn-secondary" id="aicoach-result-home">
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 오늘의 행동 화면 -->
      <div class="aicoach-view" data-view="daily-action" style="display: none;">
        <div class="aicoach-content">
          <div class="aicoach-daily-action">
            <div class="aicoach-streak-info">
              <div class="aicoach-streak-icon">🔥</div>
              <div class="aicoach-streak-text">
                <strong id="daily-streak-count">0</strong>일 연속 달성!
              </div>
            </div>
            <div class="aicoach-action-card">
              <div class="aicoach-action-header">
                <h3>오늘의 행동</h3>
                <span class="aicoach-action-date" id="daily-action-date"></span>
              </div>
              <p class="aicoach-action-text" id="daily-action-text">로딩 중...</p>
              <div class="aicoach-action-buttons">
                <button class="aicoach-btn aicoach-btn-primary" id="daily-action-complete">
                  ✓ 완료했어요!
                </button>
                <button class="aicoach-btn aicoach-btn-secondary" id="daily-action-skip">
                  다음에 할게요
                </button>
              </div>
            </div>
            <div class="aicoach-action-completed" id="daily-action-completed" style="display: none;">
              <div class="aicoach-completed-icon">🎉</div>
              <h3>훌륭해요!</h3>
              <p>오늘의 행동을 완료했습니다.</p>
              <button class="aicoach-btn aicoach-btn-secondary" id="daily-action-back">
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 진행 상황 화면 -->
      <div class="aicoach-view" data-view="checkin" style="display: none;">
        <div class="aicoach-content">
          <div class="aicoach-checkin">
            <div class="aicoach-checkin-header">
              <h3>주간 체크인</h3>
              <p class="aicoach-subtitle">이번 주 목표 달성은 어떠신가요?</p>
            </div>
            <div class="aicoach-checkin-stats">
              <div class="aicoach-stat-card">
                <div class="aicoach-stat-value" id="checkin-completion">75%</div>
                <div class="aicoach-stat-label">완료율</div>
              </div>
              <div class="aicoach-stat-card">
                <div class="aicoach-stat-value" id="checkin-streak">7일</div>
                <div class="aicoach-stat-label">연속 달성</div>
              </div>
              <div class="aicoach-stat-card">
                <div class="aicoach-stat-value" id="checkin-actions">21개</div>
                <div class="aicoach-stat-label">완료 행동</div>
              </div>
            </div>
            <div class="aicoach-checkin-form">
              <h4>이번 주 기분은?</h4>
              <div class="aicoach-mood-selector">
                <button class="aicoach-mood-btn" data-mood="1">😢</button>
                <button class="aicoach-mood-btn" data-mood="2">😐</button>
                <button class="aicoach-mood-btn" data-mood="3">🙂</button>
                <button class="aicoach-mood-btn" data-mood="4">😊</button>
                <button class="aicoach-mood-btn" data-mood="5">🤩</button>
              </div>
              <h4 style="margin-top: 24px;">간단한 코멘트</h4>
              <textarea
                id="checkin-comment"
                placeholder="이번 주 성과나 어려웠던 점을 자유롭게 작성해보세요..."
                rows="3"
                style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 10px; font-family: inherit; margin-top: 8px;"
              ></textarea>
              <button class="aicoach-btn aicoach-btn-primary" id="checkin-submit" style="margin-top: 16px; width: 100%;">
                체크인 완료
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 성과 리포트 화면 -->
      <div class="aicoach-view" data-view="report" style="display: none;">
        <div class="aicoach-content">
          <div class="aicoach-report">
            <!-- 기간 선택 -->
            <div class="aicoach-report-period">
              <button class="aicoach-period-btn active" data-period="week">주간</button>
              <button class="aicoach-period-btn" data-period="month">월간</button>
              <button class="aicoach-period-btn" data-period="all">전체</button>
            </div>

            <!-- KPI 카드 -->
            <div class="aicoach-kpi-grid">
              <div class="aicoach-kpi-card">
                <div class="aicoach-kpi-icon">📊</div>
                <div class="aicoach-kpi-value" id="kpi-sessions">0</div>
                <div class="aicoach-kpi-label">총 세션</div>
              </div>
              <div class="aicoach-kpi-card">
                <div class="aicoach-kpi-icon">🎯</div>
                <div class="aicoach-kpi-value" id="kpi-achievement">0%</div>
                <div class="aicoach-kpi-label">목표 달성률</div>
              </div>
              <div class="aicoach-kpi-card">
                <div class="aicoach-kpi-icon">🔥</div>
                <div class="aicoach-kpi-value" id="kpi-streak">0일</div>
                <div class="aicoach-kpi-label">연속 실천</div>
              </div>
              <div class="aicoach-kpi-card">
                <div class="aicoach-kpi-icon">✅</div>
                <div class="aicoach-kpi-value" id="kpi-completed">0개</div>
                <div class="aicoach-kpi-label">완료 행동</div>
              </div>
            </div>

            <!-- 차트 영역 -->
            <div class="aicoach-chart-section">
              <h4>주간 활동 추세</h4>
              <canvas id="aicoach-activity-chart" style="max-height: 200px;"></canvas>
            </div>

            <div class="aicoach-chart-section">
              <h4>카테고리별 분포</h4>
              <canvas id="aicoach-category-chart" style="max-height: 200px;"></canvas>
            </div>

            <!-- 상세 분석 -->
            <div class="aicoach-analysis">
              <h4>활동 분석</h4>
              <div class="aicoach-analysis-item">
                <span class="aicoach-analysis-label">가장 활발한 시간:</span>
                <span class="aicoach-analysis-value" id="analysis-peak-time">오전 10시</span>
              </div>
              <div class="aicoach-analysis-item">
                <span class="aicoach-analysis-label">주요 카테고리:</span>
                <span class="aicoach-analysis-value" id="analysis-top-category">커뮤니케이션</span>
              </div>
              <div class="aicoach-analysis-item">
                <span class="aicoach-analysis-label">평균 완료율:</span>
                <span class="aicoach-analysis-value" id="analysis-avg-completion">78%</span>
              </div>
            </div>

            <button class="aicoach-btn aicoach-btn-primary" id="report-export-pdf" style="margin-top: 20px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              PDF로 출력
            </button>
          </div>
        </div>
      </div>
    </div>

    <style>
      .aicoach-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .aicoach-toggle {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .aicoach-toggle:hover {
        transform: scale(1.1);
      }

      .aicoach-chat {
        position: absolute;
        bottom: 80px;
        right: 0;
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
        overflow: hidden;
      }

      .aicoach-chat.open {
        display: flex;
      }

      .aicoach-header {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .aicoach-header-back {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 12px;
        transition: opacity 0.2s;
      }

      .aicoach-header-back:hover {
        opacity: 0.8;
      }

      .aicoach-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        flex: 1;
        justify-content: center;
      }

      .aicoach-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
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

      /* 폼 요소 스타일 */
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

      .aicoach-btn-small {
        padding: 8px 12px;
        font-size: 13px;
      }

      /* 목표 목록 스타일 */
      .aicoach-goal-list {
        margin-bottom: 20px;
      }

      .aicoach-goal-card {
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        cursor: pointer;
        transition: all 0.2s;
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

      /* 목표 헤더 스타일 */
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

      /* 주제 선택 스타일 */
      .aicoach-topic-mode {
        margin-bottom: 20px;
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

      .aicoach-messages {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-height: 100%;
      }

      .aicoach-message {
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 70%;
        line-height: 1.5;
      }

      .aicoach-message.user {
        background: #f3f4f6;
        align-self: flex-end;
      }

      .aicoach-message.ai {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        align-self: flex-start;
      }

      .aicoach-typing {
        padding: 12px 16px;
        border-radius: 12px;
        background: #f3f4f6;
        color: #6b7280;
        font-size: 14px;
        align-self: flex-start;
      }

      .typing-dots span {
        animation: blink 1.4s infinite both;
      }

      .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes blink {
        0%, 80%, 100% {
          opacity: 0;
        }
        40% {
          opacity: 1;
        }
      }

      .aicoach-input-area-fixed {
        padding: 16px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 10px;
        background: white;
        flex-shrink: 0;
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

      .aicoach-send {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        width: 44px;
        height: 44px;
        padding: 0;
      }

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

      .aicoach-info-item:last-child {
        margin-bottom: 0;
      }

      .aicoach-info-item strong {
        display: block;
        color: #1f2937;
        margin-bottom: 8px;
      }

      .aicoach-info-item p {
        color: #6b7280;
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
      }

      .aicoach-progress {
        margin-bottom: 30px;
      }

      .aicoach-progress-bar {
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
        color: #6b7280;
        font-size: 14px;
        font-weight: 600;
      }

      .aicoach-question-text {
        color: #1f2937;
        font-size: 18px;
        margin-bottom: 24px;
        line-height: 1.6;
      }

      .aicoach-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .aicoach-option {
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        padding: 16px;
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
        font-size: 15px;
        color: #1f2937;
      }

      .aicoach-option:hover {
        border-color: #4f46e5;
        background: #f3f4f6;
      }

      .aicoach-option.selected {
        border-color: #4f46e5;
        background: #eef2ff;
      }

      .aicoach-result-header {
        text-align: center;
        padding: 30px 0;
      }

      .aicoach-result-icon {
        font-size: 64px;
        margin-bottom: 16px;
      }

      .aicoach-result-header h2 {
        color: #1f2937;
        font-size: 28px;
        margin-bottom: 8px;
      }

      .aicoach-result-header p {
        color: #6b7280;
        font-size: 16px;
      }

      .aicoach-result-details {
        background: #f9fafb;
        border-radius: 10px;
        padding: 24px;
        margin: 20px 0;
      }

      .aicoach-result-section {
        margin-bottom: 24px;
      }

      .aicoach-result-section:last-child {
        margin-bottom: 0;
      }

      .aicoach-result-section h3 {
        color: #1f2937;
        font-size: 18px;
        margin-bottom: 12px;
      }

      .aicoach-result-section p {
        color: #6b7280;
        line-height: 1.6;
        margin: 0;
      }

      .aicoach-result-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 20px;
      }

      .aicoach-subtitle {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .aicoach-btn-highlight {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        position: relative;
      }

      .aicoach-btn-highlight:hover {
        transform: translateY(-2px);
      }

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

      .aicoach-streak-info {
        text-align: center;
        padding: 24px;
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border-radius: 12px;
        margin-bottom: 20px;
      }

      .aicoach-streak-icon {
        font-size: 48px;
        margin-bottom: 8px;
      }

      .aicoach-streak-text {
        font-size: 18px;
        color: #92400e;
      }

      .aicoach-streak-text strong {
        font-size: 32px;
        color: #78350f;
      }

      .aicoach-action-card {
        background: #f9fafb;
        border-radius: 12px;
        padding: 24px;
        border: 2px solid #e5e7eb;
      }

      .aicoach-action-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .aicoach-action-header h3 {
        margin: 0;
        color: #1f2937;
        font-size: 18px;
      }

      .aicoach-action-date {
        color: #6b7280;
        font-size: 14px;
      }

      .aicoach-action-text {
        font-size: 16px;
        line-height: 1.8;
        color: #1f2937;
        margin: 16px 0;
        padding: 16px;
        background: white;
        border-radius: 8px;
      }

      .aicoach-action-buttons {
        display: flex;
        gap: 12px;
        margin-top: 20px;
      }

      .aicoach-action-buttons .aicoach-btn {
        flex: 1;
      }

      .aicoach-action-completed {
        text-align: center;
        padding: 40px 20px;
      }

      .aicoach-completed-icon {
        font-size: 64px;
        margin-bottom: 16px;
      }

      .aicoach-action-completed h3 {
        color: #1f2937;
        font-size: 24px;
        margin-bottom: 8px;
      }

      .aicoach-action-completed p {
        color: #6b7280;
        margin-bottom: 24px;
      }

      .aicoach-checkin-header h3 {
        color: #1f2937;
        font-size: 20px;
        margin-bottom: 8px;
      }

      .aicoach-checkin-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin: 24px 0;
      }

      .aicoach-stat-card {
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
      }

      .aicoach-stat-value {
        font-size: 24px;
        font-weight: 700;
        color: #4f46e5;
        margin-bottom: 4px;
      }

      .aicoach-stat-label {
        font-size: 12px;
        color: #6b7280;
      }

      .aicoach-checkin-form h4 {
        color: #1f2937;
        font-size: 16px;
        margin-bottom: 12px;
      }

      .aicoach-mood-selector {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }

      .aicoach-mood-btn {
        flex: 1;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        padding: 16px 8px;
        font-size: 32px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .aicoach-mood-btn:hover {
        border-color: #4f46e5;
        transform: scale(1.1);
      }

      .aicoach-mood-btn.selected {
        border-color: #4f46e5;
        background: #eef2ff;
      }

      /* 성과 리포트 스타일 */
      .aicoach-report {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .aicoach-report > * {
        width: 100%;
      }

      .aicoach-report .aicoach-btn {
        max-width: 280px;
        width: 100%;
      }

      .aicoach-report-period {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
      }

      .aicoach-period-btn {
        flex: 1;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #6b7280;
        cursor: pointer;
        transition: all 0.2s;
      }

      .aicoach-period-btn.active {
        border-color: #4f46e5;
        background: #eef2ff;
        color: #4f46e5;
      }

      .aicoach-kpi-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 24px;
      }

      .aicoach-kpi-card {
        background: linear-gradient(135deg, #f9fafb, #ffffff);
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
      }

      .aicoach-kpi-icon {
        font-size: 32px;
        margin-bottom: 8px;
      }

      .aicoach-kpi-value {
        font-size: 28px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 4px;
      }

      .aicoach-kpi-label {
        font-size: 13px;
        color: #6b7280;
        font-weight: 600;
      }

      .aicoach-chart-section {
        background: #f9fafb;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .aicoach-chart-section h4 {
        color: #1f2937;
        font-size: 16px;
        margin-bottom: 16px;
      }

      .aicoach-analysis {
        background: #f9fafb;
        border-radius: 12px;
        padding: 20px;
      }

      .aicoach-analysis h4 {
        color: #1f2937;
        font-size: 16px;
        margin-bottom: 16px;
      }

      .aicoach-analysis-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #e5e7eb;
      }

      .aicoach-analysis-item:last-child {
        border-bottom: none;
      }

      .aicoach-analysis-label {
        color: #6b7280;
        font-size: 14px;
      }

      .aicoach-analysis-value {
        color: #1f2937;
        font-weight: 600;
        font-size: 14px;
      }

    </style>
  `
};
