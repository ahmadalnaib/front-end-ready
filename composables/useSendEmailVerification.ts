export const useSendEmailVerification = () => {
  const sanctumFetch = useSanctumClient();

  async function sendEmailVerification(): Promise<any> {

      return await sanctumFetch('email/verification-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

  }


  return {
    sendEmailVerification,
  
  };
};




