import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { User } from '../model/user.interface';
import { ResponseFromServer } from '../model/response.interface';
import { LoadingService } from '../service/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private loadingS:LoadingService) {
    console.log(this.generateUUID())
   }
  private getRandomDelay(): number {
    return Math.floor(Math.random() * 2000) + 500;
   }
 
  atFirst(){
  const users = localStorage.getItem('users')
  const roles = localStorage.getItem('roles')
  if(users && roles) return
  let user = [{
  id:this.generateUUID(),
  name:"superuser",
  email:"superuser@gmail.com",
  password:"superuser",
  role:"admin",
  confirmPassword:"superuser"
  }]
  let role = [
    {
      id:this.generateUUID(),
      name:"admin"
    },
    {
      id:this.generateUUID(),
      name:"supervisor"
    },
    {
      id:this.generateUUID(),
      name:"sale"
    }
  
  ]
  localStorage.setItem('users',JSON.stringify(user))
  localStorage.setItem('roles',JSON.stringify(role))
  }

   getData(name:string): Observable<any> {
    this.loadingS.setLoading(true)
     const data = JSON.parse(localStorage.getItem(name) as string) || []
     return of(data).pipe(delay(this.getRandomDelay())).pipe(
      tap((data)=>this.loadingS.setLoading(false))
     )
   }
   
   saveData<T>(name:string,body:T):Observable<any> {
    this.loadingS.setLoading(true)
     const response = {success:true}
    //  const bodyData = typeof(body)==="string"?body:JSON.stringify(body)
    const bodyData = {...body,id:this.generateUUID()} 
     const previousData = JSON.parse(localStorage.getItem(name) as string) || []
     previousData.push(bodyData)
     localStorage.setItem(name,JSON.stringify(previousData))
     return of({...response}).pipe(delay(this.getRandomDelay())).pipe(
      tap((data)=>this.loadingS.setLoading(false))
     )
   }

   login(body:User): Observable<any>{
    this.loadingS.setLoading(true)
    let response:{success:boolean,message?:string,data?:User} = {success:false,message:"Email and password doesnot match"}
    const Users = JSON.parse(localStorage.getItem("users") as string) || []
     Users.forEach((data:string | User) => {
      let da = typeof(data)==="string"?JSON.parse(data):data
      if(da.email===body.email && da.password===body.password){
        response = {
          success:true,
          data:da
        }
      }
    });
    return of({...response}).pipe(delay(this.getRandomDelay())).pipe(
      tap((data)=>this.loadingS.setLoading(false))
     )
   }

   update<T>(id:string,name:string,body:T):Observable<any>{
    this.loadingS.setLoading(true)
    console.log(id)
    let response = {success:true}
    let previousdata = JSON.parse(localStorage.getItem(name) as string) || []
     previousdata.forEach((data:T,index:number)=>{
      const dd =  typeof(data)==="string"?JSON.parse(data):data
      if(dd.id===id){
        previousdata[index] = {
          id:id,
          ...body
        }
      }
    })
    localStorage.setItem(name,JSON.stringify(previousdata))
    return of({...response}).pipe(delay(this.getRandomDelay())).pipe(
      tap((data)=>this.loadingS.setLoading(false))
     )
   }
   
   delete<T>(id:string,name:string):Observable<any>{
    this.loadingS.setLoading(true)
    let response = {success:true}
    let previousdata = JSON.parse(localStorage.getItem(name) as string) || []
     previousdata.forEach((data:T,index:number)=>{
      const dd =  typeof(data)==="string"?JSON.parse(data):data
      if(dd.id === id){
           previousdata.splice(index, 1);
      }
    })
    localStorage.setItem(name,JSON.stringify(previousdata))
    return of({...response}).pipe(delay(this.getRandomDelay())).pipe(
      tap((data)=>this.loadingS.setLoading(false))
     )
   }

  //  unique<T>(fields:Array<string>,name:string){
  //   console.log(crypto.randomUUID())
  // //  let collection = {}
  // //  data.forEach((data)=>{
    
  // //  })

  //  }

  generateUUID() {
    var digits = "0123456789abcdef";
    var n = digits.length;
    var uuid = "";
    for (var i = 0; i < 16; i++) {
      uuid += digits[Math.floor(Math.random() * n)];
    }
    return uuid;
  }
}