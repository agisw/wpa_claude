# DSDS Vue Vuetify v0.3.3-beta (2025-12-01)

## 중요 공지

- **Dialog → Modal 용어 전환**: DS 디자인 시스템 용어와 맞추기 위해 `VDialog`, `DialogHeader`, `DialogPanel` 대신 `Modal`, `ModalHeader`, `ModalPanel` 컴포넌트를 새로 도입했습니다. 기존 API는 그대로 유지하되 코드와 Storybook 예제는 모두 Modal 패밀리를 기준으로 갱신했습니다.
- **Deprecated 상태 안내**: `VDialog`, `DialogHeader`, `DialogPanel`은 지금도 가져올 수 있지만 `@deprecated` 주석이 붙었습니다. 신규 구현과 마이그레이션 작업에서는 Modal 패턴을 사용해 주세요.

## 신규 기능

### ECM · RMS 비교 플로우 확장
- **ECM Fail Case Modal**을 추가하고 `EHWEcmCompareModal` 내부에서 바로 열 수 있게 했습니다. RMS 스토리에는 `EHWRmsFailCaseModal`을 독립 노출하는 스토리를 추가해 판정 기준 테이블을 단독으로 참조할 수 있습니다.
- `stdEqpInfo`/`stdEqpInfoInline` 상태를 `ref`로 전환해 ECM/RMS 모달이 닫힐 때 선택 장비 정보가 즉시 상위 폼과 동기화됩니다.

### PEMS/Notice 샘플 업그레이드
- Notice/권한 관리/Lot Arrange/등록 플로우를 모두 Modal 컴포넌트 기반으로 재구성하고 `ModalPanel` 슬롯 조합을 보여주는 샘플 코드를 Storybook source 탭에서 그대로 복사할 수 있게 했습니다.
- `SearchModifyTcpHeaderFilterBody`를 별도 컴포넌트로 분리해 SearchModify TCP 스토리에서도 헤더 필터 레이아웃을 재사용할 수 있습니다.

### Breadcrumb 타입 공개
- `BreadcrumbItem` 타입을 컴포넌트에서 직접 export 해 Page/PageHeader 스토리, CleanLot 대시보드 등에서 동일한 타입 정의로 안전하게 아이템을 구성할 수 있습니다.

## 기능 개선

- **VBtn 로딩 경험**: `loading` 상태에서 SpinnerIcon을 자동으로 렌더링하고 스피너 stroke-width/색상을 변형별 토큰과 맞췄습니다.
- **VCheckbox 접근성**: 히든 native input의 `change` 이벤트를 다시 발생시켜 Form 라이브러리와 즉시 연동되고, disabled 상태는 중립 계열 배경을 사용해 시각 대비를 높였습니다.
- **ScrollableTable & dsds-table**: grid 테이블이 상단·우측 보더를 중복해서 긋지 않도록 하고 row 높이를 `auto` 기반으로 계산해 다단 텍스트나 폼 컨트롤이 잘리지 않습니다.
- **LNB 접힘 UX** *(요청)*: 접힘 트랙을 1px 영역으로 단순화하고 배경 div를 제거해 Page 본문과 정확히 맞물리도록 했습니다. BasicLayout 스토리는 selection/change 이벤트를 활용해 PageTabs와 LNB 상태가 동시에 전환되는 과정을 보여줍니다.
- **Page & Layout 문서**: `PageHeaderDivider` 컴포넌트를 제거하고 `v-divider` 사용을 권장하도록 LayoutOverview/Page/PageHeader 문서를 전면 수정했습니다. 문서 곳곳에서 `PageHeader`의 `#tools`/`#filter` 슬롯 사용 규칙을 명시했습니다.
- **Header & Footer 스타일**: 1920px 이상에서도 wrapper 폭이 깨지지 않도록 `--breakpoint-4xl` 토큰과 wrapper padding 로직을 정리했습니다.
- **RMS/GPM 모달**: 테이블 헤더 정렬, 명령 컬럼 truncate, 로그 메시지 문구 등을 손봐 긴 텍스트가 겹치지 않습니다.

## 버그 수정

- 테이블 행 높이를 자동 계산하도록 수정해 Grid/페이지 조합에서 줄바꿈이 잘리지 않습니다.
- Button 클릭 이벤트에서 `preventDefault`를 제거해 Storybook 샘플에서도 기본 submit 흐름을 재현할 수 있습니다.
- Storybook 관련 devDependencies를 최신(10.0.8 계열)로 갱신해 Modal 리팩터링 이후에도 빌드 경고가 발생하지 않습니다.
