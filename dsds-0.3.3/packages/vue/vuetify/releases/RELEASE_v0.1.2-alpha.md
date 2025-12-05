# DSDS Vue Vuetify v0.1.2-alpha (2025-09-22)

## 새로운 기능

### 새로운 컴포넌트
- **VTabs & VTab**: 키보드 네비게이션과 접근성을 갖춘 탭 컴포넌트
- **RichTextEditor**: 리치 텍스트 편집 컴포넌트

### VSelect 개선
- 다중 선택 배지(Multiple Selection Badge) 지원
- 불확정(Indeterminate) 상태 지원
- Ghost variant 스타일 옵션 추가

### VTooltip 개선
- 커스터마이징 가능한 콘텐츠
- 위치 자동 조정 기능 향상
- 부드러운 애니메이션 효과

## 주요 개선사항

- **DSDS 디자인 시스템** 통합: VRadioGroup, VSelect, VTextField 컴포넌트에 적용
- **문서화 강화**: 모든 컴포넌트의 상세 문서 및 예제 추가
- **Storybook 개선**: `@storybook/vue3-vite` 마이그레이션 완료

## 버그 수정

- 라디오 버튼 hover 색상 수정
- Header 버튼 스타일 개선
- Tooltip 위치 및 애니메이션 최적화
- TypeScript 타입 에러 해결

## 문서 및 개발자 경험

- **상세 문서화**: [CHANGELOG.md](./CHANGELOG.md) 및 [RELEASE_NOTES.md](./RELEASE_NOTES.md) 추가
- **개선된 README**: 최신 변경사항 및 사용법 가이드 포함
- **코드 정리**: 불필요한 파일 제거 및 import 최적화

---

**전체 변경사항**: [CHANGELOG.md](./CHANGELOG.md)
**상세 릴리즈 노트**: [RELEASE_NOTES.md](./RELEASE_NOTES.md)

**설치:**
```bash
npm install @dsds/vue-vuetify@0.1.2
```