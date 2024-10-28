export const useProducts = () => {
    const sanctumFetch = useSanctumClient();
  
    async function fetchProducts(): Promise<any> {
  
        return await sanctumFetch('api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
    }
  

    return {
      fetchProducts,
    
    };
  };




