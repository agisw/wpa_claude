# Figma to React Implementation

Implement the Figma design using **React**.

## Figma URL
$ARGUMENTS

## Technical Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite v7
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with custom design tokens

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
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Install Tailwind CSS v4
```bash
npm install tailwindcss @tailwindcss/postcss postcss autoprefixer
```

### 3. Configure PostCSS
Create `postcss.config.js`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```
**Important:** Use `'@tailwindcss/postcss'` NOT `tailwindcss` directly

### 4. Configure Tailwind CSS
Update `src/index.css`:
```css
@import "tailwindcss";
```
**Important:** Use `@import "tailwindcss"` NOT `@tailwind base/components/utilities`

### 5. Install shadcn/ui Dependencies
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
```

### 6. Reset Vite Default Styles
→ **CLAUDE.md의 "Vite Default Styles Reset" 섹션 참조**
- 대상 파일: `src/index.css`
- Tailwind import (`@import "tailwindcss";`) 후 스타일 리셋 적용

## Component Architecture
- **All components must be implemented as individual `.tsx` files**
- Each component should be placed in `src/components/` directory
- Use the following structure:
  ```
  src/
  ├── components/
  │   ├── ui/           # shadcn/ui base components
  │   │   ├── Button.tsx
  │   │   ├── Card.tsx
  │   │   └── ...
  │   ├── layout/       # Layout components
  │   │   ├── Header.tsx
  │   │   ├── Footer.tsx
  │   │   └── Sidebar.tsx
  │   └── features/     # Feature-specific components
  │       ├── Dashboard/
  │       │   ├── DashboardCard.tsx
  │       │   └── DashboardChart.tsx
  │       └── ...
  ├── pages/            # Page components
  │   └── HomePage.tsx
  └── App.tsx
  ```
- **Component file naming convention:**
  - Use PascalCase for component files (e.g., `UserProfile.tsx`)
  - One component per file
  - Export component as default or named export consistently
- **Do NOT define multiple components in a single file**
- **Do NOT use inline component definitions within other components**

## Execution Steps

1. Fetch Figma design context using `mcp__figma__get_design_context`
2. Initialize Vite React project
3. Configure Tailwind CSS v4 and shadcn/ui dependencies
4. **Reset `src/index.css` (Vite 기본 스타일 제거)**
5. Create component structure under `src/components/`
6. Implement each component following the design
7. Update `App.tsx` to compose the components
8. Verify build succeeds
