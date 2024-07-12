

export interface Carnet {
    name?: string;
    lastname?: string;
    card_code?: string;
    expiration: Date;
    note?: string;
    cedule?: string;
    //extent?: string;
    address?: string;
    //phone?: string;
    cellpone?: string;
    photo?: string;
    qr?: string;

    department?: number;
    charge?: number;
    type_creations: number;
    //textures?: number;
    status?: number;// activo = 1, Inactivo = 2  
    access_levels?: number;
    //genders?: number;
    //hair_colors?: number;
    state?: number;
    municipalities?: string;
    parishes?: string;
    //skin_colors?: number;
    //civil_statuses?: number;
    created_at?: Date;
    updated_at?: Date;
}

interface Department {
    id?: number;
    name: string;
}

interface Charge {
    id?: number;
    name: string;
}

interface State {
    id?: number;
    name: string;
}
interface Access_levels {
    id?: number;
    name: string;
}

interface Status {
    id?: number;
    name: string;
}


export interface carnet2 {
    id?: number;
    name?: string;
    lastname?: string;
    card_code?: string;
    expiration: Date;
    note?: string;
    cedule?: string;
    address?: string;
    cellpone?: string;
    photo?: string;
    qr?: string;
    department?: Department;
    charge?: Charge;
    status?: Status;// activo = 1, Inactivo = 2  
    access_levels?: Access_levels;
    state?: State;
    municipalities?: string;
    parishes?: string;
    created_at?: Date;
    updated_at?: Date;
}


export interface CarnetsResponse {
  carnets: carnet2[];
  lastPage:number;
  page:number;
  total:number;
}
