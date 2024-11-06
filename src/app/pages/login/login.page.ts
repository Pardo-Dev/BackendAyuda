import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario_login: FormGroup;
  mensaje_error: string | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { 
    this.formulario_login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  loguearse(){
    if(this.formulario_login.valid){
      // Extraer los datos ingresados en el formulario
      const {username, password} = this.formulario_login.value;

      this.authService.login(username, password).subscribe(
        // Manejo de respestas en caso de tener exito
        (response) => {
          this.authService.insert_token(response.accessToken) // Inserta un token en localStorage 
          this.navCtrl.navigateRoot('/listado-productos') // Redirige a la pagina de productos

        },
        (error) => {
          this.mensaje_error = "Usuario o contraseña invalidos"
        }
      )
    }else{
      this.mensaje_error = "Complete todos los campos"
    }
  }

}