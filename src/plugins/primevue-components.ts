import type { App } from "vue";
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ProgressSpinner from "primevue/progressspinner";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import Message from "primevue/message";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import Radio from "primevue/radiobutton";
import Badge from "primevue/badge";
import Chart from "primevue/chart";
import Toast from "primevue/toast";

export default function registerPrimeVueComponents(app: App) {
  app.component('app-menubar', Menubar);
  app.component('app-button', Button);
  app.component('app-input-text', InputText);
  app.component('app-toast', Toast);
  app.component('app-progress', ProgressSpinner);
  app.component('app-card', Card);
  app.component('app-data-table', DataTable);
  app.component('app-column', Column);
  app.component('app-dialog', ConfirmDialog);
  app.component('app-message', Message);
  app.component('app-input-number', InputNumber);
  app.component('app-text-area', Textarea);
  app.component('app-date-picker', DatePicker);
  app.component('app-radio-button', Radio);
  app.component('app-badge', Badge);
  app.component('app-chart', Chart);
}
