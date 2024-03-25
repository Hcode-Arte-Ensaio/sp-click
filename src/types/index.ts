export interface PlaceType {
  id: number;
  name: string;
  city: string;
  state: string;
  cep: string;
  linkSite: string;
  longDescription: string;
  shortDescription: string;
  categoryId: any;
  thumbPath: string;
}

export interface FileType {
  path: string;
}

export interface CategoryType {
  id: number;
  name: string;
}
