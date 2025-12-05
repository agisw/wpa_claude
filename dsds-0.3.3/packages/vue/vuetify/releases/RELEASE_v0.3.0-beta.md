# DSDS Vue Vuetify v0.3.0-beta (2025-11-03)

## 신규 기능

### 엔터프라이즈 워크플로 샘플 & 데이터 도구

- **ECO Highway 샘플 세트**: `EHWDashboardLayout`, `EHWGpmDialog`, `EHWRmsDialog`, `EHWColumnSettingDialog`를 포함한 Storybook 예제를 추가해 실무형 레이아웃, 실시간 비교 흐름, 컬럼 가시성 제어 패턴을 확인할 수 있습니다.
- **RealGrid 연동 고도화**: 고정 컬럼 옵션, GPM/RMS 샘플 데이터 생성기, 상태 뱃지, 요약 정보 등을 포함해 데이터 테이블 시나리오를 재현했습니다.
- **ScrollableTable 컨테이너**: `<thead>/<tbody>/<tfoot>` 슬롯을 자동으로 분리·동기화하는 스크롤 테이블 래퍼를 제공해 헤더 고정, 빈 상태, 높이 계산을 손쉽게 구현할 수 있습니다.

### Page 기반 레이아웃 시스템

- **Page & PageFilter 컴포넌트**: 기존 Panel 계열을 PageFilter로 재구성하고 `Page`, `PageHeader`, `PagePanel`을 도입해 페이지 컨테이너, 헤더, 필터 구조를 일관되게 구성할 수 있습니다.
- **UMDefaultLayout / BasicLayout 리팩터링**: 공통 레이아웃을 Page 기반으로 정비하고 대시보드, 폼, 워크플로 샘플에 동일한 레이아웃 구조를 적용했습니다.
- **Layout 유틸 CSS**: `layout.css`, `page.css`에 토큰화된 레이아웃 간격/스크롤 스타일을 추가해 Storybook과 실제 앱 간 스타일 일관성을 높였습니다.

### 피드백 & 레이아웃 컴포넌트 확장
- **Loader & SpinnerIcon**: 풀스크린 로딩 오버레이와 크기별 스피너 아이콘을 도입해 비동기 상태 표현을 단순화했습니다.
- **PageBodyTools / PageHeaderFilterRow / PageFilterToolGroup**: 페이지 툴바, 필터 행, 패널 액션 구성을 위한 래퍼 컴포넌트를 추가했습니다.
- **FormTools**: 폼 액션 그룹을 전용 컴포넌트로 분리해 일관된 정렬 및 간격을 제공합니다.

## 기능 개선

### 선택 컴포넌트 UX
- **자동선택 & 하이라이트**: `VAutocomplete`, `VSelect`에 `autoSelectFirst`, 검색어 하이라이팅, "All" 배지 위치 제어, 빈 상태 표시를 추가했습니다.
- **상태 동기화**: selection meta 계산이 늘 배열을 반환하도록 보강하고, focus/reset 케이스를 더 안전하게 처리합니다.

### 레이아웃 & 내비게이션
- **VTabs/PageTabs**: `asChild` 지원, `v-model:items` 양방향 바인딩, 탭 언더라인 높이 통일 등으로 복합 탭 시나리오를 안정화했습니다.
- **LNB & Header**: 높이/오버플로 제어, 유틸리티 버튼 정렬, 드롭다운 메뉴 높이 보정으로 긴 제목과 compact 높이를 정돈했습니다.
- **VDialog**: `contentProps`를 노출해 오버레이 내부 컴포넌트 속성을 직접 전달할 수 있습니다.
- **레이아웃 문서 허브**: `LayoutOverview`, `Page`, `PageFilter`, `Form` 등 Storybook 문서를 layouts 네임스페이스로 재구성해 컴포넌트-패턴-예제를 한 흐름에서 탐색할 수 있습니다.
- **i18n 토글러**: Storybook 전역에 로케일 툴바와 `vue-i18n` 데코레이터를 도입해 한/영 스위치를 지원합니다.
- **스타일 토큰 재구성**: DSDS 토큰 디렉터리를 재정렬하고 letter-spacing, scrollbar, dropdown 등 세부 스타일을 표준화했습니다.
- **Scrollbar/Dropdown 정비**: 스크롤바 테마와 드롭다운 높이를 일관되게 맞춰 복잡한 테이블/모달에서도 동일한 경험을 제공합니다.

## 버그 수정

- **ScrollableTable**: 슬롯 처리와 tbody 감싸기를 보완해 HTML 구조 경고를 제거했습니다.
- **Breadcrumb 키 정규화**: 아이템 키 생성 규칙을 표준화해 Storybook 경고와 라우터 중복 키 오류를 방지했습니다.
- **Tooltip**: margin과 내장 스타일을 손봐 Storybook/프로덕션 간 불일치를 해결했습니다.
- **선택 메타 계산**: 빈 배열 입력 시 객체 변환 오류가 발생하던 문제를 수정했습니다.
- **타입 안정화**: `vue-tsc` 3.1.2로 업그레이드해 Vue 3.5 지원 시 타입 검사를 통과하도록 했습니다.

---

**전체 변경사항**: [CHANGELOG.md](../CHANGELOG.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.3.0-beta
```
