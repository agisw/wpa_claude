# Figma to Vue Implementation

Implement the Figma design using **Vue**.

## Figma URL
$ARGUMENTS

## Technical Stack
- **Framework**: Vue 3+ with TypeScript (Composition API)
- **Build Tool**: Vite v7
- **UI Framework**: Vuetify 3
- **Design System**: Material Design 3

## Project Setup

### Naming Convention (필수)
**반드시 아래 단계를 따라 폴더명을 생성할 것:**

1. Figma 레이어 이름 확인 (예: `Dashboard`, `LoginPage` 등)
2. **현재 시스템 시간을 `date` 명령으로 직접 조회**
3. 폴더명 형식: `{레이어이름}_{YYMMDD}_{HHMM}`

**⚠️ 절대 금지:**
- 이전에 사용한 폴더명 재사용 금지
- 하드코딩된 타임스탬프 사용 금지
- 기존 폴더에 덮어쓰기 금지

### 1. Initialize Vite Project
먼저 현재 시간을 확인하고, 그 값으로 폴더를 생성:
```bash
# Step 1: 현재 타임스탬프 확인 (이 값을 폴더명에 사용)
date "+%y%m%d_%H%M"

# Step 2: 위에서 확인한 타임스탬프로 폴더 생성
# 예시: Dashboard_251202_1748 (실제 date 출력값 사용)
mkdir {LayerName}_{실제타임스탬프}
cd {LayerName}_{실제타임스탬프}
npm create vite@latest . -- --template vue-ts
npm install
```

### 2. Install Vuetify 3
```bash
npm install vuetify @mdi/font
npm install -D vite-plugin-vuetify
```

### 3. Configure Vite
Update `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
})
```

### 4. Setup Vuetify Plugin
Create `src/plugins/vuetify.ts` with MDI icons configuration

### 5. Register Vuetify in Main App
Update `src/main.ts` to use Vuetify plugin

### 6. Reset Vite Default Styles
→ **CLAUDE.md의 "Vite Default Styles Reset" 섹션 참조**
- 대상 파일: `src/style.css`

## Component Architecture
- **All components must be implemented as individual `.vue` files (SFC)**
- Each component should be placed in `src/components/` directory
- Use the following structure:
  ```
  src/
  ├── components/
  │   ├── common/       # Reusable common components
  │   │   ├── AppButton.vue
  │   │   ├── AppCard.vue
  │   │   └── ...
  │   ├── layout/       # Layout components
  │   │   ├── AppHeader.vue
  │   │   ├── AppFooter.vue
  │   │   └── AppSidebar.vue
  │   └── features/     # Feature-specific components
  │       ├── Dashboard/
  │       │   ├── DashboardCard.vue
  │       │   └── DashboardChart.vue
  │       └── ...
  ├── views/            # Page components
  │   └── HomeView.vue
  ├── plugins/          # Plugin configurations
  │   └── vuetify.ts
  └── App.vue
  ```
- **Component file naming convention:**
  - Use PascalCase for component files (e.g., `UserProfile.vue`)
  - Views use `*View.vue` suffix
  - One component per file
  - Use `<script setup lang="ts">` with Composition API
- **Do NOT define multiple components in a single file**

## Execution Steps

1. Fetch Figma design context using `mcp__figma__get_design_context`
2. Initialize Vite Vue project
3. Configure Vuetify 3 with Material Design icons
4. **Reset `src/style.css` (Vite 기본 스타일 제거)**
5. Create component structure under `src/components/`
6. Implement each component using Composition API
7. Update `App.vue` to compose the components
8. Verify build succeeds

## Layout Guidelines (Figma 원본 충실도)

Vuetify 기본 스타일이 Figma 원본과 다를 수 있으므로 주의:

### 필수 적용
- `<v-container fluid class="pa-0 ma-0">` - 전체 너비 사용
- `justify="start"` - 중앙 정렬 방지
- `flat` 또는 `elevation="0"` - 기본 그림자 제거

### 피해야 할 패턴
- ❌ `<v-container>` 기본 사용 (너비 제한됨)
- ❌ `justify="center"` 남용
- ❌ Vuetify 기본 elevation/shadow 그대로 사용

## v-app-bar + v-main 레이아웃 (⚠️ 중요)

### 문제 상황
`v-app-bar`는 기본적으로 `position: fixed`로 동작하며, Vuetify는 `v-main`에 자동으로 헤더 높이만큼 `padding-top`을 추가합니다. 하지만 스타일 초기화 과정에서 이 자동 패딩이 무효화되면 **콘텐츠가 헤더 뒤에 가려지는 문제**가 발생합니다.

```
문제 발생 시 화면 구조:
┌─────────────────────────────────────┐
│  v-app-bar (fixed, 상단 고정)        │ ← z-index 높음
├─────────────────────────────────────┤
│  v-main 콘텐츠 (y=0부터 시작)        │ ← 헤더 뒤에 가려짐!
│  페이지 제목이 안 보임...            │
└─────────────────────────────────────┘
```

### 원인
`v-main`의 padding을 일괄 초기화하면 Vuetify의 자동 `padding-top` 계산이 무효화됨:
```css
/* ❌ 문제가 되는 패턴 */
.v-main {
  padding: 0 !important;  /* 자동 padding-top도 함께 제거됨 */
}
```

### 해결 방법: 개별 방향 패딩 제어
`padding-top`은 Vuetify가 자동 관리하도록 유지하고, 나머지 방향만 초기화:

```css
/* ✅ 올바른 패턴 */
.v-main {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  /* padding-top: Vuetify 자동 계산 유지 (건드리지 않음) */
}
```

### 구현 템플릿
```vue
<template>
  <v-app>
    <v-app-bar height="40" color="#384047">
      <!-- 헤더 콘텐츠 -->
    </v-app-bar>

    <v-main>
      <!-- padding-top이 자동으로 40px 적용됨 -->
      <div class="page-content">
        <!-- 페이지 콘텐츠 -->
      </div>
    </v-main>
  </v-app>
</template>

<style>
/* v-main 좌우/하단 패딩만 제거 */
.v-main {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
}
</style>
```

### 체크리스트
- [ ] `v-main`에 `padding: 0` 일괄 적용하지 않았는가?
- [ ] 페이지 콘텐츠가 헤더 아래에서 정상적으로 시작하는가?
- [ ] 스크롤 시 콘텐츠가 헤더 뒤로 자연스럽게 지나가는가?

## Data & Content Fidelity (데이터 충실도)

Figma 원본의 데이터 형식과 값을 정확히 반영해야 함:

### 필수 적용
1. **드롭다운 초기값 설정**
   - Figma에 표시된 선택값을 `v-model` 초기값으로 설정
   - 빈 드롭다운으로 렌더링되지 않도록 주의
   ```vue
   <!-- ✓ Good -->
   <v-select v-model="selectedLine" :items="lines" />
   const selectedLine = ref('A1_ABCD')  // Figma에 보이는 값

   <!-- ✗ Bad -->
   const selectedLine = ref('')  // 빈 값
   ```

2. **테이블 데이터 형식 일치**
   - Figma에 표시된 데이터 형식 그대로 사용 (예: `ABC0123`, `CD043210`)
   - 단순화된 더미 데이터 금지 (예: `EQP1`, `STEP1` 등)
   - 실제 표시된 행 개수와 컬럼 개수 일치

3. **셀 배경색/강조 패턴**
   - Figma에서 특정 셀만 색상이 다르면 해당 패턴 정확히 구현
   - 전체 열에 색상 적용 vs 특정 셀만 색상 적용 구분
   ```vue
   <!-- 조건부 배경색 예시 -->
   <td :class="{ 'highlight-cell': shouldHighlight(row, col) }">
   ```

### 피해야 할 패턴
- ❌ 임의의 더미 데이터 생성 (Figma 원본 데이터 사용)
- ❌ 셀 색상 패턴 임의 변경
- ❌ 드롭다운/입력 필드 빈 값으로 초기화

## Typography & Spacing (타이포그래피)

### 필수 적용
1. **폰트 크기 Figma 값 사용**
   - Vuetify 기본 폰트 크기 대신 Figma에서 추출한 값 사용
   - `font-size`, `line-height`, `letter-spacing` 명시

2. **여백/간격 정밀 조정**
   - Vuetify 기본 spacing 클래스(`pa-4`, `ma-2`) 대신 정확한 px 값 사용 가능
   ```css
   .custom-spacing {
     padding: 12px 16px; /* Figma에서 추출한 정확한 값 */
   }
   ```

## Component Styling Override (컴포넌트 스타일 오버라이드)

Vuetify 컴포넌트의 기본 스타일이 Figma와 다를 경우 `:deep()` 선택자로 오버라이드:

### v-data-table 커스터마이징
```vue
<style scoped>
:deep(.v-data-table) {
  .v-data-table-header {
    background-color: /* Figma 헤더 배경색 */;
  }
  td, th {
    padding: /* Figma 셀 패딩값 */ !important;
    font-size: /* Figma 폰트 크기 */;
  }
  border: /* Figma 테두리 스타일 */;
}
</style>
```

### v-select / v-text-field 커스터마이징
```vue
<v-select
  variant="outlined"       <!-- 또는 "filled", "plain" 등 Figma 스타일에 맞게 -->
  density="compact"        <!-- 또는 "default", "comfortable" -->
  hide-details             <!-- 하단 여백 제거 시 -->
/>
```

### v-btn 커스터마이징
```vue
<v-btn
  variant="flat"           <!-- 또는 "elevated", "tonal", "outlined", "text", "plain" -->
  size="small"             <!-- 또는 "x-small", "default", "large", "x-large" -->
  :style="{ textTransform: 'none' }"  <!-- 대문자 변환 방지 -->
>
```

## Tab & Navigation Components (탭/네비게이션)

### v-tabs 커스터마이징
```vue
<v-tabs v-model="activeTab" density="compact">
  <v-tab value="tab1"><!-- Figma 탭 텍스트 --></v-tab>
</v-tabs>
```
- `density`: "default" | "comfortable" | "compact"
- `align-tabs`: "start" | "center" | "end" | "title"
- `color`: Figma 활성 탭 색상

## Color Extraction (색상 추출)

Figma에서 정확한 색상 코드를 추출하여 일관되게 사용:

### 색상 파일 구조
```typescript
// src/styles/colors.ts
export const colors = {
  // Figma Design Context에서 추출한 색상값 사용
  // 예시 구조 (실제 값은 Figma에서 추출)
  headerBg: '#??????',
  primaryAction: '#??????',
  cellHighlight: '#??????',
  borderColor: '#??????',
}
```

### 색상 추출 방법
1. `mcp__figma__get_design_context` 호출 시 반환되는 색상 정보 활용
2. Figma 노드의 `fills`, `strokes` 속성에서 HEX 값 추출
3. 반복 사용되는 색상은 변수로 정의하여 일관성 유지

## Checklist Before Build (빌드 전 체크리스트)

구현 완료 후 다음 항목 확인:

- [ ] 드롭다운에 Figma 원본 초기값이 설정되어 있는가?
- [ ] 테이블 데이터가 Figma 원본과 형식이 일치하는가?
- [ ] 셀 배경색 패턴이 원본과 동일한가?
- [ ] 버튼, 탭 등의 텍스트가 원본과 일치하는가?
- [ ] 전체 레이아웃 비율이 원본과 유사한가?
- [ ] 불필요한 Vuetify 기본 스타일(elevation, 여백)이 제거되었는가?