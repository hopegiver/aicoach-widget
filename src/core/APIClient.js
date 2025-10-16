/**
 * API 클라이언트
 */
export class APIClient {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'https://aicoach-api.your-domain.workers.dev';
    this.useMockData = this.baseUrl.includes('localhost') || this.baseUrl.startsWith('./mock-api');
  }

  /**
   * 코칭 세션 시작
   */
  async startSession(goal) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(800);
      const response = await fetch('./mock-api/start.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/coaching/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '세션 시작 실패');
    }

    return data.data;
  }

  /**
   * 메시지 전송
   */
  async sendMessage(sessionId, message) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(1000);
      const response = await fetch('./mock-api/chat.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/coaching/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId, message })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '메시지 전송 실패');
    }

    return data.data;
  }

  /**
   * 세션 종료
   */
  async completeSession(sessionId) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(600);
      const response = await fetch('./mock-api/complete.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/coaching/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '세션 종료 실패');
    }

    return data.data;
  }

  /**
   * 세션 목록 조회
   */
  async getSessions(page = 1, limit = 20) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(400);
      const response = await fetch('./mock-api/sessions.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/sessions?page=${page}&limit=${limit}`);

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '세션 조회 실패');
    }

    return data.data;
  }

  /**
   * 특정 세션 조회
   */
  async getSession(sessionId) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(300);
      const response = await fetch('./mock-api/sessions.json');
      const data = await response.json();
      // 첫 번째 세션 반환
      return data.data.items[0];
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/sessions/${sessionId}`);

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '세션 조회 실패');
    }

    return data.data;
  }

  /**
   * 진단 질문 조회
   */
  async getDiagnosticQuestions() {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(500);
      const response = await fetch('./mock-api/diagnostic-questions.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/diagnostic/questions`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '진단 질문 조회 실패');
    }

    return data.data;
  }

  /**
   * 진단 결과 제출
   */
  async submitDiagnostic(answers) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(1200);
      const response = await fetch('./mock-api/diagnostic-result.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/diagnostic/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '진단 결과 제출 실패');
    }

    return data.data;
  }

  /**
   * 오늘의 행동 조회
   */
  async getDailyAction() {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(400);
      const response = await fetch('./mock-api/daily-action.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/daily-action`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '오늘의 행동 조회 실패');
    }

    return data.data;
  }

  /**
   * 오늘의 행동 완료
   */
  async completeDailyAction(date) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(600);
      return {
        success: true,
        streak: 8
      };
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/daily-action/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '행동 완료 처리 실패');
    }

    return data.data;
  }

  /**
   * 체크인 통계 조회
   */
  async getCheckinStats() {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(400);
      const response = await fetch('./mock-api/checkin-stats.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/checkin/stats`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '체크인 통계 조회 실패');
    }

    return data.data;
  }

  /**
   * 체크인 제출
   */
  async submitCheckin(checkinData) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(800);
      return {
        success: true,
        message: '체크인이 완료되었습니다!'
      };
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/checkin/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkinData)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '체크인 제출 실패');
    }

    return data.data;
  }

  /**
   * 성과 리포트 조회
   */
  async getPerformanceReport(period = 'week') {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(600);
      const response = await fetch('./mock-api/performance-report.json');
      const data = await response.json();
      return data.data[period] || data.data.week;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/performance/report?period=${period}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '성과 리포트 조회 실패');
    }

    return data.data;
  }

  /**
   * 목표 목록 조회
   */
  async getGoals() {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(400);
      const response = await fetch('./mock-api/goals.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/goals`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '목표 목록 조회 실패');
    }

    return data.data;
  }

  /**
   * 목표 생성
   */
  async createGoal(goalData) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(600);
      return {
        goalId: 'goal_' + Date.now(),
        ...goalData,
        currentSession: 0,
        status: 'active',
        createdAt: new Date().toISOString()
      };
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalData)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || '목표 생성 실패');
    }

    return data.data;
  }

  /**
   * AI 목표 추천
   */
  async getGoalSuggestions() {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(800);
      const response = await fetch('./mock-api/goal-suggestions.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/goals/suggestions`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'AI 목표 추천 실패');
    }

    return data.data;
  }

  /**
   * AI 주제 추천 조회
   */
  async getTopicSuggestions(goalId) {
    // Mock 데이터 사용
    if (this.useMockData) {
      await this._delay(600);
      const response = await fetch('./mock-api/topic-suggestions.json');
      const data = await response.json();
      return data.data;
    }

    // 실제 API 호출
    const response = await fetch(`${this.baseUrl}/v1/goals/${goalId}/topics`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'AI 주제 추천 실패');
    }

    return data.data;
  }

  /**
   * 지연 시뮬레이션 (Mock 데이터용)
   */
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
