import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interface/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private myAppUrl: string = environment.endpoint;
  private MyApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient) { }

  getMascotas(): Observable <Mascota[]>{
    return this.http.get<Mascota[]>(`${this.myAppUrl}${this.MyApiUrl}`);
  }

  getMascota(id: number): Observable <Mascota>{
    return this.http.get<Mascota>(`${this.myAppUrl}${this.MyApiUrl}${id}`);
  }

  deleteMascota(id: number): Observable <void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.MyApiUrl}${id}`);
  }

  addMascota(mascota: Mascota): Observable <Mascota>{
    return this.http.post<Mascota>(`${this.myAppUrl}${this.MyApiUrl}`, mascota);
  }

  updateMascota(id: number, mascota: Mascota): Observable <Mascota>{
    return this.http.put<Mascota>(`${this.myAppUrl}${this.MyApiUrl}${id}`, mascota);
  }
}
