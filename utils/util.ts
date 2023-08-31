import axios from "axios";
import { Bdata, Bmidata, Bp, BpData, User, Prescription, Presc, Alarm } from "@/types";

export function Loginuserdata(data: Bdata[] | Bp[] | undefined | Presc[], user:User) {
    console.log(user);
    //@ts-ignore  
    const userdata = data?.filter((query: any) => query.user === user);
    return userdata
}

export function format12Hour(time24: string){
    const [hours, minutes] = time24.split(":");
    const parsedHours = parseInt(hours);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
}

export const Alarms = (specificdata: Alarm[] | undefined, time: any) => {
    console.log(specificdata)
    // console.log(time.user)
    if(time.user == 0){
        return specificdata
    }
    if(time.user === 1){
        const timeRange = [4, 5, 6, 7, 8, 9, 10];
        const time = specificdata?.filter((t) => timeRange.includes(parseInt(t.time)));
        // console.log(time);
        return time
    }
    if(time.user === 2){
        const timeRange = [11,12,13,14,15,16,0];
        const time = specificdata?.filter((t) => timeRange.includes(parseInt(t.time)));
        // console.log(time);

        return time
    }
    if(time.user === 3){
    
        const timeRange = [17,18,19,20,21,22,23,24, 1,2,3]
        const time = specificdata?.filter((t) => timeRange.includes(parseInt(t.time)));       
        return time
    }

    


}

// 
export function LoginUserProfile(data: any, targetEmail: string | null | undefined){
    let resultKey: string | null = null;
   
    for (const i in data) {
        console.log(i)

    console.log(data[i].email)
    if (targetEmail === data[i].email) {
        console.log(data[i].email)
        resultKey = i;
        break;
    }
    }
    console.log(resultKey)

    return resultKey


}

export function convertIsoToCustomFormat(isoDatetime: string) {
    // Parse the ISO 8601 date-time string
    const parsedDatetime = new Date(isoDatetime);
    // Define month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format the date in the desired format
    const formattedDate = `${parsedDatetime.getDate()} ${
      monthNames[parsedDatetime.getMonth()]
    } ${parsedDatetime.getFullYear()}`;

    return formattedDate;
  }