import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-filesystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-filesystem.component.html',
  styleUrls: ['./project-filesystem.component.scss']
})
export class ProjectFilesystemComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  onDownloadCV(): void {
    // Aquí puedes agregar la lógica para descargar el CV
    // Por ejemplo, abrir un enlace o descargar un archivo
    window.open('/assets/FelipeMejiaCV.pdf', '_blank');
  }

  onContactClick(): void {
    // Redirigir al email
    window.location.href = 'mailto:felipemejiavazquez@gmail.com?subject=Contacto desde Portfolio&body=Hola Felipe, me gustaría contactarte para...';
  }
}
