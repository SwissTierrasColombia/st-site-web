import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { environment } from 'src/environments/environment';
import { PreviewService } from 'src/app/services/preview/preview.service';

declare var mapboxgl: any;
declare var turf: any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {

  @ViewChild('pdfviewer', { static: true }) pdfviewer: ElementRef;

  @Input() files: FileList = null;

  showmap = true;

  pdfdata = null;

  valid = false;

  layers = [];

  map: any;
  colors = [
    '#730071'
  ];
  /*
  colors = [
    '#D6F6DD',
    '#DAC4F7',
    '#F4989C',
    '#EBD2B4',
    '#ACECF7',
    '#d8ddea',
    '#e3cbd6',
    '#dcd9c5',
    '#d0c2ca'
  ];
  */
  icolor = 0;

  constructor(
    private modalService: ModalService,
    private previewService: PreviewService
  ) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.files.currentValue) {
      this.getPreview(this.files);
    }
  }

  ngOnInit(): void {
  }

  clickbtn() {
    this.modalService.open('mapPreview');
    if (this.showmap) {
      mapboxgl.accessToken = environment.mapboxglToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.0837, 4.6380],
        zoom: 5
      });
      this.map.on('load', function () {
        console.log('A render event occurred.');
        this.loadLayers();
      }.bind(this));
    } else {
      this.pdfviewer.nativeElement.src = this.pdfdata;
    }
  }

  getPreview(files: FileList) {
    this.valid = false;
    this.layers = [];
    for (let i = 0; i < files.length; i++) {
      let ext = this.previewService.getFileExt(files.item(i).name);
      switch (ext) {
        case 'xtf': case 'xml': case 'ili':
          this.showmap = true;
          let promises = [];
          this.previewService.getLayersList(files).subscribe((data: any) => {
            for (const d of data) {
              for (const l of d.spatial_datasets) {
                let promise = new Promise(function (resolve, reject) {
                  this.previewService.getLayer(d.result_id, l.key, 'json').subscribe((geojson: any) => {
                    this.layers.push(geojson);
                    console.log("OK");
                    
                    resolve("Added");
                  });
                }.bind(this));
                promises.push(promise);
              }
            }
            Promise.all(promises)
              .then(function () {
                console.log("Ok layers", this.layers);
                
                if (this.layers.length>0) {
                  this.valid = true;
                }
              }.bind(this), function () {
                // one or more failed
              });
          });
          break;
        case 'shp':
          this.showmap = true;
          this.previewService.getLayersShp(files).subscribe((data: any) => {
            this.layers.push(data);
            this.valid = true;
          });
          break;
        case 'gpkg':
          this.showmap = true;
          this.previewService.getLayersGpkg(files).subscribe((data: any) => {
            this.layers.push(data);
            this.valid = true;
          });
          break;
        case 'pdf':
          this.showmap = false;
          this.pdfdata = URL.createObjectURL(files[0]);
          this.valid = true;
          break;
      }
    }

  }

  loadLayers() {

    let features = [];
    for (let l of this.layers) {
      this.map.addSource(l.name, {
        type: 'geojson',
        data: l
      });
      this.map.addLayer({
        id: l.name,
        type: 'fill',
        source: l.name,
        paint: {
          'fill-color': this.colors[this.icolor],
          'fill-opacity': 0.3
        },
        filter: ['==', '$type', 'Polygon']
      });

      this.icolor++;
      if (this.icolor > (this.colors.length - 1)) {
        this.icolor = 0;
      }

      for (let j of l.features) {
        features.push(j);
      }

    }

    var bbox = turf.bbox({
      type: 'FeatureCollection',
      features: features
    });

    this.map.fitBounds(bbox, {
      padding: 20
    });

  }

}
