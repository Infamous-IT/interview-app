import { getFirestore, collection, getDocs, query, orderBy, where, deleteDoc, doc } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';
import type { IInterview } from '@/interfaces';

const db = getFirestore();
const userStore = useUserStore();

export const fetchInterviews = async (filterResult?: string): Promise<IInterview[]> => {
  let interviewQuery = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createdAt', 'desc')
  );

  if (filterResult) {
    interviewQuery = query(
      interviewQuery,
      where('result', '==', filterResult)
    );
  }

  const interviewDocs = await getDocs(interviewQuery);
  return interviewDocs.docs.map(doc => doc.data() as IInterview);
};

export const removeInterview = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id));
};
