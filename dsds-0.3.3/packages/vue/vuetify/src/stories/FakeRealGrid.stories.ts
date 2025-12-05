import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref, onMounted, computed } from "vue"
import { VBtn } from "@/components/ui"
import {
  createColumnsFromNames,
  defaultColumns,
  employeeColumns,
  productColumns,
  productFakeSource,
  FakeRealGrid,
} from "@/faker/realgrid"

const meta: Meta = {
  title: "Examples/FakeRealGrid",
  component: FakeRealGrid,
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component: `
페이크 데이터를 쉽게 Grid로 출력하는 FakeRealGrid 테이블 컴포넌트입니다.

**사용법**

\`\`\`tsx
// 1. 가장 간단한 방법
<FakeRealGrid :columns="createColumnsFromNames(['id', 'name', 'email'])" />

// 2. 프리셋 사용
<FakeRealGrid :columns="presetColumns.employee" />

// 3. 커스텀 옵션과 함께
const customColumns = createColumnsFromNames(['userId', 'fullName'], {
  userId: { width: "150" },
  fullName: { header: { text: "전체 성명" } }
})
\`\`\`

          `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof FakeRealGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "기본",
  render: (args) => ({
    components: { FakeRealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof FakeRealGrid> | null>(null)

      const loadData = () => {
        gridRef.value?.loadData()
      }

      onMounted(() => {
        loadData()
      })

      const clearData = () => {
        gridRef.value?.clearData()
      }

      const getGridInfo = () => {
        if (gridRef.value) {
          const gridView = gridRef.value.getGridView()
          const dataProvider = gridRef.value.getDataProvider()

          if (gridView && dataProvider) {
            const rowCount = dataProvider.getRowCount()
            const columnCount = gridView.getColumns().length
            alert(`행 개수: ${rowCount}, 열 개수: ${columnCount}`)
          }
        }
      }

      return { args, gridRef, employeeColumns, loadData, clearData, getGridInfo }
    },
    template: `
      <div class="flex flex-col w-full h-100 p-3!">
        <div class="mb-4 flex gap-2">
          <VBtn @click="loadData" color="primary">
            데이터 로드
          </VBtn>
          <VBtn @click="clearData" color="secondary">
            데이터 클리어
          </VBtn>
          <VBtn @click="getGridInfo" color="info">
            그리드 정보
          </VBtn>
        </div>
        <FakeRealGrid ref="gridRef" :columns="employeeColumns" />
      </div>
    `,
  }),
}

export const EmptyState: Story = {
  name: "빈 상태",
  args: {
    columns: defaultColumns,
    emptyState: true,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div class="flex flex-col w-full h-100 p-3!"><story /></div>`,
    }),
  ],
  parameters: {
    docs: {
      description: {
        story: "초기 로드 시점에 데이터가 없는 빈 상태를 보여주는 예시입니다.",
      },
    },
  },
}

export const DynamicColumnDemo: Story = {
  name: "동적 컬럼 데모",
  render: (args) => ({
    components: { FakeRealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof FakeRealGrid> | null>(null)
      const currentColumnSet = ref<"default" | "employee" | "product">("default")

      const columnSets = {
        default: undefined, // defaultColumns 사용
        employee: employeeColumns,
        product: productColumns,
      }

      const fakeSourceSets = {
        default: undefined, // defaultFakeSource 사용
        employee: undefined, // defaultFakeSource 사용
        product: productFakeSource,
      }

      const switchToEmployee = () => {
        currentColumnSet.value = "employee"
      }

      const switchToProduct = () => {
        currentColumnSet.value = "product"
      }

      const switchToDefault = () => {
        currentColumnSet.value = "default"
      }

      const currentColumns = computed(() => columnSets[currentColumnSet.value])
      const currentFakeSource = computed(() => fakeSourceSets[currentColumnSet.value])

      onMounted(() => {
        // 초기 데이터 로드
        if (gridRef.value) {
          gridRef.value.loadData()
        }
      })

      return {
        args,
        gridRef,
        currentColumnSet,
        currentColumns,
        currentFakeSource,
        switchToEmployee,
        switchToProduct,
        switchToDefault,
      }
    },
    template: `
      <div class="flex flex-col w-full h-100 p-3!">
        <div class="mb-4 flex gap-2 items-center">
          <span class="text-sm font-semibold">컬럼 세트 변경:</span>
          <VBtn @click="switchToDefault"
                :color="currentColumnSet === 'default' ? 'primary' : 'secondary'"
                size="small">
            기본
          </VBtn>
          <VBtn @click="switchToEmployee"
                :color="currentColumnSet === 'employee' ? 'primary' : 'secondary'"
                size="small">
            직원
          </VBtn>
          <VBtn @click="switchToProduct"
                :color="currentColumnSet === 'product' ? 'primary' : 'secondary'"
                size="small">
            상품
          </VBtn>
        </div>
        <FakeRealGrid
          ref="gridRef"
          :key="currentColumnSet"
          :columns="currentColumns"
          :fake-source="currentFakeSource"
          :row-count="12"
          :row-height="args.rowHeight"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "런타임에 컬럼 설정을 동적으로 변경하는 예시입니다. 각기 다른 컬럼 세트와 Fake 데이터 소스를 사용합니다.",
      },
    },
  },
}

export const CustomColumnsDemo: Story = {
  name: "커스텀 컬럼 데모",
  render: (args) => ({
    components: { FakeRealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof FakeRealGrid> | null>(null)

      // 커스텀 컬럼 정의 예제들
      const basicColumns = [
        {
          name: "userId",
          width: "100",
          header: { text: "사용자 ID" },
          fakeType: "incremental" as const,
          fakeOptions: {
            min: 1000,
            prefix: "USER",
            suffix: "",
          },
        },
        {
          name: "userName",
          width: "120",
          header: { text: "사용자명" },
          fakeType: "random" as const,
          fakeSourceKey: "fullNames",
        },
        {
          name: "email",
          width: "250",
          header: { text: "이메일" },
          fakeType: "computed" as const,
          fakeOptions: {
            computeFn: (row: any, index: number) => {
              const name = row.UserName ? row.UserName.replace(/\s+/g, "").toLowerCase() : `user${index}`
              return `${name}@company.com`
            },
          },
        },
        {
          name: "status",
          width: "80",
          header: { text: "상태" },
          fakeType: "fixed" as const,
          fakeSourceKey: "activeStatus",
        },
      ]

      const advancedColumns = [
        {
          name: "orderId",
          width: "120",
          header: { text: "주문번호" },
          fakeType: "incremental" as const,
          fakeOptions: {
            min: 20240001,
            prefix: "ORD-",
            suffix: "",
          },
        },
        {
          name: "customerName",
          width: "150",
          header: { text: "고객명" },
          fakeType: "random" as const,
          fakeSourceKey: "fullNames",
        },
        {
          name: "orderDate",
          width: "120",
          header: { text: "주문일" },
          fakeType: "computed" as const,
          fakeOptions: {
            computeFn: (row: any, index: number) => {
              const date = new Date()
              date.setDate(date.getDate() - Math.floor(Math.random() * 30))
              return date.toLocaleDateString("ko-KR")
            },
          },
        },
        {
          name: "amount",
          width: "100",
          header: { text: "금액" },
          fakeType: "random" as const,
          fakeSourceKey: "orderAmounts",
          numberFormat: "#,##0원",
        },
        {
          name: "orderStatus",
          width: "100",
          header: { text: "주문상태" },
          fakeType: "random" as const,
          fakeSourceKey: "orderStatuses",
        },
      ]

      // 커스텀 fake 데이터 소스
      const customFakeSource = {
        fullNames: ["김철수", "이영희", "박민수", "최지은", "정우진", "한소희", "임채영", "송민호"],
        activeStatus: "활성",
        orderAmounts: [50000, 100000, 150000, 200000, 250000, 300000, 500000, 800000],
        orderStatuses: ["주문완료", "결제완료", "배송중", "배송완료", "취소"],
      }

      const currentColumns = ref(basicColumns.map((it) => ({ ...it, fieldName: it.name })))
      const currentFakeSource = ref(customFakeSource)
      const currentMode = ref<"basic" | "advanced">("basic")

      const switchToBasic = () => {
        currentMode.value = "basic"
        currentColumns.value = basicColumns.map((it) => ({ ...it, fieldName: it.name }))
      }

      const switchToAdvanced = () => {
        currentMode.value = "advanced"
        currentColumns.value = advancedColumns.map((it) => ({ ...it, fieldName: it.name }))
      }

      const regenerateData = () => {
        gridRef.value?.generateNewData(15)
      }

      onMounted(() => {
        regenerateData()
      })

      return {
        args,
        gridRef,
        currentColumns,
        currentFakeSource,
        currentMode,
        switchToBasic,
        switchToAdvanced,
        regenerateData,
      }
    },
    template: `
      <div class="flex flex-col w-full h-100 p-3!">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">커스텀 컬럼 설정 데모</h3>
          <div class="flex gap-2 items-center mb-3">
            <span class="text-sm font-medium">예제 선택:</span>
            <VBtn @click="switchToBasic"
                  :color="currentMode === 'basic' ? 'primary' : 'secondary'"
                  size="small">
              기본 사용자 정보
            </VBtn>
            <VBtn @click="switchToAdvanced"
                  :color="currentMode === 'advanced' ? 'primary' : 'secondary'"
                  size="small">
              고급 주문 정보
            </VBtn>
            <VBtn @click="regenerateData" color="info" size="small" class="ml-4">
              데이터 재생성
            </VBtn>
          </div>
          <div class="text-sm text-gray-600 mb-3">
            <div v-if="currentMode === 'basic'">
              <strong>기본 예제:</strong> incremental ID, random 이름, computed 이메일, fixed 상태
            </div>
            <div v-else>
              <strong>고급 예제:</strong> 주문번호(prefix 포함), computed 날짜, 커스텀 금액 포맷
            </div>
          </div>
        </div>
        <FakeRealGrid
          ref="gridRef"
          :key="currentMode"
          :columns="currentColumns"
          :fake-source="currentFakeSource"
          :row-count="15"
          :row-height="args.rowHeight"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "props를 통해 커스텀 컬럼을 정의하는 방법을 보여주는 예시입니다. fakeType(incremental, random, computed, fixed), fakeSourceKey, fakeOptions 등을 활용하여 다양한 형태의 fake 데이터를 생성할 수 있습니다.",
      },
    },
  },
}

export const EasyPresetDemo: Story = {
  name: "간편 프리셋 데모",
  render: (args) => ({
    components: { FakeRealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof FakeRealGrid> | null>(null)

      // 🚀 새로운 간편 방식! 컬럼 이름만 나열하면 끝!
      const userColumns = createColumnsFromNames(["userId", "fullName", "email", "phone", "activeStatus"])
      const orderColumns = createColumnsFromNames(["orderId", "customerName", "orderDate", "amount", "orderStatus"])
      const companyColumns = createColumnsFromNames(["id", "company", "department", "fullName", "position"])

      const currentColumns = ref(userColumns)
      const currentPreset = ref<"user" | "order" | "company">("user")

      const switchToUser = () => {
        currentPreset.value = "user"
        currentColumns.value = userColumns
      }

      const switchToOrder = () => {
        currentPreset.value = "order"
        currentColumns.value = orderColumns
      }

      const switchToCompany = () => {
        currentPreset.value = "company"
        currentColumns.value = companyColumns
      }

      const generateData = () => {
        gridRef.value?.generateNewData(20)
      }

      onMounted(() => {
        generateData()
      })

      return {
        args,
        gridRef,
        currentColumns,
        currentPreset,
        switchToUser,
        switchToOrder,
        switchToCompany,
        generateData,
      }
    },
    template: `
      <div class="flex flex-col w-full h-100 p-3!">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">🚀 간편 프리셋 사용법</h3>
          <div class="flex gap-2 items-center mb-3">
            <VBtn @click="switchToUser"
                  :color="currentPreset === 'user' ? 'primary' : 'secondary'"
                  size="small">
              사용자 정보
            </VBtn>
            <VBtn @click="switchToOrder"
                  :color="currentPreset === 'order' ? 'primary' : 'secondary'"
                  size="small">
              주문 정보
            </VBtn>
            <VBtn @click="switchToCompany"
                  :color="currentPreset === 'company' ? 'primary' : 'secondary'"
                  size="small">
              회사 정보
            </VBtn>
            <VBtn @click="generateData" color="info" size="small" class="ml-4">
              데이터 생성 (20개)
            </VBtn>
          </div>
          <div class="text-xs text-gray-600 mb-3 font-mono bg-gray-100 p-2 rounded">
            <div v-if="currentPreset === 'user'">
              createColumnsFromNames(['userId', 'fullName', 'email', 'phone', 'activeStatus'])
            </div>
            <div v-else-if="currentPreset === 'order'">
              createColumnsFromNames(['orderId', 'customerName', 'orderDate', 'amount', 'orderStatus'])
            </div>
            <div v-else>
              createColumnsFromNames(['id', 'company', 'department', 'fullName', 'position'])
            </div>
          </div>
        </div>
        <FakeRealGrid
          ref="gridRef"
          :key="currentPreset"
          :columns="currentColumns"
          :fake-source="extendedFakeSource"
          :row-count="15"
          :row-height="args.rowHeight"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "🚀 새로운 간편 방식! createColumnsFromNames() 함수를 사용하여 컬럼 이름 배열만으로 그리드를 빠르게 구성할 수 있습니다. 사전 정의된 40여 개의 컬럼 템플릿을 활용하세요.",
      },
    },
  },
}

export const QuickStartDemo: Story = {
  name: "빠른 시작 데모",
  render: (args) => ({
    components: { FakeRealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof FakeRealGrid> | null>(null)

      // 가장 간단한 사용법들
      const examples = {
        simple: createColumnsFromNames(["id", "name", "email"]),
        business: createColumnsFromNames(["employeeId", "fullName", "department", "position"]),
        ecommerce: createColumnsFromNames(["productId", "productName", "price", "category"]),
        contact: createColumnsFromNames(["id", "fullName", "phone", "email", "company"]),
      }

      const currentExample = ref<keyof typeof examples>("simple")
      const currentColumns = computed(() => examples[currentExample.value])

      const switchExample = (example: keyof typeof examples) => {
        currentExample.value = example
      }

      const generateData = () => {
        gridRef.value?.generateNewData(12)
      }

      onMounted(() => {
        generateData()
      })

      return {
        args,
        gridRef,
        currentColumns,
        currentExample,
        examples,
        switchExample,
        generateData,
      }
    },
    template: `
      <div class="flex flex-col w-full h-100 p-3!">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">⚡ 빠른 시작 가이드</h3>
          <div class="flex gap-2 items-center mb-3 flex-wrap">
            <VBtn @click="switchExample('simple')"
                  :color="currentExample === 'simple' ? 'primary' : 'secondary'"
                  size="small">
              심플
            </VBtn>
            <VBtn @click="switchExample('business')"
                  :color="currentExample === 'business' ? 'primary' : 'secondary'"
                  size="small">
              비즈니스
            </VBtn>
            <VBtn @click="switchExample('ecommerce')"
                  :color="currentExample === 'ecommerce' ? 'primary' : 'secondary'"
                  size="small">
              이커머스
            </VBtn>
            <VBtn @click="switchExample('contact')"
                  :color="currentExample === 'contact' ? 'primary' : 'secondary'"
                  size="small">
              연락처
            </VBtn>
            <VBtn @click="generateData" color="success" size="small" class="ml-2">
              새 데이터
            </VBtn>
          </div>
          <div class="text-xs bg-blue-50 border border-blue-200 p-3 rounded mb-3">
            <div class="font-semibold text-blue-800 mb-1">💡 사용법이 이렇게 간단해졌습니다!</div>
            <div class="font-mono text-blue-700">
              <span v-if="currentExample === 'simple'">['id', 'name', 'email']</span>
              <span v-else-if="currentExample === 'business'">['employeeId', 'fullName', 'department', 'position']</span>
              <span v-else-if="currentExample === 'ecommerce'">['productId', 'productName', 'price', 'category']</span>
              <span v-else>['id', 'fullName', 'phone', 'email', 'company']</span>
            </div>
            <div class="text-xs text-blue-600 mt-1">→ fakeType, 헤더, 데이터 타입 등이 자동 설정됩니다!</div>
          </div>
        </div>
        <FakeRealGrid
          ref="gridRef"
          :key="currentExample"
          :columns="currentColumns"
          :fake-source="extendedFakeSource"
          :row-count="12"
          :row-height="args.rowHeight"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "⚡ 가장 간단한 사용법을 보여주는 예시입니다. 컬럼 이름만 배열로 나열하면 자동으로 적절한 헤더, 데이터 타입, fake 데이터 생성 방식이 설정됩니다.",
      },
    },
  },
}

export const ColumnTemplateExplorer: Story = {
  name: "컬럼 템플릿 탐색기",
  render: (args) => ({
    components: { FakeRealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof FakeRealGrid> | null>(null)

      // 사용 가능한 모든 컬럼 템플릿들을 카테고리별로 분류
      const templateCategories = {
        "ID/식별자": ["id", "userId", "employeeId", "orderId", "productId"],
        이름: ["name", "fullName", "customerName", "productName"],
        연락처: ["email", "phone"],
        숫자: ["age", "price", "amount", "quantity"],
        조직: ["company", "department", "position"],
        "상태/분류": ["status", "activeStatus", "orderStatus", "category"],
        날짜: ["createdAt", "orderDate", "joinDate"],
      }

      const selectedTemplates = ref<string[]>(["id", "fullName", "email", "age"])
      const currentColumns = computed(() => createColumnsFromNames(selectedTemplates.value as any))

      const toggleTemplate = (template: string) => {
        const index = selectedTemplates.value.indexOf(template)
        if (index > -1) {
          selectedTemplates.value.splice(index, 1)
        } else {
          selectedTemplates.value.push(template)
        }
      }

      const generateData = () => {
        gridRef.value?.generateNewData(10)
      }

      const clearSelection = () => {
        selectedTemplates.value = []
      }

      onMounted(() => {
        generateData()
      })

      const selectPreset = (preset: "basic" | "business" | "ecommerce") => {
        switch (preset) {
          case "basic":
            selectedTemplates.value = ["id", "name", "email", "age"]
            break
          case "business":
            selectedTemplates.value = ["employeeId", "fullName", "department", "position", "joinDate"]
            break
          case "ecommerce":
            selectedTemplates.value = ["productId", "productName", "price", "category", "status"]
            break
        }
      }

      return {
        args,
        gridRef,
        templateCategories,
        selectedTemplates,
        currentColumns,
        toggleTemplate,
        generateData,
        clearSelection,
        selectPreset,
      }
    },
    template: `
      <div class="flex w-full h-100 p-3!">
        <!-- 좌측: 템플릿 선택기 -->
        <div class="w-80 mr-4 bg-gray-50 p-4 rounded overflow-y-auto">
          <h3 class="text-lg font-semibold mb-3">🎛️ 컬럼 템플릿 탐색기</h3>

          <!-- 빠른 프리셋 -->
          <div class="mb-4">
            <h4 class="text-sm font-medium mb-2">빠른 프리셋:</h4>
            <div class="flex gap-1 flex-wrap">
              <VBtn @click="selectPreset('basic')" size="x-small" color="primary">기본</VBtn>
              <VBtn @click="selectPreset('business')" size="x-small" color="secondary">비즈니스</VBtn>
              <VBtn @click="selectPreset('ecommerce')" size="x-small" color="info">이커머스</VBtn>
              <VBtn @click="clearSelection" size="x-small" color="warning">초기화</VBtn>
            </div>
          </div>

          <!-- 현재 선택된 템플릿들 -->
          <div class="mb-4 p-3 bg-blue-50 rounded">
            <h4 class="text-sm font-medium mb-2 text-gray-700">현재 선택 ({{ selectedTemplates.length }}개):</h4>
            <div class="text-xs font-mono text-blue-700">
              {{ selectedTemplates.length ? JSON.stringify(selectedTemplates) : '[]' }}
            </div>
          </div>

          <!-- 카테고리별 템플릿들 -->
          <div v-for="(templates, category) in templateCategories" :key="category" class="mb-4">
            <h4 class="text-sm font-medium mb-2 text-gray-700">{{ category }}</h4>
            <div class="grid grid-cols-2 gap-1">
              <button
                v-for="template in templates"
                :key="template"
                @click="toggleTemplate(template)"
                :class="[
                  'text-xs px-2 py-1 rounded border text-left',
                  selectedTemplates.includes(template)
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-white border-gray-200 hover:bg-gray-100'
                ]"
              >
                {{ template }}
              </button>
            </div>
          </div>

          <VBtn @click="generateData" color="success" size="small" class="w-full mt-4">
            데이터 생성
          </VBtn>
        </div>

        <!-- 우측: 그리드 -->
        <div class="flex-1 flex flex-col">
          <div class="mb-3">
            <h3 class="text-lg font-semibold">실시간 미리보기</h3>
            <p class="text-sm text-gray-600">
              좌측에서 컬럼을 선택하면 실시간으로 그리드가 업데이트됩니다.
            </p>
          </div>
          <FakeRealGrid
            v-if="selectedTemplates.length > 0"
            ref="gridRef"
            :key="selectedTemplates.join(',')"
            :columns="currentColumns"
            :fake-source="extendedFakeSource"
            :row-count="8"
            :row-height="args.rowHeight"
          />
          <div v-else class="flex-1 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-500">컬럼을 선택해주세요</p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "🎛️ 사용 가능한 모든 컬럼 템플릿들을 탐색하고 실시간으로 조합해볼 수 있는 인터랙티브한 도구입니다. 40여 개의 사전 정의된 컬럼 템플릿을 카테고리별로 확인할 수 있습니다.",
      },
    },
  },
}
