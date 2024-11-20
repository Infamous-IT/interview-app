<template>
  <h1>Statistic</h1>
  <div class="card flex justify-center align-items-center">
    <app-chart type="doughnut" :data="chartData" :options="chartOptions" style="margin: 0 auto; width: 500px; height: 500px;" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {collection, getDocs, getFirestore, orderBy, query} from "firebase/firestore";
import {useUserStore} from "@/stores/user";
import type {IInterview} from "@/interfaces";

const userStore = useUserStore();
const db = getFirestore();

const interviews = ref<IInterview[]>([]);
const chartData = ref();
const chartOptions = ref(null);

const get = async <T extends IInterview[]>(): Promise<T[]> => {
  const data = query(
      collection(db, `users/${userStore.userId}/interviews/`),
      orderBy('createdAt', 'desc')
    );
  const list = await getDocs(data);

  return list.docs.map((doc) => doc.data() as T);
}

onMounted(async () => {
  interviews.value = await get();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);
  const data: number[] = [0, 0, 0];

  interviews.value.forEach((interview: IInterview) => {
    if (interview.result === 'Offer') {
      data[0]++;
    } else if (interview.result === 'Refusal') {
      data[1]++;
    } else {
      data[2]++;
    }
  });

  return {
    labels: ['Offer', 'Refuse', 'In process'],
    datasets: [
      {
        data,
        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
      }
    ]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  };
};
</script>
