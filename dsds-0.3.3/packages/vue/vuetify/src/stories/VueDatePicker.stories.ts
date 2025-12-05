import { formatRangeValue, mapUnitToString, VueDatePicker } from "@/components/ui"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref, watch, computed } from "vue"
import { booleanControl, textControl } from "./utils"

type StoryArgs = {
  placeholder?: string
  clearable?: boolean
  range?: boolean
  modelType?: "default" | "yyyy-MM-dd" | "iso" | "timestamp"
  enableTimePicker?: boolean
}

const meta: Meta<StoryArgs> = {
  title: "Components/VueDatePicker",
  component: VueDatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component:
          "DSDS Vue DatePicker는 `@vuepic/vue-datepicker`를 감싼 컴포넌트입니다. 공식 예제의 API를 그대로 사용하면서 DS 디자인 토큰과 아이콘을 적용해 동일한 경험을 제공합니다.",
      },
    },
  },
  argTypes: {
    placeholder: textControl(),
    clearable: booleanControl,
    range: booleanControl,
    enableTimePicker: booleanControl,
  },
}

export default meta

type Story = StoryObj<typeof meta>

const baseSingle = new Date()
const baseRangeStart = new Date("2025-01-10T00:00:00")
const baseRangeEnd = new Date("2025-01-17T00:00:00")

const createStoriesRender = () => {
  return (args: StoryArgs) => ({
    components: { VueDatePicker },
    setup() {
      const value = ref<Date | Date[] | string | string[] | number | number[] | null>(
        args.range ? [new Date(baseRangeStart), new Date(baseRangeEnd)] : new Date(baseSingle)
      )

      watch(
        () => args.range,
        (isRange) => {
          if (isRange) {
            value.value = [new Date(baseRangeStart), new Date(baseRangeEnd)]
          } else {
            value.value = new Date(baseSingle)
          }
        }
      )

      const formatForPicker = computed(() =>
        args.range
          ? (dates: string[] | Date[]) => formatRangeValue(dates, args.enableTimePicker)
          : (value: unknown) => mapUnitToString(value, args.enableTimePicker)
      )

      return {
        args,
        value,
        formatForPicker,
      }
    },
    template: `
      <div :class="['flex flex-col gap-4', {
          'w-[320px]': args.range && args.enableTimePicker,
          'w-[240px]': args.range && !args.enableTimePicker,
          'w-[170px]': !args.range && args.enableTimePicker,
          'w-[130px]': !args.range && !args.enableTimePicker,
        }]">
        <VueDatePicker v-model="value"
                       :placeholder="args.placeholder"
                       :size="args.size"
                       :clearable="args.clearable"
                       :range="args.range"
                       :enable-time-picker="args.enableTimePicker"
                       />
        <p class="typo-sok-body-14-400 text-neutral-1st">
          값: {{ formatForPicker(value) }}
        </p>
      </div>
    `,
  })
}

const renderStory = createStoriesRender()

export const Default: Story = {
  name: "기본 사용법",
  args: {
    placeholder: "날짜를 선택하세요",
    clearable: true,
    range: false,
    enableTimePicker: false,
    modelType: "yyyy-MM-dd",
  },
  render: renderStory,
}

export const RangeSelection: Story = {
  name: "기간 선택",
  args: {
    ...Default.args,
    placeholder: "기간을 선택하세요",
    range: true,
  },
  render: renderStory,
  parameters: {
    docs: {
      description: {
        story:
          "공식 문서의 Range Picker 예제를 변형한 스토리입니다. `range`를 활성화하고 DSDS 규격의 포맷 함수를 적용해 시작일과 종료일을 표시합니다.",
      },
    },
  },
}
