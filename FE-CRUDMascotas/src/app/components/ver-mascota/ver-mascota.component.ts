import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interface/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {

  id!: number;
  mascota!: Mascota;
  loading: boolean = false;

  routeSub!: Subscription;

  constructor(private _mascotaService: MascotaService,
              private aRoute: ActivatedRoute) {
                /* this.id = +this.aRoute.snapshot.paramMap.get('id')!;  // Obtiene el id de la ruta */
              }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.aRoute.params.subscribe({
      next: (data) => {
        this.id = data['id'];
        this.obtenerMascota();
      }
    })
  }

  obtenerMascota(){
    this.loading = true;
    this._mascotaService.getMascota(this.id).subscribe({
      next: (data) =>{
        this.loading = false;
        this.mascota = data;
        console.log(data)
      },
      error: (error) => {
        this.loading = false;
        alert("Ocurrio un error al obtener la mascota");
        console.log(error);
      }
    })
  }

}
