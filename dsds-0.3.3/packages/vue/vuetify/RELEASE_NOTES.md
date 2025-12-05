# 릴리즈 노트

> **GitHub Releases**: 각 버전별 상세 릴리즈 노트는 [`releases/`](./releases/) 폴더에서 확인할 수 있습니다.

## v0.1.2 (2025-09-25)

**릴리즈 기간**: 2025년 9월 18일 - 2025년 9월 25일
**주요 기여자**: Joseph Kim

### 🆕 신규 기능 (New Features)

#### 새로운 컴포넌트
- **VTabs & VTab 컴포넌트**
  - 키보드 네비게이션 지원 (Arrow keys, Tab, Enter)
  - ARIA 접근성 속성 완전 지원
  - 다양한 스타일 variant 제공
  - VTabsWindow, VTabsWindowItem 포함 (backward compatibility)

- **RichTextEditor 컴포넌트**
  - WYSIWYG 텍스트 편집 기능
  - 다양한 텍스트 포맷팅 옵션
  - 반응형 디자인 지원

- **VTooltip 컴포넌트 개선**
  - 컨텍스트 기반 동적 콘텐츠
  - 커스터마이징 가능한 스타일링
  - 위치 자동 조정 기능
  - 부드러운 애니메이션 효과

#### 기존 컴포넌트 기능 확장
- **VSelect 컴포넌트**
  - **다중 선택 배지(Multiple Selection Badge)**: 선택된 항목을 시각적 배지로 표시
  - **Indeterminate 상태**: 부분 선택 상태 시각화
  - **Ghost Variant**: 투명한 배경의 미니멀 스타일 옵션

- **VCheckbox**
  - 상세한 사용 예제 및 가이드라인
  - 모든 props에 대한 완전한 TypeScript 타입 정의
  - 접근성 개선사항

### ⚡ 기능 개선 (Enhancements)

#### DSDS 디자인 시스템 통합
- **VRadioGroup, VSelect, VTextField**에 DSDS 디자인 토큰 적용
- 일관된 색상 팔레트 및 타이포그래피 시스템
- 다크/라이트 테마 완전 지원
- 브랜드 아이덴티티에 맞는 시각적 개선

#### 문서화 및 개발자 경험
- **Storybook 개선**
  - `@storybook/vue3-vite` 마이그레이션 완료
  - 모든 컴포넌트에 대한 인터랙티브 예제 추가
  - Controls 패널을 통한 실시간 props 조정

- **컴포넌트 문서화**
  - **Breadcrumb**: 상세한 API 문서 및 사용 예제
  - **VBtn**: 모든 variant와 state에 대한 완전한 가이드
  - **VCheckbox**: Props 설명 및 접근성 가이드라인

#### UI/UX 개선사항
- **Header 컴포넌트**
  - 클래스명 일관성 개선
  - 반응형 디자인 최적화
  - 다크 테마에서 검색박스 disabled 상태 시각화 개선

- **스타일링 시스템**
  - 탭 버튼 높이 일관성 확보
  - 애니메이션 타이밍 최적화
  - 컴포넌트 간 간격 표준화

### 🐛 버그 수정 (Bug Fixes)

#### 스타일 관련 수정
- **라디오 버튼**: hover 상태에서 올바른 색상 표시
- **Header 버튼**: 스타일 불일치 문제 해결
- **Tooltip 위치**: 화면 경계에서 올바른 위치 계산
- **애니메이션**: 부자연스러운 지연 시간 및 간격 수정

#### 코드 품질 개선
- **TypeScript 타입 에러**: 모든 타입 불일치 문제 해결
- **Import 정리**: 사용하지 않는 vuetify 스타일 import 제거
- **코드 정리**: Obsolete 파일 및 사용하지 않는 샘플 제거

#### 테스트 및 안정성
- **Visual 테스트**: 스냅샷 업데이트로 회귀 방지
- **Storybook**: 명확성과 구성 개선으로 QA 프로세스 향상

### 🔧 개발 환경 개선

#### 패키지 관리
- `package.json`에 author 및 description 필드 추가
- 의존성 최적화 및 불필요한 파일 제거

#### 빌드 및 배포
- Visual 스냅샷 자동 업데이트 시스템 구축
- Storybook 빌드 최적화

### 🚀 다음 버전 계획

#### 예정된 기능
- **VDataTable**: 고급 데이터 테이블 컴포넌트
- **VDatePicker**: 개선된 날짜 선택 컴포넌트
- **VFormValidator**: 통합 폼 검증 시스템

#### 개선 계획
- 성능 최적화 및 번들 크기 감소
- 접근성 표준 준수율 향상
- 다국어 지원 확대

---

### 📊 릴리즈 통계
- **총 커밋 수**: 23개
- **새로운 컴포넌트**: 3개
- **개선된 컴포넌트**: 5개
- **수정된 버그**: 8개
- **문서 업데이트**: 6개

---

## v0.1.1 (2025-09-17)

**릴리즈 기간**: 2025년 9월 3일 - 2025년 9월 17일
**주요 기여자**: Joseph Kim

### 🆕 신규 기능 (New Features)

#### 새로운 컴포넌트
- **VRadioGroup & VRadio 컴포넌트**
  - 완전한 라디오 버튼 시스템
  - 그룹 관리 기능
  - 커스텀 스타일링 지원
  - 접근성 최적화

- **Pagination 시스템**
  - Pagination 메인 컴포넌트
  - PaginationRoot, PaginationContent
  - PaginationNumber, PaginationDot

- **Header 컴포넌트 시스템**
  - Header 메인 컴포넌트
  - HeaderLogo, HeaderMenu, HeaderTenant
  - HeaderHamburgerMenu, HeaderGNB, HeaderUtility
  - HeaderTabs, HeaderDivider, HeaderButton
  - HeaderLink, HeaderImage, HeaderSearchbox

- **CollapseToggleButton**
  - 접기/펼치기 토글 기능
  - 다양한 크기 옵션
  - 애니메이션 효과

- **Toast 시스템**
  - Toast 컴포넌트
  - showToast 유틸리티 함수

- **VTooltip 컴포넌트** (초기 버전)
  - 기본 툴팁 기능
  - 위치 자동 조정
  - 다양한 방향 지원

### ⚡ 기능 개선 (Enhancements)

#### 개발 환경 및 도구
- **Storybook 9.1.5** 업그레이드
  - 성능 향상 및 안정성 개선
  - 새로운 기능 활용

- **빌드 시스템 개선**
  - Vite 설정 최적화
  - rollup-preserve-directives 추가
  - 오프라인 ESM 빌드 지원

- **프로젝트 템플릿**
  - Vuetify 기본 템플릿 추가
  - 자동 라우트 생성 시스템
  - ESLint & TypeScript 설정 포함

#### 컴포넌트 상태 관리
- **Disabled 상태 시스템**
  - 모든 주요 컴포넌트에 disabled 모드 추가
  - 일관된 시각적 피드백
  - 접근성 표준 준수

- **디자인 토큰 업데이트**
  - 새로운 색상 시스템
  - Alert 색상 추가
  - 일관된 색상 팔레트

#### 문서화 시스템
- **QA 문서 시스템** 구축
  - Boxes, Footer, Toggle, Radio 컴포넌트 문서 완성
  - 시각적 회귀 테스트 추가
  - 사용법 가이드 강화

### 🐛 버그 수정 (Bug Fixes)

#### 스타일 및 레이아웃 수정
- **Select 아이콘**: 드롭다운 아이콘 디자인 일관성 확보
- **Calendar & Copyright 아이콘**: stroke width 및 스타일 정규화
- **Textbox 패딩**: 소형 텍스트박스 레이아웃 일관성 개선
- **Footer**: 디바이더 높이 및 텍스트 패딩 조정

#### 상호작용 개선
- **Tooltip 위치**: 모든 방향에서 일관된 오프셋 적용
- **Header 호버**: disabled 상태에서 호버 효과 제거
- **Button 상태**: 패딩 및 disabled 스타일 정규화

#### 접근성 개선
- **아이콘 접근성**: data-testid 및 aria-label 속성 추가
- **키보드 네비게이션**: 모든 인터랙티브 요소에 적용
- **스크린 리더**: 적절한 ARIA 속성 추가

### 🔧 개발 및 배포

#### 설치 및 설정
- **설치 가이드 개선**
  - pnpm 사용법 명확화
  - SSL 이슈 해결 가이드
  - 템플릿 옵션 추가

- **문서 시스템**
  - Markdown 문법 수정
  - 링크 정확성 개선
  - 네비게이션 로직 강화

#### 테스트 시스템
- **Visual 회귀 테스트**
  - 스냅샷 자동 업데이트
  - Ubuntu 데스크톱 환경 지원
  - QA 문서 테스트 포함

### 🚀 기술적 개선사항

#### 컴포넌트 아키텍처
- **styleCallback 리팩토링**: 그리드 컴포넌트 가독성 향상
- **네비게이션 컴포넌트**: 구조 개선 및 의존성 업데이트
- **아이콘 시스템**: 명명 함수로 변경 및 SVG 최적화

#### 성능 최적화
- **번들 크기**: 불필요한 템플릿 파일 제거
- **빌드 최적화**: 템플릿 인수 파싱 개선
- **의존성 관리**: 패키지 정리 및 최적화

---

### 📊 v0.1.1 릴리즈 통계
- **총 커밋 수**: 71개
- **새로운 컴포넌트**: 5개 (NoticeDialog, Header, Radio, Toggle, Tooltip)
- **개선된 컴포넌트**: 8개
- **수정된 버그**: 12개
- **문서 업데이트**: 15개
- **개발 도구 개선**: 6개

---

## v0.1.0 (2025-09-02) - Initial Release

**릴리즈 기간**: 2025년 6월 7일 - 2025년 9월 2일
**주요 기여자**: Joseph Kim
**프로젝트 설립**: DSDS Vue Vuetify 라이브러리 출범

### 🎯 프로젝트 비전

DSDS (Design System for Digital Services) Vue Vuetify는 일관된 사용자 경험을 제공하기 위해 Vuetify 3.x 기반으로 구축된 커스텀 컴포넌트 라이브러리입니다. TailwindCSS와의 완벽한 통합을 통해 디자인 토큰 기반의 확장 가능한 UI 시스템을 제공합니다.

### 🏗️ 프로젝트 인프라

#### 기본 개발 환경
- **Vue 3.5**: 최신 Vue 컴포지션 API 활용
- **Vuetify 3.9**: Material Design 3 기반 컴포넌트 시스템
- **TypeScript 5.8**: 완전한 타입 안전성
- **Vite**: 빠른 개발 서버 및 빌드 시스템
- **ESLint**: 코드 품질 관리

#### 문서화 및 테스트
- **Storybook**: 인터랙티브 컴포넌트 문서화
- **Visual Regression Testing**: 자동화된 시각적 테스트

#### 디자인 시스템 통합
- **@dsds/tokens**: 디자인 토큰 패키지 통합
- **TailwindCSS**: 유틸리티 우선 스타일링

### 🧩 핵심 컴포넌트 시스템

#### Core Form & Input Components
- **VBtn**: 다양한 variant와 상태를 지원하는 버튼 시스템
  - Primary, Secondary, Outlined, Text variants
  - Loading, Disabled 상태 지원

- **VSelect**: 고급 선택 드롭다운
  - 커스텀 아이템 title/value 매핑
  - 다중 선택 지원

- **VTextField**: 강력한 텍스트 입력 시스템
  - Clear 기능 내장
  - append-inner 슬롯으로 아이콘 커스터마이징

- **VCheckbox**: 유연한 체크박스 시스템
  - 배열 v-model 지원으로 다중 선택
  - 접근성 최적화

- **VAutocomplete**: 지능형 자동완성
  - 커스텀 선택 슬롯
  - Focus/Blur 이벤트 핸들링

- **VueDatePicker**: 날짜 선택기
  - 반응형 디자인
  - 접근성 표준 준수

- **VDialog**: 모달 다이얼로그 컴포넌트
- **VTooltip**: 기본 툴팁 컴포넌트
- **VCardText**: 카드 텍스트 컴포넌트
  - **HeaderGNB**: 글로벌 네비게이션 바
  - **HeaderUtility**: 유틸리티 영역
  - **HeaderTabs**: 탭 네비게이션
  - **HeaderSearchbox**: 통합 검색 기능

- **Footer 시스템**: 커스터마이징 가능한 푸터
  - CopyrightIcon 통합
  - 다양한 테마 지원
  - 링크 및 버튼 구성

#### Layout & Form System Components
- **Breadcrumb 시스템**: 브레드크럼 네비게이션
  - Breadcrumb 메인 컴포넌트
  - BreadcrumbElement, BreadcrumbText, BreadcrumbSelect

- **PageHeader 시스템**: 페이지 헤더 및 필터
  - PageHeader 메인 컴포넌트
  - PageHeaderDivider, PageHeaderFilter
  - PageBody 레이아웃 컴포넌트

- **Dialog 시스템**: 다이얼로그 관련 컴포넌트
  - DialogHeader, DialogPanel

- **Form 시스템**: 폼 관련 컴포넌트
  - FormLabel, FormField

### 🔧 개발자 경험

#### 설치 및 설정
- **프로젝트 통합**: 단계별 통합 가이드
- **pnpm 지원**: 효율적인 패키지 관리

#### 문서화 시스템
- **상세한 API 문서**: 모든 컴포넌트의 props 및 이벤트
- **실시간 예제**: Storybook을 통한 인터랙티브 데모
- **스타일링 가이드**: 디자인 토큰 사용법

#### 개발 도구
- **Hot Module Replacement**: 빠른 개발 피드백
- **TypeScript 지원**: 완전한 타입 정의
- **ESLint 통합**: 코드 품질 자동 검사

### 🚀 성능 및 최적화

#### 번들 최적화
- **Tree Shaking**: 사용하지 않는 코드 자동 제거
- **ESM 빌드**: 모던 브라우저 최적화

#### 런타임 성능
- **Virtual Scrolling**: 대용량 데이터 처리
- **메모리 최적화**: 효율적인 DOM 업데이트
- **접근성 성능**: 스크린 리더 최적화

### 🎯 접근성 & 사용성

#### WCAG 2.1 준수
- **키보드 네비게이션**: 모든 인터랙티브 요소
- **스크린 리더**: 완전한 ARIA 지원
- **색상 대비**: AA 등급 준수

#### 반응형 디자인
- **모바일 우선**: Mobile-first 접근 방식
- **터치 최적화**: 터치 인터페이스 지원
- **다양한 화면 크기**: 태블릿, 데스크톱 지원

### 🌈 테마 시스템

#### 다크/라이트 테마
- **자동 테마 감지**: 시스템 설정 기반
- **수동 테마 전환**: 사용자 선택 지원
- **일관된 색상**: 모든 컴포넌트 테마 적용

#### 커스터마이징
- **디자인 토큰**: CSS 변수 기반 테마
- **브랜드 색상**: 쉬운 브랜드 색상 적용
- **컴포넌트별 스타일링**: 개별 컴포넌트 커스터마이징

### 📊 기술적 성과

#### 코드 품질
- **TypeScript 커버리지**: 100% 타입 정의
- **ESLint 규칙**: 일관된 코드 스타일
- **테스트 커버리지**: 핵심 기능 테스트

#### 성능 지표
- **번들 크기**: 최적화된 크기
- **로딩 시간**: 빠른 초기 로딩
- **런타임 성능**: 60fps 유지

---

### 📊 v0.1.0 릴리즈 통계
- **개발 기간**: 약 3개월 (2025년 6월-9월)
- **총 커밋 수**: 200+ 개
- **핵심 컴포넌트**: 20개 (Vue 컴포넌트 라이브러리)
- **하위 컴포넌트**: 30+ 개
- **문서 페이지**: 20+ 개
- **TypeScript 타입 정의**: 완전 지원