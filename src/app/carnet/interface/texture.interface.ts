
export interface Texture {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TextureResponse {
  texture: Texture[];
}


