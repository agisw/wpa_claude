# DSDS Vue Vuetify v0.2.0-beta (2025-10-15)

첫 베타 버전 입니다.

## 신규 기능

### 탐색 & 인터랙션 컴포넌트
- **DropdownMenu**: 헤더 메뉴와 단독 메뉴 모두에서 사용할 수 있는 다단계 드롭다운과 커스텀 슬롯 지원
- **Popover**: Vuetify 오버레이와 연동되는 팝오버 컴포넌트 및 스타일, 데모 스토리 추가
- **Toggletip & ToggletipContent**: 포커스/호버 대응 토글 팁과 콘텐츠 서브컴포넌트 도입, Popover와 통합
- **Searchbox**: 헤더 및 LNB에 바로 연동 가능한 검색 입력 컴포넌트

### 페이지 구조 & 정보 아키텍처
- **Footer 패밀리**: Footer, FooterButton, FooterCopyright, FooterDivider, FooterLink, FooterText를 포함한 새로운 푸터 시스템과 브랜드 아이콘
- **LNB (Left Navigation Bar)**: 아코디언/트리 구조 네비게이션, 검색 연계, Markdown 기반 설명 추가
- **VTabsContainer**: 탭 상태를 컨텍스트로 관리하는 래퍼 컴포넌트
- **Tag 컴포넌트**: 상태, 크기, 아이콘 옵션을 지원하는 배지형 태그 추가

### 개발자 경험 강화
- **VueMarkdown 통합**: 마크다운 콘텐츠를 Storybook에서 바로 렌더링할 수 있도록 지원 (Shiki 코드 하이라이트 기능 기본 내장)
- **VueDatePicker 스토리 확장**: 범위 선택과 옵션 제어 예시를 포함한 스토리 추가

## 기능 개선
- **RealGrid 통합 고도화**: FakeRealGrid를 정식 RealGrid로 대체, 타입 안전성 강화, 컬럼/필드 유틸 정리, 데모 데이터 생성기 추가
- **Header & Alarm 요약 개선**: 스타일/클래스 일원화, 햄버거 아이콘 추가, 유틸리티 영역 상호작용 개선
- **Footer 스타일 튜닝**: disabled 상태 표현 및 공통 버튼 스타일 보강
- **스토리북 자산 정리**: 문서 구조 개선, Getting Started 확장, 컴포넌트별 예시 업데이트, 사이드바 정렬 개선
- **VSelect**: "ALL" 레이블을 "All"로 교정하여 국제화 톤 통일
- **코드베이스 정리**: 불필요한 props 제거, 클래스 바인딩 단순화, 스토리/컴포넌트 디렉터리 재구성, 스크립트 정비

## 버그 수정
- 컴포넌트 prop 헤딩과 오탈자 교정으로 문서 정확도 향상
- 스토리북 사이드바 항목 순서 문제를 정렬하여 탐색성 개선

---

**전체 변경사항**: [CHANGELOG.md](./CHANGELOG.md)
**상세 릴리즈 노트**: [RELEASE_NOTES.md](./RELEASE_NOTES.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.2.0-beta
```
