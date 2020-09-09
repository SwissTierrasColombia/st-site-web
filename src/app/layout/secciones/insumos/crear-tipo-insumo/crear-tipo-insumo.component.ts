import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-crear-tipo-insumo',
  templateUrl: './crear-tipo-insumo.component.html',
  styleUrls: ['./crear-tipo-insumo.component.scss']
})
export class CrearTipoInsumoComponent implements OnInit {

  @ViewChild('actionForm', { static: false }) actionForm: ElementRef;

  id: number;
  providerProfile: number;
  typeSupplyName: string;
  typeSupplyDescription: string;
  metadataRequired: boolean;
  modelRequired: boolean;
  providerProfiles: any[];
  supplies: any[];
  booleanOptions: { id: boolean; name: string; }[];
  editMode: boolean;
  formOk: boolean;
  activeOtherFormat: boolean;
  extensions: any;
  public exampleData: Array<Select2OptionData>;
  public options: Options;
  public value: string;
  extensions2: any;
  public exampleData2: Array<Select2OptionData>;
  public options2: Options;
  page: number;
  pageSize: number;
  searchText: string;
  viewOtherFormat: boolean;
  tab: number;
  isValidTab: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private modalService: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.id = 0;
    this.providerProfile = 0;
    this.typeSupplyName = '';
    this.typeSupplyDescription = '';
    this.metadataRequired = false;
    this.modelRequired = false;
    this.providerProfiles = [];
    this.supplies = [];
    this.booleanOptions = [
      { id: true, name: 'REQUERIDO' },
      { id: false, name: 'NO REQUERIDO' }
    ];
    this.editMode = false;
    this.formOk = false;
    this.activeOtherFormat = false;
    this.extensions = [];
    this.exampleData = [
      {
        id: 'txt',
        text: 'txt'
      },
      {
        id: 'png',
        text: 'png'
      },
      {
        id: 'jpg',
        text: 'jpg'
      },
      {
        id: 'xtf',
        text: 'xtf'
      },
      {
        id: 'img',
        text: 'img'
      },
      {
        id: 'tif',
        text: 'tif'
      },
      {
        id: 'ecw',
        text: 'ecw'
      },
      {
        id: 'sid',
        text: 'sid'
      },
      {
        id: 'shp',
        text: 'shp (Incluye dbf, shx, prj, otros)'
      },
      {
        id: 'gpkg',
        text: 'gpg'
      },
      {
        id: 'gbd',
        text: 'gdb'
      },
      {
        id: 'pdf',
        text: 'pdf'
      },
      {
        id: 'GeoPDF',
        text: 'GeoPDF'
      },
      {
        id: 'geojson',
        text: 'geojson'
      },
      {
        id: 'KML',
        text: 'KML'
      }
    ];
    this.options = {
      width: '350',
      multiple: true,
      tags: false
    };
    this.exampleData2 = [];
    this.extensions2 = [];
    this.options2 = {
      width: '350',
      multiple: true,
      tags: true,
      placeholder: "Escriba la extesión que desea y de enter"
    };
    this.page = 1;
    this.pageSize = 10;
    this.viewOtherFormat = true;
    this.tab = 1;
    this.isValidTab = true;
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(
      response => {
        if (response.tab) {
          this.tab = Number(response.tab);
          var isTrueSet = (response.isValidTab == 'false');
          if (!isTrueSet == false) {
            this.isValidTab = !response.isValidTab;
          }
        }
      }
    );
    this.serviceWorkspaces.GetProviderProfiles()
      .subscribe((response: any[]) => {
        this.providerProfiles = response;
      });
    this.loadProviderTypeSupplies();
  }

  loadProviderTypeSupplies() {
    this.serviceWorkspaces.GetProviderTypeSupplies()
      .subscribe((response: any[]) => {
        response.sort((a, b) => a.id - b.id);
        this.supplies = response;
      });
  }

  autoScroll() {
    this.actionForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  selectTypeSupply(data) {
    this.viewOtherFormat = false;
    this.autoScroll();
    this.providerProfile = data.providerProfile.id;
    this.typeSupplyName = data.name;
    this.typeSupplyDescription = data.description;
    this.metadataRequired = data.metadataRequired;
    this.modelRequired = data.modelRequired;
    this.id = data.id;
    let exts = [];
    for (const e of data.extensions) {
      exts.push(e.name);
    }
    let extdata = [];
    let extdata2 = [];
    exts.forEach(elem => {
      this.exampleData.forEach(element => {
        return elem == element.id ? extdata.push(element.id) : NaN;
      });
    });
    extdata2 = exts.filter(function (obj) { return extdata.indexOf(obj) == -1; });
    if (extdata2.length > 0) {
      this.activeOtherFormat = true;
      extdata2.forEach(element => {

        this.exampleData2.push({
          id: element,
          text: element
        });
        //        this.extensions.push(element);
      });
      this.extensions2 = extdata2;
    } else {
      this.activeOtherFormat = false;
      this.exampleData2.length = 0;
      this.extensions2.length = 0;
    }
    this.extensions = extdata;
    this.editMode = true;
    this.viewOtherFormat = true;
  }
  getObjectTypeSupply() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    this.activeOtherFormat && this.extensions2 != '' ? this.extensions = this.extensions + ',' + this.extensions2 : this.extensions + '';
    if (this.activeOtherFormat && this.extensions2 != '') {

      let exts = this.extensions.split(',');
      exts = exts.filter(onlyUnique);
      for (const e in exts) {
        exts[e].trim();
      }
      return {
        id: this.id,
        description: this.typeSupplyDescription,
        extensions: exts,
        metadataRequired: this.metadataRequired,
        modelRequired: this.modelRequired,
        name: this.typeSupplyName,
        providerProfileId: this.providerProfile
      };
    } else {
      return {
        id: this.id,
        description: this.typeSupplyDescription,
        extensions: this.extensions,
        metadataRequired: this.metadataRequired,
        modelRequired: this.modelRequired,
        name: this.typeSupplyName,
        providerProfileId: this.providerProfile
      };
    }
  }

  createTypeSupply() {
    this.serviceWorkspaces.CreateTypeSupplies(this.getObjectTypeSupply()).subscribe(response => {
      this.toast.success("Ha creado correctamente el tipo de insumo.");
      this.isValidTab = true;
      this.loadProviderTypeSupplies();
      this.cancel();
    });
  }

  saveTypeSupply() {
    this.serviceWorkspaces.SaveTypeSupplies(this.id, this.getObjectTypeSupply()).subscribe(() => {
      this.toast.success("Ha actualizado correctamente el tipo de insumo.");
      this.isValidTab = true;
      this.cancel();
      this.loadProviderTypeSupplies();
    });
  }

  cancel() {
    this.id = 0;
    this.providerProfile = 0;
    this.typeSupplyName = '';
    this.typeSupplyDescription = '';
    this.metadataRequired = false;
    this.modelRequired = false;
    this.extensions = [];
    this.extensions2 = [];
    this.editMode = false;
    this.formOk = false;
    this.activeOtherFormat = false;
  }

  extensionsToString(exts: any[]) {
    const names = [];
    for (const e of exts) {
      names.push(e.name);
    }
    return names.join(', ');
  }

  deleteTypeSupply(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }

  closeModalDisabled(option: boolean, id?: number) {
    if (option) {
      this.serviceWorkspaces.deleteTypeSupplies(id).subscribe(
        _ => {
          this.toast.success('Ha eliminado correctamente el tipo de insumo.');
          this.loadProviderTypeSupplies();
        }
      );
    }
    this.modalService.dismissAll();

  }

  modelChanged() {
    (this.editMode && this.id <= 0) ||
      this.providerProfile <= 0 ||
      this.typeSupplyName == '' ||
      this.extensions == '' ||
      this.typeSupplyDescription == '' ? this.formOk = false : this.formOk = true;
  }
  tab1() {
    this.tab = 1;
    this.router.navigate(['/insumos/caracterizacion/insumo', { tab: 1 }]);
  }
  tab2() {
    this.tab = 2;
    this.router.navigate(['/insumos/caracterizacion/insumo', { tab: 2 }]);
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  openModalEnabledSupplie(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalEnabledSupplie(option: boolean, typeSupplyId?: number, index?: number) {
    if (option) {
      this.serviceWorkspaces.enableTypeSupply(typeSupplyId).subscribe(response => {
        this.supplies[index] = response;
        this.toast.success('Ha habilitado correctamente el tipo de insumo.');
      });
    }
    this.modalService.dismissAll();
  }


  openModalDisabledSupplie(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalDisabledSupplie(option: boolean, typeSupplyId?: number, index?: number) {
    if (option) {
      this.serviceWorkspaces.disableTypeSupply(typeSupplyId).subscribe(response => {
        this.supplies[index] = response;
        this.toast.success('Ha desactivado correctamente el tipo de insumo.');
      });
    }
    this.modalService.dismissAll();
  }
}
