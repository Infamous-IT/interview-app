<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { signUpUser, signInUser } from "@/services/auth";
import { useAuthTexts } from "@/composables/useAuthTexts";

const email = ref<string>('');
const password = ref<string>('');
const isLogin = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const toast = useToast();
const router = useRouter();

const { subtitleText, linkAccountText, submitButtonText } = useAuthTexts(isLogin);

const toggleAuth = () => {
  isLogin.value = !isLogin.value;
};

const submitForm = async (): Promise<void> => {
  isLoading.value = true;
  try {
    if (isLogin.value) {
      await signInUser(email.value, password.value);
    } else {
      await signUpUser(email.value, password.value);
    }
    await router.push('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({ severity: "error", summary: "Error", detail: error.message, life: 3000 });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <app-toast position="bottom-right" />
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Hi!</div>
        <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
           @click="toggleAuth">{{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitForm">
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <app-input-text v-model="email" id="email" type="email" class="w-full mb-3"/>

        <label for="password" class="block text-900 font-medium mb-2">Password</label>
        <app-input-text v-model="password" id="password" type="password" class="w-full mb-3"/>

        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full"
        >
        </app-button>
      </form>
    </div>
  </div>
</template>
