export interface User {
  id: string;
  image: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  sneakersId: string[];
  basket: [
    {
      _id:string;
      brand: string;
      size: string;
      technology: string;
      season: string;
      prise: string;
      photo: string
    }
  ];
}

export interface UserForAuth {
  email: string;
  username: string;
  _id: string;
  image: string;
  tel: string;
  password: string;
  basket: [
    {
      _id:string;
      brand: string;
      size: string;
      technology: string;
      season: string;
      prise: string;
      photo: string;
    }
  ];
}
