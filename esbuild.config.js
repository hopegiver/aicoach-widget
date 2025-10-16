const esbuild = require('esbuild');
const fs = require('fs');

// ES6 모듈 빌드 설정
const esmConfig = {
  entryPoints: ['src/aicoach-widget.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/aicoach-widget.esm.js',
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': '"production"'
  }
};

// IIFE 빌드 설정 (일반 스크립트 태그용)
const minConfig = {
  entryPoints: ['src/aicoach-widget.js'],
  bundle: true,
  format: 'iife',
  globalName: 'AICoachModule',
  outfile: 'dist/aicoach-widget.min.js',
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  footer: {
    js: 'window.AICoach = AICoachModule.AICoach;'
  }
};

// 빌드 실행
async function build() {
  try {
    console.log('🚀 Starting build...');

    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }

    // ES6 모듈 빌드
    await esbuild.build(esmConfig);
    console.log('✓ ES6 module built');

    // IIFE 빌드
    await esbuild.build(minConfig);
    console.log('✓ IIFE build completed');

    console.log('✅ Build completed successfully!');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// 개발 모드
async function dev() {
  try {
    console.log('🔄 Starting development mode...');

    const ctx = await esbuild.context({
      entryPoints: ['src/aicoach-widget.js'],
      bundle: true,
      format: 'iife',
      globalName: 'AICoachModule',
      outfile: 'dist/aicoach.dev.js',
      sourcemap: 'inline',
      target: ['es2020'],
      footer: {
        js: 'window.AICoach = AICoachModule.AICoach;'
      }
    });

    await ctx.watch();
    console.log('👀 Watching for changes...');

  } catch (error) {
    console.error('❌ Dev mode failed:', error);
    process.exit(1);
  }
}

// CLI 처리
const command = process.argv[2];

if (command === 'dev') {
  dev();
} else {
  build();
}
