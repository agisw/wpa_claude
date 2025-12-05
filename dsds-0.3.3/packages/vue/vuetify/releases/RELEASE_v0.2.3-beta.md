# DSDS Vue Vuetify v0.2.3-beta (2025-10-23)

## 신규 기능

### 서브패스 배포 강화
- **`@dsds/vue-vuetify/icons`**: 아이콘 번들을 별도의 진입점으로 분리하고 타입 선언을 함께 배포해 트리 셰이킹이 용이해졌습니다.
- **`@dsds/vue-vuetify/faker`**: faker 유틸리티를 독립된 엔트리로 빌드하고 타입을 동봉하여 테스트 데이터를 필요한 곳에서만 가져올 수 있습니다.

### Footer 구성 유연화
- `items` 기반 API를 정비하여 텍스트, 링크, 버튼, 구분선, 사용자 정의 슬롯을 조합할 수 있게 했습니다.
- `align`(`left`/`center`/`right`)과 `fluid` 옵션을 추가해 Footer 정렬과 폭 제어가 쉬워졌습니다.

## 기능 개선

### 빌드 & 패키징
- Vite 라이브러리 빌드를 다중 엔트리(메인, 아이콘, faker)로 재구성하고 엔트리별 산출물 경로를 명시적으로 분리했습니다.
- `publicDir: false`와 `minify` 활성화로 배포 번들을 가볍게 유지합니다.
- Storybook/에디터에만 필요한 의존성을 `peerDependencies`로 이동해 소비자 설치 용량을 줄였습니다.

### 스타일 및 선언 정리
- Breadcrumb, Header, RichText 등 공통 스타일을 `src/styles/dsds/vuetify/` 아래 전용 CSS로 재구조화해 관리성을 높였습니다.
- Badge, Markdown, VRating, Splitter 등 주요 컴포넌트의 스타일과 마크업을 정리하여 일관된 톤을 제공합니다.
- faker 모듈이 네임스페이스 대신 직접 re-export 하도록 변경해 타입 추적을 단순화했습니다.

## 버그 수정
- `package.json`의 스타일 및 faker 타입 경로를 올바르게 가리키도록 수정했습니다.
- 라이브러리 빌드시 `public/` 폴더가 그대로 복사되던 문제를 차단했습니다.

---

**전체 변경사항**: [CHANGELOG.md](../CHANGELOG.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.2.3-beta
```