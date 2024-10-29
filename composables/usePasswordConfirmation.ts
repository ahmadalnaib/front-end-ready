export const usePasswordConfirmation = () => {
  const sanctumFetch = useSanctumClient();


  async function sendPasswordConfirmation(form: passwordConfirmation): Promise<any> {
    return await sanctumFetch('reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
  }

  return {
    sendPasswordConfirmation,
  
  };
};




