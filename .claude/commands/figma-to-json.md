# Figma Design to JSON Structure

Figma 디자인을 분석하여 웹 프로젝트 시안을 **구조화된 JSON 형태**로 변환합니다.

## Figma URL
$ARGUMENTS

## 목적

Figma Dev Mode에서 디자인 정보를 가져와 다음과 같은 구조화된 데이터를 생성:
- 컴포넌트 계층 구조
- 레이아웃 정보 (위치, 크기, 간격)
- 스타일 속성 (색상, 타이포그래피, 효과)
- 인터랙션 및 상태 정보
- 디자인 토큰 및 변수

## 실행 단계

### 1. Figma 디자인 데이터 수집

#### 1-1. 디자인 컨텍스트 가져오기
```
mcp__figma__get_design_context
```
- Figma 파일의 모든 노드 정보 추출
- 레이어 계층 구조 파악
- 컴포넌트 및 인스턴스 관계 분석

#### 1-2. 스크린샷 캡처 (선택사항)
```
mcp__figma__get_screenshot
```
- 디자인 전체 또는 특정 프레임의 시각적 이미지 캡처
- 시각적 참조를 위한 이미지 저장
- 레이아웃 검증용 자료로 활용
- **참고**: 현재 구현에서는 스크린샷을 생성하지 않음 (MCP 제약으로 인해)

### 2. 디자인 분석 및 구조화

다음 항목들을 체계적으로 분석:

#### 2-1. 컴포넌트 계층 구조
- 페이지/프레임 단위 구조
- 컴포넌트 중첩 관계
- 재사용 가능한 컴포넌트 식별

#### 2-2. 레이아웃 정보
- Auto Layout 설정 (Flexbox 매핑)
- 위치 및 크기 (x, y, width, height)
- 간격 (padding, margin, gap)
- 정렬 및 배치 방식

#### 2-3. 스타일 속성
- **색상**: Fill, Stroke, Background
- **타이포그래피**: Font family, size, weight, line-height, letter-spacing
- **효과**: Shadow, Blur, Border radius
- **투명도**: Opacity

#### 2-4. 상태 및 인터랙션
- 버튼 상태 (default, hover, active, disabled)
- 입력 필드 상태 (empty, filled, error, focused)
- 토글/스위치 상태

#### 2-5. 디자인 토큰
- 색상 팔레트 추출
- 타이포그래피 스케일
- 간격 시스템 (spacing scale)
- 그림자/효과 presets

### 3. JSON 스키마 정의

생성할 JSON은 다음 구조를 따름:

```json
{
  "metadata": {
    "projectName": "string",
    "figmaFileKey": "string",
    "figmaNodeId": "string",
    "extractedAt": "ISO 8601 timestamp",
    "version": "1.0.0"
  },
  "designTokens": {
    "colors": {
      "primary": "#......",
      "secondary": "#......",
      "background": {
        "base": "#......",
        "surface": "#......"
      },
      "text": {
        "primary": "#......",
        "secondary": "#......"
      }
    },
    "typography": {
      "fontFamilies": ["string"],
      "fontSizes": {
        "xs": "12px",
        "sm": "14px",
        "base": "16px",
        "lg": "18px",
        "xl": "20px"
      },
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700
      },
      "lineHeights": {
        "tight": "1.25",
        "normal": "1.5",
        "relaxed": "1.75"
      }
    },
    "spacing": {
      "xs": "4px",
      "sm": "8px",
      "md": "16px",
      "lg": "24px",
      "xl": "32px"
    },
    "borderRadius": {
      "sm": "4px",
      "md": "8px",
      "lg": "12px",
      "full": "9999px"
    },
    "shadows": [
      {
        "name": "sm",
        "value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
      }
    ]
  },
  "components": [
    {
      "id": "unique-id",
      "name": "ComponentName",
      "type": "FRAME | COMPONENT | INSTANCE | TEXT | etc",
      "category": "layout | button | input | card | navigation | etc",
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 50
      },
      "layout": {
        "type": "flexbox | absolute | grid",
        "direction": "horizontal | vertical",
        "alignment": "start | center | end | stretch",
        "justifyContent": "start | center | end | space-between",
        "gap": 8,
        "padding": {
          "top": 16,
          "right": 16,
          "bottom": 16,
          "left": 16
        }
      },
      "styles": {
        "backgroundColor": "#FFFFFF",
        "borderColor": "#E5E5E5",
        "borderWidth": 1,
        "borderRadius": 8,
        "opacity": 1,
        "shadows": [],
        "effects": []
      },
      "typography": {
        "fontFamily": "Inter",
        "fontSize": 16,
        "fontWeight": 400,
        "lineHeight": "24px",
        "letterSpacing": "0px",
        "textAlign": "left",
        "color": "#000000"
      },
      "content": {
        "text": "Button Text",
        "placeholder": "",
        "value": ""
      },
      "states": [
        {
          "name": "default | hover | active | disabled | focused | error",
          "styles": {
            "backgroundColor": "#......",
            "borderColor": "#......"
          }
        }
      ],
      "children": [
        {
          "// nested component structure": "..."
        }
      ]
    }
  ],
  "pages": [
    {
      "id": "page-id",
      "name": "PageName",
      "frames": [
        {
          "id": "frame-id",
          "name": "FrameName",
          "type": "desktop | mobile | tablet",
          "width": 1440,
          "height": 1024,
          "componentIds": ["comp-1", "comp-2"]
        }
      ]
    }
  ],
  "assets": {
    "screenshots": [
      {
        "nodeId": "string",
        "nodeName": "string",
        "url": "path/to/screenshot.png",
        "width": 1440,
        "height": 1024
      }
    ],
    "images": [],
    "icons": []
  }
}
```

### 4. 파일 출력

#### 4-1. JSON 파일 생성
```
{ProjectName}_{YYMMDD}_{HHMM}_design.json
{ProjectName}_{YYMMDD}_{HHMM}_design-tokens.json
```

#### 4-2. 유틸리티 스크립트 생성
```
generate-css-variables.js    # CSS 변수 생성기
generate-tailwind-config.js  # Tailwind 설정 생성기
```

#### 4-3. README 생성
프로젝트 정보 및 JSON 구조 설명을 포함한 README.md 파일 생성

### 5. 출력 디렉토리 구조

```
{ProjectName}_{YYMMDD}_{HHMM}_design/
├── design.json                    # 메인 디자인 구조 JSON
├── design-tokens.json             # 분리된 디자인 토큰
├── generate-css-variables.js      # CSS 변수 생성 스크립트
├── generate-tailwind-config.js    # Tailwind 설정 생성 스크립트
├── README.md                      # 프로젝트 설명서
└── USAGE.md                       # 사용 가이드
```

## 분석 가이드라인

### 우선순위

1. **Layout First**: 레이아웃 구조를 먼저 파악 (Grid, Flexbox 패턴)
2. **Component Identification**: 재사용 가능한 컴포넌트 식별
3. **Design System**: 일관된 디자인 토큰 추출
4. **Interaction States**: 다양한 상태 변화 캡처

### 컴포넌트 분류 기준

- **Layout**: Header, Footer, Sidebar, Container, Grid
- **Navigation**: Navbar, Tabs, Breadcrumb, Pagination
- **Input**: Button, Input, Select, Checkbox, Radio, Toggle
- **Display**: Card, Table, List, Avatar, Badge, Tag
- **Feedback**: Alert, Toast, Modal, Tooltip, Progress
- **Typography**: Heading, Paragraph, Label, Caption

### 상태 감지 전략

Figma 컴포넌트의 Variants를 분석하여 다음 상태 추출:
- `Default`: 기본 상태
- `Hover`: 마우스 오버 상태
- `Active/Pressed`: 클릭/활성 상태
- `Disabled`: 비활성 상태
- `Focused`: 포커스 상태
- `Error`: 에러 상태

## 검증 체크리스트

생성된 JSON이 다음 조건을 만족하는지 확인:

- [ ] 모든 Figma 노드가 JSON에 매핑되었는가?
- [ ] 컴포넌트 계층 구조가 정확히 반영되었는가?
- [ ] 레이아웃 정보(위치, 크기, 간격)가 정확한가?
- [ ] 색상 코드가 정확히 추출되었는가? (HEX, RGB, RGBA)
- [ ] 타이포그래피 정보가 완전한가? (font, size, weight, line-height)
- [ ] 디자인 토큰이 중복 없이 추출되었는가?
- [ ] 컴포넌트 상태(variants)가 모두 포함되었는가?
- [ ] 스크린샷이 정상적으로 저장되었는가?
- [ ] JSON이 valid한 형식인가? (JSON validator 통과)

## 활용 방안

생성된 JSON 구조는 다음과 같은 용도로 활용 가능:

1. **자동 코드 생성**: React/Vue 컴포넌트 자동 생성의 입력 데이터
2. **디자인 시스템 문서화**: Storybook, Figma 플러그인 연동
3. **디자인-개발 싱크**: 디자인 변경 사항 추적 및 diff 비교
4. **테스트 자동화**: Visual regression testing 기준 데이터
5. **프로토타이핑**: 저코드/노코드 도구의 입력 소스

## 주의사항

1. **대용량 파일**: Figma 파일이 크면 분석 시간이 오래 걸릴 수 있음
2. **네이밍 일관성**: Figma 레이어명이 명확해야 정확한 분석 가능
3. **컴포넌트화**: Figma에서 Component로 만들어진 요소가 재사용성 높음
4. **상태 표현**: Variants를 활용해야 다양한 상태 추출 가능
5. **Auto Layout**: Auto Layout이 적용된 프레임이 레이아웃 구조 파악에 유리

## 실행 예시

```bash
# PowerShell에서 실행
.\.claude\run-figma-to-json.ps1 "https://www.figma.com/design/..."

# 또는 Claude Skills에서
/figma-to-json https://www.figma.com/design/...
```

생성 결과:
```
Dashboard_250107_1530_design/
├── design.json (생성됨)
├── design-tokens.json (생성됨)
├── generate-css-variables.js (생성됨)
├── generate-tailwind-config.js (생성됨)
├── README.md (생성됨)
└── USAGE.md (생성됨)
```

