<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
    <h1 class="text-2xl font-semibold mb-4">Verify Email</h1>
    <p v-if="isVerified" class="text-green-600 mb-6">
      Your email has been verified. Thank you!
    </p>
    <div v-else>
      <p class="text-gray-600 mb-6">
        Before proceeding, please check your email for a verification link.
        If you did not receive the email, you can request another one.
      </p>
      <form @submit.prevent="resendEmailVerification">
        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">
          Resend Verification Email
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:auth'],
});

const { sendEmailVerification } = useSendEmailVerification();
const  user  = useSanctumUser<User>();


const isVerified = ref(false);

const checkVerificationStatus = () => {
  if (user.value && user.value.email_verified_at) {
    isVerified.value = true;
  }
};

const resendEmailVerification = async () => {
  try {
    await sendEmailVerification();
    alert('Verification email sent');
  } catch (error) {
    alert('Failed to send verification email');
  }
}

onMounted(() => {
  checkVerificationStatus();
});
</script>