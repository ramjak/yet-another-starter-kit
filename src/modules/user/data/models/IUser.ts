export default interface IUser {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suit: string;
    city: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
}
