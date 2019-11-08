import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { InsumosService } from 'src/app/services/insumos.service';

@Component({
  selector: 'app-cargue',
  templateUrl: './cargue.component.html',
  styleUrls: ['./cargue.component.scss'],
  animations: [routerTransition()]
})
export class CargueComponent implements OnInit {
  respuestaValidador: any;
  generateDatabase: any;
  questionsForm: any;
  constructor(private insumosService: InsumosService) {
    this.respuestaValidador = [
      {
        isValid: null
      }
    ];
    this.generateDatabase = {
      databaseHost: '',
      databaseName: '',
      databasePassword: '',
      databasePort: '',
      databaseSchema: '',
      databaseUsername: ''
    };
    this.questionsForm = [
      {
        id: 'databaseHost',
        name: 'databaseHost',
        title: 'Dirección IP (Publica) de la base de datos:',
        typeInput: 'text',
        value: ''
      },
      {
        id: 'databaseName',
        name: 'databaseName',
        title: 'Nombre de la base de datos:',
        typeInput: 'text',
        value: ''
      },
      {
        id: 'databasePassword',
        name: 'databasePassword',
        title: 'Contraseña de la base de datos:',
        typeInput: 'password',
        value: ''
      },
      {
        id: 'databasePort',
        name: 'databasePort',
        title: 'Puerto de la base de datos:',
        typeInput: 'number',
        value: ''
      },
      {
        id: 'databaseSchema',
        name: 'databaseSchema',
        title: 'Esquema de la base de datos:',
        typeInput: 'text',
        value: ''
      },
      {
        id: 'databaseUsername',
        name: 'databaseUsername',
        title: 'Nombre de usuario de la base de datos:',
        typeInput: 'text',
        value: ''
      }
    ];
  }

  ngOnInit() {
  }
  cargandoImagen(files: FileList) {

    this.insumosService.postFileImagen(files[0]).subscribe(

      response => {
        this.respuestaValidador = response;
        console.log('this.respuestaValidador', this.respuestaValidador);

      },
      error => {
        console.log(error as any);
      }

    ); // FIN DE METODO SUBSCRIBE

  }
  crearEsquema() {
    this.generateDatabase = this.questionsForm.map(element => {
      this.generateDatabase[element.name] = element.value;
      return this.generateDatabase;
    });
    const datagenerateDB = this.generateDatabase[0];
    this.insumosService.generateDatabase(datagenerateDB).subscribe(
      data => {
        console.log('error: ', data);
      }
    );
  }


}
