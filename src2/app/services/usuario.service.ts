import { LoginForm } from './../interfaces/login-form.interface';
import { RegisterForm } from './../interfaces/register-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token' || '');
    return this.http.get(`${url}/login/renew`, {
      headers: {
        'x-token': token
      },
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }), map(resp => true)
    )
  }

  crearUsuario(formData: RegisterForm) {
    console.log('Creando Usuario');
    return this.http.post(`${url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }


  loginUsuario(formData: LoginForm) {
    return this.http.post(`${url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }
      ));
  }

  loginGoogle(token) {
    return this.http.post(`${url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
          console.log('Resp', resp.token);
        })
      );
  }

}
