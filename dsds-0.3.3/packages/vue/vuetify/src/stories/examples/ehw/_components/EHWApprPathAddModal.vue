<!-- 결재 경로 추가 모달 -->

<template>
  <Modal size="xl" v-model="dialogModel" :contentProps="{style: 'height: 635px; max-height: 635px !important;'}">
    <v-card>
      <v-card-title>
        <ModalHeader @close="handleClose">결재 경로 추가</ModalHeader>
      </v-card-title>

      <VTabsContainer defaultValue="personal" asChild>
        <VTabs v-model="activeTabModel" class="border-b border-outer px-5 mt-3">
          <VTab value="personal">개인 결재 경로</VTab>
          <VTab value="department">부서 결재 경로</VTab>
        </VTabs>
        <VTabsWindow v-model="activeTabModel" asChild>
          <VTabsWindowItem value="personal">
            <v-card-text class="dsds-dialog-form-body flex-row overflow-hidden">
              <div class="w-80! flex flex-col gap-2">
                <Searchbox v-model="personalSearchModel" placeholder="경로명 검색" class="max-w-40! grow-0!"/>
                <ScrollableTable class="grid-cols-[60px_auto] w-full flex-1 grow-0!">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>결재 경로 명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in filteredPersonalTemplates" :key="item.taskId" @click="handleSelectedPersonalTemplate(item)">
                      <td class="cursor-pointer">{{ index + 1 }}</td>
                      <td class="cursor-pointer">{{ item.taskName }}</td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </div>
              <v-divider vertical class="mx-5!" />
              <div class="flex-1 flex flex-col gap-2.5" >
                <div>
                  <span class="typo-sok-h6-14-700">결재 경로명</span>
                  <span class="ml-1.5 typo-body">{{ selectedPersonalTemplate?.taskName || "-" }}</span>
                </div>
                <ScrollableTable class="grid-cols-[30px_70px_100px_140px_auto] w-full" :loading="isLoading">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>결재유형</th>
                      <th>성명</th>
                      <th>직책</th>
                      <th>소속</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in selectedPersonalMembers" :key="item.userId ?? index">
                      <td>{{ item.taskOrder }}</td>
                      <td>{{ formatTaskKind(item.taskKind) }}</td>
                      <td>{{ item.taskEmpName }}</td>
                      <td>{{ item.uGradeName }}</td>
                      <td class="truncate">{{ item.task_DeptName }}</td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </div>
            </v-card-text>
          </VTabsWindowItem>

          <VTabsWindowItem value="department">
            <v-card-text class="dsds-dialog-form-body flex-row overflow-hidden">
              <div class="w-80! flex flex-col gap-2">
                <Searchbox v-model="departmentSearchModel" placeholder="경로명 검색" class="max-w-40! grow-0!" />
                <ScrollableTable class="grid-cols-[60px_auto] w-full flex-1 grow-0!">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>결재 경로 명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in filteredDepartmentTemplates" :key="item.taskId" @click="handleSelectedDepartmentTemplate(item)">
                      <td class="cursor-pointer">{{ index + 1 }}</td>
                      <td class="cursor-pointer">{{ item.taskName }}</td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </div>
              <v-divider vertical class="mx-5!" />
              <div class="flex-1 flex flex-col gap-2.5" >
                <div>
                  <span class="typo-sok-h6-14-700">결재 경로명</span>
                  <span class="ml-1.5 typo-body">{{ selectedDepartmentTemplate?.taskName || "-" }}</span>
                </div>
                <ScrollableTable class="grid-cols-[30px_70px_100px_140px_auto] w-full" :loading="isLoading">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>결재유형</th>
                      <th>성명</th>
                      <th>직책</th>
                      <th>소속</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in selectedDepartmentMembers" :key="item.userId ?? index">
                      <td>{{ item.taskOrder }}</td>
                      <td>{{ formatTaskKind(item.taskKind) }}</td>
                      <td>{{ item.taskEmpName }}</td>
                      <td>{{ item.uGradeName }}</td>
                      <td class="truncate">{{ item.task_DeptName }}</td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </div>
            </v-card-text>
          </VTabsWindowItem>
        </VTabsWindow>
      </VTabsContainer>

      <v-card-actions class="d-flex justify-end" style="padding-right:0px;">
        <v-btn size="large" @click="handleConfirm">확인</v-btn>
        <v-btn size="large" variant="secondary" @click="handleCancel">취소</v-btn>
      </v-card-actions>
    </v-card>
  </Modal>

</template>
<script lang="ts">

export const TASK_KIND_LABELS: Record<string, string> = {
  DRAFT: "기안",
  APPROVE: "결재",
  AGREE: "합의",
  NOTICE: "통보",
}

</script>

<script setup lang="ts">
import {
  Modal,
  ModalHeader,
  ScrollableTable,
  Searchbox,
  VBtn,
  VCard,
  VCardTitle,
  VTab,
  VTabs,
  VTabsContainer,
  VTabsWindow,
  VTabsWindowItem
} from "@/components/ui"
import { computed, ref, toValue } from "vue"
import type { ApprovalMember, ApprovalTemplate } from "./EHWCreateEcoPage.types"

type TabValue = "personal" | "department"

const props = withDefaults(
  defineProps<{
    personalTemplates: ApprovalTemplate[]
    departmentTemplates: ApprovalTemplate[]
    getIspecApprPath?: (template: ApprovalTemplate) => Promise<{ data: ApprovalMember[] }>
  }>(),
  {
    personalTemplates: () => [],
    departmentTemplates: () => [],
  }
)

const emit = defineEmits<{
  (event: "confirm", value: ApprovalMember[]): void
  (event: "close"): void
}>()

const isLoading = ref(false);
const selectedPersonalMembers = ref<ApprovalMember[]>([]);
const selectedDepartmentMembers = ref<ApprovalMember[]>([]);

const selectedPersonalTemplate = ref<ApprovalTemplate>();
const selectedDepartmentTemplate = ref<ApprovalTemplate>();

const dialogModel = defineModel<boolean>({ default: false })
const activeTabModel = defineModel<TabValue>('activeTab', { default: 'personal' })
const personalSearchModel = defineModel<string>('personalSearch', { default: '' })
const departmentSearchModel = defineModel<string>('departmentSearch', { default: '' })

const filteredPersonalTemplates = computed(() => {
  const keyword = personalSearchModel.value.trim().toUpperCase()
  if (!keyword) {
    return props.personalTemplates
  }
  return props.personalTemplates.filter((template) => template.taskName.toUpperCase().includes(keyword))
})

const filteredDepartmentTemplates = computed(() => {
  const keyword = departmentSearchModel.value.trim().toUpperCase()
  if (!keyword) {
    return props.departmentTemplates
  }
  return props.departmentTemplates.filter((template) => template.taskName.toUpperCase().includes(keyword))
})

function formatTaskKind(kind: ApprovalMember["taskKind"] | string) {
  return TASK_KIND_LABELS[kind] ?? kind
}

async function handleSelectedPersonalTemplate(template: ApprovalTemplate) {
  isLoading.value = true;
  try {
    const { data } = props.getIspecApprPath ? await props.getIspecApprPath(template) : {data: template.members || []};
    selectedPersonalTemplate.value = template;

    if(data.length > 0){
      selectedPersonalMembers.value = data;
    }
  } finally {
    isLoading.value = false;
  }
}

async function handleSelectedDepartmentTemplate(template: ApprovalTemplate) {
  isLoading.value = true;
  try {
    const { data } = props.getIspecApprPath ? await props.getIspecApprPath(template) : {data: template.members || []};
    selectedDepartmentTemplate.value = template;

    if(data.length > 0){
      selectedDepartmentMembers.value = data;
    }
  } finally {
    isLoading.value = false;
  }
}

function handleConfirm() {
  emit("confirm", activeTabModel.value === 'personal' ? toValue(selectedPersonalMembers.value) : toValue(selectedDepartmentMembers.value))
  dialogModel.value = false
}

function handleClose() {
  dialogModel.value = false
  emit("close")
}

function handleCancel() {
  handleClose()
}
</script>