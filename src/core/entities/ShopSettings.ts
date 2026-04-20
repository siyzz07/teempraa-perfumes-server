export interface ShopSettings {
  id?: string;
  shopName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  profilePic?: string;
  coverPhotos?: string[];
  location?: {
    lat: number;
    lng: number;
  };
}
