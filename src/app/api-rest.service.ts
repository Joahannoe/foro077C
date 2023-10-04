import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
   urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQRRKOsKRuxWU5jNXleKaTyT3EigWkK7g";
   urlregister = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQRRKOsKRuxWU5jNXleKaTyT3EigWkK7g";
   url = "https://firestore.googleapis.com/v1/projects/foro-dudas-itsch/databases/(default)/documents/";
  constructor(private http: HttpClient) { }

  login(email:string,pass:string){
    return this.http.post(this.urlLogin,{email:email,password:pass,returnSecureToken:true})
  }
  register(email:string,pass:string){
    return this.http.post(this.urlregister,{email:email,password:pass,returnSecureToken:true})
  }
  getAllPreguntas(){
    return this.http.get<any>(this.url + "preguntas?pageSize=100")
  }

  crearPregunta(pregunta: string , correo: string, categoria:string, fecha:string){
    const newDoc ={
      fields:{
        pregunta:{stringValue:pregunta},
        correo:{stringValue:correo},
        categoria:{stringValue:categoria},
        fecha:{timestampValue:fecha},
      }
    }
    return this.http.post(this.url + "preguntas",newDoc)
  }

  deletePregunta(id:string){
    return this.http.delete(this.url + "preguntas/" +id)
  }


  updatePregunta(pregunta:string, id:string){
    const newDoc ={
      fields:{
        pregunta:{stringValue:pregunta}
      
      }
    }
    console.log(newDoc)
    return this.http.patch(this.url + "preguntas/"+id+"?updateMask.fieldPaths=pregunta",newDoc)
  }
}
