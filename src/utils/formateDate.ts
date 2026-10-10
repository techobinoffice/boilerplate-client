export function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
  
    // Convert to BD time zone
    const bdTimeString = date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const bdDate = new Date(bdTimeString);
  
    const day = String(bdDate.getDate());
    const month = bdDate.toLocaleString("en-US", { month: "short" }); 
    const year = bdDate.getFullYear(); 
  
    return `${day}-${month}-${year}`;
  }
  