export interface User {
    _id : string,
    username : string,
    email : string,
    password : string,
    status : "unverivied" | "verified",
    createdAt : string,
    updatedAt : string,
    __v : number
}

export interface Users {
    data : User[]
}


export interface userBody {
    username : string,
    email : string
    password : string ,
    status : "unverified" | "verified"   
}

export interface loginBody { 
    userMail : string,
    password : string
}

export interface userDataBody{
    username : string,
    status : "unverified" | "verified"
}