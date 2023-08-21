export function formatDateToString(inputDateString: string) {
    const date = new Date(inputDateString);
  
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[monthIndex];
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  
//   // Example usage:
//   const inputDateString = "2023-08-10T12:45:50.569Z";
//   const formattedDate = formatDateToString(inputDateString);
//   console.log(formattedDate);
  