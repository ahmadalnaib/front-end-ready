export const useForgotPassword = () => {
  const sanctumFetch = useSanctumClient();


  async function sendForgotPassword(form: ForgortPasswordform): Promise<any> {
    return await sanctumFetch('forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
  }

  return {
    sendForgotPassword,
  
  };
};




