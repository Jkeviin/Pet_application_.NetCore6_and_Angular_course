import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interface/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css'],
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.id);

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe({
      next: (data) => {
        this.loading = false;
        this.form.patchValue({  // patchValue: actualiza los valores de los controles
          nombre: data.nombre,
          raza: data.raza,
          color: data.color,
          edad: data.edad,
          peso: data.peso,
        });
      }
    })
  }

  agregarEditarMascota() {
    if (this.form.invalid) {
      return;
    }

    /* Guardar los valores */
    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
      // diferencia entre get y value
      // get: obtiene el valor del control
      // value: obtiene el valor del control y el valor de todos los controles hijos
    };

    if(this.id !== 0){
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    }else{
      this.agregarMascota(mascota);
    }

  }

  editarMascota( id: number, mascota: Mascota){
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito("actualizada");
        /*  Ir a la ruta /listMascotas: */
        this.router.navigate(['/listMascotas']);
      }
    })
  }


  agregarMascota(mascota: Mascota){
      // Enviamos objeto al Backend
    this._mascotaService.addMascota(mascota).subscribe({
      next: (data) => {
        this.mensajeExito('agregada');
        console.log(data);
        /*  Ir a la ruta /listMascotas: */
        this.router.navigate(['/listMascotas']);
      },
      error: (error) => {
        alert('Ocurrio un error al agregar la mascota');
        console.log(error);
      },
    });
  }

  mensajeExito(mensaje: string) {
    this._snackBar.open(`La mascota fue ${mensaje} con exito.`, 'Cerrar', {
      duration: 6000, // 2 segundos
      horizontalPosition: 'center',
    });
  }
}
