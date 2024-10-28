export const useProductGroups = () => {
    const sanctumFetch = useSanctumClient();
  
    async function fetchProductGroups(): Promise<any> {
  
        return await sanctumFetch('api/v1/products-by-group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
    }
  

    return {
        fetchProductGroups,
    
    };
  };




