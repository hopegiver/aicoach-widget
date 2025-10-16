// AI Coach 위젯 - ES6 모듈

import { Chatbot } from './core/Chatbot.js';
import { APIClient } from './core/APIClient.js';
import defaultTheme from './ui/index.js';

export class AICoach {
  constructor(options = {}) {
    this.options = this._normalizeOptions(options);
    this.currentSessionId = null;
    this.currentStream = null;
    this._initializeComponents();
    this._start();
  }

  _normalizeOptions(options) {
    return {
      apiUrl: options.apiUrl || 'https://aicoach-api.your-domain.workers.dev',
      welcomeMessage: options.welcomeMessage || '안녕하세요! AI 코치입니다. 어떤 목표를 이루고 싶으신가요?',
      theme: options.theme || 'default',
      width: options.width || 400,
      height: options.height || 580,
      mobileFullscreen: options.mobileFullscreen !== false,
      ...options
    };
  }

  _initializeComponents() {
    this.chatbot = new Chatbot(this.options);
    this.apiClient = new APIClient({
      baseUrl: this.options.apiUrl
    });
  }

  async _start() {
    const theme = this.loadTheme(this.options.theme);
    this.chatbot.init(theme.html);
    this._bindEvents();
  }

  loadTheme(themeName = 'default') {
    // 현재는 default 테마만 지원
    // 추후 다른 테마 추가 시 여기서 분기 처리
    return defaultTheme;
  }

  _bindEvents() {
    this.chatbot.on('messageSent', this._handleMessageSent.bind(this));
    this.chatbot.on('startCoaching', this._handleStartCoaching.bind(this));
    this.chatbot.on('viewHistory', this._handleViewHistory.bind(this));
    this.chatbot.on('endSession', this._handleEndSession.bind(this));
    this.chatbot.on('startDiagnostic', this._handleStartDiagnostic.bind(this));
    this.chatbot.on('diagnosticComplete', this._handleDiagnosticComplete.bind(this));
    this.chatbot.on('viewDailyAction', this._handleViewDailyAction.bind(this));
    this.chatbot.on('completeDailyAction', this._handleCompleteDailyAction.bind(this));
    this.chatbot.on('viewCheckin', this._handleViewCheckin.bind(this));
    this.chatbot.on('submitCheckin', this._handleSubmitCheckin.bind(this));
    this.chatbot.on('viewReport', this._handleViewReport.bind(this));
    this.chatbot.on('changePeriod', this._handleChangePeriod.bind(this));

    // 목표 관리 이벤트
    this.chatbot.on('viewGoalList', this._handleViewGoalList.bind(this));
    this.chatbot.on('selectGoal', this._handleSelectGoal.bind(this));
    this.chatbot.on('createGoal', this._handleCreateGoal.bind(this));
    this.chatbot.on('requestGoalSuggestions', this._handleRequestGoalSuggestions.bind(this));
  }

  async _handleStartCoaching(data) {
    // 새로운 목표 관리 시스템: goalId + topic
    // 레거시: goal 문자열
    let goalText = '';

    if (data.topic && data.goalId) {
      // 주제 선택을 통한 코칭 시작
      const selectedGoal = this.chatbot.selectedGoal;
      if (selectedGoal) {
        goalText = `${selectedGoal.goalName} - ${data.topic}`;
      } else {
        goalText = data.topic;
      }
    } else if (data.goal) {
      // 레거시: 직접 입력한 목표
      goalText = data.goal;
    }

    if (!goalText || goalText.trim() === '') {
      this.chatbot.showError('코칭 목표를 입력해주세요.');
      return;
    }

    this.chatbot.showTypingIndicator();

    try {
      const result = await this.apiClient.startSession(goalText);
      this.currentSessionId = result.sessionId;

      this.chatbot.hideTypingIndicator();
      this.chatbot.switchToChat();
      this.chatbot.addMessage(`목표: ${goalText}`, 'user');
      this.chatbot.addMessage(result.message, 'ai');

    } catch (error) {
      console.error('Start coaching error:', error);
      this.chatbot.hideTypingIndicator();
      this.chatbot.showError('세션 시작 중 오류가 발생했습니다.');
    }
  }

  async _handleMessageSent(data) {
    if (!this.currentSessionId) {
      this.chatbot.showError('활성 세션이 없습니다.');
      return;
    }

    this.chatbot.showTypingIndicator();

    try {
      const result = await this.apiClient.sendMessage(
        this.currentSessionId,
        data.text
      );

      this.chatbot.hideTypingIndicator();
      this.chatbot.addMessage(result.message, 'ai');

    } catch (error) {
      console.error('Send message error:', error);
      this.chatbot.hideTypingIndicator();
      this.chatbot.showError('메시지 전송 중 오류가 발생했습니다.');
    }
  }

  async _handleViewHistory() {
    try {
      const result = await this.apiClient.getSessions();
      this.chatbot.displayHistory(result.items, result.pagination);
    } catch (error) {
      console.error('View history error:', error);
      this.chatbot.showError('이력 조회 중 오류가 발생했습니다.');
    }
  }

  async _handleEndSession() {
    if (!this.currentSessionId) {
      return;
    }

    if (!confirm('코칭 세션을 종료하시겠습니까?')) {
      return;
    }

    this.chatbot.showTypingIndicator();

    try {
      const result = await this.apiClient.completeSession(this.currentSessionId);

      this.chatbot.hideTypingIndicator();
      this.chatbot.addMessage(`세션이 종료되었습니다.\n\n${result.summary}`, 'ai');

      setTimeout(() => {
        this.currentSessionId = null;
        this.chatbot.switchToHome();
      }, 3000);

    } catch (error) {
      console.error('End session error:', error);
      this.chatbot.hideTypingIndicator();
      this.chatbot.showError('세션 종료 중 오류가 발생했습니다.');
    }
  }

  async _handleStartDiagnostic() {
    try {
      const result = await this.apiClient.getDiagnosticQuestions();
      this.chatbot.showDiagnostic(result.questions);
    } catch (error) {
      console.error('Start diagnostic error:', error);
      this.chatbot.showError('진단 시작 중 오류가 발생했습니다.');
    }
  }

  async _handleDiagnosticComplete(data) {
    this.chatbot.showTypingIndicator();

    try {
      const result = await this.apiClient.submitDiagnostic(data.answers);
      this.chatbot.hideTypingIndicator();
      this.chatbot.displayDiagnosticResult(result);
    } catch (error) {
      console.error('Diagnostic complete error:', error);
      this.chatbot.hideTypingIndicator();
      this.chatbot.showError('진단 결과 분석 중 오류가 발생했습니다.');
    }
  }

  async _handleViewDailyAction() {
    try {
      const actionData = await this.apiClient.getDailyAction();
      this.chatbot.showDailyAction(actionData);
    } catch (error) {
      console.error('View daily action error:', error);
      this.chatbot.showError('오늘의 행동을 불러오는 중 오류가 발생했습니다.');
    }
  }

  async _handleCompleteDailyAction() {
    try {
      const today = new Date().toISOString().split('T')[0];
      await this.apiClient.completeDailyAction(today);
      console.log('Daily action completed!');
    } catch (error) {
      console.error('Complete daily action error:', error);
      this.chatbot.showError('행동 완료 처리 중 오류가 발생했습니다.');
    }
  }

  async _handleViewCheckin() {
    try {
      const stats = await this.apiClient.getCheckinStats();
      this.chatbot.showCheckin(stats);
    } catch (error) {
      console.error('View checkin error:', error);
      this.chatbot.showError('진행 상황을 불러오는 중 오류가 발생했습니다.');
    }
  }

  async _handleSubmitCheckin(data) {
    try {
      await this.apiClient.submitCheckin(data);
      console.log('Checkin submitted!', data);
    } catch (error) {
      console.error('Submit checkin error:', error);
      this.chatbot.showError('체크인 제출 중 오류가 발생했습니다.');
    }
  }

  async _handleViewReport() {
    try {
      const reportData = await this.apiClient.getPerformanceReport('week');
      this.chatbot.showPerformanceReport(reportData);
    } catch (error) {
      console.error('View report error:', error);
      this.chatbot.showError('성과 리포트를 불러오는 중 오류가 발생했습니다.');
    }
  }

  async _handleChangePeriod(data) {
    try {
      const reportData = await this.apiClient.getPerformanceReport(data.period);
      this.chatbot.showPerformanceReport(reportData);
    } catch (error) {
      console.error('Change period error:', error);
      this.chatbot.showError('리포트 기간 변경 중 오류가 발생했습니다.');
    }
  }

  // 목표 관리 핸들러
  async _handleViewGoalList() {
    try {
      const goals = await this.apiClient.getGoals();
      this.chatbot.showGoalList(goals);
    } catch (error) {
      console.error('View goal list error:', error);
      this.chatbot.showError('목표 목록을 불러오는 중 오류가 발생했습니다.');
    }
  }

  async _handleSelectGoal(data) {
    try {
      // 목표 정보를 다시 조회 (실제로는 캐시된 데이터 사용 가능)
      const goals = await this.apiClient.getGoals();
      const selectedGoal = goals.find(g => g.goalId === data.goalId);

      if (!selectedGoal) {
        this.chatbot.showError('목표를 찾을 수 없습니다.');
        return;
      }

      // AI 주제 추천 조회
      const suggestedTopics = await this.apiClient.getTopicSuggestions(data.goalId);

      this.chatbot.showTopicSelection(selectedGoal, suggestedTopics);
    } catch (error) {
      console.error('Select goal error:', error);
      this.chatbot.showError('목표 선택 중 오류가 발생했습니다.');
    }
  }

  async _handleCreateGoal(data) {
    try {
      const newGoal = await this.apiClient.createGoal(data);
      console.log('Goal created:', newGoal);

      // 목표 생성 후 목표 목록으로 이동
      alert('목표가 성공적으로 등록되었습니다! 🎉');
      const goals = await this.apiClient.getGoals();
      this.chatbot.showGoalList(goals);
    } catch (error) {
      console.error('Create goal error:', error);
      this.chatbot.showError('목표 등록 중 오류가 발생했습니다.');
    }
  }

  async _handleRequestGoalSuggestions() {
    try {
      const suggestions = await this.apiClient.getGoalSuggestions();
      this.chatbot.displayGoalSuggestions(suggestions);
    } catch (error) {
      console.error('Request goal suggestions error:', error);
      this.chatbot.showError('AI 목표 추천 중 오류가 발생했습니다.');
    }
  }

  // Public API
  show() { return this.chatbot.show(); }
  hide() { return this.chatbot.hide(); }
  toggle() { return this.chatbot.toggle(); }
  destroy() { return this.chatbot.destroy(); }
}

export default AICoach;
