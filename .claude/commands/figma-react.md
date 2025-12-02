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

### Naming Convention
- **Format**: `{LayerName}_{YYMMDD}_{HHMM}`
- `{LayerName}`: Figma 레이어 이름
- `{YYMMDD}_{HHMM}`: **현재 시간 기준** (반드시 매 실행마다 새로 생성)
- 예시: 현재 시간이 2025년 12월 2일 17:30이면 → `Dashboard_251202_1730`
- **중요**: 기존 폴더와 같은 이름이 있어도 **절대 재사용하지 않고** 현재 시간으로 새 폴더 생성

### 1. Initialize Vite Project
```bash
mkdir {LayerName}_{YYMMDD}_{HHMM}
cd {LayerName}_{YYMMDD}_{HHMM}
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
