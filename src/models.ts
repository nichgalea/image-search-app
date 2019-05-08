export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface ImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: any;
  portfolio_url?: any;
  bio?: any;
  location: string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username?: any;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}

export interface UnsplashImage {
  id: string;
  created_at: Date;
  updated_at: Date;
  width: number;
  height: number;
  color: string;
  description?: any;
  alt_description: string;
  urls: Urls;
  links: ImageLinks;
  categories: any[];
  sponsored: boolean;
  sponsored_by?: any;
  sponsored_impressions_id?: any;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  user: User;
  tags: any[];
}

export interface FavouriteGroup {
  name: string;
  description: string;
  list: UnsplashImage[];
}
