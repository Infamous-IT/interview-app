import type { App } from 'vue';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

export function registerServices(app: App) {
  app.use(ToastService);
  app.use(ConfirmationService);
}
