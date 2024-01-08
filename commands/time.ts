export async function fetchUTCMinus4Time(): Promise<string> {
    try {
      const currentUTC = new Date();
      const utcMinus4Time = new Date(currentUTC.getTime() - 4 * 60 * 60 * 1000);
  
      const hours = utcMinus4Time.getUTCHours().toString().padStart(2, '0');
      const minutes = utcMinus4Time.getUTCMinutes().toString().padStart(2, '0');
      const seconds = utcMinus4Time.getUTCSeconds().toString().padStart(2, '0');
  
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;
    } catch (error: any) {
      throw new Error(`Error fetching UTC-4 time: ${error.message}`);
    }
  }
  