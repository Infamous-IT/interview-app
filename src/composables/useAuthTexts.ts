import { computed } from 'vue';
import type {Ref} from 'vue';

export function useAuthTexts(isLogin: Ref<boolean>) {
  const subtitleText = computed(() =>
    isLogin.value ? "You don't have an account yet?" : "Do you want to sign in?"
  );

  const linkAccountText = computed(() =>
    isLogin.value ? "Create account now?" : "Sign in"
  );

  const submitButtonText = computed(() =>
    isLogin.value ? "Sign in" : "Sign up"
  );

  return { subtitleText, linkAccountText, submitButtonText };
}
