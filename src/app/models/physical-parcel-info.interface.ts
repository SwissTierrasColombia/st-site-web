export interface PhysicalParcelInfo {
  id: number;
  attributes: Attributes9;
}

interface Attributes9 {
  'Área registral [m2]': number;
  'Área calculada [m2]': number;
  predio: Predio[];
  col_territorioagricola_terreno_territorio_agricola: Colterritorioagricolaterrenoterritorioagricola[];
  col_bosqueareasemi_terreno_bosque_area_seminaturale: Colterritorioagricolaterrenoterritorioagricola[];
  col_cuerpoagua_terreno_evidencia_cuerpo_agua: Colterritorioagricolaterrenoterritorioagricola[];
  col_explotaciontipo_terreno_explotacion: Colterritorioagricolaterrenoterritorioagricola[];
  col_afectacion_terreno_afectacion: Colterritorioagricolaterrenoterritorioagricola[];
  col_servidumbretipo_terreno_servidumbre: Colterritorioagricolaterrenoterritorioagricola[];
  'Linderos externos': LinderosExternos;
  'Linderos internos': LinderosInternos;
  puntolevantamiento: Puntolevantamiento[];
  col_fuenteespacial: Colfuenteespacial[];
}

interface Colfuenteespacial {
  id: number;
  attributes: Attributes8;
}

interface Attributes8 {
  'Tipo de fuente espacial': string;
  'Estado disponibilidad': string;
  'Tipo principal': string;
  'Fecha de entrega': string;
  'Fecha de grabación': string;
  'Enlace fuente espacial': string;
}

interface Puntolevantamiento {
  id: number;
  attributes: Attributes7;
}

interface Attributes7 {
  coordenadas: string;
}

interface LinderosInternos {
  lindero: any[];
  puntolindero: any[];
}

interface LinderosExternos {
  lindero: Lindero[];
  puntolindero: Puntolindero[];
}

interface Puntolindero {
  id: number;
  attributes: Attributes6;
}

interface Attributes6 {
  Nombre: string;
  coordenadas: string;
}

interface Lindero {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  'Longitud [m]': number;
}

interface Colterritorioagricolaterrenoterritorioagricola {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  avalue: string;
}

interface Predio {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  Nombre: string;
  NUPRE: string;
  FMI: string;
  'Número predial': string;
  'Número predial anterior': string;
  construccion: Construccion[];
}

interface Construccion {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  'Área construcción': number;
  'Ńúmero de pisos'?: number;
  col_fuenteespacial: any[];
  unidadconstruccion: Unidadconstruccion[];
}

interface Unidadconstruccion {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  'Número de pisos': number;
  Uso?: string | string;
  'Puntuación'?: number | number;
  'Tipología'?: string | string;
  'Destino económico'?: string | string;
  'Tipo de construcción'?: string | string;
  'Área privada construida [m2]'?: number;
  'Área construida [m2]': number;
  col_fuenteespacial: any[];
}
