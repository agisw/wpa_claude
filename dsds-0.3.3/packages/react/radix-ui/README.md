# DSDS - React / Radix UI

DSDS 디자인 시스템을 기반으로 한 React + Radix UI 컴포넌트 라이브러리입니다.
접근성과 사용자 경험을 고려하여 설계된 고품질의 UI 컴포넌트를 제공합니다.

> � **문서**: [Storybook](https://dsds.mwebdev.samsungds.net/storybooks/react-radix-ui) | � **변경사항**: [CHANGELOG](./CHANGELOG.md)

## 📦 설치

```bash
npm install @dsds/react-radix-ui
# 또는
yarn add @dsds/react-radix-ui
# 또는
pnpm add @dsds/react-radix-ui
```

## 🎯 사용법

### 기본 설정

```tsx
import React from 'react';
import { Button, VSelect, FormField2 } from '@dsds/react-radix-ui';
import '@dsds/react-radix-ui/dist/index.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <VSelect
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]}
        placeholder="Select an option"
      />
    </div>
  );
}
```

### 주요 컴포넌트

- **Button**: 다양한 변형과 크기를 지원하는 버튼 컴포넌트
- **Tabs**: 접근성을 고려한 탭 네비게이션 컴포넌트
- **Header**: 반응형 레이아웃을 지원하는 헤더 컴포넌트
- **Dialog & Modal**: 대화상자 및 모달 컴포넌트
- **Breadcrumb**: 네비게이션 경로 표시 컴포넌트
- **Badge**: 상태 표시를 위한 배지 컴포넌트
- **Toast**: 알림 메시지 컴포넌트

## 📖 문서 및 예제

- **Storybook**: https://dsds.mwebdev.samsungds.net/storybooks/react-radix-ui
- **DSDS 디자인 시스템**: [디자인 시스템 가이드](https://dsds.mwebdev.samsungds.net)

## 🛠 기술 스택

- **React**: v19.1
- **TypeScript**: v5.8
- **Radix UI**: 접근성을 고려한 headless 컴포넌트
- **TailwindCSS**: 유틸리티 우선 CSS 프레임워크
- **Storybook**: 컴포넌트 개발 및 문서화

## 🏗 개발

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# Storybook 실행
npm run storybook

# 빌드
npm run build

# 테스트 실행
npm run test
```

### 컴포넌트 개발 가이드라인

1. **접근성 우선**: 모든 컴포넌트는 WCAG 2.1 AA 표준을 준수해야 합니다
2. **DSDS 디자인 시스템**: 디자인 토큰과 스타일 가이드를 따라야 합니다
3. **TypeScript**: 모든 컴포넌트는 타입 안전성을 보장해야 합니다
4. **테스트**: 각 컴포넌트는 적절한 테스트 커버리지를 가져야 합니다

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 커밋 메시지 규칙

- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `docs:` 문서 업데이트
- `style:` 코드 스타일 변경 (포맷팅 등)
- `refactor:` 코드 리팩토링
- `test:` 테스트 추가 또는 수정


## 🔗 관련 링크

- [DSDS 디자인 시스템](https://dsds.mwebdev.samsungds.net)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Storybook](https://dsds.mwebdev.samsungds.net/storybooks/react-radix-ui)

## 📢 최신 업데이트

### v0.1.2 (Latest)
- Tabs 컴포넌트 개선 및 스타일링 강화
- Header 컴포넌트 레이아웃 및 반응형 개선
- Icon 유틸리티 및 Breadcrumb 문서화 향상
- 접근성 및 QA 문서 개선


[전체 변경사항 보기 →](./CHANGELOG.md)

---

**@dsds/react-radix-ui**는 Samsung DS 디자인 시스템의 일부입니다.
