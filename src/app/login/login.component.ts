import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string= ""
  pass = ""
  ShowError = false
  ShowLoading = false
constructor(
  private router:Router,
   private api: ApiRestService,
   private msg: ToastrService)
  {}
login(){
  this.ShowLoading = true
  this.api.login(this.email, this.pass).subscribe({
    next: good =>{
      this.msg.success("Bienvenido a mi foro")
      localStorage.setItem("Coreo", this.email)
      this.router.navigate(['/home'])
    },
    error: bad =>{
      this.msg.error("Error de usuario y contraseña")
      this.ShowError = true
      this.ShowLoading = false
    }
  })
}
}
