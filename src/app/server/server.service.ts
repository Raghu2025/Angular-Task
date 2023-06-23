import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { User } from '../model/user.interface';
import { ResponseFromServer } from '../model/response.interface';
import { LoadingService } from '../service/loading.service';
import { Sale } from '../model/sale.interface';
import { Item } from '../model/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private loadingS:LoadingService) {
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

   saveSale(name:string,body:Sale):Observable<any> {
    this.loadingS.setLoading(true)
     const response = {success:true}
     const bodyData = {...body,id:this.generateUUID(),createdDate:new Date().toISOString()} 
     const previousData = JSON.parse(localStorage.getItem(name) as string) || []
     previousData.push(bodyData)
     localStorage.setItem(name,JSON.stringify(previousData))
     const Items = JSON.parse(localStorage.getItem("items") as string) || []
    //  subtracting the quantity form items
     Items.forEach((data:Item,index:number)=>{
      const dd =  typeof(data)==="string"?JSON.parse(data):data
      if(dd.id===body.itemId){
        Items[index].quantity = Items[index].quantity - body.buy
      }
      localStorage.setItem('items',JSON.stringify(Items))

     })

     return of({...response}).pipe(delay(this.getRandomDelay())).pipe(
      tap((data)=>this.loadingS.setLoading(false))
     )
   }

   getAnalytical():Observable<any>{
    this.loadingS.setLoading(true)
    const response = {success:true}
    const Sale = JSON.parse(localStorage.getItem('sales') as string) || []
// Total Sale
    let total = Sale.reduce((total:number, item:Sale) => total + (item.buy || 0), 0);


// Total Today Sale
    const today = new Date().toLocaleDateString();
    const totalToday = Sale.reduce((total:number, item:Sale) => {
  const itemDate = new Date(item.createdDate).toLocaleDateString();
  return itemDate === today ? total + (item.buy || 0) : total;
}, 0);

// popularProduct
const productCountMap:{[key:string]: number} = {};
Sale.forEach((item:Sale) => {
  const name = item.name;
  if (productCountMap[name]) {
    productCountMap[name] += item.buy || 0;
  } else {
    productCountMap[name] = item.buy || 0;
  }
});

let popularProduct = null;
let maxBuyCount = 0;
for (const pro in productCountMap) {
  if (productCountMap[pro] > maxBuyCount) {
    popularProduct = pro;
    maxBuyCount = productCountMap[pro];
  }
}
const pProduct = {
  name:popularProduct,
  buy:maxBuyCount
}


     return of({...response,total,totalToday,data:[pProduct]}).pipe(delay(this.getRandomDelay())).pipe(
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