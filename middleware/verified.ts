import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  if (!user || !user.email_verified_at) {
    return navigateTo('/verify');
  }
});