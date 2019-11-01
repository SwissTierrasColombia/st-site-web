export interface EconomicParcelInfo {
  id: number;
  attributes: Attributes8;
}

interface Attributes8 {
  'Área de terreno [m2]': number;
  'Avalúo terreno [COP]': number;
  zona_homogenea_geoeconomica: Zonahomogeneageoeconomica[];
  zona_homogenea_fisica: Zonahomogeneafisica[];
  predio: Predio[];
}

interface Predio {
  id: number;
  attributes: Attributes7;
}

interface Attributes7 {
  Nombre: string;
  Departamento: string;
  Municipio: string;
  Zona: string;
  NUPRE: string;
  FMI: string;
  'Número predial': string;
  'Número predial anterior': string;
  'Avalúo predio [COP]'?: any;
  Tipo: string;
  'Destinación económica': string;
  construccion: Construccion[];
}

interface Construccion {
  id: number;
  attributes: Attributes6;
}

interface Attributes6 {
  'Área construcción': number;
  unidadconstruccion: Unidadconstruccion[];
}

interface Unidadconstruccion {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  'Número de pisos': number;
  'Área construida [m2]': number;
  Uso?: string | string;
  'Destino económico'?: string | string;
  'Tipología'?: string | string;
  'Puntuación'?: number | number;
  'Valor m2 construcción [COP]'?: number | number;
  'Año construcción'?: string | string;
  'Estado conservación'?: string | string;
  'Número de habitaciones'?: number | number;
  'Número de baños'?: number | number;
  'Número de cocinas'?: number | number;
  'Número de oficinas'?: number | number;
  'Número de estudios'?: number | number;
  'Número de bodegas'?: number | number;
  'Numero de locales'?: number | number;
  'Número de salas'?: number | number;
  'Número de comedores'?: number | number;
  Material?: string | string;
  Estilo?: string | string;
  Acceso?: string | string;
  'nivel de acceso'?: number | number;
  'Ubicación en copropiedad'?: string | string;
  'Disposición'?: string | string;
  Funcionalidad?: string | string;
  'Tipo de construcción'?: string | string;
  'Calificación': Calificacin | Calificacin2 | any[];
}

interface Calificacin2 {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  'Tipo calificar': string;
  'Armazón': string;
  'Puntos armazón': number;
  Muros: string;
  'Puntos muro': number;
  Cubierta: string;
  'Puntos cubierta': number;
  'Conservación estructura': string;
  'Puntos estructura conservación': number;
  'Subtotal estructura': number;
  Fachada: string;
  'Puntos fachada': number;
  'Cubrimientos muros': string;
  'Puntos cubrimiento muros': number;
  Piso: string;
  'Puntos piso': number;
  'Conservación acabados': string;
  'Puntos conservación acabados': number;
  'Subtotal acabados': number;
  'Tamaño baño': string;
  'Puntos tamaño baño': number;
  'Enchape baño': string;
  'Puntos enchape baño': number;
  'Mobiliario baño': string;
  'Puntos mobiliario baño': number;
  'Conservación baño': string;
  'Puntos conservación baño': number;
  'Subtotal baño': number;
  'Tamaño cocina': string;
  'Puntos tamaño cocina': number;
  'Enchape cocina': string;
  'Puntos enchape cocina': number;
  'Mobiliario cocina': string;
  'Puntos mobiliario cocina': number;
  'Conservación cocina': string;
  'Puntos conservacion cocina': number;
  'Subtotal cocina': number;
  'Total residencial y comercial': number;
  Cerchas: string;
  'Puntos cerchas': number;
  'Total industrial': number;
}

interface Calificacin {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  'Tipo de anexo': string;
  'Descripción anexo': string;
  'Puntaje anexo': string;
}

interface Zonahomogeneafisica {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  Porcentaje: number;
  Identificador: string;
}

interface Zonahomogeneageoeconomica {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  Porcentaje: number;
  Valor: number;
  Identificador: string;
}