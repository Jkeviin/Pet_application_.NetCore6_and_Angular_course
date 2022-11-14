import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interface/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

/* Algunos conceptos: 
  - ViewChild: permite acceder a un elemento del DOM desde el componente TS.
  - MatPaginator: es un componente de Angular Material que permite paginar una tabla.
  - MatTableDataSource: es un componente de Angular Material que permite mostrar una tabla.
  - AfterViewInit: es un ciclo de vida de Angular que se ejecuta después de que el componente se haya inicializado.
  - OnInit: es un ciclo de vida de Angular que se ejecuta cuando el componente se inicializa.

  - interface: es una forma de definir un tipo de dato en TypeScript, en simples palabras, es una clase que solo tiene atributos y metodos.
  - service: es una clase que se encarga de realizar operaciones de negocio, por ejemplo, consumir una API REST.
  - model: es una clase que se encarga de representar una entidad de la base de datos.
  - shared: es una carpeta que se encarga de almacenar componentes, servicios, interfaces, etc. que se van a utilizar en toda la aplicacion.
  */

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = 'Mascotas por página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _snackBar: MatSnackBar, private _mascotaService: MascotaService) { }

/*   obtenerMascotas(){
    this.loading = true
    this._mascotaService.getMascotas().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      // this.dataSorce.data lo que hace es asignarle los datos a la tabla
    },
    error => {
      this.loading = false;
      alert("Ocurrio un error al obtener las mascotas");
      console.log(error);
    })
  } */

  obtenerMascotas(){
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (error) => {
        this.loading = false;
        alert("Ocurrio un error al obtener las mascotas");
        console.log(error);
      }
    })
  }

  eliminarMascota(id: number){

    this.loading = true;

    this._mascotaService.deleteMascota(id).subscribe({
      next: () => {
        this.loading = false;
        this.obtenerMascotas();
        this.mensajeExito();
      }
    })
  }

  mensajeExito(){
    this._snackBar.open("La mascota fue eliminada con existo", "Cerrar",{
      duration: 3000, // 2 segundos
      horizontalPosition: 'center',
    });
  }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

}
