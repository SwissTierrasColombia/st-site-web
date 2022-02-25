export class FileIGAC{
    nombre: string
    uuid: string
    tipo: string
    archivo: string
    categoria: string
    entrega: string
}

export class Proceso{
    id: number
}

export class Categoria {
    static readonly INTERESADOS = "INTERESADOS";
    static readonly PREDIO = "PREDIO";
    static readonly TRAMITECATASTRAL = "TRAMITECATASTRAL";
    static readonly TERRENO = "TERRENO";
    static readonly CONSTRUCCION = "CONSTRUCCION";
}