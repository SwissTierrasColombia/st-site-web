export interface FeaturesObjectEspecial {
    type: string;
    features: Feature[];
    totalFeatures: number;
    numberMatched: number;
    numberReturned: number;
    timeStamp: string;
    crs: Crs;
    bbox: number[];
}

export interface Crs {
    type: string;
    properties: Properties2;
}

export interface Properties2 {
    name: string;
}

export interface Feature {
    type: string;
    id: string;
    geometry: Geometry;
    geometry_name: string;
    properties: Properties;
}

export interface Properties {
    t_id: number;
    t_basket: number;
    t_datasetname: string;
    tipoproteccion: string;
    dimension?: any;
    etiqueta?: any;
    relacion_superficie?: any;
    su_espacio_de_nombres: string;
    su_local_id: string;
    nivel?: any;
    uej2_la_unidadespacial?: any;
    uej2_zonaproteccion?: any;
    uej2_la_espaciojuridicoredservicios?: any;
    uej2_la_espaciojuridicounidadedificacion?: any;
    comienzo_vida_util_version: string;
    fin_vida_util_version?: any;
    bbox: number[];
}

export interface Geometry {
    type: string;
    coordinates: number[][][][];
}