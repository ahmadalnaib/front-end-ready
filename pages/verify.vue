<template>
  <div>
    <h1>Verify Email</h1>
    <p>
      Before proceeding, please check your email for a verification link.
      If you did not receive the email.
      
    </p>
    <form  @submit.prevent="resendEmailVerification">
      <button type="submit">Resend Verification Email</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { sendEmailVerification } = useSendEmailVerification();

const resendEmailVerification = async () => {
  try {
    await sendEmailVerification();
    alert('Verification email sent');
  } catch (error) {
    alert('Failed to send verification email');
  }
}
</script>