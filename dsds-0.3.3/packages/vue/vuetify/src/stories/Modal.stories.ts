import { ModalHeader, VBtn, VCard, VCardActions, VCardText, VCardTitle, Modal, VSpacer } from "@/components/ui"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"

const components = {
  Modal,
  VBtn,
  ModalHeader,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VSpacer,
}

// Default
const TPL_DEFAULT = `
<div class="flex flex-col items-center gap-3">
  <VBtn @click="open = true">Open Modal</VBtn>

  <Modal v-bind="args" v-model="open">
    <v-card>
      <v-card-title>
        <ModalHeader :title="args.title" v-model="open"/>
      </v-card-title>
      <v-card-text>DSDS 스타일이 적용된 다이얼로그입니다.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <VBtn variant="tonal" @click="open = false">닫기</VBtn>
      </v-card-actions>
    </v-card>
  </Modal>
</div>
`.trim()

// Sizes
const TPL_SIZES = `
<div class="flex flex-col gap-2">
  <div class="flex gap-2">
    <VBtn size="small" @click="openXS = true">Open XS</VBtn>
    <VBtn size="small" @click="openS = true">Open Small</VBtn>
    <VBtn size="small" @click="openM = true">Open Medium</VBtn>
    <VBtn size="small" @click="openL = true">Open Large</VBtn>
    <VBtn size="small" @click="openX = true">Open XL</VBtn>
  </div>

  <Modal v-bind="args" v-model="openXS" size="xs">
    <v-card>
      <v-card-title><ModalHeader v-model="openXS">XS</ModalHeader></v-card-title>
      <v-card-text>콘텐츠 폭이 아주 좁은 다이얼로그</v-card-text>
      <v-card-actions><v-spacer /><VBtn @click="openXS=false">닫기</VBtn></v-card-actions>
    </v-card>
  </Modal>

  <Modal v-bind="args" v-model="openS" size="small">
    <v-card>
      <v-card-title><ModalHeader v-model="openS">Small</ModalHeader></v-card-title>
      <v-card-text>콘텐츠 폭이 좁은 다이얼로그</v-card-text>
      <v-card-actions><v-spacer /><VBtn @click="openS=false">닫기</VBtn></v-card-actions>
    </v-card>
  </Modal>

  <Modal v-bind="args" v-model="openM" size="medium">
    <v-card>
      <v-card-title><ModalHeader v-model="openM">Medium</ModalHeader></v-card-title>
      <v-card-text>기본 사이즈</v-card-text>
      <v-card-actions><v-spacer /><VBtn @click="openM=false">닫기</VBtn></v-card-actions>
    </v-card>
  </Modal>

  <Modal v-bind="args" v-model="openL" size="large">
    <v-card>
      <v-card-title><ModalHeader v-model="openL">Large</ModalHeader></v-card-title>
      <v-card-text>넓은 콘텐츠 영역</v-card-text>
      <v-card-actions><v-spacer /><VBtn @click="openL=false">닫기</VBtn></v-card-actions>
    </v-card>
  </Modal>

  <Modal v-bind="args" v-model="openX" size="xl">
    <v-card>
      <v-card-title><ModalHeader v-model="openX">XL</ModalHeader></v-card-title>
      <v-card-text>가장 넓은 콘텐츠 영역</v-card-text>
      <v-card-actions><v-spacer /><VBtn @click="openX=false">닫기</VBtn></v-card-actions>
    </v-card>
  </Modal>
</div>
`.trim()

// Modal variant
const TPL_MODAL = `
<div class="flex flex-col items-center gap-3">
  <VBtn @click="open = true">Open Modal</VBtn>

  <Modal v-bind="args" v-model="open">
    <v-card>
      <v-card-title>Modal Variant</v-card-title>
      <v-card-text>더 강조된 스크림이 적용됩니다.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <VBtn variant="tonal" @click="open = false">닫기</VBtn>
      </v-card-actions>
    </v-card>
  </Modal>
</div>
`.trim()

// Fullscreen
const TPL_FULLSCREEN = `
<div class="flex flex-col items-center gap-3">
  <VBtn @click="open = true">Open Fullscreen</VBtn>

  <Modal v-bind="args" v-model="open">
    <v-card class="h-full">
      <v-toolbar density="comfortable">
        <v-toolbar-title>전체화면 다이얼로그</v-toolbar-title>
        <v-spacer />
        <VBtn icon @click="open=false"><v-icon>mdi-close</v-icon></VBtn>
      </v-toolbar>
      <v-card-text>
        전체 화면을 사용하는 대화상자입니다.
      </v-card-text>
    </v-card>
  </Modal>
</div>
`.trim()

// Persistent + custom scrim
const TPL_PERSISTENT_SCRIM = `
<div class="flex flex-col items-center gap-3">
  <VBtn @click="open = true">Open Persistent</VBtn>

  <Modal v-bind="args" v-model="open" persistent>
    <v-card>
      <v-card-title>Persistent Modal</v-card-title>
      <v-card-text>바깥 영역 클릭으로 닫히지 않습니다.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <VBtn @click="open=false">확인</VBtn>
      </v-card-actions>
    </v-card>
  </Modal>
</div>
`.trim()

// With card layout
const TPL_WITH_CARD = `
<div class="flex flex-col items-center gap-3">
  <VBtn @click="open = true">Open Modal</VBtn>

  <Modal v-bind="args" v-model="open">
    <v-card>
      <v-card-title>회원 정보 수정</v-card-title>
      <v-card-text>폼 요소/컨트롤을 배치하고, 액션에서 저장/취소를 제공합니다.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <VBtn variant="text" @click="open=false">취소</VBtn>
        <VBtn color="primary" @click="open=false">저장</VBtn>
      </v-card-actions>
    </v-card>
  </Modal>
</div>
`.trim()

/* ---------------------------
            Meta
--------------------------- */

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS Modal 컴포넌트는 모달, 다이얼로그, 전체 화면 등 다양한 **오버레이 패턴**을 통일된 디자인 언어로 제공합니다. Vue 3의 컴포지션 API와 Vuetify
오버레이 레이어를 감싸 재사용 가능한 API와 접근성 패턴을 한 번에 제공합니다.

### 주요 기능 <features />
- 세 가지 변형: 기본(default), 모달(modal), 전체 화면(fullscreen)
- XS ~ XL 사이즈 프리셋과 커스텀 콘텐츠 클래스로 다양한 레이아웃 대응
- 헤더/본문/액션을 위한 슬롯과 DSDS 전용 컴포넌트 (\`ModalHeader\`, \`VCard\` 등) 조합
- \`persistent\`, \`overlayColor\`, \`overlayOpacity\`로 스크림 제어
- \`v-model\` 기반으로 열림/닫힘 상태 제어 및 외부 상태와 동기화

### 사용 시나리오 <usages />
- 확인/취소가 필요한 폼이나 설정 다이얼로그
- 중요한 메시지를 강조하는 모달 알림
- 대시보드 상세 정보를 전체 화면에서 보여주는 Fullscreen 패턴

### 접근성 <accessibility />
- 역할/레이블이 포함된 구조로 스크린리더 호환
- 포커스 트랩과 ESC 종료 등 키보드 내비게이션 기본 제공
- 오버레이 대비와 모션 가이드라인을 준수한 시각적 피드백
        `.trim(),
      },
    },
  },
  argTypes: {
    // @ts-ignore
    title: { control: "text", description: "다이얼로그 헤더 타이틀" },
    modelValue: { control: "boolean", description: "다이얼로그 열림 상태 (v-model)" },
    variant: { control: "select", options: ["default", "modal", "fullscreen"], description: "다이얼로그 변형" },
    size: { control: "select", options: ["small", "medium", "large", "xl"], description: "콘텐츠 사이즈" },
    overlayColor: { control: "color", description: "오버레이(스크림) 색상" },
    overlayOpacity: { control: "number", description: "오버레이 불투명도" },
    customContentClass: { control: "text", description: "v-overlay__content 추가 클래스" },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  modelValue: false,
  variant: "default",
  size: "medium",
  overlayColor: "rgba(0, 0, 0, 0.5)",
  overlayOpacity: 1,
  // @ts-ignore
  title: "다이얼로그 제목",
}

/* ---------------------------
           Stories
--------------------------- */

export const Default: Story = {
  name: "기본",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      source: {
        type: "code",
        language: "html",
        code: TPL_DEFAULT,
      },
      description: { story: "VBtn 클릭으로 열리는 기본 다이얼로그 예시입니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: TPL_DEFAULT,
  }),
}

export const NoTitle: Story = {
  name: "제목 없음",
  // @ts-ignore
  args: { ...defaultArgs, title: "" },
  parameters: {
    docs: {
      source: {
        type: "code",
        language: "html",
        code: TPL_DEFAULT,
      },
      description: { story: "제목 없는 다이얼로그 예시입니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: TPL_DEFAULT,
  }),
}

export const Sizes: Story = {
  name: "크기 변형",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      source: {
        type: "code",
        language: "html",
        code: TPL_SIZES,
      },
      description: { story: "small/medium/large/xl 사이즈별 VModal를 각각 VBtn으로 오픈합니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const openXS = ref(false)
      const openS = ref(false)
      const openM = ref(false)
      const openL = ref(false)
      const openX = ref(false)
      return { args, openXS, openS, openM, openL, openX }
    },
    template: TPL_SIZES,
  }),
}

export const ModalVariant: Story = {
  args: { ...defaultArgs, variant: "modal" },
  parameters: {
    docs: {
      source: { code: TPL_MODAL },
      description: { story: "modal 변형: 더 진한 스크림(언더레이)이 적용됩니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: TPL_MODAL,
  }),
}

export const Fullscreen: Story = {
  name: "전체화면",
  args: { ...defaultArgs, variant: "fullscreen" },
  parameters: {
    docs: {
      source: { code: TPL_FULLSCREEN },
      description: { story: "전체화면 변형: 툴바와 함께 사용하는 패턴 예시입니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: TPL_FULLSCREEN,
  }),
}

export const PersistentAndScrim: Story = {
  name: "화면 고정 + 스크림",
  args: { ...defaultArgs, variant: "modal", overlayColor: "rgba(2, 6, 23, 0.7)", overlayOpacity: 1 },
  parameters: {
    docs: {
      source: { code: TPL_PERSISTENT_SCRIM },
      description: { story: "persistent + 커스텀 스크림 색상/투명도 예시입니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: TPL_PERSISTENT_SCRIM,
  }),
}

export const WithCardLayout: Story = {
  name: "카드 레이아웃",
  args: { ...defaultArgs, size: "large" },
  parameters: {
    docs: {
      source: { code: TPL_WITH_CARD },
      description: { story: "v-card 타이틀/본문/액션 레이아웃 패턴 예시입니다." },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: TPL_WITH_CARD,
  }),
}
