import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioService)
  usuarios: Usuario[] = []

  ngOnInit(){
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data
    })
  }

  eliminar(id: number){
    this.usuarioService.deleteUsuario(id).subscribe(data => {
      this.usuarios = this.usuarios.filter(u => u.id !== id)
    })
  }
}
