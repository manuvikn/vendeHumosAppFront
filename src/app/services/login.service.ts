import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bcryptjs from "bcryptjs";
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly salt: number = 10;
  private readonly enpoint: string = environment.enpoint;
  private userRegistrado: User | null = null;

  constructor(private http: HttpClient) { }

  createPass(pass: string) {

    return bcryptjs.hashSync(pass, this.salt );

  }
  
  comparePass(pass: string, passEncrypt: string) {

    return bcryptjs.compareSync(pass, passEncrypt);

  }

  createUser( user: User ) {

    return this.http.post(`${this.enpoint}usuarios`, user);

  }

  getUser( username: string) {

    return this.http.get(`${this.enpoint}usuarios?username=${username}`);

  }

  getUserById( id: number) {

    return this.http.get(`${this.enpoint}usuarios?id=${id}`);

  }

  updateUser(user: User, id: number) {

    return this.http.patch(`${this.enpoint}usuarios/${id}`, user);

  }

  async comprobarUserDuplicado(username: string): Promise<boolean> {

    let userDuplicado = false;

    userDuplicado = await fetch(`${this.enpoint}usuarios?username=${username}`)
      .then((datos: any) => datos.json())
      .then((datos: Array<any>) => {
        if (datos.length === 0) {
          return false;
        } else {
          return true;
        }
      });

    return userDuplicado;

  }

  setUsuarioRegistrado( user: User | null) {

    this.userRegistrado = user;

  }

  getUsuarioRegistrado() {

    return this.userRegistrado;

  }


  generarToken(user: User) {
    
    return btoa(JSON.stringify(user));
    
  }

  decodeToken(): number | null {

    if (localStorage.getItem('userToken')) {
      let datos = JSON.parse(atob(localStorage.getItem('userToken') as string));
      return datos['id'];
    }
    return null;
  }

  logearUsuario( user: User ) {

    if (localStorage.getItem('userToken')) {
      localStorage.setItem('userToken', this.generarToken(user));
    } else {
      localStorage.setItem('userToken', this.generarToken(user));
    }

  }

  deslogearUsuario() {

    if (localStorage.getItem('userToken')) {
      localStorage.removeItem('userToken');
    }

  }


}
