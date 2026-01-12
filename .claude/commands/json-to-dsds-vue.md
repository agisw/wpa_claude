# JSON Design to DSDS Vue Implementation

Figma에서 추출한 JSON 디자인 파일을 **DSDS 컴포넌트**를 사용하여 Vue 3 애플리케이션으로 구현합니다.

## JSON 파일 경로
$ARGUMENTS

## 목적

`figma-to-json` 명령으로 생성된 JSON 구조를 분석하여:
- DSDS Vue 컴포넌트로 매핑
- `apps/demo-vue/src/App.vue` 파일 생성 또는 업데이트
- 디자인 토큰을 DSDS 스타일과 연동
- 반응형 레이아웃 구현

## 기술 스택

- **Framework**: Vue 3 (Composition API)
- **UI Library**: Vuetify 3
- **Design System**: DSDS (`@dsds/vue-vuetify`)
- **Build Tool**: Vite
- **프로젝트 구조**: `dsds-core` 모노레포

## 실행 단계

### 1. JSON 파일 분석

#### 1-1. JSON 파일 읽기

**필수**: `read_file` 도구를 사용하여 JSON 파일을 읽습니다:

```bash
# $ARGUMENTS로 전달받은 JSON 파일 경로 사용
read_file {JSON_파일_경로}
```

예시 경로:
- `C:\path\to\Dashboard_250112_1530_design\design.json`
- `{ProjectName}_{YYMMDD}_{HHMM}_design/design.json`

**중요**: 파일을 반드시 읽어서 내용을 확인한 후 다음 단계로 진행합니다.

#### 1-2. 핵심 데이터 추출

읽은 JSON 파일에서 다음 섹션을 중점적으로 분석:
- `metadata`: 프로젝트 정보
- `designTokens`: 색상, 타이포그래피, 간격, 그림자
- `components`: 컴포넌트 계층 구조, 레이아웃, 스타일
- `pages`: 페이지/프레임 구조

### 2. 컴포넌트 매핑 전략

#### 2-1. Figma 타입 → DSDS 컴포넌트 매핑

| Figma Type | Category | DSDS Component | Import Path |
|-----------|----------|----------------|-------------|
| FRAME (Button-like) | button | `DSDSButton` | `VBtn.vue` |
| TEXT (Input-like) | input | `DSDSTextField` | `VTextField.vue` |
| FRAME (Dropdown) | select | `DSDSSelect` | `VSelect.vue` |
| COMPONENT (Checkbox) | checkbox | `DSDSCheckbox` | `VCheckbox.vue` |
| COMPONENT (Radio) | radio | `DSDSRadio`, `DSDSRadioGroup` | `radio/VRadio.vue` |
| COMPONENT (Switch) | toggle | `DSDSSwitch` | `VSwitch.vue` |
| FRAME (Modal/Dialog) | dialog | `DSDSDialog` | `VDialog.vue` |
| FRAME (Card) | card | `v-card` | Vuetify 기본 |
| FRAME (Table) | table | `v-data-table` | Vuetify 기본 |
| COMPONENT (Tab) | navigation | `DSDSTabs` | `tabs/VTabs.vue` |
| COMPONENT (Tooltip) | feedback | `DSDSTooltip` | `VTooltip.vue` |
| COMPONENT (Tag/Chip) | display | `DSDSTag` | `Tag.vue` |
| FRAME (Rating) | input | `DSDSRating` | `VRating.vue` |

#### 2-2. 레이아웃 타입 매핑

| Figma Layout | Vue/Vuetify Implementation |
|-------------|---------------------------|
| Auto Layout (horizontal) | `<v-row>`, `<div class="d-flex">` |
| Auto Layout (vertical) | `<v-col>`, `<div class="d-flex flex-column">` |
| Grid | `<v-row><v-col>` |
| Absolute positioning | `style="position: absolute; top: Xpx; left: Ypx;"` |

#### 2-3. 스타일 속성 매핑

| JSON Style Property | Vue/Vuetify Attribute |
|-------------------|----------------------|
| `backgroundColor` | `:style="{ backgroundColor: '...' }"` |
| `borderColor` | `:style="{ borderColor: '...' }"` |
| `borderRadius` | `:style="{ borderRadius: '...px' }"` |
| `padding` | `class="pa-X"` or `:style` |
| `gap` | `class="gap-X"` or `:style="{ gap: '...px' }"` |
| `fontSize` | `:style="{ fontSize: '...px' }"` |
| `fontWeight` | `:style="{ fontWeight: ... }"` |
| `color` | `:style="{ color: '...' }"` |

### 3. App.vue 생성

**이 단계에서 실제로 `App.vue` 파일을 생성/업데이트합니다.**

#### 3-1. 파일 생성 명령

`write` 도구를 사용하여 다음 경로에 파일을 생성합니다:
```
C:\Users\samsung\Repo\dsds-dev\dsds-core\apps\demo-vue\src\App.vue
```

#### 3-2. 기본 구조

```vue
<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <!-- 페이지 제목 -->
        <h1>{{ pageTitle }}</h1>

        <!-- 컴포넌트 섹션별 카드 -->
        <v-card
          v-for="section in sections"
          :key="section.id"
          class="mb-6"
          elevation="2"
        >
          <v-card-title>{{ section.title }}</v-card-title>
          <v-card-text>
            <!-- DSDS 컴포넌트 렌더링 -->
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// DSDS 컴포넌트 import
import DSDSButton from '../../../packages/vue/vuetify/src/components/ui/VBtn.vue'
// ... 기타 필요한 컴포넌트

// State 정의
const pageTitle = ref('...')
// ...
</script>

<style scoped>
/* 커스텀 스타일 */
</style>
```

#### 3-3. DSDS 컴포넌트 Import 패턴

**필수 컴포넌트:**
```typescript
import DSDSButton from '../../../packages/vue/vuetify/src/components/ui/VBtn.vue'
import DSDSTextField from '../../../packages/vue/vuetify/src/components/ui/VTextField.vue'
import DSDSSelect from '../../../packages/vue/vuetify/src/components/ui/VSelect.vue'
import DSDSCheckbox from '../../../packages/vue/vuetify/src/components/ui/VCheckbox.vue'
```

**선택적 컴포넌트 (JSON에 해당 타입이 있을 경우):**
```typescript
import DSDSRadioGroup from '../../../packages/vue/vuetify/src/components/ui/radio/VRadioGroup.vue'
import DSDSRadio from '../../../packages/vue/vuetify/src/components/ui/radio/VRadio.vue'
import DSDSDialog from '../../../packages/vue/vuetify/src/components/ui/VDialog.vue'
import DSDSSwitch from '../../../packages/vue/vuetify/src/components/ui/VSwitch.vue'
import DSDSRating from '../../../packages/vue/vuetify/src/components/ui/VRating.vue'
import DSDSTooltip from '../../../packages/vue/vuetify/src/components/ui/VTooltip.vue'
import DSDSTag from '../../../packages/vue/vuetify/src/components/ui/Tag.vue'
import DSDSTabs from '../../../packages/vue/vuetify/src/components/ui/tabs/VTabs.vue'
import DSDSTabsWindow from '../../../packages/vue/vuetify/src/components/ui/tabs/VTabsWindow.vue'
import DSDSTabsWindowItem from '../../../packages/vue/vuetify/src/components/ui/tabs/VTabsWindowItem.vue'
import DSDSAutocomplete from '../../../packages/vue/vuetify/src/components/ui/VAutocomplete.vue'
import DSDSCardText from '../../../packages/vue/vuetify/src/components/ui/VCardText.vue'
```

#### 3-4. Props 및 Variant 매핑

**Button (DSDSButton):**
```vue
<!-- JSON: category: "button", styles.backgroundColor: "#0066FF" -->
<DSDSButton
  :color="getPrimaryColor(component)"
  :variant="getButtonVariant(component)"
  :size="getButtonSize(component)"
>
  {{ component.content?.text }}
</DSDSButton>
```

- `color`: "primary" | "secondary" | "error" | "warning" | "success"
- `variant`: "flat" | "outlined" | "text" | "tonal"
- `size`: "small" | "default" | "large"

**TextField (DSDSTextField):**
```vue
<!-- JSON: category: "input", content.placeholder: "Enter text" -->
<DSDSTextField
  v-model="textValue"
  :label="component.content?.placeholder"
  variant="outlined"
  :style="getComponentStyle(component)"
/>
```

**Select (DSDSSelect):**
```vue
<!-- JSON: category: "select", children: [...options] -->
<DSDSSelect
  v-model="selectedValue"
  :items="extractSelectItems(component)"
  label="..."
  variant="outlined"
/>
```

**Checkbox (DSDSCheckbox):**
```vue
<!-- JSON: category: "checkbox", content.text: "Option 1" -->
<DSDSCheckbox
  v-model="checkboxValue"
  :label="component.content?.text"
/>
```

### 4. 디자인 토큰 적용

#### 4-1. designTokens 활용

JSON의 `designTokens` 섹션을 Vue 변수로 변환:

```typescript
// JSON에서 추출
const designTokens = {
  colors: {
    primary: json.designTokens.colors.primary,
    secondary: json.designTokens.colors.secondary,
    // ...
  },
  spacing: {
    xs: json.designTokens.spacing.xs,
    sm: json.designTokens.spacing.sm,
    // ...
  }
}
```

#### 4-2. 스타일 헬퍼 함수

```typescript
const getComponentStyle = (component: Component) => {
  return {
    backgroundColor: component.styles?.backgroundColor,
    borderRadius: `${component.styles?.borderRadius}px`,
    padding: formatPadding(component.layout?.padding),
    // ...
  }
}

const formatPadding = (padding?: Padding) => {
  if (!padding) return undefined
  return `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
}
```

### 5. 반응형 레이아웃 구현

#### 5-1. Vuetify Grid 시스템 활용

```vue
<v-row>
  <v-col
    v-for="item in items"
    :key="item.id"
    cols="12"
    md="6"
    lg="4"
  >
    <!-- 컴포넌트 렌더링 -->
  </v-col>
</v-row>
```

#### 5-2. Flexbox 기반 레이아웃

```vue
<!-- JSON: layout.type: "flexbox", layout.direction: "horizontal" -->
<div
  :class="[
    'd-flex',
    layout.direction === 'vertical' ? 'flex-column' : 'flex-row',
    getAlignmentClass(layout.alignment)
  ]"
  :style="{ gap: `${layout.gap}px` }"
>
  <!-- children 렌더링 -->
</div>
```

### 6. 상태 관리 (States)

#### 6-1. 컴포넌트 상태 처리

JSON의 `states` 배열을 reactive 변수로 관리:

```typescript
const buttonState = ref<'default' | 'hover' | 'active' | 'disabled'>('default')

const getButtonStyle = computed(() => {
  const state = component.states?.find(s => s.name === buttonState.value)
  return state?.styles || component.styles
})
```

#### 6-2. 인터랙션 핸들러

```vue
<DSDSButton
  @mouseenter="buttonState = 'hover'"
  @mouseleave="buttonState = 'default'"
  @mousedown="buttonState = 'active'"
  @mouseup="buttonState = 'default'"
  :disabled="buttonState === 'disabled'"
>
  {{ buttonText }}
</DSDSButton>
```

### 7. 데이터 바인딩

#### 7-1. 폼 데이터 구조

```typescript
const formData = ref({
  // JSON components에서 input/select 타입 추출
  textField1: '',
  selectField1: '',
  checkbox1: false,
  radio1: '',
  // ...
})
```

#### 7-2. Submit 핸들러

```typescript
const handleSubmit = () => {
  console.log('Form Data:', formData.value)
  // Validation 로직
  // API 호출 로직 (필요 시)
}

const handleReset = () => {
  formData.value = {
    textField1: '',
    selectField1: '',
    checkbox1: false,
    // ...
  }
}
```

### 8. 검증 및 테스트

#### 8-1. 빌드 확인

```bash
cd C:\Users\samsung\Repo\dsds-dev\dsds-core
pnpm dev:demo-vue
```

#### 8-2. 시각적 검증 체크리스트

- [ ] 모든 DSDS 컴포넌트가 올바르게 렌더링되는가?
- [ ] 레이아웃이 JSON 구조를 반영하는가?
- [ ] 색상/폰트 등 디자인 토큰이 적용되었는가?
- [ ] 버튼 클릭, 입력 등 인터랙션이 작동하는가?
- [ ] 반응형 레이아웃이 모바일/태블릿에서도 정상인가?

## 컴포넌트 분류 전략

### 우선순위 기반 매핑

JSON `components` 배열을 다음 우선순위로 분류:

1. **Layout Components** (우선 처리)
   - `type: "FRAME"`, `category: "layout"`
   - `v-container`, `v-row`, `v-col`로 변환

2. **Navigation Components**
   - `category: "navigation"`
   - Header, Footer, Tabs, Breadcrumb → DSDS 또는 Vuetify 컴포넌트

3. **Input Components**
   - `category: "input" | "button" | "select" | "checkbox"`
   - DSDS 입력 컴포넌트로 매핑

4. **Display Components**
   - `category: "card" | "table" | "badge" | "tag"`
   - Vuetify 기본 컴포넌트 + DSDS 스타일링

5. **Feedback Components**
   - `category: "dialog" | "tooltip" | "alert"`
   - DSDS Dialog, Tooltip 활용

### 계층 구조 재현

JSON의 `children` 배열을 재귀적으로 처리:

```typescript
const renderComponent = (component: Component) => {
  // 컴포넌트 타입에 따라 적절한 Vue 컴포넌트 반환
  if (component.children?.length) {
    return component.children.map(child => renderComponent(child))
  }
  return null
}
```

## 주의사항

### 필수 확인 사항

1. **DSDS 패키지 빌드 상태**
   - `@dsds/vue-vuetify` 패키지가 올바르게 빌드되어 있는지 확인
   - 없을 경우 소스 파일 직접 import 사용

2. **Path Alias 설정**
   - `vite.config.ts`에 `@/` alias 설정 확인
   - DSDS 컴포넌트 경로가 정확한지 검증

3. **CSS Import**
   - `main.ts`에 DSDS CSS 파일 import 확인:
     ```typescript
     import '../../../packages/vue/vuetify/src/index.css'
     ```

4. **Vuetify Plugin 등록**
   - `createDSDSVuetify()` 플러그인이 `main.ts`에 등록되어 있는지 확인

### 피해야 할 패턴

- ❌ JSON 구조를 무시하고 임의로 컴포넌트 배치
- ❌ DSDS 대신 일반 Vuetify 컴포넌트만 사용
- ❌ 디자인 토큰 무시하고 하드코딩된 색상/크기 사용
- ❌ `v-model` 없이 입력 컴포넌트 사용 (상태 관리 누락)
- ❌ 과도한 inline style (CSS 클래스 활용 권장)

### 권장 패턴

- ✅ JSON 구조를 최대한 충실히 반영
- ✅ DSDS 컴포넌트 우선 사용, 없는 경우만 Vuetify 기본 사용
- ✅ 디자인 토큰을 Vue 변수로 추출하여 일관성 유지
- ✅ `v-model`로 양방향 바인딩 구현
- ✅ `<style scoped>` 활용하여 스타일 격리

## 출력 파일

### 생성/업데이트할 파일

**필수**: `write` 도구를 사용하여 다음 파일을 생성/업데이트합니다:

**메인 출력 파일 (필수)**:
```
C:\Users\samsung\Repo\dsds-dev\dsds-core\apps\demo-vue\src\App.vue
```

**추가 컴포넌트 (선택사항)**:
```
C:\Users\samsung\Repo\dsds-dev\dsds-core\apps\demo-vue\src\components\
├── CustomTable.vue
├── CustomForm.vue
└── ...
```

**중요**: 
- `App.vue` 파일은 **반드시** 위의 정확한 경로에 생성/업데이트되어야 합니다
- 기존 `App.vue` 파일이 있으면 덮어씁니다
- JSON 분석 결과를 기반으로 완전한 Vue SFC (Single File Component) 형식으로 작성합니다

### App.vue 템플릿 구조

```vue
<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <!-- 페이지 타이틀 -->
        <h1 class="text-h3 mb-6">{{ metadata.projectName }}</h1>

        <!-- 컴포넌트 쇼케이스 섹션 -->
        <v-card
          v-for="(section, index) in sections"
          :key="index"
          class="mb-6"
          elevation="2"
        >
          <v-card-title>{{ section.title }}</v-card-title>
          <v-card-text>
            <!-- 섹션별 컴포넌트 렌더링 -->
            <component :is="section.component" v-bind="section.props" />
          </v-card-text>
        </v-card>

        <!-- 인터랙티브 데모 (선택사항) -->
        <v-card elevation="2">
          <v-card-title>Interactive Demo</v-card-title>
          <v-card-text>
            <!-- 사용자 입력 데모 -->
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// DSDS 컴포넌트 imports (JSON 분석 결과에 따라 동적 생성)
// ...

// JSON metadata
const metadata = ref({
  projectName: '...',
  version: '...',
})

// JSON designTokens
const designTokens = ref({ /* ... */ })

// 섹션 구성 (JSON components 기반)
const sections = ref([
  // ...
])

// State management
const formData = ref({ /* ... */ })

// Event handlers
const handleAction = () => { /* ... */ }
</script>

<style scoped>
/* JSON styles를 기반으로 한 커스텀 스타일 */
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
/* ... */
</style>
```

## 실행 예시

### PowerShell에서 실행

```powershell
# JSON 파일 경로 전달
.\.claude\run-json-to-dsds-vue.ps1 "C:\path\to\Dashboard_250112_1530_design\design.json"

# 또는 Claude Skills에서
/json-to-dsds-vue C:\path\to\Dashboard_250112_1530_design\design.json
```

### 실행 후 확인

```bash
cd C:\Users\samsung\Repo\dsds-dev\dsds-core
pnpm dev:demo-vue
```

브라우저에서 `http://localhost:3003/` 열어 확인:
- ✅ JSON 구조가 Vue 컴포넌트로 렌더링
- ✅ DSDS 스타일이 적용됨
- ✅ 인터랙션이 정상 작동

## 추가 최적화

### 성능 최적화

1. **Lazy Loading**: 큰 컴포넌트는 `defineAsyncComponent` 사용
2. **Virtual Scrolling**: 긴 리스트는 `v-virtual-scroll` 활용
3. **Computed 활용**: 복잡한 계산은 `computed`로 캐싱

### 코드 품질

1. **TypeScript 타입 정의**: JSON 구조에 맞는 인터페이스 정의
2. **ESLint/Prettier**: 코드 스타일 일관성 유지
3. **주석 추가**: 복잡한 매핑 로직에 설명 추가

### 접근성 (a11y)

1. **ARIA 속성**: 스크린 리더 지원
2. **키보드 네비게이션**: Tab, Enter 키 지원
3. **Color Contrast**: WCAG 2.1 AA 기준 준수

---

**완료 후 확인:**
- [ ] JSON 파일을 `read_file`로 읽어서 분석했는가?
- [ ] `C:\Users\samsung\Repo\dsds-dev\dsds-core\apps\demo-vue\src\App.vue` 파일이 생성/업데이트 되었는가?
- [ ] App.vue가 완전한 Vue SFC 형식(template, script, style)인가?
- [ ] JSON의 컴포넌트들이 DSDS 컴포넌트로 올바르게 매핑되었는가?
- [ ] `pnpm dev:demo-vue` 실행 성공
- [ ] 브라우저에서 모든 컴포넌트 정상 렌더링
- [ ] DSDS 스타일이 올바르게 적용됨
- [ ] 인터랙션 (클릭, 입력) 정상 작동
- [ ] 콘솔 에러 없음
