# DSDS - Vue / Vuetify

DS 디자인 시스템 가이드에 맞춰 커스터마이징한 Vuetify 컴포넌트 라이브러리입니다.
Vuetify 와 API 레벨 호환성을 제공하여 기존 Vue 사용자의 빠른 마이그레이션을 돕습니다.

- **문서**: [Storybook](https://dsds.mwebdev.samsungds.net/storybooks/vue-vuetify) · **변경사항**: [CHANGELOG](./CHANGELOG.md)


## 주요 특징

- DSDS 디자인 시스템 완전 통합
- 접근성 우선 설계 (ARIA, 키보드 네비게이션)
- 다크/라이트 테마 완전 지원
- 반응형 디자인 기본 제공
- 완전한 TypeScript 지원
- 모듈식 컴포넌트 구조

## 시스템 요구 사항

- Vue 3.5 이상
- Vuetify 3.9 이상
- TypeScript 5.8 이상

## 빠른 시작

### 설치

```bash
npm install @dsds/vue-vuetify
```

### 기본 사용법

```typescript
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createDSDSVuetify } from '@dsds/vue-vuetify'

const app = createApp(App)
const vuetify = createVuetify()
const dsdsVuetify = createDSDSVuetify()

app.use(vuetify)
app.use(dsdsVuetify)
```

## 포함된 컴포넌트 (v0.3.3-beta)

| 컴포넌트                 | 설명                                          | 상태  |
| ------------------------ | --------------------------------------------- | ----- |
| **VBtn**                 | 버튼 컴포넌트                                 | ✅     |
| **VSelect**              | 선택 드롭다운 (다중 선택, Ghost variant 지원) | ✅     |
| **VTextField**           | 텍스트 입력 필드                              | ✅     |
| **VCheckbox**            | 체크박스                                      | ✅     |
| **VAutocomplete**        | 자동완성 입력                                 | ✅     |
| **Modal**                | Modal/ModalHeader/ModalPanel 컴포넌트          | ✅     |
| **VueDatePicker**        | 날짜 선택기                                   | ✅     |
| **VTooltip**             | 툴팁                                          | ✅     |
| **VCardText**            | 카드 텍스트                                   | ✅     |
| **VTabs & VTab**         | 탭 네비게이션                                 | ✅     |
| **VRadioGroup & VRadio** | 라디오 버튼 그룹                              | ✅     |
| **RichTextEditor**       | 리치 텍스트 에디터                            | ✅     |
| **ScrollableTable**      | 헤더 고정 지원 스크롤 테이블 컨테이너         | ✅     |
| **Toast**                | 토스트 알림                                   | ✅     |
| **CollapseToggleButton** | 접기/펼치기 버튼                              | ✅     |
| **Breadcrumb**           | 브레드크럼 네비게이션                         | ✅     |
| **Header**               | 헤더 시스템 (13개 하위 컴포넌트)              | ✅     |
| **PageHeader**           | 페이지 헤더 시스템                            | ✅     |
| **PageTabs**             | 다중 탭 워크플로 제어                         | ✅     |
| **Splitter**             | 윈도우 분할 및 리사이징                       | ⭐베타 |
| **Page**                 | 페이지 컨테이너 및 본문 프레임                | ⭐신규 |
| **PageFilter**           | 페이지 필터/툴 그룹 모듈                       | ⭐신규 |
| **VSwitch**              | 토글 스위치 입력                              | ⭐베타 |
| **VRating**              | 별점 평가 입력                                | ⭐베타 |
| **Toggle**               | 토글 버튼                                     | ⭐베타 |
| **ToggleButton**         | 체크박스 아이콘 기반 토글 버튼                | ⭐신규 |
| **Form**                 | 폼 관련 컴포넌트                              | ✅     |
| **FormTools**            | 폼 액션 정렬을 위한 툴 그룹                   | ⭐신규 |
| **Dialog (legacy)**      | Modal 이전 세대 Dialog 컴포넌트 (Deprecated)  | ✅     |
| **DropdownMenu**         | 액션 및 헤더 메뉴용 드롭다운                  | ⭐신규 |
| **Popover**              | 컨텍스트 정보를 제공하는 팝오버               | ⭐신규 |
| **Toggletip**            | 토글 가능한 툴팁                              | ⭐신규 |
| **Searchbox**            | 헤더/LNB 검색 입력                            | ⭐신규 |
| **Footer**               | 푸터 및 하위 컴포넌트 세트                    | ⭐신규 |
| **LNB**                  | 좌측 내비게이션 (아코디언/트리)               | ⭐신규 |
| **PageBodyTools**        | 페이지 본문 상단 툴바                         | ⭐신규 |
| **Tag**                  | 상태/필터 태그                                | ✅     |
| **Markdown**             | Markdown 렌더링(코드 하이라이트 포함)         | ⭐신규 |
| **CodeBlock**            | Shiki 기반 코드 하이라이트  컴포넌트          | ⭐신규 |
| **Loader**               | 풀스크린 로딩 오버레이                        | ✅     |

## 🔧 기술 스택

- **Vue**: 3.5+
- **Vuetify**: 3.9+
- **TypeScript**: 5.8+
- **TailwindCSS**: v4 (디자인 토큰)

## 📖 문서

- [Storybook](./stories/) - 인터랙티브 컴포넌트 문서
- [CHANGELOG](./CHANGELOG.md) - 버전별 변경사항
- [릴리즈 파일](./releases/) - GitHub Releases용 릴리즈 노트

## 📢 최신 업데이트

**v0.3.3-beta** - Dialog 라인업을 DSDS 용어에 맞춰 Modal 패밀리로 전환하고 ECM/RMS/PEMS 워크플로 모달을 재구성했습니다. 요청받은 LNB 접힘 트랙 개선과 함께 VBtn 로딩 스피너, VCheckbox change 이벤트, ScrollableTable 행 높이 등도 손봤습니다.
[전체 변경사항 보기 →](./CHANGELOG.md)

## 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. 이슈 등록 또는 기존 이슈 확인
2. 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 참고 링크

- [DSDS 디자인 시스템](https://dsds.mwebdev.samsungds.net)
- [Vuetify 공식 문서](https://vuetifyjs.com/)
- [Styling Vuetify with TailwindCSS](https://medium.com/@mattlcoleman88/styling-our-vuetify-component-with-tailwindcss-4be0a55021aa)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

**@dsds/vue-vuetify**는 Samsung DS 디자인 시스템의 일부입니다.