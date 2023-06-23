export interface ResponseFromServer<T>{
    success:boolean;
    data: T;
    message?:string;
}