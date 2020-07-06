import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PreviewService } from 'src/app/services/preview/preview.service';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import Group from 'ol/layer/Group';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { get as getProjection } from 'ol/proj';
import { getWidth } from 'ol/extent';
import TileGrid from 'ol/tilegrid/TileGrid';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { containsExtent } from 'ol/extent';

//declare var turf: any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {

  @ViewChild('pdfviewer', { static: true }) pdfviewer: ElementRef;
  @Input() files: FileList = null;

  @Input() url: string = '';
  @Input() icon = false;

  showmap = true;
  pdfdata = null;
  valid = false;
  validCTM12 = false;

  crs = 'una proyección desconocida';


  layers = [];
  map: any;

  image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 })
  });

  styles = {
    'Point': new Style({
      image: this.image
    }),
    'LineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 2
      })
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1
      })
    }),
    'MultiPoint': new Style({
      image: this.image
    }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)'
      })
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    }),
    'GeometryCollection': new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2
      }),
      fill: new Fill({
        color: 'magenta'
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: 'magenta'
        })
      })
    }),
    'Circle': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)'
      })
    })
  };

  constructor(
    private modalService: ModalService,
    private previewService: PreviewService
  ) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.url && changes.url.currentValue) {
      this.getPreviewUrl(changes.url.currentValue);
    }
  }

  ngOnInit(): void {
  }

  clickbtn() {
    this.modalService.open('mapPreview');
    if (this.showmap) {

      if (this.map !== null && this.map !== undefined) {
        this.map.setTarget(null);
        this.map = null;
      }

      if (this.map == null) {

        var projExtent = getProjection('EPSG:3857').getExtent();
        var startResolution = getWidth(projExtent) / 256;
        var resolutions = new Array(22);
        for (var i = 0, ii = resolutions.length; i < ii; ++i) {
          resolutions[i] = startResolution / Math.pow(2, i);
        }
        var tileGrid = new TileGrid({
          extent: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
          resolutions: resolutions,
          tileSize: [512, 256]
        });

        proj4.defs("EPSG:38820", "+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        register(proj4);

        const swissProjection = getProjection('EPSG:38820');

        this.map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
              tileGrid: tileGrid
            })
          ],
          view: new View({
            projection: swissProjection,
            center: [5000000, 2000000],
            zoom: 8
          })
        });
      } else {
        this.map.setLayerGroup(new Group());
      }
      this.loadLayers();
    } else {
      this.pdfviewer.nativeElement.src = this.pdfdata;
    }
  }

  getPreviewUrl(file: string) {
    this.previewService.getLayersSupply(file).subscribe((data: any) => {
      if (data) {
        this.layers.push(data);
        this.valid = true;
      } else {
        this.valid = false;
      }
    }, (e) => {
      this.valid = false;
    });
  }

  styleFunction(feature) {
    return this.styles[feature.getGeometry().getType()];
  }

  loadLayers() {
    this.validCTM12 = true;
    for (let l of this.layers) {

      if (l.crs && l.crs.properties.name) {
        let crsname: string = l.crs.properties.name;
        this.crs = crsname.split('crs:')[1];
      }

      let params: any = {
        dataProjection: 'EPSG:38820'
      };
      let validation = (new GeoJSON()).readFeatures(l);
      for (let f of validation) {
        if (!containsExtent(f.getGeometry().getExtent(), [ 5700000, 3100000, 3980000, 1080000])) {
          this.validCTM12 = false;
          params = {
            featureProjection: 'EPSG:38820'
          };
          break;
        }
      }

      let features = (new GeoJSON(params)).readFeatures(l);
      
      let vectorSource = new VectorSource({
        features: features,
        loader: function () {
          this.map.getView().fit(vectorSource.getExtent());
        }.bind(this)
      });
      let vectorLayer = new VectorLayer({
        source: vectorSource,
        style: this.styleFunction.bind(this)
      });
      this.map.addLayer(vectorLayer);
      
    }
  }

}
