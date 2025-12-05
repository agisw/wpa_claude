<template>
  <VueDatePickerPrimitive v-bind="$attrs"
                          locale="ko"
                          ref="datepicker"
                          v-model="modelValue"
                          time-picker-inline
                          auto-apply
                          :class="['dsds-datepicker', `dsds-datepicker-${props.size}`, modelValue ? 'has-value-padding' : 'empty-value-padding']"
                          :offset="4"
                          :week-start="0"
                          :teleport="true"
                          :arrow="false"
                          :format="formatForPicker"
                          :text-input="textInputOptions"
                          :range="range"
                          :multi-calendars="props.range ? { 'solo': true } : false"
                          :placeholder="placeholder"
                          :model-type="modelType"
                          :hide-navigation="hiddenNavigation"
                          :previewFormat="previewFormat"
                          :clearable="clearable"
                          :position="position"
                          :transitions="{
                            menuAppearTop: 'scale-transition',
                            menuAppearBottom: 'scale-transition',
                          }"
                          :enable-time-picker="props.enableTimePicker"
                          @cleared="handleCleared"
                          >

    <template #dp-input="{ onTab, onEnter, closeMenu }">
      <input type="text"
             class="dp__input"
             ref="inputRef"
             @focus="updateInputValue()"
             @blur="updateInputValue()"
             @keydown="datepicker?.openMenu()"
             @keydown.tab="datepicker?.selectDate()"
             @keydown.enter="datepicker?.selectDate()"
             @input="handleInput" />
      <CalendarIcon class="dp__input_icon"
                    @click="handleOpenMenu" />
    </template>

    <template #clear-icon="{ clear }"
              v-if="clearable">
      <div class="icon-wrapper clear-wrapper"
           @click="clear">
        <svg width="14"
             height="14"
             viewBox="0 0 14 14"
             fill="none">
          <path d="M3.5 3.5L10.5 10.5"
                stroke="#565E66"
                stroke-width="1.2" />
          <path d="M10.5 3.5L3.5 10.5"
                stroke="#565E66"
                stroke-width="1.2" />
        </svg>
      </div>
    </template>
    <template #day="{ day, date }">
      <div class="dp__cell_content">
        {{ day }}
      </div>
    </template>
  </VueDatePickerPrimitive>
</template>

<script lang="ts">
const pad = (value: number) => value.toString().padStart(2, "0")

export const toDateOnly = (date: Date) => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  return `${year}-${month}-${day}`
}

export const toDateTime = (date: Date) => {
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${toDateOnly(date)} ${hours}:${minutes}`
}

export const mapUnitToString = (value: unknown, includeTime?: boolean): string => {
  if (value == null) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : includeTime ? toDateTime(date) : toDateOnly(date)
  }
  if (value instanceof Date) return includeTime ? toDateTime(value) : toDateOnly(value)
  return String(value)
}

export const formatRangeValue = (dates: string[] | Date[], includeTime?: boolean): string => {
  if (!Array.isArray(dates) || dates.length === 0) return ""
  const [start, end] = dates
  if (!start || !end) return ""
  const startLabel = mapUnitToString(start, includeTime)
  const endLabel = mapUnitToString(end, includeTime)
  return startLabel && endLabel ? `${startLabel} ~ ${endLabel}` : ""
}
</script>


<script setup lang="ts">

import { CalendarIcon } from '@/components/icons'
import VueDatePickerPrimitive, { type DatePickerInstance, type RangeConfig } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, onMounted, ref, watch } from 'vue'


defineOptions({
  name: "VueDatePicker",
  inheritAttrs: false
})

const modelValue = defineModel<Date | Date[] | string | string[] | null>('modelValue')

const datepicker = ref<DatePickerInstance>(null);

const props = withDefaults(defineProps<{
  modelType?: 'timestamp' | 'iso' | 'format' | string;
  range?: boolean | RangeConfig;
  placeholder?: string
  size?: "small" | "medium" | "large"
  format?: (dates: string[] | Date[]) => string
  previewFormat?: string | ((date: Date) => string) | ((dates: Date[]) => string);
  clearable?: boolean
  enableTimePicker?: boolean
  position?: 'left' | 'right' | 'center'
  disableTextInput?: boolean
}>(), {
  size: "medium",
  enableTimePicker: false,
  placeholder: "날짜를 선택하세요",
  position: 'center'
})

const handleOpenMenu = () => {
  datepicker.value?.openMenu();
}

const formatForPicker = computed(() => (props.format ?? props.range ?
  (dates: string[] | Date[]) => formatRangeValue(dates, props.enableTimePicker) : (value: unknown) => mapUnitToString(value, props.enableTimePicker)))

const textInputOptions = computed(() => props.disableTextInput ? false : props.range ? { rangeSeparator: '~', format: 'yyyy-MM-dd HH:mm', enterSubmit: true } : { enterSubmit: true })

const hiddenNavigation = computed<('month' | 'year' | 'calendar' | 'time' | 'minutes' | 'hours' | 'seconds')[]>(() => props.enableTimePicker ? [] : ['time'])

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  updateInputValue();
})

watch(modelValue, (nextValue) => {
  updateInputValue(nextValue);
})

watch(() => props.enableTimePicker, () => {
  updateInputValue();
})

watch(() => props.range, () => {
  updateInputValue();
})

// called when the datepicker emits 'cleared'
const handleCleared = () => {
  modelValue.value = null;
  updateInputValue(null)
}

const updateInputValue = (value?: any) => {
  if (inputRef.value) {
    if (value || value === null) {
      inputRef.value.value = formatForPicker.value(value)
    } else {
      inputRef.value.value = formatForPicker.value(modelValue.value as any)
    }
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.trim()

  try {
    // Parse the input string into a date and emit update
    if (props.range) {
      const parts = value.split('~').map(part => part.trim());
      if (parts.length === 2) {
        const startDate = new Date(parts[0]);
        const endDate = new Date(parts[1]);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          datepicker.value?.setMonthYear({ month: startDate.getMonth(), year: startDate.getFullYear() });
          modelValue.value = [startDate, endDate];
        }
      }
      return;
    }
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      datepicker.value?.setMonthYear({ month: parsedDate.getMonth(), year: parsedDate.getFullYear() });
      modelValue.value = parsedDate;
    }
  } catch (error) {
    console.error('Error parsing date input:', error);
  }
}

</script>
