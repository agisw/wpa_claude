# DSDS Vue Vuetify v0.3.2-beta (2025-11-25)

## 신규 기능

### RMS Recipe 비교 다이얼로그
- **EHWRmsCompareDialog** 스토리를 추가해 표준 설비/Manual Recipe를 동시에 비교하고 일치율, 모델 판정, Fail 사유까지 한 번에 검토할 수 있습니다.
- `ScrollableTable` 격자를 두 영역으로 나눠 Manual 검색 결과와 비교 대상 목록을 분리하고, Copy·추가·삭제를 버튼 액션으로 제공해 실제 RMS 운영 시나리오를 재현했습니다.
- `defineModel` 기반으로 표준/Manual API 파라미터, 비교 모드, 선택 상태를 양방향으로 노출해 부모 레이아웃이 다이얼로그 내부 상태를 제어할 수 있습니다.

### ECO Highway 결재 경로 추가 플로우
- **EHWApprPathAddDialog** 예제를 통해 개인/부서 템플릿을 검색하고, 선택 즉시 멤버 목록을 Lazy 로딩하는 결재 경로 작성 플로우를 체험할 수 있습니다.
- `VTabs`/`ScrollableTable` 조합으로 템플릿 탐색과 상세 멤버 뷰를 분할했으며, TASK_KIND 라벨을 다국어에 대응하도록 상수로 분리했습니다.
- Storybook Examples에 결재 경로 추가/확인 모달을 연결해 EHW Create 시나리오 전반이 하나의 흐름으로 이어집니다.

### LNB 스토리 팩
- LNB Storybook 문서를 전면 확장해 **Tree Only**, **Tree+Item 혼재**, **Selection Callback**, **Flat Menu**, **불릿 규칙**, **Header 제외 구성** 등 8가지 상태를 별도 스토리로 탐색할 수 있습니다.
- 각 스토리는 `../data/lnb` 샘플 세트로 분리돼 실제 프로젝트에서 동일 데이터를 불러 재사용할 수 있고, description/feature 블록이 한글·영문으로 제공돼 문서/디자인 리뷰가 쉬워졌습니다.
- `Searchbox`를 large 사이즈로 고정하고 `defaultSelectedItemId`, `defaultOpenPath`, `onSelectionChange` 콜백 패턴을 code snippet으로 공개해 Selection Callback/controlled 모드를 그대로 복사해 쓸 수 있습니다.
- Hidden prop, bullet 표시 규칙, header-less 구조 등 흔치 않은 UX 제약도 스토리에서 바로 비교할 수 있도록 예제가 구분돼 있습니다.

## 기능 개선

### Header & 레이아웃 시스템
- `dsds-header-wrapper`가 추가되어 로고·GNB·유틸리티·탭 모듈을 하나의 플렉스 컨테이너로 감싸고, 탭 모드 여부에 따라 서로 다른 row 레이아웃을 안정적으로 구성합니다.
- Header 하위 컴포넌트 import/props 매핑을 정리해 Storybook과 실제 앱에서 동일한 API를 사용할 수 있습니다.

### 스피너 · 로딩 경험
- Spinner 애니메이션 시간을 1.4s → 1.05s 수준으로 재조정하고 stroke-width를 줄여 고해상도 화면에서도 부드럽고 가벼운 로딩 피드백을 제공합니다.
- Loader/RealGrid CSS에서도 새로운 스피너 토큰을 참조해 일관된 회전 속도를 유지합니다.

### Toast & 유틸리티
- `vue-sonner` 기반 Toast에 `showToast` 헬퍼를 노출해 커스텀 바디, onClose 콜백, 지속 시간을 옵션으로 제어할 수 있습니다.
- Storybook Toast 문서를 업데이트해 알림 패턴과 샘플 코드를 바로 복사할 수 있도록 했습니다.

### EHW 예제 다듬기
- RMS API 파라미터를 `ref`/`reactive` 조합으로 재구성해 부모 컴포넌트가 watch를 통해 즉시 상태를 동기화할 수 있습니다.
- Dialog form filter 영역의 클래스 이름과 테이블 스타일을 통합해 ScrollableTable, Searchbox, FormField가 같은 패딩/보더 토큰을 사용합니다.

## 버그 수정
- `rounded-xs` 유틸리티를 `v-overlay__content`, `typo-tooltip-title` 등 Vuetify 기본 클래스와 분리해 예기치 않은 radius 누락을 방지했습니다.
- Spinner/Toast 스타일 조정 과정에서 누락됐던 CSS 변수를 복구하고, Storybook 빌드 시 경고를 발생시키던 오탈자를 정리했습니다.

---

**전체 변경사항**: [CHANGELOG.md](../CHANGELOG.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.3.2-beta
```