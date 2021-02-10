import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public auth2: any;
  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    remember: [false]

  });

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
  // onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   console.log('Logged in as: ' + googleUser.getAuthResponse().id_token);
  // }
  /* console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      console.log('Logged in as: ' + googleUser.getAuthResponse().id_token);
  */
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      //'onsuccess': this.onSuccess,
    });
    this.startApp();
  }


  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '564327023655-c8nekpcess5jcumjc4tsoigqhetv22e8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const token = ('Logged in as: ' + googleUser.getAuthResponse().id_token);
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(token);
        this.usuarioService.loginGoogle(id_token).subscribe(resp => this.router.navigateByUrl('/'));
        //TODO: redireccionanr al dashboard
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
