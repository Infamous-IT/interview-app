<template>
  <app-menubar :model="items" class="menu">
    <template #item="{item, props}">
      <template v-if="item.show">
        <router-link :to="item.path" class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" class="p-menuitem-icon"></span>
          <span class="ml-2">{{item.label}}</span>
        </router-link>
      </template>
    </template>
    <template #end>
      <span
        v-if="userStore.userId"
        class="flex align-items-center menu-exit"
        @click="logout"
      >
        <span class="pi pi-sign-out p-menuitem-icon"></span>
        <span class="ml-2">Logout</span>
      </span>
    </template>
  </app-menubar>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import type {ComputedRef} from "vue";
import {useUserStore} from "@/stores/user";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const userStore = useUserStore()
const router = useRouter();

interface IMenuItem {
  label: string,
  icon: string,
  path: string,
  show: ComputedRef<boolean>
}

const items = ref<IMenuItem[]>([
    {
      label: 'Sign in',
      icon: 'pi pi-user',
      path: '/auth',
      show: computed(() => !userStore.userId)
    },
    {
      label: 'Add',
      icon: 'pi pi-plus',
      path: '/',
      show: computed(() => !!userStore.userId)
    },
    {
      label: 'List of interviews',
      icon: 'pi pi-list',
      path: '/list',
      show: computed(() => !!userStore.userId)
    },
    {
      label: 'Statistics',
      icon: 'pi pi-chart-pie',
      path: '/statistics',
      show: computed(() => !!userStore.userId)
    },
  ])

const logout = async (): Promise<void> => {
  await signOut(getAuth());
  await router.push('/auth');
}

</script>

<style scoped>
.menu {
  margin: 30px 0;
}

.menu-exit {
  cursor: pointer;
}
</style>
