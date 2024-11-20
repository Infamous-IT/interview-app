<script setup lang="ts">
import { onMounted } from 'vue';
import { useInterviewFilters } from '@/composables/useInterviewFilters';
import {fetchInterviews} from "@/services/interviewService";

const {
  selectedFilterResult,
  interviews,
  isLoading,
  applyFilter,
  removeFilter,
  confirmRemoveInterview
} = useInterviewFilters();

onMounted(async () => {
  interviews.value = await fetchInterviews();
  isLoading.value = false;
});
</script>

<template>
  <app-dialog />
  <app-progress v-if="isLoading" />
  <app-message v-else-if="!isLoading && !interviews.length" severity="info">
    You don't have any interviews right now!
  </app-message>

  <div v-else>
    <h1>List of Interviews</h1>
    <div class="flex align-items-center mb-4">
      <div class="flex align-items-center mr-2">
        <app-radio-button input-id="interviewResult1" name="result" value="Refusal" v-model="selectedFilterResult" />
        <label for="interviewResult1" class="ml-2">Refusal</label>
      </div>
      <div class="flex align-items-center mr-2">
        <app-radio-button input-id="interviewResult2" name="result" value="Offer" v-model="selectedFilterResult" />
        <label for="interviewResult2" class="ml-2">Offer</label>
      </div>
      <app-button class="mr-2" @click="applyFilter" :disabled="!selectedFilterResult">Apply</app-button>
      <app-button severity="danger" @click="removeFilter" :disabled="!selectedFilterResult">Cancel</app-button>
    </div>
    <app-data-table :value="interviews">
      <app-column field="company" header="Company" />
      <app-column field="hrName" header="HR Name" />
      <app-column field="vacancyLink" header="Vacancy">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">Link for job description</a>
        </template>
      </app-column>
      <app-column header="Contacts">
        <template #body="slotProps">
          <div class="contacts">
            <a v-if="slotProps.data.contactTelegram" :href="`https://t.me/${slotProps.data.contactTelegram}`" target="_blank" class="contacts__telegram">
              <span class="contacts__icon pi pi-telegram"></span>
            </a>
            <a v-if="slotProps.data.contactWhatsApp" :href="`https://wa.me/${slotProps.data.contactWhatsApp}`" target="_blank" class="contacts__whatsapp">
              <span class="contacts__icon pi pi-whatsapp"></span>
            </a>
            <a v-if="slotProps.data.contactPhone" :href="`tel:${slotProps.data.contactPhone}`" target="_blank" class="contacts__phone">
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column header="Stages completed">
        <template #body="slotProps">
          <span v-if="!slotProps.data.stages">Empty</span>
          <div v-else class="interview-stages">
            <app-badge v-for="(stage, index) in slotProps.data.stages" :key="index" :value="index + 1" rounded v-tooltip.top="stage.name" />
          </div>
        </template>
      </app-column>
      <app-column header="Salary from...to">
        <template #body="slotProps">
          <span v-if="!slotProps.data.salaryFrom">Empty</span>
          <span v-else>{{slotProps.data.salaryFrom}} - {{slotProps.data.salaryTo}}</span>
        </template>
      </app-column>
      <app-column header="Result">
        <template #body="slotProps">
          <span v-if="!slotProps.data.result">Empty</span>
          <app-badge v-else :severity="slotProps.data.result === 'Offer' ? 'success' : 'danger'" :value="slotProps.data.result" />
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencil" severity="info" />
            </router-link>
            <app-button icon="pi pi-trash" severity="danger" @click="confirmRemoveInterview(slotProps.data.id)" />
          </div>
        </template>
      </app-column>
    </app-data-table>
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}

.contacts__telegram {
  color: #0088cc;
}

.contacts__whatsapp {
  color: #25d366;
}

.contacts__phone {
  color: #fff;
}

.interview-stages {
  display: flex;
  gap: 5px;
}

.contacts__icon {
  font-size: 20px;
}
</style>
