# DSDS Vue Vuetify v0.3.1-beta (2025-11-12)

## 신규 기능

### EES Alarm Summary 워크플로 샘플
- **EESAlarmSummaryPage**: Splitter 기반 2단 레이아웃, RealGrid 고정 컬럼, Chart 패널을 포함한 알람 요약 페이지 예제를 추가했습니다.
- **Side Filter & 히스토리**: 다중 그리드 검색, 탭형 필터, 검색 히스토리 저장/불러오기, Loader 기반 로딩 상태를 갖춘 사이드 필터를 제공합니다.
- **Fake 데이터 유틸**: `fake-data.ts`에서 알람 히스토리/필터 데이터를 생성해 실사용 시나리오를 재현합니다.

### ToggleButton 컴포넌트
- 체크박스를 아이콘으로 사용하는 토글 버튼을 추가했습니다.
- `v-model`을 지원하며 기본 버튼 크기(`small`/`medium`/`large`)와 동일한 인터페이스를 제공합니다.

### ECO Highway Create View 예제
- 복잡한 ECO 생성 플로우를 재현한 `EHWCreateLayout`을 추가해 PEMS/ESPEC 작성, 멀티 Step 선택, 결재 경로 관리, 실시간 Grid 연동 등을 확인할 수 있습니다.

### 새 유틸리티 엔트리
- `@dsds/vue-vuetify/utils` 하위 경로를 공개해 `cn`, `hasSlotContent`, `formatDate`, `dedent` 등 공용 헬퍼를 재사용할 수 있습니다.

## 기능 개선

### Loader & Spinner
- Loader가 `v-model`을 지원하며 지연 표시(`delay`), 배경 스크림, 컨테이너 모드, 스피너 크기 옵션을 제공합니다.
- Spinner 애니메이션 토큰을 재정렬해 각 사이즈별 애니메이션이 자연스럽게 동작합니다.

### Splitter & 레이아웃 이벤트
- Splitter에 `layoutDebounce` 옵션을 추가해 드래그 중 과도한 `layout` 이벤트를 방지하고, 언마운트 시 타이머를 정리합니다.
- Splitter 활용 예제(EES Alarm Summary)가 사이즈 변화를 감지해 차트/그리드 레이아웃을 안정적으로 유지합니다.

### RealGrid & Storybook 예제 강화
- RealGrid/FakeRealGrid가 `displayOptions`와 고정 컬럼 설정을 지원하며, selection 해제 시 상태를 초기화하도록 개선했습니다.
- ScrollArea, Toast, VDialog, Pagination 등 주요 스토리에서 코드 샘플과 템플릿을 정리해 Storybook에서 바로 복사해 사용할 수 있습니다.
- EHW/EES 예제 전반에 Loader, ToggleButton, Splitter를 통합해 비동기 흐름과 동적 레이아웃 시나리오를 보여줍니다.

## 버그 수정
- VAutocomplete/VSelect 다중 선택 항목에서 체크박스 클릭이 먹히지 않던 문제를 해결했습니다.
- DatePicker 범위 선택 시 hover 배경이 셀 내부에 적용되도록 CSS를 보완했습니다.
- 아이콘 토큰 변수를 재정렬해 커스텀 아이콘 hover 색상이 올바르게 적용됩니다.
- RealGrid 검색 리스트에서 선택을 지우면 뷰 상태가 초기화되도록 보강했습니다.

---

**전체 변경사항**: [CHANGELOG.md](../CHANGELOG.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.3.1-beta
```
