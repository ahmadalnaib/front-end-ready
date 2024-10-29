import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { refreshIdentity } = useSanctumAuth();
  const  user  = useSanctumUser<User>();

  if (!user.value || !user.value.email_verified_at) {
    return navigateTo('/verify');
  }
  return refreshIdentity();
});