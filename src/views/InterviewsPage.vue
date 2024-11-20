<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import {useUserStore} from "@/stores/user";
import type {IInterview, IStage} from "@/interfaces";
import dayjs from "dayjs";

const db = getFirestore();
const userStore = useUserStore();
const route = useRoute();

const isLoading = ref<boolean>(true);
const interview = ref<IInterview>();
const data = doc(db, `users/${userStore.userId}/interviews`, route.params.id as string);

const getData = async (): Promise<void> => {
  isLoading.value = true;
  const response = await getDoc(data);
  const fetchedData = response.data() as IInterview;

  if (fetchedData.stages) {
    fetchedData.stages = fetchedData.stages.map((stage) => ({
      ...stage,
      date: stage.date ? new Date(stage.date) : new Date(),
    }));
  }

  interview.value = fetchedData;
  console.log(interview.value)
  isLoading.value = false;
};


const addStage = () => {
  if (interview.value) {
    if (!interview.value?.stages) {
      interview.value.stages = [];
    }
    interview.value?.stages.push({
      name: '',
      date: new Date(),
      description: '',
    });
  }
};

const removeStage = (index: number) => {
  if (interview.value) {
    if (interview.value?.stages) {
      interview.value.stages.splice(index, 1);
    }
  }
}

const save = async (): Promise<void> => {
  isLoading.value = true;
  if (interview.value?.stages && interview.value.stages.length) {
    interview.value.stages = interview.value.stages.map((stage: IStage) => ({
      ...stage,
      date: dayjs(stage.date).format('YYYY-MM-DD'),
    }));
  }
  await updateDoc(data, { ...interview.value });
  await getData();
  isLoading.value = false;
};


onMounted(async () => await getData());
</script>

<template>
  <app-progress v-if="isLoading"/>
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title>
        Interview process in the company - {{ interview?.company }}
      </template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Company</label>
          <app-input-text class="input mb-3" id="company" v-model="interview.company"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Job description (link)</label>
          <app-input-text class="input mb-3" id="vacancyLink" v-model="interview.vacancyLink"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">HR Name</label>
          <app-input-text class="input mb-3" id="hrName" v-model="interview.hrName"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">HR Telegram</label>
          <app-input-text class="input mb-3" id="contactTelegram" v-model="interview.contactTelegram"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">HR WhatsApp</label>
          <app-input-text class="input mb-3" id="contactWhatsApp" v-model="interview.contactWhatsApp"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">HR phone number</label>
          <app-input-text class="input mb-3" id="contactPhone" v-model="interview.contactPhone"/>
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number input-id="salaryFrom" placeholder="Salary from" v-model="interview.salaryFrom"/>
          </div>
          <div class="flex-auto">
            <app-input-number input-id="salaryTo" placeholder="Salary to" v-model="interview.salaryTo"/>
          </div>
        </div>

        <app-button label="Add stage" severity="info" icon="pi pi-plus" class="mb-3" @click="addStage"/>
        <template v-if="interview.stages">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Name of stage</label>
              <app-input-text class="input mb-3" :id="`stage-name-${index}`" v-model="stage.name"/>
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Stage completion date</label>
              <app-date-picker class="input mb-3" :id="`stage-date-${index}`" showIcon :showTime="false" dateFormat="dd.mm.yy" v-model="stage.date"/>
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Comments</label>
              <app-text-area :id="`stage-description-${index}`" class="input mb-3" rows="5" v-model="stage.description"/>
            </div>
            <app-button severity="danger" label="Delete stage" @click="removeStage(index)"/>
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio-button input-id="interviewResult1" name="result" value="Refusal" v-model="interview.result"/>
            <label for="interviewResult1" class="ml-2">Refusal</label>
          </div>
          <div class="flex align-items-center">
            <app-radio-button input-id="interviewResult2" name="result" value="Offer" v-model="interview.result"/>
            <label for="interviewResult2" class="ml-2">Offer</label>
          </div>
        </div>
        <app-button label="Save" icon="pi pi-save" @click="save"/>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
