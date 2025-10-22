export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export interface HookInfo {
  name: string;
  purpose: string;
  accepts: string;
  returns: string;
  example: string;
  color: string;
}

export interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}
