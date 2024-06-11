export interface DoctorData {
    message: string;
    doctor: {
        Image: {
            path:string;
            public_id: string;
        },
        _id:string;
        firstName:string;
        lastName:string;
        email:string;
        password:string;
        availableDates:[];
        workHours:[];
        appointments:[];
        phone:string;
        role:string;
        address:string;
        
    }

}