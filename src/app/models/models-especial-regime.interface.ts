export interface ModelsEspecialRegime {
  entity: number;
  name: string;
  topics: Topic[];
}

export interface Topic {
  name: string;
  models: Model[];
}

export interface Model {
  name: string;
  url: string;
  objects: Object[];
}

export interface Object {
  name: string;
  url: string;
}