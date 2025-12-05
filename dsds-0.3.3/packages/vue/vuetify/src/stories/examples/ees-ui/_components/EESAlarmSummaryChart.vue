<template>
  <PagePanel>
    <PagePanelHeader>
      Chart
      <template #title-tools>
        <PageFilterToolGroup>
          <ToggleButton size="small" v-model="timeSeriesChecked">Time Series</ToggleButton>
          <VSelect size="small" class="w-20" v-model="selectedChartPeriod" :disabled="!timeSeriesChecked" :items="[
            { title: 'Hour', value: 'hour' },
            { title: 'Day', value: 'day' },
            { title: 'Month', value: 'month' },
          ]" />
        </PageFilterToolGroup>

        <VDivider vertical />

        <PageFilterToolGroup>
          <VSelect v-if="timeSeriesChecked" size="small" class="w-20" v-model="selectedChartType" :items="[
            { title: 'Cumulative', value: 'cumulative' },
            { title: 'Comparison', value: 'comparison' },
            { title: 'Percentage', value: 'percentage' },
          ]">
          </VSelect>
          <VSelect v-else size="small" class="w-20" v-model="selectedChartType" :items="[
            { title: 'SideBar', value: 'sidebar' },
            { title: 'HorizBar', value: 'horizontal' },
            { title: 'Pie', value: 'pie' },
          ]" />
          <VSelect size="small" class="w-20" modelValue="all" :items="[
            { title: 'All', value: 'all' },
            { title: 'Register', value: 'register' },
            { title: 'Unregister', value: 'unregister' },
          ]" />
          <VSelect size="small" class="w-20" multiple placeholder="Select" showAll
            v-model="selectedDataOptions" :items="[
              { title: 'Normal', value: 'normal' },
              { title: 'Critical', value: 'critical' },
              { title: 'EOI', value: 'eoi' },
              { title: 'Unregister', value: 'unregister' },
            ]" />
          <VSelect size="small" class="w-20" modelValue="all" :items="[
            { title: 'All', value: 'all' },
            { title: 'Stop', value: 'stop' },
            { title: 'Idle', value: 'idle' },
          ]" />
          <VSelect size="small" class="w-20" modelValue="eqpId" :items="[
            { title: 'EQP ID', value: 'eqpId' },
            { title: 'EQP Model', value: 'eqpModel' },
            { title: 'EQP Type', value: 'eqpType' },
          ]" />
        </PageFilterToolGroup>

        <VDivider vertical />

        <PageFilterToolGroup>
          <span class="typo-footnote">Rank</span>
          <VTextField size="small" class="w-20 min-w-20" placeholder="입력" />
        </PageFilterToolGroup>

        <VDivider vertical />
        <VBtn size="small">Run</VBtn>
      </template>
    </PagePanelHeader>

    <PageFilterDivider />

    <PagePanelTools>
      <div class="tool-group flex items-center gap-1">
        <VBtn variant="secondary" size="small">Copy</VBtn>
        <VBtn variant="secondary" size="small">Raw Data</VBtn>
      </div>
      <div class="ml-auto flex items-center gap-1.5">
        <VBtn variant="secondary" iconOptions="before" size="small">전체 범례보기
        </VBtn>
        <VDivider vertical />
        <span class="typo-caption text-(--colors-neutral-neutral-15)!">
          Total Alarm Count: {{ totalSum }}건
        </span>
      </div>
    </PagePanelTools>

    <div class="chart-area flex-1 border border-gray-300 bg-gray-50 rounded-xs">
        <div class="block w-full h-full" ref="chart"></div>
        <ContextMenu v-if="!isPopup" ref="chartContextMenuRef" />
    </div>
  </PagePanel>
</template>

<script setup lang="ts">
import {
  ref
} from "vue"

import { PageFilterDivider, PageFilterToolGroup, PagePanel, PagePanelHeader, PagePanelTools, ToggleButton, VBtn, VDivider, VSelect, VTextField } from "@/components/ui"
import ContextMenu from "./EESEmptyPlaceholder.vue"
import type { SearchParam } from "./types"


const selectedChartPeriod = ref('hour')
const selectedDataOptions = ref<string[]>(['normal', 'critical', 'eoi', 'unregister'])
const selectedChartType = ref('sidebar')

const isPopup = window.opener !== null;
defineProps<{
    searchParams?: SearchParam,
    chartData?: Record<string, any[]>,
    colorIndex?: number
}>();

let colorIndex: number;
const chart = ref<HTMLElement | null>(null);
const totalSum = ref(0);

let selectedLine: string;

const timeSeriesChecked = ref<boolean>(false);
let chartLargeDivOptions = [
    { key: "ALL", value: "ALL" },
    { key: "R", value: "Normal" },
    { key: "C", value: "Critical" },
    { key: "O", value: "EOI" },
    { key: "N", value: "Unregister" },
];
</script>