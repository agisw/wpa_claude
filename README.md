# WPA Claude

Figma 디자인을 React/Vue 코드로 변환하는 Claude 기반 자동화 프로젝트

## 기능

- Figma URL을 입력하면 React 또는 Vue 컴포넌트로 자동 변환
- Vite 기반 프로젝트 자동 생성
- 프로젝트 네이밍 규칙: `{LayerName}_{YYMMDD}_{HHMM}`
- 생성된 프로젝트 자동 Git commit & push

## 사용법

### PowerShell 스크립트 실행

```powershell
# Figma → React
.\.claude\run-claude.ps1 "Figma URL" React

# Figma → Vue
.\.claude\run-claude.ps1 "Figma URL" Vue
```

### Claude Code 대화형 모드

```
{Figma URL}을 React로 구현해줘
{Figma URL}을 Vue로 구현해줘
```

### Claude Skills 자동 호출

PowerShell 스크립트에서 `React` 또는 `Vue` 키워드를 전달하면, 해당 키워드가 Claude의 슬래시 명령어(`/figma-react` 또는 `/figma-vue`)로 자동 매핑됩니다. 이 슬래시 명령어들은 `.claude/commands/` 디렉토리에 정의된 Claude Skills로, 각 프레임워크에 맞는 프로젝트 생성 및 코드 변환 로직을 포함하고 있습니다. 따라서 사용자는 단순히 `React` 또는 `Vue`만 입력해도 전체 자동화 파이프라인이 실행됩니다.

## 프로젝트 구조

```
.claude/
├── CLAUDE.md              # 프로젝트 설정 및 지침
├── commands/
│   ├── figma-react.md     # React 변환 명령어
│   └── figma-vue.md       # Vue 변환 명령어
├── run-claude.ps1         # 실행 스크립트
└── settings.local.json    # 로컬 설정
```

## 전제조건

- **Figma Dev Mode 계정**: Figma MCP 사용을 위해 Dev Mode가 활성화된 Figma 계정 필요
- **Claude API Credit**: Claude Code CLI 구동을 위한 Anthropic API 크레딧 설정 필요

## 환경

- Windows PowerShell
- Node.js
- Vite