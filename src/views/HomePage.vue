<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import type { IInterview } from "@/interfaces";
import { v4 as uuid } from 'uuid';
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();
const db = getFirestore();
const router = useRouter();

const company = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const contactTelegram = ref<string>('');
const contactWhatsApp = ref<string>('');
const contactPhone = ref<string>('');
const loading = ref<boolean>(false);

const addNewInterview = async (): Promise<void> => {
  loading.value = true;

  const payload: IInterview = {
    id: uuid(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsApp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date()
  }


  if (userStore.userId) {
    await setDoc(doc(db, `users/${userStore.userId}/interviews`, payload.id), payload)
      .then(() => {
        router.push('/list');
      });
  }

  loading.value = false;
}

const disabledSaveButton = computed<boolean>(() => {
  return !(company.value && vacancyLink.value && hrName.value);
})

</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>New interview</template>
      <template #content>
        <app-input-text class="input mb-3" placeholder="Company name" v-model="company"/>
        <app-input-text class="input mb-3" placeholder="Job description (link)" v-model="vacancyLink"/>
        <app-input-text class="input mb-3" placeholder="HR name" v-model="hrName"/>
        <app-input-text class="input mb-3" placeholder="HR Telegram" v-model="contactTelegram"/>
        <app-input-text class="input mb-3" placeholder="HR WhatsApp" v-model="contactWhatsApp"/>
        <app-input-text class="input mb-3" placeholder="HR phone number" v-model="contactPhone"/>
        <app-button
          @click="addNewInterview"
          label="Create interview"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
