import { ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { fetchInterviews, removeInterview } from '@/services/interviewService';
import type {IInterview} from "@/interfaces";

export const useInterviewFilters = () => {
  const selectedFilterResult = ref<string>('');
  const isLoading = ref<boolean>(false);
  const interviews = ref<IInterview[]>([]);
  const confirm = useConfirm();

  const applyFilter = async (): Promise<void> => {
    isLoading.value = true;
    interviews.value = await fetchInterviews(selectedFilterResult.value);
    isLoading.value = false;
  };

  const removeFilter = async (): Promise<void> => {
    selectedFilterResult.value = '';
    isLoading.value = true;
    interviews.value = await fetchInterviews();
    isLoading.value = false;
  };

  const confirmRemoveInterview = async (id: string): Promise<void> => {
    confirm.require({
      message: 'Are you sure you want to delete this interview?',
      header: 'Delete Interview',
      icon: 'pi pi-info-circle',
      accept: async () => {
        isLoading.value = true;
        await removeInterview(id);
        interviews.value = await fetchInterviews();
        isLoading.value = false;
      },
    });
  };

  return {
    selectedFilterResult,
    interviews,
    isLoading,
    applyFilter,
    removeFilter,
    confirmRemoveInterview,
  };
};
