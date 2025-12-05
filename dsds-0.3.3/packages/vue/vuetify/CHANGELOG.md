# 변경 이력

이 프로젝트의 모든 주요 변경 사항이 이 파일에 기록됩니다.

형식은 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)를 기반으로 하며,
이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 준수합니다.

## [0.3.3-beta] - 2025-12-01

### 중요 공지
- **Dialog → Modal**: `VDialog`, `DialogHeader`, `DialogPanel` 패밀리를 Modal 네이밍으로 교체하고 신규 `Modal`, `ModalHeader`, `ModalPanel` 컴포넌트를 기본으로 노출합니다. 기존 Dialog API는 `@deprecated` 태그와 함께 유지되어 있는 동안 점진적으로 교체할 수 있습니다.

### 신규 기능
- **ECM · RMS 비교 플로우 확장**: `EHWEcmCompareModal`이 Fail Case 모달을 직접 띄우고 RMS 스토리는 Fail Case/판정 기준 모달을 독립 스토리로 분리해 참조 테이블을 바로 확인할 수 있습니다.
- **PEMS/Notice 플로우 개선**: Notice/권한 관리/Lot Arrange 등 주요 모달 예제를 Modal 패턴으로 다시 설계하고 `SearchModifyTcpHeaderFilterBody`를 별도 컴포넌트로 분리해 헤더 필터 레이아웃을 재사용합니다.
- **Breadcrumb 타입 export**: `BreadcrumbItem` 타입을 공개해 Page/PageHeader/대시보드 예제에서 동일 타입 정의로 아이템을 구성할 수 있습니다.

### 기능 개선
- **LNB 접힘 UX** *(요청 반영)*: 접힘 트랙을 1px로 단순화하고 배경 div를 제거해 Page 본문과 정확히 맞물립니다. BasicLayout 스토리에서는 LNB selection/change 이벤트로 PageTabs와 상태 전환 과정을 함께 보여줍니다.
- **VBtn 로딩 상태**: `loading` props 사용 시 SpinnerIcon이 자동 렌더링되고 변형별 stroke-width/색상이 토큰과 일치합니다.
- **VCheckbox 접근성**: hidden native input의 `change` 이벤트를 다시 발생시키고 disabled 상태 대비를 개선했습니다.
- **ScrollableTable/dsds-table**: 중복 보더를 제거하고 행 높이를 `auto` 기반으로 계산해 다단 텍스트에서도 잘림 없이 보이도록 했습니다.
- **Page & Layout 문서**: `PageHeaderDivider`를 제거하고 `v-divider` 사용을 권장하도록 문서를 전면 업데이트했습니다.
- **Header & Footer**: `--breakpoint-4xl` 토큰 정리로 1920px 이상에서도 래퍼 폭이 안정적으로 유지됩니다.

### 버그 수정
- Grid/페이지 조합에서 테이블 행 높이가 잘리는 문제를 해결했습니다.
- Button 클릭에서 `preventDefault`를 제거해 Storybook 샘플에서도 submit 흐름이 동작합니다.
- Storybook devDependencies를 10.0.8 계열로 올려 Modal 리팩터링 이후 빌드 경고를 제거했습니다.

## [0.3.2-beta] - 2025-11-25

### 신규 기능
- **RMS Recipe 비교 다이얼로그**: EHWRmsCompareDialog story가 표준 설비/Manual Recipe 선택, 복사, 삭제, 판정 기준 토글, EES 링크 이동까지 한 번에 처리해 RMS 일치율 분석 시나리오를 재현합니다.
- **ECO Highway 결재 경로 추가 플로우**: EHWApprPathAddDialog가 개인/부서 템플릿 검색과 Lazy 로딩, TASK_KIND 라벨링, 탭 기반 멤버 목록을 제공해 결재 경로 작성 UX를 Storybook에서 시뮬레이션할 수 있습니다.
- **LNB 스토리 팩**: Tree Only, Tree+Item, Selection Callback, Flat Menu, 불릿 규칙, Header 제거, Hidden state 등 8개 시나리오를 Storybook/데이터 세트로 분리해 제공하며, large Searchbox·`defaultSelectedItemId`/`defaultOpenPath`/`onSelectionChange` 샘플과 bullet rule·hidden prop 데모로 제약 케이스까지 문서화했습니다.

### 기능 개선
- **Header 레이아웃**: `dsds-header-wrapper`와 컴포넌트 매핑을 재구성해 로고·GNB·Utility·Tabs 조합이 어떤 경우에도 줄바꿈 없이 정렬되고, `withTabs` 모드에서 상/하단 영역이 분리됩니다.
- **Spinner & Loader**: 스피너 애니메이션 주기와 stroke-width를 최적화하고 Loader/RealGrid CSS가 새 토큰을 사용하도록 정리해 로딩 상태가 더 부드럽고 가볍게 표현됩니다.
- **Toast & 유틸리티**: `vue-sonner` 기반 `showToast` 헬퍼가 커스텀 바디, onClose, 지속 시간 옵션을 받고, Storybook 토스트 문서와 샘플이 최신 API로 맞춰졌습니다.
- **EHW 예제 리팩터링**: RMS API 파라미터/상태를 `ref`와 `defineModel`로 노출하고, Dialog form filter 클래스·ScrollableTable 스타일을 정리해 Examples 전반의 데이터 흐름과 시각 일관성이 향상됐습니다.

### 버그 수정
- `rounded-xs` 등 radius 유틸리티를 Vuetify 기본 클래스와 분리해 오버레이/툴팁에서 border-radius가 사라지던 문제를 막았습니다.
- Spinner·Toast 스타일 조정 과정에서 발생한 CSS 오탈자와 누락된 유틸리티 클래스를 복구했습니다.

## [0.3.1-beta] - 2025-11-12

### 신규 기능
- **EES Alarm Summary 예제**: Splitter 2단 레이아웃, RealGrid 고정 컬럼, 사이드 필터, 차트 패널을 포함한 페이지 데모를 추가했습니다.
- **ToggleButton**: 체크박스 아이콘을 내장한 버튼형 토글을 도입해 v-model 기반 상태 전환을 단순화했습니다.
- **ECO Highway Create View**: PEMS 작성, 멀티 Step 선택, 결재 경로 관리 등 복합 ECO 생성 플로우를 재현한 레이아웃 예제를 제공했습니다.
- **Utils 엔트리**: `@dsds/vue-vuetify/utils` 경로를 노출해 `cn`, `hasSlotContent`, `formatDate`, `dedent` 유틸리티를 사용할 수 있습니다.

### 기능 개선
- **Loader**: `v-model`, `delay`, `scrim`, `contained`, 스피너 사이즈 옵션을 추가하고 Storybook 사례를 확장했습니다.
- **Splitter**: `layoutDebounce` 옵션으로 드래그 중 발생하는 연속 `layout` 이벤트를 완화했습니다.
- **RealGrid 예제**: 고정 컬럼, displayOptions, 검색 히스토리, loader 상태 등 실무형 설정을 정리했습니다.
- **Storybook 문서**: ScrollArea, Toast, VDialog, Pagination 등 주요 컴포넌트 스토리에 재사용 가능한 템플릿을 추가했습니다.

### 버그 수정
- VAutocomplete/VSelect 다중 선택에서 체크박스 클릭이 막히던 문제를 해결했습니다.
- DatePicker 범위 선택 hover 배경이 셀 내부에 정확히 적용되도록 CSS를 정리했습니다.
- 아이콘 토큰 변수 순서를 조정해 hover 색상이 올바르게 참조되도록 했습니다.
- Splitter 언마운트 시 대기 중이던 layout 타이머를 정리해 불필요한 호출을 방지했습니다.

## [0.3.0-beta] - 2025-11-03

### 신규 기능
- **ScrollableTable**: `<thead>/<tbody>/<tfoot>`을 자동으로 분리하고 콘텐츠 높이를 계산하는 스크롤 테이블 래퍼를 추가했습니다.
- **Loader & SpinnerIcon**: 풀스크린 로딩 오버레이와 크기별 회전 아이콘을 통해 비동기 상태 표시를 표준화했습니다.
- **ECO Highway 예제**: 대시보드, RMS/GPM 모달, 컬럼 설정 다이얼로그 등 실무형 시나리오를 Storybook Examples에 수록했습니다.
- **Page & PageFilter 시스템**: `Page`, `PageHeader`, `PagePanel`과 Panel → PageFilter 네이밍 전환으로 페이지 컨테이너와 필터, 툴바 구성을 통합했습니다.
- **UMDefaultLayout 컴포넌트**: 공통 레이아웃과 내비게이션 워크플로를 Page 기반 구조로 재구성했습니다.

### 기능 개선
- **VSelect / VAutocomplete**: `autoSelectFirst`, 검색어 하이라이트, "All" 배지 위치 제어, selection meta 보강으로 검색 UX를 개선했습니다.
- **레이아웃 컴포넌트**: PageTabs `v-model:items`, VTabs `asChild`, LNB/헤더 높이 및 스크롤바 스타일을 다듬었습니다.
- **Dialog & PageFilter 툴링**: VDialog `contentProps`, PageBodyTools, FormTools, PageFilterToolGroup 등 래퍼 컴포넌트를 추가해 툴바 구성이 쉬워졌습니다.
- **Storybook i18n**: 전역 로케일 스위처와 `vue-i18n` 데코레이터로 한/영 토글을 지원합니다.
- **디자인 토큰 재구성**: 토큰 디렉터리를 재정렬하고 letter-spacing, dropdown, scrollbar 변수로 스타일 일관성을 높였습니다.
- **레이아웃 문서**: `LayoutOverview`, `Page`, `PageFilter`, `Form` 등 Storybook 레이아웃 문서를 네임스페이스로 통합하고 예제/패턴 흐름을 강화했습니다.
- **레이아웃 샘플**: BasicLayout, CleanLotDashboard 등 예제를 Page 구조로 리팩터링하고 ScrollableTable 빈 상태 표현과 조건부 섹션 제어를 개선했습니다.

### 버그 수정
- **ScrollableTable**: tbody를 `<tbody>`로 감싸고 슬롯 동기화를 보완해 HTML 유효성 오류를 제거했습니다.
- **Tooltip**: margin 및 기본 스타일을 수정해 스토리북과 실제 동작 간 시각 차이를 해소했습니다.
- **선택 메타 계산**: 빈 배열 입력 시 `selectionMeta`가 undefined를 반환하던 문제를 해결했습니다.
- **타입 검사**: `vue-tsc` 3.1.2로 올려 Vue 3.5 환경에서의 타입 오류를 방지했습니다.
- **Breadcrumb 아이템**: 키 생성 규칙을 정규화해 Storybook 경고와 라우터 중복 키 문제를 방지했습니다.

## [0.2.3-beta] - 2025-10-23

### 신규 기능
- **서브패스 배포**: `@dsds/vue-vuetify/icons`와 `@dsds/vue-vuetify/faker` 엔트리를 추가해 아이콘과 테스트 유틸리티를 독립적으로 불러올 수 있습니다.
- **Footer 확장**: `items` 컬렉션 API와 `align`, `fluid` 옵션을 추가해 Footer 구성 방식이 유연해졌습니다.

### 기능 개선
- **빌드 구성**: Vite 다중 엔트리, 엔트리별 산출물 경로, `publicDir: false`, `minify` 옵션을 도입해 배포 자산과 번들 크기를 최적화했습니다.
- **의존성 정리**: Storybook/편집 전용 패키지를 `peerDependencies`로 이동해 소비자 설치 용량을 줄였습니다.
- **스타일 구조화**: Breadcrumb, Header, RichText, Toast, Tooltip 등 공통 스타일을 전용 CSS로 분리하고 Badge, Markdown, VRating, Splitter 구성요소의 스타일을 정비했습니다.
- **faker 타입 개선**: faker 모듈을 `export *` 기반으로 재구성하여 선언 파일이 간결해졌습니다.

### 버그 수정
- `package.json`의 스타일 및 faker 타입 경로를 올바른 dist 위치로 수정했습니다.
- 라이브러리 빌드시 `public/` 디렉터리가 그대로 복사되던 문제를 방지했습니다.

## [0.2.2-beta] - 2025-10-22

### 신규 기능
- **VSwitch, Toggle**: 토글 스위치 및 토글 버튼 컴포넌트 추가
- **VRating**: 별점 평가 컴포넌트 (StarIcon 포함)
- **Splitter / SplitterPanel / SplitterHandle**: reka-ui 기반 윈도우 분할·리사이징 시스템
- **PagePanel / PagePanelHeader / PagePanelTools**: 페이지 패널 구조화 컴포넌트
- **새로운 아이콘**: EllipsisIcon, SettingsIcon, HistoryIcon, ColumnSettingIcon

### 기능 개선
- **탭 시스템 고도화**: VTabs/PageTabs에 value 기반 관리 통일, VTabsContent 구조화, declarative items prop 지원
- **VueDatePicker 강화**: 시간 선택, Teleport 지원, 날짜 포맷팅/파싱 개선
- **레이아웃 최적화**: ScrollArea 스타일링, FormField tools slot, RealGrid 속성 처리 개선
- **페이지 구조 정리**: EESUIPageSidePanel, EESAlarmSummaryPage 레이아웃 개선
- **스타일 일관성**: 아이콘 크기, 버튼 상태, 패딩 등 전반적 개선
- **Footer 옵션**: `noBorder` 추가로 경계선 제거 가능

### 버그 수정
- TextInput 및 Layout 렌더링 에러 해결
- 버튼 상태 처리 및 hover 효과 개선
- 탭 이벤트 리스너 및 컴포넌트 일관성 재정비

## [0.2.1-beta] - 2025-10-17

### 신규 기능
- **PageTabs 고급 컨트롤**: 탭 드롭다운, 옵션 버튼, 닫기 확인 대화상자, Bulk Close 흐름 등 생산성 기능 추가
- **문서 툴링**: Shiki 기반 코드 하이라이트를 제공하는 CodeBlock/Markdown 컴포넌트 도입

### 기능 개선
- **PageTabs UX**: 레이아웃 정리, 버튼 전환 애니메이션 개선, 스토리에서 옵션/확인 시나리오 강화
- **스토리북 문서**: Markdown 렌더링 품질 개선 및 예시 구조 재정비

### 버그 수정
- PageTabs 확인 대화상자와 문서 렌더링 시 발생하던 표현 문제를 수정

## [0.2.0-beta] - 2025-10-15

### 신규 기능
- **DropdownMenu / Popover / Toggletip / Searchbox**: 헤더와 컨텍스트 액션을 위한 탐색·인터랙션 컴포넌트 추가
- **Footer 패밀리**: Footer, FooterButton, FooterCopyright, FooterDivider, FooterLink, FooterText 등 브랜드 푸터 시스템 도입
- **LNB (Left Navigation Bar)**: 아코디언·트리 구조 내비게이션과 검색 연동 지원
- **VTabsContainer**: 탭 상태를 컨텍스트로 공유하는 래퍼 컴포넌트 추가
- **Tag 컴포넌트**: 상태, 크기, 아이콘 옵션을 지원하는 배지형 태그 제공
- **VueMarkdown**: 하이라이트·검색 가능한 코드 블록과 Markdown 기반 문서 렌더링 기능 도입
- **VueDatePicker 스토리 확장**: 범위 선택과 옵션 제어 예시 추가로 사용성 강화

### 기능 개선
- **RealGrid 통합 고도화**: FakeRealGrid 제거, GridColumn/DataField 타입 적용, 샘플 데이터 생성기로 데모 정교화
- **Header & Searchbox**: 햄버거 아이콘 및 AlarmSummary 개선, 클래스/스타일 일관성 강화
- **Footer 스타일**: disabled 상태 표현 및 공통 버튼 스타일 보완
- **스토리북 문서화**: Getting Started, 컴포넌트 문서, 사이드바 구조 재정비 및 설명 추가
- **VSelect**: "ALL" → "All"로 통일해 국제화 톤 개선
- **코드 정리**: 불필요한 props 제거, class binding 단순화, 스크립트 정비 및 디렉터리 구조 개선

### 버그 수정
- 문서 코드 블록을 `vue` → `html` 구문으로 수정해 하이라이트 오류 해결
- 컴포넌트 prop 헤더와 오탈자 수정으로 문서 정확도 향상
- Storybook 사이드바 항목 정렬 문제 해결로 탐색성 개선

## [0.1.2-alpha] - 2025-09-25

### 신규 기능
- **VTabs & VTab 컴포넌트**: 키보드 네비게이션과 접근성 기능을 갖춘 탭 컴포넌트
  - VTabsWindow, VTabsWindowItem 포함
- **RichTextEditor 컴포넌트**: 리치 텍스트 에디터 컴포넌트
- **VTooltip 개선**: 컨텍스트와 커스터마이징 가능한 콘텐츠 지원
- **VSelect**: 다중 선택 배지(badge) 기능 및 Indeterminate 상태 지원
- **VSelect**: Ghost variant 스타일 옵션
- **VCheckbox**: 상세한 사용 예제와 props 설명 문서화

### 기능 개선
- **DSDS 디자인 시스템**: VRadioGroup, VSelect, VTextField 컴포넌트에 적용
- **문서화 개선**: Breadcrumb, VBtn, VCheckbox 컴포넌트 문서화 강화
- **Header 컴포넌트**: 클래스 및 스타일 일관성을 위한 업데이트
- **Storybook**: `@storybook/vue3-vite` 사용을 위한 import 경로 업데이트
- **패키지 정보**: package.json에 author 및 description 필드 추가

### 버그 수정
- **VRadioGroup**: hover 색상 수정
- **Header**: 버튼 스타일 및 다크 테마에서 검색박스 disabled 색상 수정
- **VTooltip**: 위치 조정 및 애니메이션 전환 시간 개선
- **애니메이션**: variations 콘텐츠 간격 및 지연 시간 수정
- **코드 품질**: TypeScript 타입 에러 및 불필요한 import 제거

### 제거됨
- 사용하지 않는 샘플 파일 및 obsolete 파일 정리

## [0.1.1-alpha] - 2025-09-17

### 신규 기능
- **VRadioGroup & VRadio 컴포넌트**: 라디오 버튼 그룹 및 개별 라디오 컴포넌트
- **Pagination 시스템**: 페이지네이션 컴포넌트 세트
  - PaginationRoot, PaginationContent, PaginationNumber, PaginationDot
- **Header 컴포넌트 시스템**: 완전한 헤더 시스템 구축
  - Header, HeaderLogo, HeaderMenu, HeaderTenant, HeaderHamburgerMenu
  - HeaderGNB, HeaderUtility, HeaderTabs, HeaderDivider
  - HeaderButton, HeaderLink, HeaderImage, HeaderSearchbox
- **VTooltip 기본 구현**: 툴팁 컴포넌트 초기 버전
- **CollapseToggleButton**: 접기/펼치기 토글 버튼
- **Toast 시스템**: Toast 컴포넌트 및 showToast 함수

### 기능 개선
- **Storybook**: 버전 9.1.5로 업그레이드
- **디자인 토큰**: 색상 시스템 업데이트
- **문서화**: 컴포넌트 QA 문서 추가

### 버그 수정
- **VSelect 아이콘**: 드롭다운 아이콘 디자인 일관성 개선
- **Header**: hover 스타일이 disabled 상태에서 적용되지 않도록 수정
- **VTooltip**: 위치 조정 개선

### 개발 환경
- **빌드 시스템**: Vite 설정 개선
- **Visual 테스트**: 스냅샷 업데이트 및 회귀 테스트 추가

## [0.1.0-alpha] - 2025-09-02

### 프로젝트 초기화
- **프로젝트 설립**: DSDS Vue Vuetify 컴포넌트 라이브러리 초기 구축
- **기본 인프라**: Vite, TypeScript, ESLint 개발 환경 구성
- **Storybook 통합**: 컴포넌트 문서화 및 테스트 환경 구축
- **DSDS 디자인 토큰**: @dsds/tokens 패키지 통합

### 핵심 컴포넌트 추가
- **VBtn**: 기본 버튼 컴포넌트 (TailwindCSS와 Vuetify 스타일 통합)
- **VSelect**: 드롭다운 선택 컴포넌트 (커스텀 아이템 title/value 지원)
- **VTextField**: 텍스트 입력 필드 (clear 기능, append-inner 슬롯)
- **VCheckbox**: 체크박스 컴포넌트 (배열 v-model 지원, 다중 선택)
- **VAutocomplete**: 자동완성 컴포넌트 (커스텀 선택 슬롯, focus/blur 이벤트)
- **VDialog**: 모달 다이얼로그 컴포넌트
- **VueDatePicker**: 날짜 선택 컴포넌트
- **VTooltip**: 기본 툴팁 컴포넌트
- **VCardText**: 카드 텍스트 컴포넌트

### 레이아웃 및 폼 컴포넌트
- **Breadcrumb 시스템**: 브레드크럼 네비게이션
  - BreadcrumbElement, BreadcrumbText, BreadcrumbSelect
- **PageHeader 시스템**: 페이지 헤더 및 필터
  - PageHeaderFilter, PageBody
- **Dialog 시스템**: 다이얼로그 관련 컴포넌트
  - DialogHeader, DialogPanel
- **Form 시스템**: 폼 관련 컴포넌트
  - FormLabel, FormField

### 개발 및 문서화
- **설치 가이드**: 프로젝트 생성 및 기존 프로젝트 통합
- **스타일링 가이드**: 디자인 토큰 네이밍 규칙
- **테스트 설정**: 테스트 환경 구축 가이드

### 빌드 및 배포
- **빌드 시스템**: ESM 빌드 지원, rollup 설정
- **패키지 관리**: pnpm 지원, 의존성 최적화
- **배포 스크립트**: publish 스크립트

### Performance Optimizations
- **번들 최적화**: 불필요한 코드 제거
- **스타일 최적화**: TailwindCSS와 Vuetify 통합