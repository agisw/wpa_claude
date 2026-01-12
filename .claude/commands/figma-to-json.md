# Figma Design to JSON Structure

Figma 디자인을 분석하여 **DSDS Vue 컴포넌트 생성에 필요한 핵심 정보만** 추출합니다.

## Figma URL
$ARGUMENTS

## 목적

Figma Dev Mode에서 **최소한의 필수 정보만** 추출하여 경량화된 JSON 생성:
- 페이지/섹션 구조 (계층은 최대 2-3단계까지만)
- 컴포넌트 타입 및 텍스트 내용
- 기본 디자인 토큰 (색상, 타이포그래피)
- DSDS 컴포넌트 매핑에 필요한 속성만

**제외 항목**: 세밀한 좌표(x, y), 깊은 중첩 구조, 모든 상태의 세부 스타일, 스크린샷

## 실행 단계

### 0. ⚠️ 간소화 원칙 (최우선)

**JSON 파일 크기를 최소화하는 것이 최우선 목표입니다.**

- 📏 **목표 크기**: 100-500KB
- 🚫 **최대 크기**: 1MB 이하
- 🎯 **핵심**: DSDS 컴포넌트 매핑에 필요한 정보만

### 1. Figma 디자인 데이터 수집 (선택적)

#### 1-1. 디자인 컨텍스트 가져오기
```
mcp__figma__get_design_context
```
- Figma 파일 정보 추출
- **주의**: 모든 정보를 추출하되, JSON 생성 시 필터링

#### 1-2. 스크린샷 캡처
- ❌ **제외**: 스크린샷은 생성하지 않음 (불필요)

### 2. 디자인 분석 (간소화)

**핵심 정보만 추출** - DSDS 컴포넌트 매핑에 필요한 최소 정보:

#### 2-1. 페이지 구조 (최대 2-3단계)
- 주요 섹션 식별: Header, Main, Footer
- 각 섹션 내 컴포넌트 그룹
- **제외**: 깊은 중첩 구조, 세밀한 레이아웃

#### 2-2. 컴포넌트 타입 분류
- **Button**: variant (primary/secondary/outlined), text, size
- **Input**: type (text/email/select), label, placeholder
- **Card**: title, description, hasAction
- **Table**: columns[], hasSort, hasPagination
- **Form**: fields[], submitButton
- **Navigation**: logo, links[], actions[]

#### 2-3. 기본 디자인 토큰 (5가지만)
- **Primary Color**: 주요 색상 1개
- **Secondary Color**: 보조 색상 1개
- **Status Colors**: success, warning, error
- **Font Family**: 기본 폰트 1개
- **Base Font Size**: 기본 크기 1개

#### 2-4. 텍스트 내용 추출
- 버튼 텍스트, 레이블, 플레이스홀더
- 제목, 설명문
- **제외**: 본문 전체 내용 (너무 긴 텍스트)

### 3. 간소화된 JSON 스키마

**DSDS Vue 컴포넌트 생성에 필요한 최소 정보만 포함**:

```json
{
  "metadata": {
    "projectName": "string",
    "figmaUrl": "string",
    "extractedAt": "ISO 8601 timestamp"
  },
  "designTokens": {
    "colors": {
      "primary": "#4F46E5",
      "secondary": "#6B7280",
      "success": "#10B981",
      "warning": "#F59E0B",
      "error": "#EF4444"
    },
    "typography": {
      "fontFamily": "Inter",
      "baseFontSize": "16px"
    }
  },
  "layout": {
    "sections": [
      {
        "name": "Header",
        "type": "header",
        "components": [
          {
            "type": "button",
            "variant": "primary",
            "text": "Get Started",
            "action": "navigation"
          }
        ]
      },
      {
        "name": "Main Content",
        "type": "main",
        "components": [
          {
            "type": "card",
            "title": "Card Title",
            "description": "Card description",
            "hasAction": true
          },
          {
            "type": "form",
            "fields": [
              {
                "type": "text-input",
                "label": "Email",
                "placeholder": "your@email.com",
                "required": true
              },
              {
                "type": "button",
                "variant": "primary",
                "text": "Submit"
              }
            ]
          }
        ]
      }
    ]
  },
  "components": {
    "buttons": [
      {
        "variant": "primary | secondary | outlined",
        "text": "Button Text",
        "size": "small | medium | large"
      }
    ],
    "inputs": [
      {
        "type": "text | email | password | select",
        "label": "Field Label",
        "placeholder": "Placeholder text"
      }
    ],
    "cards": [
      {
        "title": "Card Title",
        "description": "Card description",
        "actions": ["Action 1", "Action 2"]
      }
    ]
  }
}
```

**제외된 항목**:
- ❌ `x, y, width, height` (정확한 좌표 불필요)
- ❌ 깊은 `children` 중첩 구조 (평탄화)
- ❌ 모든 `states`의 세부 스타일 (variant만 사용)
- ❌ `shadows`, `effects`, `letterSpacing` 등 세부 속성
- ❌ `assets`, `screenshots` (이미지 제외)

### 4. 파일 출력 (간소화)

#### 4-1. 단일 JSON 파일만 생성
```
{ProjectName}_{YYMMDD}_{HHMM}/
└── design.json    # 간소화된 단일 JSON 파일 (모든 정보 포함)
```

**제외**:
- ❌ design-tokens.json (분리하지 않음, design.json에 통합)
- ❌ generate-css-variables.js (불필요)
- ❌ generate-tailwind-config.js (불필요)
- ❌ README.md, USAGE.md (문서화 불필요)

#### 4-2. 파일 크기 목표
- **목표**: 100-500KB
- **최대**: 1MB 이하
- 1MB 초과 시 → 더 간소화 필요

## 간소화 가이드라인

### 추출 원칙

1. **섹션 중심**: 페이지를 Header/Main/Footer 등 큰 섹션으로 나눔
2. **컴포넌트 타입만**: 정확한 크기/위치 대신 타입과 variant만
3. **텍스트 내용**: 실제 표시될 텍스트만 추출
4. **최소 토큰**: 색상 5개, 폰트 1개만

### 필수 컴포넌트만 추출

**포함**:
- ✅ Button (variant, text, size)
- ✅ Input (type, label, placeholder)
- ✅ Card (title, description)
- ✅ Table (기본 구조만)
- ✅ Form (fields 배열)
- ✅ Navigation (links 배열)

**제외**:
- ❌ Avatar, Badge, Tag (DSDS에 없는 컴포넌트)
- ❌ Tooltip, Progress (복잡한 인터랙션)
- ❌ Typography 세부 속성
- ❌ 모든 상태(state)의 스타일 세부사항

### 데이터 평탄화

- 중첩을 최대 2-3단계로 제한
- `sections > components` 구조 사용
- 깊은 `children` 구조 피하기

## 검증 체크리스트

**간소화된 JSON 검증** - 필수 항목만 확인:

- [ ] 주요 섹션(Header/Main/Footer)이 식별되었는가?
- [ ] 각 섹션의 컴포넌트 타입이 명확한가?
- [ ] 버튼, 입력 필드의 텍스트 내용이 추출되었는가?
- [ ] 5가지 기본 색상이 추출되었는가?
- [ ] JSON 파일 크기가 500KB 이하인가? (너무 크면 간소화 필요)
- [ ] JSON이 valid한 형식인가?
- [ ] DSDS 컴포넌트로 매핑 가능한 구조인가?

## 활용 방안

간소화된 JSON은 다음 용도로 활용:

1. **DSDS Vue 컴포넌트 생성**: `json-to-dsds-vue` 명령의 입력 데이터
2. **빠른 프로토타이핑**: 경량 구조로 빠른 처리
3. **디자인-개발 브리지**: 개발자가 이해하기 쉬운 구조

**제외된 용도**:
- ❌ 픽셀 퍼펙트 구현 (정확한 좌표/크기 없음)
- ❌ 디자인 시스템 문서화 (세부 정보 부족)
- ❌ Visual regression testing (스크린샷 없음)

## 주의사항

### 간소화 우선순위

1. **파일 크기 제한**: JSON이 1MB를 초과하면 안 됨
2. **평탄한 구조**: 중첩을 최대 2-3단계로 제한
3. **타입 중심**: 세부 스타일 대신 컴포넌트 타입과 variant만
4. **텍스트 우선**: 좌표/크기보다 실제 표시될 텍스트 내용 추출
5. **DSDS 매핑 가능성**: DSDS에 없는 컴포넌트는 제외

### 불필요한 정보 제외

- ❌ 정확한 x, y 좌표
- ❌ width, height의 픽셀 단위
- ❌ padding, margin의 세부값
- ❌ shadows, effects의 세부 속성
- ❌ 모든 상태(state)의 스타일
- ❌ letterSpacing, lineHeight 등 타이포그래피 세부사항
- ❌ 이미지, 아이콘, 스크린샷

## 실행 예시

```bash
# PowerShell에서 실행
.\.claude\run-figma-to-json.ps1 "https://www.figma.com/design/..."

# 또는 Claude Skills에서
/figma-to-json https://www.figma.com/design/...
```

생성 결과 (간소화):
```
Dashboard_250112_2000/
└── design.json (100-500KB, 간소화된 단일 파일)
```

**크기 확인**:
- ✅ 500KB 이하 → 성공
- ⚠️ 500KB-1MB → 경고 (더 간소화 권장)
- ❌ 1MB 초과 → 실패 (반드시 간소화 필요)

## 간소화 체크포인트

JSON 생성 후 반드시 확인:

1. **파일 크기** 확인 (1MB 이하여야 함)
2. **섹션 구조** 단순한가? (Header/Main/Footer)
3. **컴포넌트 타입** 명확한가? (button, input, card 등)
4. **좌표 정보** 제거되었는가? (x, y, width, height)
5. **텍스트 내용** 추출되었는가?

크기가 너무 크면 → 불필요한 정보를 더 제거하고 재생성

