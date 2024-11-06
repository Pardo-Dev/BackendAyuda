import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_api = "https://dummyjson.com/auth/login"

  constructor(
    // Inyeccion de servicio HTTP
    private http: HttpClient
  ) { }

  // Metodo del login
  login(username: string, password: string): Observable<User>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    const body = { username, password}

    // Lo envia a la API y retorna la respuesta: TOKEN + JSON DATOS
    return this.http.post<User>(this.url_api, body, { headers });
  }

  // Insertar token
  insert_token(token: string ): void {
    localStorage.setItem('accessToken', token)
  }

  // Obtener el token
  obtener_token(): string | null{
    return localStorage.getItem('accessToken')
  }

  // Metodo para obtener Headers y Token para otras solicitudes
  obtener_headers(): HttpHeaders{
    const token = this.obtener_token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }





}
