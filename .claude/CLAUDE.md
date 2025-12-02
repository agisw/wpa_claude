# Project Instructions

## Auto-Edit Policy
- Claude automatically modifies all files without asking for user confirmation
- File creation, modification, and deletion are executed immediately
- Only reports results after task completion

## Framework Selection
사용자가 Figma URL과 함께 구현을 요청할 때, **반드시 "React" 또는 "Vue"를 명시**해야 합니다.
- `"React로 구현해줘"` → `/figma-react` 명령 사용
- `"Vue로 구현해줘"` → `/figma-vue` 명령 사용
- 명시하지 않은 경우: 사용자에게 React 또는 Vue 중 선택을 요청하며, 다음 예시를 함께 안내:
  ```
  {Figma URL}을 Vue로 구현해줘
  {Figma URL}을 React로 구현해줘
  ```

---

# Common Settings

## Project Structure
- Create a dedicated project directory with the following naming convention:
  - Format: `{LayerName}_{YYMMDD}_{HHMM}`
  - Example: `DashboardUI_251124_1430`
  - `{LayerName}`: The name of the Figma layer being implemented
  - `{YYMMDD}`: Date when the project was requested (Year-Month-Day)
  - `{HHMM}`: Time when the project was requested (24-hour format)

## Windows PowerShell Environment Considerations

### Command Execution
- Use semicolon `;` to chain multiple commands instead of `&&`
- Example: `mkdir ProjectName; cd ProjectName; npm create vite@latest .`
- PowerShell uses different syntax than Unix shells for certain operations

### Path Handling
- Use forward slashes `/` or double backslashes `\\` in paths
- PowerShell accepts both Windows-style and Unix-style paths

---

## Vite Default Styles Reset (React/Vue 공통)

Vite 기본 템플릿은 데모용 스타일을 포함하므로, 전체 레이아웃 구현 시 반드시 수정 필요:

### 수정 대상 파일
- **React**: `src/index.css`
- **Vue**: `src/style.css`

### 필수 수정 사항

```css
/* 1. body 중앙 정렬 제거 */
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  /* 제거 항목:
   * display: flex
   * place-items: center
   */
}

/* 2. 루트 요소 너비 제한 제거 */
/* React: #root, Vue: #app */
#root, #app {
  width: 100%;
  min-height: 100vh;
  /* 제거 항목:
   * max-width: 1280px
   * margin: 0 auto
   * padding: 2rem
   * text-align: center
   */
}

/* 3. 라이트 모드 기본 적용 */
:root {
  color-scheme: light;
  color: #213547;
  background-color: #ffffff;
  /* 제거: background-color: #242424 (다크모드) */
}
```

### 문제 증상 (미수정 시)
- 콘텐츠가 화면 중앙에 작게 표시됨
- 전체 너비를 사용하지 않음
- 다크 모드 배경이 기본 적용됨
