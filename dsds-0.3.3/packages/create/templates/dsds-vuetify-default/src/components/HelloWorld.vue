<template>
  <v-container max-width="900">
    <div>
      <div class="mb-8 text-center flex flex-col items-center">
        <img
          class="mb-4 text-center"
          src="@/assets/logo.svg"
          title="Vuetify 로고"
          width="72px"
        ></img>
        <div class="text-lg font-light mb-1">환영합니다!</div>
        <h1 class="text-2xl font-heading">DSDS Vuetify</h1>
      </div>

      <v-row>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            rounded="lg"
            variant="tonal"
          >
            <v-card-title>
              <h2 class="text-lg font-heading font-bold px-4">
                시작하기
              </h2>
            </v-card-title>

            <v-card-text>
              <v-kbd>components/HelloWorld.vue</v-kbd> 파일의 <v-kbd>{{ `<HelloWorld />` }}</v-kbd> 컴포넌트를 수정하여 이 페이지를 변경할 수 있습니다.
              <v-btn @click="count += 1">클릭 횟수 {{ count }}</v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-for="link in links" :key="link.href" cols="6">
          <v-card
            class="py-4"
            color="surface-variant"
            :href="link.href"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="tonal"
          >
            <v-card-title>
              <h2 class="text-lg font-heading font-bold px-4">
                {{ link.title }}
              </h2>
            </v-card-title>
            <v-card-text>
              {{ link.subtitle }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const count = ref(0)
  const links = [
    {
      href: 'https://vuetifyjs.com/',
      icon: 'mdi-text-box-outline',
      subtitle: '문서에서 Vuetify에 대한 모든 것을 배우세요.',
      title: '문서',
    },
    {
      href: 'https://vuetifyjs.com/introduction/why-vuetify/#feature-guides',
      icon: 'mdi-star-circle-outline',
      subtitle: '사용 가능한 프레임워크 기능을 탐색하세요.',
      title: '기능',
    },
    {
      href: 'https://vuetifyjs.com/components/all',
      icon: 'mdi-widgets-outline',
      subtitle: 'API 탐색기에서 컴포넌트를 발견하세요.',
      title: '컴포넌트',
    },
    {
      href: 'https://discord.vuetifyjs.com',
      icon: 'mdi-account-group-outline',
      subtitle: 'Vuetify 개발자들과 연결하세요.',
      title: '커뮤니티',
    },
  ]
</script>
