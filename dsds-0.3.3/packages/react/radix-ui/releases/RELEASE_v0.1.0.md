# DSDS React Radix UI v0.1.0 - Initial Release

DSDS React Radix UI 라이브러리의 첫 번째 공식 릴리즈입니다.

## 프로젝트 소개

DSDS (DS Design System) React Radix UI는 일관된 사용자 경험을 제공하기 위해 Radix UI 기반으로 구축된 커스텀 컴포넌트 라이브러리입니다.

### 핵심 특징
- DSDS 디자인 토큰 완전 통합
- WCAG 2.1 접근성 표준 준수
- 다크/라이트 테마 지원
- 반응형 디자인 기본 제공
- 완전한 TypeScript 지원

## 포함된 컴포넌트

### 핵심 레이아웃 컴포넌트
- **Header 컴포넌트**:
  - 기본 헤더 레이아웃 및 네비게이션 기능
  - 탭 지원 기능 (withTabs 변형)
  - 검색박스 통합 및 스타일링
  - 로고 클릭 핸들링 (homeUrl, onLogoClick props)
- **Footer 컴포넌트**:
  - 커스터마이즈 가능한 푸터 아이템 및 테마 지원
  - 저작권 정보 표시 (CopyrightIcon 포함)
  - 기밀 정보 표시 (ConfidentialIcon 포함)
- **LNB (Left Navigation Bar) 컴포넌트**:
  - 트리 구조 네비게이션 지원
  - 검색 기능 및 경로 관리
  - 리사이징 기능 및 접근성 향상
  - 아코디언 방식 확장/축소 기능

### UI 기본 요소
- **Button 컴포넌트**: 다양한 변형 및 상태 지원, 배지 알림 기능
- **Input Box 시스템**:
  - Textbox: 기본 텍스트 입력 컴포넌트
  - Searchbox: 검색 기능이 포함된 입력 컴포넌트
  - Calbox: 달력 선택 기능이 포함된 입력 컴포넌트
- **Page 컴포넌트**: 페이지 레이아웃 구조 및 헤더 통합
- **Badge, Modal, Dialog, ScrollArea, Tabs, Toast** 등

### 아이콘 시스템
- **기본 아이콘들**: GearIcon, ExternalIcon, ConfidentialIcon, CopyrightIcon, LnbIcon 등
- **아이콘 프롭스**: 색상 커스터마이징 및 접근성 속성 지원

## 기술 스택

- **React 19.1** + **Radix UI**
- **TypeScript 5.8** + **Vite**
- **TailwindCSS** + **@dsds/tokens**
- **Storybook** (문서화)

## 개발 환경 및 도구

### Storybook 통합
- 모든 컴포넌트에 대한 상세 문서화
- 인터랙티브 예제 및 컨트롤
- 디자인 토큰 문서화

### 빌드 및 테스트
- **빌드 시스템**: Vite, TypeScript, Rollup 기반
- **시각적 회귀 테스트**: Playwright 기반 UI 테스트 자동화
- **코드 품질**: ESLint & Prettier

### 스타일 시스템
- **DSDS 디자인 토큰**: 일관된 디자인 시스템 토큰 적용
- **CSS 모듈 시스템**: 컴포넌트별 스타일 모듈화 (Tailwindcss V4)
- **반응형 디자인**: 모바일 및 데스크톱 대응
- **접근성**: WCAG 가이드라인 준수

## 레이아웃 및 예제

- **Layout Examples**: 다양한 페이지 레이아웃 템플릿
- **Table 컴포넌트**: 데이터 테이블 기본 구현 및 페이지네이션
- **Navigation 컴포넌트**: 네비게이션 구조 및 컴포넌트들

## 문서화

- **설치 가이드**: 프로젝트 생성 및 기존 프로젝트 통합 가이드
- **스타일링 가이드**: 디자인 토큰 사용법 및 네이밍 규칙
- **기여 가이드**: 커밋 전략, 구현 가이드라인, 테스트 설정
- **행동 강령**: 프로젝트 기여자를 위한 Code of Conduct

---

**전체 변경사항**: [CHANGELOG.md](../CHANGELOG.md)

### 릴리즈 통계
- **개발 기간**: 3개월 (2025년 6월-9월)
- **총 커밋**: 300+ 개
- **핵심 컴포넌트**: 15개
- **하위 컴포넌트**: 25+ 개
- **TypeScript 지원**: 완전 지원

**설치:**
```bash
npm install @dsds/react-radix-ui@0.1.0
```

**빠른 시작:**
```typescript
import React from 'react';
import { Button, Header, Footer } from '@dsds/react-radix-ui';
import '@dsds/react-radix-ui/dist/index.css';

function App() {
  return (
    <div>
      <Header />
      <Button variant="primary">Click me</Button>
      <Footer />
    </div>
  );
}
```