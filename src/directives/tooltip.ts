import Tooltip from "primevue/tooltip";
import type {App} from "vue";

export default {
  install(app: App) {
    app.directive('tooltip', Tooltip);
  }
};
