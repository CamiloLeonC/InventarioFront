import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
})
export class NotaComponent implements OnInit {
  notas: any[] = [];
  _status: boolean = false;
  resultError: string = "";
  _alumno: boolean = false;
  _docente: boolean = false;



  constructor(
    private _notaService: NotaService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._alumno = data === 'Alumno' ? true : false;
      this._docente = data === 'Docente' ? true : false;
    });
  }

  ngOnInit(): void {
    // this.getNotas();
    this.obtenerNotas();
  }

  obtenerNotas() {
    this._notaService.getListNotas().subscribe(data => {
      console.log(data);
      this.notas = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarNota(id: number) {
    this._notaService.deleteNota(id).subscribe(data => {
      this.toastr.error('La nota fue eliminada con exito!', 'Nota eliminada');
      this.obtenerNotas();
    }, error => {
      console.log(error);
    })
  }

  selectFile(event: any) {
    const selectedFiles = event.target.files;
    const extension = event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
    const file = selectedFiles.item(0);

    if (extension == "xlsx") {
      this._notaService.cargarFormatoExcel(file).subscribe(data => {
        this._status = !data?.error && !data?.message;
        this.resultError = "";

        if (this._status) {
          location.reload();
        } else {
          this.resultError = data.error;
          this.toastr.error(this.resultError, 'Error al cargar archivo');
          setTimeout(() => { location.reload(); }, 5000);
        };
      });
    }
    else {
      this.toastr.error('Error al cargar archivo', "Extensión de archivo no valido");
    }


  }

  onSubirFormatoExcel() {
    document.getElementById("input_file")?.click()
  }

  onExportExcel() {
    this._notaService.onExportNotas().subscribe((file: Blob) => {
      var url = window.URL.createObjectURL(file);
      var anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Informe de Notas`;
      anchor.click();
    });
  }
}