
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { PocService } from 'src/app/services/poc/poc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.scss'],
  animations: [routerTransition()]
})
export class PocComponent implements OnInit {
  respuestaValidador: any;
  generateDatabase: any;
  questionsForm: any;
  importQuestionsForm: any;
  formDataXTF: File;
  validSchema: any;
  validImportDB: any;
  validSaveRepository: any;
  fileRepository: File;
  constructor(
    private pocService: PocService,
    private toastr: ToastrService
  ) {
    this.validSaveRepository = {
      status: null
    };
    this.validSchema = {
      imported: null
    };
    this.validImportDB = {
      imported: null
    };
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
    this.importQuestionsForm = [
      {
        id: 'fileXTF',
        name: 'fileXTF',
        title: 'Cargar XTF',
        typeInput: 'file',
        value: ''
      },
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

    this.pocService.postFileImagen(files[0]).subscribe(

      response => {
        this.respuestaValidador = response;
        // console.log('this.respuestaValidador', this.respuestaValidador);
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
    this.pocService.generateSchemaDatabase(datagenerateDB).subscribe(
      (response: any) => {
        this.validSchema = response;
        if (response.imported) {
          // this.toastr.success('Se ha generado el esquema de la base de datos correctamente');
        } else {
          // this.toastr.show('No se pudo generar la estructura de la base de datos');
        }
        this.generateDatabase = {
          databaseHost: '',
          databaseName: '',
          databasePassword: '',
          databasePort: '',
          databaseSchema: '',
          databaseUsername: ''
        };
      }
    );
  }
  cargandoXTF(files: FileList) {
    this.formDataXTF = files[0];
  }
  crearDB() {
    this.generateDatabase = this.importQuestionsForm.map(element => {
      this.generateDatabase[element.name] = element.value;
      return this.generateDatabase;
    });
    const datagenerateDB = this.generateDatabase[0];
    // console.log('datagenerateDB: ', datagenerateDB);

    this.pocService.generateImportDatabase(this.formDataXTF, datagenerateDB).subscribe(
      (response: any) => {
        this.validImportDB = response;
        if (response.imported) {
          // this.toastr.success('Se ha importando la base de datos apartir del archivo XTF');
        } else {
          // this.toastr.show('No se pudo crear la base de datos');
        }
        this.generateDatabase = {
          databaseHost: '',
          databaseName: '',
          databasePassword: '',
          databasePort: '',
          databaseSchema: '',
          databaseUsername: ''
        };
      }
    );
  }
  saveFileRepository(files: FileList) {
    this.fileRepository = files[0];
  }
  sendFileRepository() {
    this.pocService.saveFileRepositoryDoc(this.fileRepository).subscribe(
      response => {
        this.validSaveRepository = response;
      }
    );
  }

}


