import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Presc{
  
    _id: string,
    user?: string,
    Diagonisis: string,
    description: string,
    Medicine: string,
    OtherInformation: string,
    date: string

}

export interface Prescription{
    Healthdata: Presc[]

}

export interface Alarm {
  _id:string,
  user:string,
  time:string,
  medicine:string,
  notification:string
}
export interface Alarmdata{
  alarm: Alarm[] | undefined
  user: string
}

export interface Bdata {
  _id: string,
  user: string,
  weight: number,
  Height: number,
  OtherInformation:string,
  date: string |  number,
}
export interface Bmidata{
  data: Bdata[]
}

export interface Bp{
      _id: string,
        user: string,
        description:string,
        highPressure: number,
        lowerPressure: number,
        OtherInformation: string,
        date: string,
}
export interface BpData{
  Healthdata: Bp[]
}

export interface bloodData{
  user: string,
  Healthdata: [
    month: string,
    
    high: [
      value: number,
      date: string,
    ], 
    low: [
      value: number,
      date: string,
    ]
  ]
}

export interface PaginationProps {
  initialPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export interface BMIData {
  Healthdata: [string, number][] | undefined
}

export interface UserData {
  address: string;
  email: string;
  image: string;
  key?: string;
  name: string;
}

export interface UserDatabase {
  [key: string]: UserData;
}

export interface User{
  user:{
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } 
}


export interface loginuser{
  user:{
    user:{
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  }
 
}

export interface Imagetype{
  name: string
}

export interface onedata{
    user:string,
    month: string,
    count: number,
    date: string,
}

export interface Alldata{
  Healthdata: onedata[]
}
export interface BMIitem {
  _id: string;
  Height: number;
  weight: number;
}
export interface EditModalProps {
  id: string;
  onedit: () => void;
}
export interface EditedData {
data?: {
  status: string,
  
}
}

export interface StateType {
  time: string | undefined;
  medicine: string | undefined;
  notification: string | undefined;
}