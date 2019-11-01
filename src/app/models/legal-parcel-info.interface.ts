export interface LegalParcelInfo {
  id: number;
  attributes: Attributes11;
}

interface Attributes11 {
  'Área de terreno [m2]': number;
  predio: Predio[];
}

interface Predio {
  id: number;
  attributes: Attributes10;
}

interface Attributes10 {
  Nombre: string;
  NUPRE: string;
  FMI: string;
  'Número predial': string;
  'Número predial anterior': string;
  col_derecho: Colderecho[];
  col_restriccion: Colrestriccion[];
  col_responsabilidad: Colresponsabilidad[];
  col_hipoteca: any[];
}

interface Colresponsabilidad {
  id: number;
  attributes: Attributes9;
}

interface Attributes9 {
  'Tipo de responsabilidad': string;
  'Código registral': string;
  'Descripción': string;
  col_fuenteadministrativa: Colfuenteadministrativa[];
  col_interesado: Colinteresado3[];
}

interface Colinteresado3 {
  id: number;
  attributes: Attributes8;
}

interface Attributes8 {
  Tipo: string;
  'Cedula Ciudadania': string;
  Nombre: string;
  'Género': string;
  interesado_contacto: any[];
}

interface Colrestriccion {
  id: number;
  attributes: Attributes7;
}

interface Attributes7 {
  'Tipo de restricción': string;
  'Código registral': string;
  'Descripción': string;
  col_fuenteadministrativa: Colfuenteadministrativa[];
  la_agrupacion_interesados: Laagrupacioninteresado[];
}

interface Laagrupacioninteresado {
  id: number;
  attributes: Attributes6;
}

interface Attributes6 {
  'Tipo de agrupación de interesados': string;
  Nombre: string;
  col_interesado: Colinteresado2[];
}

interface Colinteresado2 {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  'Cedula Ciudadania'?: string;
  Nombre: string;
  'Género'?: string;
  interesado_contacto: Interesadocontacto[];
  fraccion: number;
  NIT?: string;
  'Tipo interesado jurídico'?: string;
}

interface Colderecho {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  'Tipo de derecho': string;
  'Código registral': string;
  'Descripción': string;
  col_fuenteadministrativa: Colfuenteadministrativa[];
  col_interesado: Colinteresado[];
}

interface Colinteresado {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  Tipo: string;
  'Cedula Ciudadania': string;
  Nombre: string;
  'Género': string;
  interesado_contacto: Interesadocontacto[];
}

interface Interesadocontacto {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  'Teléfono 1': string;
  'Teléfono 2': string;
  'Domicilio notificación': string;
  'Correo_Electrónico': string;
  Origen_de_datos: string;
}

interface Colfuenteadministrativa {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  'Tipo de fuente administrativa': string;
  Nombre?: any;
  'Estado disponibilidad': string;
  'Archivo fuente': string;
}