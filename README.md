# AICoach Widget

AI 코칭 챗봇 위젯 - 어떤 웹사이트에든 쉽게 통합

## 개발 및 테스트

### 로컬 개발 환경 실행

**간단하게 한 번에:**
1. 라이브 서버로 `index.html` 실행
2. 챗봇 아이콘 클릭하여 테스트
3. 끝!

### Mock 데이터 수정

`mock-api/` 폴더의 JSON 파일을 수정하여 다양한 응답 테스트:
- `start.json` - 세션 시작 응답
- `chat.json` - 채팅 메시지 응답
- `complete.json` - 세션 완료 응답
- `sessions.json` - 이력 조회 응답

JSON 파일을 수정하고 새로고침하면 바로 반영됩니다.

### 프로덕션 빌드

```bash
npm run build
# dist/ 폴더에 빌드 파일 생성
```

## 설치

### NPM으로 설치 (예정)

```bash
npm install aicoach-widget
```

### CDN으로 사용

```html
<script src="https://cdn.your-domain.com/aicoach-widget.min.js"></script>
```

## 사용법

### 기본 사용 (IIFE 방식)

HTML 파일에 다음 코드를 추가하세요:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>My Website</h1>

  <!-- AI Coach Widget -->
  <script src="https://cdn.your-domain.com/aicoach-widget.min.js"></script>
  <script>
    new AICoach({
      apiUrl: 'https://aicoach-api.your-domain.workers.dev'
    });
  </script>
</body>
</html>
```

### ES6 모듈 방식

```html
<script type="module">
  import { AICoach } from 'https://cdn.your-domain.com/aicoach-widget.esm.js';

  new AICoach({
    apiUrl: 'https://aicoach-api.your-domain.workers.dev'
  });
</script>
```

### 옵션

```javascript
new AICoach({
  // API URL (필수)
  apiUrl: 'https://aicoach-api.your-domain.workers.dev',

  // 환영 메시지
  welcomeMessage: '안녕하세요! AI 코치입니다.',

  // 테마
  theme: 'default',

  // 크기 (데스크톱)
  width: 350,
  height: 500,

  // 모바일 전체화면 여부
  mobileFullscreen: true
});
