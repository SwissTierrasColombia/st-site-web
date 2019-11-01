
export interface ObjectEspecialRegime {
    objSpecialRegime: ObjSpecialRegime;
    categories: Category2[];
}

export interface Category2 {
    category: Category;
    restrictions: Restriction[];
}

export interface Restriction {
    id: number;
    category: Category;
    restriction: Organization;
}

export interface Category {
    id: number;
    objectSR: ObjSpecialRegime;
    field?: any;
    value?: any;
    urlMasInfo?: any;
    description: string;
}

export interface ObjSpecialRegime {
    id: number;
    organization: Organization;
    model: string;
    object: string;
    wsurl: string;
    createAt: string;
    dueDate: string;
}

export interface Organization {
    id: number;
    name: string;
}