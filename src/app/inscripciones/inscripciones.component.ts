import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css',
})
export class InscripcionesComponent {
  users: User[] = [];
  title = 'inscripciones-proyecto';
  categorias = [
    'All',
    'Zona 1',
    'Zona 2',
    'Zona 4',
    'Zona 5',
    'Zona 6',
    'Zona 7',
    'Zona 9',
    'Zona 10',
    'Zona 11',
    'Zona 12',
    'Zona 13',
    'Zona 14',
  ];
  searchTerm: string = '';
  usersFilter: User[] = [];

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserList().subscribe(
      (data) => {
        this.users = data;
        this.usersFilter = this.users;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  filterSeasons() {
    this.usersFilter = this.usersFilter.filter(user =>
      user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filtrarPorCategoria(categoria: string) {
    if (categoria === 'All') {
      this.usersFilter = this.users.slice();
    } else {
      this.usersFilter = this.users.filter(
        (elemento) => elemento.zona === categoria
      );
    }
  }

  guardarCambios(user: any) {
    this.userService.updateUser(user).subscribe(
      (data) => {
        this.snackBar.open('Datos guardados exitosamente!!', 'Cerrar', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.snackBar.open('Error al guardar los datos', 'Cerrar', {
          duration: 2000,
        });
      }
    )
  }
}
