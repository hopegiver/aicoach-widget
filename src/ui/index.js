import layout from './layout.js';
import home from './home.js';
import goalList from './goal-list.js';
import goalCreate from './goal-create.js';
import topicSelection from './topic-selection.js';
import chat from './chat.js';
import history from './history.js';
import diagnostic from './diagnostic.js';
import dailyAction from './daily-action.js';
import checkin from './checkin.js';
import report from './report.js';

// 모든 화면 통합
const screens = [
  home,
  goalList,
  goalCreate,
  topicSelection,
  chat,
  history,
  diagnostic,
  dailyAction,
  checkin,
  report
];

// HTML 통합
const screensHTML = screens.map(screen => screen.html).join('\n');
const finalHTML = layout.html.replace('{{SCREENS}}', screensHTML);

// CSS 통합
const allStyles = [
  layout.styles,
  ...screens.map(screen => screen.styles)
].join('\n');

export default {
  name: 'default',
  version: '2.0.0',
  loadedAt: new Date().toISOString(),
  html: `
    ${finalHTML}
    <style>
      ${allStyles}
    </style>
  `
};
