import axios from "axios";
import { Bdata, Bmidata, Bp, BpData, User, Prescription, Presc, Alarm } from "@/types";

export function Loginuserdata(data: Bdata[] | Bp[] | undefined | Presc[], user:User) {
    console.log(user);  
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
    const filtered = specificdata && specificdata.filter((item) => {
      // Assuming item.time is in the format "HH:mm"
      const itemHour = parseInt(format12Hour(item.time.split(":")[0]));
      return itemHour === time.user
    // const filtered = itemHour.filter((item) => {
    //     item === time.user;
    // // })
    // console.log(filtered);
    // return filtered
    });

    return filtered
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