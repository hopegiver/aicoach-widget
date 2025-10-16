// AI Coach 챗봇 UI 클래스

export class Chatbot {
  constructor(options = {}) {
    this.options = options;
    this.isOpen = options.startOpen || false; // 기본값: 닫힌 상태
    this.isTyping = false;
    this.messages = [];
    this.widget = null;
    this.eventHandlers = {};
    this.currentView = 'home'; // home, goal-setting, chat, history, diagnostic, diagnostic-result
    this.diagnosticData = {
      questions: [],
      currentIndex: 0,
      answers: []
    };
  }

  init(htmlTemplate) {
    this.currentHTML = htmlTemplate;
    this.createWidget();
    this.bindEvents();
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.className = 'aicoach-widget';
    widget.innerHTML = this.currentHTML || '';
    document.body.appendChild(widget);

    this.widget = widget;
    this.chatContainer = widget.querySelector('.aicoach-chat');
    this.messagesContainer = widget.querySelector('.aicoach-messages');
    this.messagesScrollContainer = widget.querySelector('.aicoach-messages-container');
    this.toggleButton = widget.querySelector('.aicoach-toggle');

    this.applySizeSettings();
  }

  applySizeSettings() {
    if (this.chatContainer) {
      const isMobile = window.innerWidth <= 768;

      if (isMobile && this.options.mobileFullscreen) {
        this.chatContainer.style.width = '100vw';
        this.chatContainer.style.height = '100vh';
        this.chatContainer.style.top = '0';
        this.chatContainer.style.left = '0';
        this.chatContainer.style.borderRadius = '0';
      } else {
        this.chatContainer.style.width = this.options.width + 'px';
        this.chatContainer.style.height = this.options.height + 'px';
      }
    }
  }

  bindEvents() {
    this.toggleButton?.addEventListener('click', () => this.toggle());

    // 홈 화면 버튼들
    const diagnosticBtn = this.widget.querySelector('#aicoach-diagnostic');
    const dailyActionBtn = this.widget.querySelector('#aicoach-daily-action');
    const startBtn = this.widget.querySelector('#aicoach-start');
    const checkinBtn = this.widget.querySelector('#aicoach-checkin');
    const historyBtn = this.widget.querySelector('#aicoach-history');

    diagnosticBtn?.addEventListener('click', () => this.emit('startDiagnostic'));
    dailyActionBtn?.addEventListener('click', () => this.emit('viewDailyAction'));
    startBtn?.addEventListener('click', () => this.emit('viewGoalList'));
    checkinBtn?.addEventListener('click', () => this.emit('viewCheckin'));
    historyBtn?.addEventListener('click', () => this.emit('viewHistory'));

    // 목표 목록 화면
    const addGoalBtn = this.widget.querySelector('#aicoach-add-goal');
    addGoalBtn?.addEventListener('click', () => this.showGoalCreate());

    // 목표 추가 화면
    const goalCreateSubmit = this.widget.querySelector('#goal-create-submit');
    const goalAISuggest = this.widget.querySelector('#goal-ai-suggest');

    goalCreateSubmit?.addEventListener('click', () => this.submitGoalCreate());
    goalAISuggest?.addEventListener('click', () => this.showAIGoalSuggestions());

    // 주제 선택 화면
    const topicModeRadios = this.widget.querySelectorAll('input[name="topic-mode"]');
    topicModeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const aiTopics = this.widget.querySelector('#ai-suggested-topics');
        const customInput = this.widget.querySelector('#custom-topic-input');
        if (radio.value === 'ai') {
          aiTopics.style.display = 'block';
          customInput.style.display = 'none';
        } else {
          aiTopics.style.display = 'none';
          customInput.style.display = 'block';
        }
      });
    });

    const topicStartBtn = this.widget.querySelector('#topic-start-coaching');
    topicStartBtn?.addEventListener('click', () => this.startCoachingWithTopic());

    // 채팅 화면
    const sendBtn = this.widget.querySelector('.aicoach-send');
    const input = this.widget.querySelector('.aicoach-input');

    sendBtn?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // 닫기 버튼
    const closeBtn = this.widget.querySelector('.aicoach-close');
    closeBtn?.addEventListener('click', () => this.close());

    // 헤더 뒤로 가기 버튼
    const headerBackBtn = this.widget.querySelector('#aicoach-header-back');
    headerBackBtn?.addEventListener('click', () => this.switchToHome());

    // 진단 화면 버튼들
    const diagnosticStartBtn = this.widget.querySelector('#aicoach-diagnostic-start');
    diagnosticStartBtn?.addEventListener('click', () => this.showDiagnosticQuestions());

    // 진단 결과 화면 버튼들
    const startWithResultBtn = this.widget.querySelector('#aicoach-start-with-result');
    const resultHomeBtn = this.widget.querySelector('#aicoach-result-home');

    startWithResultBtn?.addEventListener('click', () => this.showGoalSetting());
    resultHomeBtn?.addEventListener('click', () => this.switchToHome());

    // 오늘의 행동 화면 버튼들
    const dailyCompleteBtn = this.widget.querySelector('#daily-action-complete');
    const dailySkipBtn = this.widget.querySelector('#daily-action-skip');
    const dailyBackBtn = this.widget.querySelector('#daily-action-back');

    dailyCompleteBtn?.addEventListener('click', () => this.completeDailyAction());
    dailySkipBtn?.addEventListener('click', () => this.switchToHome());
    dailyBackBtn?.addEventListener('click', () => this.switchToHome());

    // 체크인 화면 버튼들
    const checkinSubmitBtn = this.widget.querySelector('#checkin-submit');
    checkinSubmitBtn?.addEventListener('click', () => this.submitCheckin());

    const moodBtns = this.widget.querySelectorAll('.aicoach-mood-btn');
    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        moodBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // 성과 리포트 화면 버튼들
    const reportBtn = this.widget.querySelector('#aicoach-report');
    const reportExportBtn = this.widget.querySelector('#report-export-pdf');

    reportBtn?.addEventListener('click', () => this.emit('viewReport'));
    reportExportBtn?.addEventListener('click', () => this.exportReportToPDF());

    const periodBtns = this.widget.querySelectorAll('.aicoach-period-btn');
    periodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        periodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const period = btn.dataset.period;
        this.emit('changePeriod', { period });
      });
    });

    // 리사이즈
    this.resizeHandler = () => this.applySizeSettings();
    window.addEventListener('resize', this.resizeHandler);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.widget?.classList.add('widget-open');
    this.chatContainer?.classList.add('open');
    this.emit('open');
  }

  close() {
    this.isOpen = false;
    this.widget?.classList.remove('widget-open');
    this.chatContainer?.classList.remove('open');
    this.emit('close');
  }

  show() { this.open(); }
  hide() { this.close(); }

  switchView(viewName) {
    this.currentView = viewName;

    // chatContainer에 현재 뷰 정보 추가
    if (this.chatContainer) {
      this.chatContainer.dataset.currentView = viewName;
    }

    const views = this.widget.querySelectorAll('[data-view]');
    views.forEach(view => {
      if (view.dataset.view === viewName) {
        view.style.display = 'block';
      } else {
        view.style.display = 'none';
      }
    });
    this.updateHeader(viewName);
  }

  updateHeader(viewName) {
    const titleText = this.widget.querySelector('.aicoach-title-text');
    const titleIcon = this.widget.querySelector('.aicoach-title-icon');
    const backBtn = this.widget.querySelector('#aicoach-header-back');

    if (!titleText || !backBtn) return;

    const titles = {
      'home': 'AI 코치',
      'goal-list': '목표 선택',
      'goal-create': '목표 추가',
      'topic-selection': '주제 선택',
      'chat': '코칭 진행중',
      'history': '코칭 이력',
      'diagnostic': '성향 진단',
      'diagnostic-result': '진단 결과',
      'daily-action': '오늘의 행동',
      'checkin': '진행 상황',
      'report': '성과 리포트'
    };

    titleText.textContent = titles[viewName] || 'AI 코치';

    // 홈 화면이 아닐 때만 뒤로가기 버튼 표시
    if (viewName === 'home') {
      backBtn.style.display = 'none';
      titleIcon.style.display = 'block';
    } else {
      backBtn.style.display = 'flex';
      titleIcon.style.display = 'none';
    }
  }

  switchToHome() {
    this.switchView('home');
  }

  showGoalSetting() {
    this.switchView('goal-setting');
  }

  switchToChat() {
    this.switchView('chat');
  }

  submitGoal() {
    const goalInput = this.widget.querySelector('#aicoach-goal-input');
    const goal = goalInput?.value?.trim();

    if (!goal) {
      this.showError('코칭 목표를 입력해주세요.');
      return;
    }

    this.emit('startCoaching', { goal });
    goalInput.value = '';
  }

  sendMessage() {
    const input = this.widget.querySelector('.aicoach-input');
    const text = input?.value?.trim();

    if (!text || this.isTyping) return;

    this.addMessage(text, 'user');
    input.value = '';

    this.emit('messageSent', { text });
  }

  addMessage(content, sender = 'user') {
    const message = {
      id: Date.now(),
      content,
      sender,
      timestamp: new Date()
    };

    this.messages.push(message);
    this.renderMessage(message);
    this.scrollToBottom();

    return message;
  }

  renderMessage(message) {
    if (!this.messagesContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = `aicoach-message aicoach-message-${message.sender}`;
    messageElement.dataset.messageId = message.id;

    const avatar = document.createElement('div');
    avatar.className = 'aicoach-avatar';
    avatar.textContent = message.sender === 'ai' ? '🤖' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'aicoach-bubble';
    const content = message.content.replace(/\n/g, '<br>');
    bubble.innerHTML = content;

    messageElement.appendChild(avatar);
    messageElement.appendChild(bubble);

    this.messagesContainer.appendChild(messageElement);
  }

  showTypingIndicator() {
    if (this.isTyping || !this.messagesContainer) return;

    this.isTyping = true;

    const typingElement = document.createElement('div');
    typingElement.className = 'aicoach-typing';
    typingElement.innerHTML = 'AI 코치가 생각 중입니다<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';

    this.messagesContainer.appendChild(typingElement);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingElement = this.messagesContainer?.querySelector('.aicoach-typing');
    typingElement?.remove();
  }

  showError(message) {
    alert(message);
  }

  scrollToBottom() {
    if (!this.messagesScrollContainer) return;
    setTimeout(() => {
      this.messagesScrollContainer.scrollTop = this.messagesScrollContainer.scrollHeight;
    }, 100);
  }

  // 진단 기능
  showDiagnostic(questions) {
    this.diagnosticData.questions = questions;
    this.diagnosticData.currentIndex = 0;
    this.diagnosticData.answers = [];
    this.switchView('diagnostic');
  }

  showDiagnosticQuestions() {
    const intro = this.widget.querySelector('.aicoach-diagnostic-intro');
    const questionsContainer = this.widget.querySelector('.aicoach-diagnostic-questions');

    if (intro && questionsContainer) {
      intro.style.display = 'none';
      questionsContainer.style.display = 'block';
      this.renderDiagnosticQuestion();
    }
  }

  renderDiagnosticQuestion() {
    const currentQuestion = this.diagnosticData.questions[this.diagnosticData.currentIndex];
    if (!currentQuestion) return;

    const questionText = this.widget.querySelector('#diagnostic-question-text');
    const optionsContainer = this.widget.querySelector('#diagnostic-options');
    const currentSpan = this.widget.querySelector('#diagnostic-current');
    const totalSpan = this.widget.querySelector('#diagnostic-total');
    const progressFill = this.widget.querySelector('#diagnostic-progress');

    if (questionText) questionText.textContent = currentQuestion.text;
    if (currentSpan) currentSpan.textContent = this.diagnosticData.currentIndex + 1;
    if (totalSpan) totalSpan.textContent = this.diagnosticData.questions.length;
    if (progressFill) {
      const progress = ((this.diagnosticData.currentIndex + 1) / this.diagnosticData.questions.length) * 100;
      progressFill.style.width = `${progress}%`;
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = currentQuestion.options.map((option, index) => `
        <button class="aicoach-option" data-option-id="${option.id}">
          ${option.text}
        </button>
      `).join('');

      // 옵션 클릭 이벤트
      const optionBtns = optionsContainer.querySelectorAll('.aicoach-option');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const optionId = btn.dataset.optionId;
          this.selectDiagnosticOption(currentQuestion.id, optionId);
        });
      });
    }
  }

  selectDiagnosticOption(questionId, optionId) {
    const currentQuestion = this.diagnosticData.questions[this.diagnosticData.currentIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);

    this.diagnosticData.answers.push({
      questionId,
      optionId,
      score: selectedOption.score
    });

    this.diagnosticData.currentIndex++;

    if (this.diagnosticData.currentIndex < this.diagnosticData.questions.length) {
      this.renderDiagnosticQuestion();
    } else {
      this.emit('diagnosticComplete', { answers: this.diagnosticData.answers });
    }
  }

  displayDiagnosticResult(result) {
    this.switchView('diagnostic-result');

    const typeEl = this.widget.querySelector('#diagnostic-result-type');
    const subtitleEl = this.widget.querySelector('#diagnostic-result-subtitle');
    const detailsEl = this.widget.querySelector('#diagnostic-result-details');

    if (typeEl) typeEl.textContent = result.profileType;
    if (subtitleEl) subtitleEl.textContent = result.profileSubtitle;

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="aicoach-result-section">
          <h3>📝 요약</h3>
          <p>${result.summary}</p>
        </div>
        <div class="aicoach-result-section">
          <h3>💪 강점</h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${result.strengths.map(s => `<li style="color: #6b7280; margin-bottom: 8px;">${s}</li>`).join('')}
          </ul>
        </div>
        <div class="aicoach-result-section">
          <h3>🎯 개선 영역</h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${result.weaknesses.map(w => `<li style="color: #6b7280; margin-bottom: 8px;">${w}</li>`).join('')}
          </ul>
        </div>
        <div class="aicoach-result-section">
          <h3>🎓 맞춤 코칭 스타일</h3>
          <p>${result.coachingStyle}</p>
        </div>
        <div class="aicoach-result-section">
          <h3>💡 추천사항</h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${result.recommendations.map(r => `<li style="color: #6b7280; margin-bottom: 8px;">${r}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  }

  // 오늘의 행동 기능
  showDailyAction(actionData) {
    this.switchView('daily-action');

    const streakCount = this.widget.querySelector('#daily-streak-count');
    const actionDate = this.widget.querySelector('#daily-action-date');
    const actionText = this.widget.querySelector('#daily-action-text');

    if (streakCount) streakCount.textContent = actionData.streak || 0;
    if (actionDate) {
      const date = new Date(actionData.date);
      actionDate.textContent = date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric'
      });
    }
    if (actionText) actionText.textContent = actionData.action;

    // 완료 상태 확인
    if (actionData.completed) {
      const actionCard = this.widget.querySelector('.aicoach-action-card');
      const completedSection = this.widget.querySelector('#daily-action-completed');
      if (actionCard) actionCard.style.display = 'none';
      if (completedSection) completedSection.style.display = 'block';
    } else {
      const actionCard = this.widget.querySelector('.aicoach-action-card');
      const completedSection = this.widget.querySelector('#daily-action-completed');
      if (actionCard) actionCard.style.display = 'block';
      if (completedSection) completedSection.style.display = 'none';
    }
  }

  completeDailyAction() {
    this.emit('completeDailyAction');

    // 완료 화면 표시
    const actionCard = this.widget.querySelector('.aicoach-action-card');
    const completedSection = this.widget.querySelector('#daily-action-completed');
    if (actionCard) actionCard.style.display = 'none';
    if (completedSection) completedSection.style.display = 'block';

    // 스트릭 증가
    const streakCount = this.widget.querySelector('#daily-streak-count');
    if (streakCount) {
      const currentStreak = parseInt(streakCount.textContent) || 0;
      streakCount.textContent = currentStreak + 1;
    }
  }

  // 체크인 기능
  showCheckin(stats) {
    this.switchView('checkin');

    const completionEl = this.widget.querySelector('#checkin-completion');
    const streakEl = this.widget.querySelector('#checkin-streak');
    const actionsEl = this.widget.querySelector('#checkin-actions');

    if (completionEl) completionEl.textContent = `${stats.weeklyCompletion}%`;
    if (streakEl) streakEl.textContent = `${stats.currentStreak}일`;
    if (actionsEl) actionsEl.textContent = `${stats.totalCompletedActions}개`;
  }

  submitCheckin() {
    const selectedMood = this.widget.querySelector('.aicoach-mood-btn.selected');
    const comment = this.widget.querySelector('#checkin-comment');

    if (!selectedMood) {
      this.showError('기분을 선택해주세요.');
      return;
    }

    const mood = selectedMood.dataset.mood;
    const commentText = comment?.value?.trim() || '';

    this.emit('submitCheckin', {
      mood: parseInt(mood),
      comment: commentText
    });

    // 폼 초기화
    this.widget.querySelectorAll('.aicoach-mood-btn').forEach(b => b.classList.remove('selected'));
    if (comment) comment.value = '';

    // 완료 메시지
    alert('체크인이 완료되었습니다! 🎉');
    this.switchToHome();
  }

  displayHistory(sessions, pagination) {
    this.switchView('history');

    const historyList = this.widget.querySelector('.aicoach-history-list');
    if (!historyList) return;

    if (!sessions || sessions.length === 0) {
      historyList.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 40px 0;">아직 코칭 이력이 없습니다.</p>';
      return;
    }

    historyList.innerHTML = sessions.map(session => {
      const date = new Date(session.createdAt);
      const dateStr = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const timeStr = date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const statusBadge = session.status === 'completed'
        ? '<span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">완료</span>'
        : '<span style="background: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">진행중</span>';

      return `
        <div style="background: #f9fafb; padding: 16px; border-radius: 10px; margin-bottom: 12px; border: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #1f2937;">${session.goal}</strong>
            ${statusBadge}
          </div>
          <div style="font-size: 13px; color: #6b7280; line-height: 1.5; margin-bottom: 8px;">
            ${session.summary || '코칭 세션을 진행했습니다.'}
          </div>
          <div style="font-size: 12px; color: #9ca3af;">
            📅 ${dateStr} ${timeStr}
          </div>
        </div>
      `;
    }).join('');
  }

  // 성과 리포트 기능
  showPerformanceReport(reportData) {
    this.switchView('report');

    // KPI 업데이트
    const kpiSessions = this.widget.querySelector('#kpi-sessions');
    const kpiAchievement = this.widget.querySelector('#kpi-achievement');
    const kpiStreak = this.widget.querySelector('#kpi-streak');
    const kpiCompleted = this.widget.querySelector('#kpi-completed');

    if (kpiSessions) kpiSessions.textContent = reportData.totalSessions;
    if (kpiAchievement) kpiAchievement.textContent = `${reportData.achievementRate}%`;
    if (kpiStreak) kpiStreak.textContent = `${reportData.currentStreak}일`;
    if (kpiCompleted) kpiCompleted.textContent = `${reportData.completedActions}개`;

    // 분석 데이터 업데이트
    const peakTime = this.widget.querySelector('#analysis-peak-time');
    const topCategory = this.widget.querySelector('#analysis-top-category');
    const avgCompletion = this.widget.querySelector('#analysis-avg-completion');

    if (peakTime) peakTime.textContent = reportData.peakTime;
    if (topCategory) topCategory.textContent = reportData.topCategory;
    if (avgCompletion) avgCompletion.textContent = `${reportData.avgCompletion}%`;

    // 차트 렌더링
    this.renderActivityChart(reportData.activityData);
    this.renderCategoryChart(reportData.categoryData);
  }

  renderActivityChart(activityData) {
    const canvas = this.widget.querySelector('#aicoach-activity-chart');
    if (!canvas || !window.Chart) return;

    // 기존 차트 파괴
    if (this.activityChart) {
      this.activityChart.destroy();
    }

    this.activityChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: activityData.labels,
        datasets: [{
          label: '완료한 행동',
          data: activityData.values,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  renderCategoryChart(categoryData) {
    const canvas = this.widget.querySelector('#aicoach-category-chart');
    if (!canvas || !window.Chart) return;

    // 기존 차트 파괴
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }

    this.categoryChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: categoryData.labels,
        datasets: [{
          data: categoryData.values,
          backgroundColor: [
            '#4f46e5',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  exportReportToPDF() {
    // 간단한 PDF 출력 기능 (window.print 사용)
    // 실제 프로덕션에서는 jsPDF 등의 라이브러리를 사용할 수 있습니다
    alert('PDF 출력 기능이 준비 중입니다.\n\n현재는 브라우저의 인쇄 기능(Ctrl+P)을 사용하여 PDF로 저장하실 수 있습니다.');

    // 향후 jsPDF 라이브러리 사용 예시:
    // this.emit('exportPDF');
  }

  // 목표 관리 기능
  showGoalList(goals) {
    this.switchView('goal-list');

    const goalList = this.widget.querySelector('#aicoach-goal-list');
    if (!goalList) return;

    if (!goals || goals.length === 0) {
      goalList.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 20px 0;">아직 등록된 목표가 없습니다.<br>새로운 목표를 추가해보세요!</p>';
      return;
    }

    goalList.innerHTML = goals.map(goal => {
      const statusClass = goal.status === 'completed' ? 'completed' : 'active';
      const statusText = goal.status === 'completed' ? '완료' : '진행중';
      const progress = `${goal.currentSession}/${goal.targetSessions}`;

      return `
        <div class="aicoach-goal-card" data-goal-id="${goal.goalId}">
          <div class="aicoach-goal-card-header">
            <h4>${goal.goalName}</h4>
            <span class="aicoach-goal-status ${statusClass}">${statusText}</span>
          </div>
          <div class="aicoach-goal-card-progress">${progress} 회차</div>
          <div class="aicoach-goal-card-info">${goal.description || ''}</div>
        </div>
      `;
    }).join('');

    // 목표 카드 클릭 이벤트
    const goalCards = goalList.querySelectorAll('.aicoach-goal-card');
    goalCards.forEach(card => {
      card.addEventListener('click', () => {
        const goalId = card.dataset.goalId;
        this.selectGoal(goalId);
      });
    });
  }

  selectGoal(goalId) {
    this.emit('selectGoal', { goalId });
  }

  showGoalCreate() {
    this.switchView('goal-create');
  }

  submitGoalCreate() {
    const nameInput = this.widget.querySelector('#goal-name-input');
    const sessionsInput = this.widget.querySelector('#goal-sessions-input');
    const levelInput = this.widget.querySelector('input[name="goal-level"]:checked');
    const descriptionInput = this.widget.querySelector('#goal-description-input');

    const goalName = nameInput?.value?.trim();
    const targetSessions = parseInt(sessionsInput?.value || '8');
    const level = levelInput?.value || 'beginner';
    const description = descriptionInput?.value?.trim();

    if (!goalName) {
      this.showError('목표명을 입력해주세요.');
      return;
    }

    this.emit('createGoal', {
      goalName,
      targetSessions,
      level,
      description
    });

    // 폼 초기화
    if (nameInput) nameInput.value = '';
    if (descriptionInput) descriptionInput.value = '';
  }

  showAIGoalSuggestions() {
    // AI가 목표를 추천하는 기능
    this.emit('requestGoalSuggestions');
  }

  displayGoalSuggestions(suggestions) {
    const nameInput = this.widget.querySelector('#goal-name-input');
    if (!nameInput) return;

    // 간단한 구현: 첫 번째 추천을 입력창에 넣기
    if (suggestions && suggestions.length > 0) {
      nameInput.value = suggestions[0];
      alert(`AI 추천 목표:\n\n${suggestions.join('\n')}\n\n첫 번째 추천을 입력했습니다. 원하는 목표를 선택하거나 수정하세요.`);
    }
  }

  showTopicSelection(goal, suggestedTopics) {
    this.switchView('topic-selection');
    this.selectedGoal = goal;

    // 목표 정보 표시
    const goalNameEl = this.widget.querySelector('#selected-goal-name');
    const goalProgressEl = this.widget.querySelector('#selected-goal-progress');

    if (goalNameEl) goalNameEl.textContent = goal.goalName;
    if (goalProgressEl) goalProgressEl.textContent = `${goal.currentSession}/${goal.targetSessions} 회차`;

    // AI 추천 주제 표시
    const aiTopicsContainer = this.widget.querySelector('#ai-suggested-topics');
    if (aiTopicsContainer && suggestedTopics && suggestedTopics.length > 0) {
      const topicsHTML = suggestedTopics.map((topic, index) => `
        <div class="aicoach-topic-option ${index === 0 ? 'selected' : ''}" data-topic="${topic}">
          ${topic}
        </div>
      `).join('');

      aiTopicsContainer.innerHTML = `
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">AI 추천 주제:</p>
        ${topicsHTML}
      `;

      // 주제 옵션 클릭 이벤트
      const topicOptions = aiTopicsContainer.querySelectorAll('.aicoach-topic-option');
      topicOptions.forEach(option => {
        option.addEventListener('click', () => {
          topicOptions.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
        });
      });
    }
  }

  startCoachingWithTopic() {
    const topicMode = this.widget.querySelector('input[name="topic-mode"]:checked')?.value;

    let topic = '';

    if (topicMode === 'ai') {
      const selectedTopic = this.widget.querySelector('.aicoach-topic-option.selected');
      topic = selectedTopic?.dataset?.topic || '';
    } else {
      const customInput = this.widget.querySelector('#topic-custom-input');
      topic = customInput?.value?.trim() || '';
    }

    if (!topic) {
      this.showError('주제를 선택하거나 입력해주세요.');
      return;
    }

    this.emit('startCoaching', {
      goalId: this.selectedGoal?.goalId,
      topic
    });
  }

  // 이벤트 시스템
  on(event, handler) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
  }

  emit(event, data) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(handler => handler(data));
    }
  }

  destroy() {
    if (this.widget) {
      this.widget.remove();
      this.widget = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    this.emit('destroy');
  }

  getMessages() {
    return this.messages;
  }
}
