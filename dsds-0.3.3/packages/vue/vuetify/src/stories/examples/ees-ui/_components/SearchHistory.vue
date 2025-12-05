<template>
  <!--
    <ul class="dropdown-menu">
        <li v-if="historyList.length === 0" class="dropdown-item text-muted">저장된 항목 없음</li>
        <li v-for="item in historyList">
            <button class="dropdown-item" @click="handleClick(item)">
                {{ getRelativeTime(item.date) }} / {{ item.count }}회
                {{ formatSelections(item.selections) }}
            </button>
        </li>
    </ul>
  -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'



type SearchHistoryType = {
    date: number;
    selections: Record<string, string>;
    count: number;
};
const emit = defineEmits<{
  (event: 'select', selections: Record<string, string>): void;
}>();

/**
 * HISTORY_KEY: 히스토리 저장용 키 (LocalStorage)
 * visibleKeys: 검색 히스토리 클릭 시 표시되는 정보
 */
const props = defineProps<{
    HISTORY_KEY: string,
    visibleKeys: string[],
}>();

const historyList = ref<SearchHistoryType[]>([]);
/**
 * History에 시간 표기
 * @param timestamp 시간
 */
const getRelativeTime = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const min = Math.floor(diff / 1000 / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (min < 1) return '1분 전';
  if (hr < 1) return `${min}분 전`;
  if (day < 1) return `${hr}시간 ${min % 60}분 전`;

  return new Date(timestamp).toLocaleDateString();
}

/**
 * History 버튼 클릭 시 표시되는 포맷 설정
 * @param selections
 */
const formatSelections = (selections: Record<string, string>) => {
    return props.visibleKeys
    .filter((key) => key in selections)
    .map((key) => `${key}: ${selections[key]}`)
    .join(', ');
}

/**
 * 부모 컴포넌트에게 데이터 전달
 * @param item History 정보
 */
const handleClick = (item: any) => {
    emit('select', item.selections);
}
</script>