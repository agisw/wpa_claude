# DSDS Vue Vuetify v0.2.2-beta (2025-10-22)

## 신규 기능

### 폼 & 입력 컴포넌트 확장
- **VSwitch**: 토글 스위치 컴포넌트, 크기 및 비활성화 상태 지원
- **Toggle**: 토글 버튼 컴포넌트 추가
- **VRating**: 별점 평가 컴포넌트 (StarIcon 포함)

### 레이아웃 & 분할 컴포넌트
- **Splitter 및 SplitterPanel**: 창 분할/리사이징 기능 (reka-ui 통합)
- **SplitterHandle**: 분할 핸들 컴포넌트
- **PagePanel / PagePanelHeader / PagePanelTools**: 페이지 패널 시스템 개선

### 아이콘 추가
- **EllipsisIcon, SettingsIcon, HistoryIcon, ColumnSettingIcon**: 새로운 유틸리티 아이콘

## 기능 개선

### 탭 시스템 고도화
- **VTabs / PageTabs**: value 기반 탭 관리로 통일
- **VTabsContent**: 탭 콘텐츠 구조화 컴포넌트 추가
- **declarative items prop**: VTabs에서 선언형 탭 항목 지원
- 컴팩트 스타일링 및 레이아웃 최적화

### 날짜 선택기 강화
- **VueDatePicker**: 시간 선택 지원, 날짜 포맷팅/파싱 개선
- Teleport 지원으로 모달 렌더링 개선
- 패딩/오프셋 조정으로 UX 향상

### 디자인 & 스타일 개선
- **ScrollArea**: outline styling 일관성 개선
- **FormField**: tools slot 및 정렬 개선
- **RealGrid/FakeRealGrid**: 속성 처리 및 컬럼 폭 개선
- 페이지 레이아웃 구조 정리로 responsive 지원 강화

### Footer 개선
- `noBorder` 옵션 추가로 경계선 제거 가능

## 버그 수정
- TextInput 및 Layout 렌더링 에러 수정
- 버튼 상태 처리 개선
- 아이콘 스타일/패딩 일관성 수정
- Splitter 및 PageFilter 컴포넌트 일관성 재정비

---

**전체 변경사항**: [CHANGELOG.md](./CHANGELOG.md)
**상세 릴리즈 노트**: [RELEASE_NOTES.md](./RELEASE_NOTES.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.2.2-beta
```
