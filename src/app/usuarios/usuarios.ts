import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioService)
  private formBuilder = inject(FormBuilder)
  usuarios: Usuario[] = []
 form = this.formBuilder.group({
  name: [''],
  email: ['']
 })
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

  crear(){
    this.usuarioService.createUsuario(this.form.value as {name: string, email: string}).subscribe(data => {
      const nuevoUsuario = {...data, id: Date.now()}
      this.usuarios = [...this.usuarios, nuevoUsuario]
       console.log(data)
    })
    this.form.reset()
  }
  
  
}
