# React (shadcn/ui) → DSDS 컴포넌트 변환

기존 React 프로젝트의 shadcn/ui 컴포넌트를 DSDS 컴포넌트로 변환합니다.

## 대상 프로젝트
$ARGUMENTS

---

## 변환 작업 순서

### Phase 1: 환경 설정

#### 1-1. DSDS 패키지 설치
```bash
cd {프로젝트경로}
npm install @dsds/react-radix-ui@latest
```

#### 1-2. DSDS CSS 토큰 복사
`dsds-0.3.3/design/generated/css/` 파일들을 프로젝트에 복사:
- `index.css` → `src/styles/dsds/index.css`
- `light.css` → `src/styles/dsds/light.css`
- `global.css` → `src/styles/dsds/global.css`
- `typo.css` → `src/styles/dsds/typo.css`

#### 1-3. src/index.css 수정
```css
@import "tailwindcss";

/* DSDS 토큰 import */
@import "./styles/dsds/index.css";

@theme inline {
  /* 기존 @theme 내용 유지 또는 DSDS 토큰으로 교체 */
}
```

---

### Phase 2: 컴포넌트 변환

각 컴포넌트를 아래 매핑에 따라 변환합니다.

#### 2-1. Import 변경
```typescript
// Before (shadcn/ui)
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'

// After (DSDS)
import { Button, Textbox } from '@dsds/react-radix-ui'
// 또는 로컬 DSDS 컴포넌트 사용 시
import { Button } from './components/ui/Button'
```

#### 2-2. Variant 매핑

**Button:**
| shadcn/ui | DSDS |
|-----------|------|
| `variant="default"` | `variant="primary"` |
| `variant="destructive"` | `variant="danger"` |
| `variant="outline"` | `variant="secondary"` |
| `variant="secondary"` | `variant="secondary"` |
| `variant="ghost"` | `variant="ghost"` |
| `variant="link"` | `variant="ghostLink"` |

**Size:**
| shadcn/ui | DSDS |
|-----------|------|
| `size="sm"` | `size="small"` |
| `size="default"` | `size="medium"` |
| `size="lg"` | `size="large"` |

#### 2-3. 컴포넌트별 변환

**Input → Textbox:**
```typescript
// Before
<Input placeholder="입력..." value={value} onChange={onChange} />

// After
<Textbox
  placeholder="입력..."
  value={value}
  onChange={onChange}
  clearable  // 선택: 클리어 버튼 추가
/>
```

**Switch → Toggle:**
```typescript
// Before
<Switch checked={checked} onCheckedChange={setChecked} />

// After
<Toggle checked={checked} onCheckedChange={setChecked} size="medium" />
```

**Pagination (완전 재구현):**
```typescript
// Before (shadcn/ui)
<Pagination>
  <PaginationContent>
    <PaginationPrevious href="#" />
    <PaginationLink href="#" isActive>1</PaginationLink>
    <PaginationNext href="#" />
  </PaginationContent>
</Pagination>

// After (DSDS)
<Pagination>
  <PaginationContent isDot={false}>
    <PaginationNumber chevron="first" />
    <PaginationNumber chevron="left" />
    <PaginationNumber page={1} isSelected />
    <PaginationNumber page={2} />
    <PaginationNumber chevron="right" />
    <PaginationNumber chevron="last" />
  </PaginationContent>
</Pagination>
```

---

### Phase 3: 스타일 변환

#### 3-1. CSS 토큰 교체

```typescript
// Before (shadcn/ui 토큰)
className="bg-primary text-primary-foreground"

// After (DSDS 토큰)
className="bg-button-primary-bg text-button-primary-text"
```

**주요 토큰 매핑:**
| shadcn/ui | DSDS |
|-----------|------|
| `bg-primary` | `bg-button-primary-bg` |
| `text-primary-foreground` | `text-button-primary-text` |
| `bg-destructive` | `bg-button-danger-bg` |
| `bg-secondary` | `bg-button-2nd-bg` |
| `bg-muted` | `bg-[var(--color-bg-surface-secondary)]` |
| `border-input` | `border-[var(--color-border-border-2-outer)]` |

#### 3-2. 상태 클래스 변환

```typescript
// Before
className="disabled:opacity-50 hover:bg-primary/90"

// After
className={cn(
  "bg-button-primary-bg",
  !disabled && "hover:bg-button-primary-bg-hover",
  disabled && "bg-button-primary-bg-disabled cursor-not-allowed"
)}
```

---

### Phase 4: 아이콘 변환

#### 4-1. Import 변경
```typescript
// Before (lucide-react)
import { ChevronLeft, ChevronRight, X, Check, Search } from 'lucide-react'

// After (DSDS icons)
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CheckIcon,
  MagnifyIcon
} from '@dsds/react-radix-ui'
```

#### 4-2. 아이콘 매핑
| lucide-react | DSDS |
|--------------|------|
| `ChevronLeft` | `ChevronLeftIcon` |
| `ChevronRight` | `ChevronRightIcon` |
| `ChevronsLeft` | `ChevronsLeftIcon` |
| `ChevronsRight` | `ChevronsRightIcon` |
| `X` | `CloseIcon` |
| `Check` | `CheckIcon` |
| `Search` | `MagnifyIcon` |
| `Calendar` | `CalendarIcon` |
| `Info` | `InformationIcon` |

---

## 변환 체크리스트

### 필수 작업
- [ ] DSDS CSS 토큰 설정
- [ ] Button variant/size 변환
- [ ] Input → Textbox 변환
- [ ] Switch → Toggle 변환
- [ ] 아이콘 교체 (lucide-react → DSDS icons)
- [ ] CSS 토큰 교체 (shadcn → DSDS)

### 선택 작업 (해당 컴포넌트 사용 시)
- [ ] Pagination 재구현
- [ ] Calendar → Calbox 변환
- [ ] RadioGroup → Radio 변환
- [ ] Checkbox 스타일 변환
- [ ] Tabs variant 추가
- [ ] Dialog/Modal 스타일 변환
- [ ] Tooltip place prop 적용

---

## 주의사항

1. **원본 백업**: 변환 전 git commit 또는 백업 생성
2. **점진적 변환**: 한 번에 모든 컴포넌트를 변환하지 말고 단계별로 진행
3. **빌드 확인**: 각 단계 후 `npm run build` 실행하여 오류 확인
4. **시각적 검토**: 변환 후 UI가 의도대로 표시되는지 확인

---