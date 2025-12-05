# DSDS React Radix UI v0.1.1

## 새로운 기능

### 새로운 컴포넌트
- **Radio 컴포넌트**: 새로운 라디오 버튼 컴포넌트 구현 및 스타일링
- **Toggle 컴포넌트**: 토글 스위치 컴포넌트 및 관련 스타일 구현
- **Tooltip 컴포넌트**: 툴팁 컴포넌트 강화 및 새로운 props 추가
- **HamburgerIcon 컴포넌트**: 새로운 햄버거 메뉴 아이콘 추가

### Boxes 컴포넌트 시스템
- **Textbox, Searchbox, Calbox** 컴포넌트 기능 향상
- **CalendarIcon 및 MagnifyIcon** 컴포넌트에 onClick prop 추가
- **TextboxWrapper** 컴포넌트 스타일링 개선

### Toast 시스템
- **Toast 스타일**: 커스텀 토스트 알림을 위한 스타일 시스템 추가

## 주요 개선사항

### Header 컴포넌트
- 네비게이션 로직 개선 및 메뉴 스타일 업데이트
- 비활성화 상태 스타일 및 disabled prop 지원 추가
- 호버 스타일 개선 (비활성화 상태에서만 적용)

### Footer 컴포넌트
- 새로운 스타일 및 아이콘 통합
- 텍스트 및 버튼 스타일 패딩 조정
- 구성 요소 정렬 옵션 개선

### Button 컴포넌트
- 패딩 및 스타일 개선
- 새로운 alert 색상 변형 추가
- 스피너 아이콘 조건부 표시 기능

### 아이콘 시스템
- **GearIcon**: named function으로 변경 및 SVG 크기 조정
- **아이콘 호버 스타일**: 접근성 개선
- **DummyIcon 및 HamburgerIcon**: data-testid와 aria-label props 추가

## 버그 수정

- **달력 아이콘**: 아이콘 표시 문제 수정
- **저작권 아이콘**: 선 굵기(stroke width) 수정
- **검색박스 데모**: 데모 기능 수정
- **텍스트박스**: 작은 크기 텍스트박스의 패딩 및 높이 조정으로 일관된 레이아웃 보장
- **툴팁**: TooltipContent 오프셋 조정으로 모든 방향에서 일관된 위치 설정

## 문서화 개선

- **QA 문서**: Radio, Toggle, Tooltip, Boxes, Footer 컴포넌트용 QA 문서 추가
- **Storybook Stories**: 모든 새 컴포넌트에 대한 상세한 사용 예제 및 스토리 추가
- **컴포넌트 문서**: Calbox, Searchbox, Textbox 사용 모드 및 예제 명확화
- **한국어 지원**: 'Doing' 및 'Done' 상태에 대한 한국어 번역 추가

## 기술적 개선

- **시각적 회귀 테스트**: 새로운 컴포넌트들에 대한 포괄적인 시각적 테스트 추가
- **스타일 시스템**: 일관된 디자인 토큰 및 스타일 적용
- **접근성**: 아이콘 및 interactive 요소들의 접근성 속성 강화

---

**전체 변경사항**: [CHANGELOG.md](../CHANGELOG.md)

**설치:**
```bash
npm install @dsds/react-radix-ui@0.1.1
```

### 릴리즈 통계
- **새로운 컴포넌트**: 4개 (Radio, Toggle, Tooltip, HamburgerIcon)
- **개선된 컴포넌트**: 8개
- **수정된 버그**: 7개
- **QA 문서 추가**: 5개 컴포넌트