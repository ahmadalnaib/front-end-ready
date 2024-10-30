export const useAuth = ()  => {

    const sanctumFetch= useSanctumClient();

  async function register(form: Registerform): Promise<void>{
      // always the lib check  cross site request forgery cookie for use
    return await sanctumFetch('/register', {
      method: 'POST',
      body: form,
    }); 
    }

  async function updateProfile(form: profileForm): Promise<void>{    
   return await sanctumFetch('/user/profile-information', {
    method: 'PUT',
    body: form,
  });
  }

  async function sendEmailVerification(): Promise<any> {
    return await sanctumFetch('/email/verification-notification', {
      method: 'POST',
    });
}

 async function sendForgotPassword(form: ForgortPasswordform): Promise<any> {
  return await sanctumFetch('/forgot-password', {
    method: 'POST',
    body:form,
  });
}

async function sendPasswordConfirmation(form: passwordConfirmation): Promise<any> {
  return await sanctumFetch('/reset-password', {
    method: 'POST',
    body:form,
  });
}
  
    return{
      register,
      updateProfile,
      sendEmailVerification,
      sendForgotPassword,
      sendPasswordConfirmation
    }
  
  }