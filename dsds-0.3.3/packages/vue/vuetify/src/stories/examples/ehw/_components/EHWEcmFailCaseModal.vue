<template>
  <Modal
    size="small"
    v-model="modelValue"
    :contentProps="{style: 'min-height: 200px !important'}"
  >
    <v-card>
      <v-card-title>
        <ModalHeader @close="modelValue = false">ECM 일치율 판정 기준</ModalHeader>
      </v-card-title>
      <v-card-text class="flex h-full">
        <table class="dsds-table grid grid-cols-[45px_1fr_1fr_1fr] w-full">
          <thead>
            <tr>
              <th>Case</th>
              <th>A grade</th>
              <th>B grade</th>
              <th>C grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ⅰ</td>
              <td class="text-center col-span-3">비교 결과 없음</td>
            </tr>
            <tr>
              <td>ⅱ</td>
              <td>< 100</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>ⅲ</td>
              <td></td>
              <td>< 95</td>
              <td></td>
            </tr>
            <tr>
              <td>ⅳ</td>
              <td></td>
              <td></td>
              <td>< 95</td>
            </tr>
            <tr>
              <td>ⅴ</td>
              <td>N/A or Null</td>
              <td>≥ 95</td>
              <td>≥ 95</td>
            </tr>
            <tr>
              <td>ⅵ</td>
              <td>N/A or Null</td>
              <td>N/A or Null</td>
              <td>≥ 95</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-actions>
        <VBtn
          size="large"
          variant="secondary"
          @click="modelValue = false"
          >닫기</VBtn>
      </v-card-actions>
    </v-card>
  </Modal>
</template>

<script lang="ts" setup>
import {
  Modal,
  ModalHeader,
  VBtn
} from "@/components/ui"

const modelValue = defineModel<boolean>({default: false});
</script>