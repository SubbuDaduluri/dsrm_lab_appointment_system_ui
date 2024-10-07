
export interface AppLabRequest {
    labId? : number;
    labName: string;
    contactNumber?: string;
    emailId?: string;
    ownerFullName?: string;
    ownerContactNo?: string;
    latitude?:number;
    longitude?:number;
    mapLocation?:string;
    sameAsOwnerNo?:boolean;
    addressline1?: string;
    addressline2: string;
    landmark: string;
    cityName: string;
    stateCode?: string;
    countryCode?: string;
    zipCode?: string;
}