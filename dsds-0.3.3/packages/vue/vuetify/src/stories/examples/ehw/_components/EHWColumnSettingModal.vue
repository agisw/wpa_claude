<template>
  <Modal size="xs" :contentProps="{style: 'width: 520px !important; min-height: 212px !important'}" v-model="selectColumnModalFlag">
    <v-card>
      <v-card-title>
          <ModalHeader @close="selectColumnModalFlag = false">{{ t('ecoh.dashboard.column_setting') }}</ModalHeader>
      </v-card-title>
      <v-card-text>
        <div class="grid grid-cols-3 gap-2">
          <VCheckbox v-model="columnVisibleFlag.gpmLine" label="Line ID" />
          <VCheckbox v-model="columnVisibleFlag.processId" label="Process ID" />
          <VCheckbox v-model="columnVisibleFlag.subArea" label="Sub area" />
          <VCheckbox v-model="columnVisibleFlag.stepSeq" label="Step seq" />
          <VCheckbox v-model="columnVisibleFlag.stepDesc" label="Step desc" />
          <VCheckbox v-model="columnVisibleFlag.recipeId" label="Recipe ID" />
          <VCheckbox v-model="columnVisibleFlag.processGroupName" label="PRC Group" />
          <VCheckbox v-model="columnVisibleFlag.rmModel" label="RM model" />
          <VCheckbox v-model="columnVisibleFlag.ecModel" label="EC model" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn size="large" @click="handleApply">적용</v-btn>
        <v-btn size="large" variant="secondary" @click="selectColumnModalFlag = false">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </Modal>
</template>

<script setup lang="ts">
import {
  Modal,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCheckbox
} from "@/components/ui"

import { useI18n } from "vue-i18n"

export type ColumnVisibilityState = {
  gpmLine: boolean
  processId: boolean
  subArea: boolean
  stepSeq: boolean
  stepDesc: boolean
  recipeId: boolean
  processGroupName: boolean
  rmModel: boolean
  ecModel: boolean
}

const selectColumnModalFlag = defineModel<boolean>({ required: true })
const columnVisibleFlag = defineModel<ColumnVisibilityState>("columnVisibleFlag", { required: true })

const emit = defineEmits<{ (event: "apply"): void }>()

const { t } = useI18n()

function handleApply() {
  emit("apply")
}
</script>