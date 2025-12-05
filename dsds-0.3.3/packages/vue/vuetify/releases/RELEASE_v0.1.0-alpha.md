# DSDS Vue Vuetify v0.1.0-alpha (2025-09-03)

DSDS Vue Vuetify 라이브러리의 첫 번째 공식 릴리즈입니다.

## 프로젝트 소개

DSDS (DS Design System) Vue Vuetify는 일관된 사용자 경험을 제공하기 위해 Vuetify 3.x 기반으로 구축된 커스텀 컴포넌트 라이브러리입니다.

### 핵심 특징
- DSDS 디자인 토큰 완전 통합
- WCAG 2.1 접근성 표준 준수
- 다크/라이트 테마 지원
- 반응형 디자인 기본 제공
- 완전한 TypeScript 지원

## 포함된 컴포넌트 (20개)

### Core Form & Input
- **VBtn, VSelect, VTextField, VCheckbox, VAutocomplete**
- **VDialog, VueDatePicker, VTooltip, VCardText**

### Layout & Form System
- **Breadcrumb 시스템** (4개 하위 컴포넌트)
- **PageHeader 시스템** (4개 하위 컴포넌트)
- **Dialog 시스템** (2개 하위 컴포넌트)
- **Form 시스템** (2개 하위 컴포넌트)

## 기술 스택

- **Vue 3.5** + **Vuetify 3.9**
- **TypeScript 5.8** + **Vite**
- **TailwindCSS** + **@dsds/tokens**
- **Storybook** (문서화)

## 문서 및 개발자 경험

- 간편한 설치: 템플릿 기반 빠른 시작
- 상세한 문서: Storybook 인터랙티브 가이드
- 스타일링 가이드: 디자인 토큰 활용법
- 접근성 가이드: WCAG 준수 방법

## 성능 최적화

- **Tree Shaking**: 사용하지 않는 코드 자동 제거
- **Code Splitting**: 컴포넌트별 동적 로딩
- **ESM 빌드**: 모던 브라우저 최적화
- **접근성 성능**: 스크린 리더 최적화

---

### 릴리즈 통계
- **개발 기간**: 3개월 (2025년 6월-9월)
- **총 커밋**: 200+ 개
- **핵심 컴포넌트**: 20개 (Vue 컴포넌트 라이브러리)
- **하위 컴포넌트**: 30+ 개
- **TypeScript 지원**: 완전 지원

**상세 변경사항**: [CHANGELOG.md](./CHANGELOG.md)
**전체 릴리즈 노트**: [RELEASE_NOTES.md](./RELEASE_NOTES.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.1.0
```

**빠른 시작:**
```typescript
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createDSDSVuetify } from '@dsds/vue-vuetify'

const app = createApp(App)
const vuetify = createVuetify()
const dsdsVuetify = createDSDSVuetify()

app.use(vuetify)
app.use(dsdsVuetify)
```