

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
