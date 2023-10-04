import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    pregunta = [
      {no:  1, pregunta: 'Cual es tu nombre',correo:"", categoria:"", fecha:"",id:""},
    ];
    newP = {categoria:"",pregunta:""}
    mod =  {categoria:"",pregunta:"", id:""}

    constructor (private api: ApiRestService, private msg: ToastrService){}
    
    ngOnInit(): void{
      this.consultar()
    }
    consultar(){
      this.api.getAllPreguntas().subscribe({
        next : datos => {
          console.log(datos)
          let documentos = datos.documents.filter((d:any) => d.hasOwnProperty('fields'))
          let i =1;
          let preguntas = documentos.map((p: {name:string,fields:any}) => ({
            no: i++,
            pregunta: p.fields.hasOwnProperty('pregunta')?  p.fields.pregunta.stringValue : "",
            correo: p.fields.hasOwnProperty('correo')?p.fields.correo.stringValue : "",
            categoria: p.fields.hasOwnProperty('categoria')?  p.fields.categoria.stringValue : "",
            fecha: p.fields.hasOwnProperty('fecha')?  p.fields.fecha.timestampValue: "",
            id: p.name.split("/").pop()
          }))
          console.log(preguntas)
          this.pregunta=preguntas;
        },
        error : e => {

        }
      })
    }
  crearPregunta(){
    const fecha = new Date().toISOString();
    if(this.newP.pregunta=="" || this.newP.categoria==""){
      this.msg.error("Falta llenar los datos")
      return;
    }
    const correo = localStorage.getItem("correo") || ""
     this.api.crearPregunta(this.newP.pregunta,correo,this.newP.categoria, fecha).subscribe({
        next: resp => {this.consultar()},
        error: e => {console.log(e); this.msg.error("Error al crear la pregunta")}
     })
    }
    eliminarPregunta(id:string){
      this.api.deletePregunta(id).subscribe({
        next: resp => {this.consultar()},
        error: e => {console.log(e)}
      })
    }
    modificarPregunta(){
      this.api.updatePregunta(this.mod.pregunta, this.mod.id).subscribe({
        next: resp => {this.consultar()},
        error: e => {console.log(e)}
      })
    }

    editarPregunta(p:any){
      //clonar objeto 
      this.mod = JSON.parse(JSON.stringify(p))
    }
}
