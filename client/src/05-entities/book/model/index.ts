export interface IRawBook {
  title?: string;
  desc?: string;
  pages?: string;
  hasBeenRead?: boolean;
  author?: string;
  picture?: string;
}

export interface IBook extends IRawBook {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  User?: {
    name: string;
  };
}

export interface IUpdateBookPayload extends IRawBook {
  id: number;
}
