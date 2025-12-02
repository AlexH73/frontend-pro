export interface ApodItem {
  copyright?: string;
  date: string;
  explanation: string;
  media_type: 'image' | 'video';
  title: string;
  url: string;
  hdurl?: string;
  thumbnail_url?: string;
}

export interface ApodState {
  apodOfTheDay: ApodItem | null;
  randomApods: ApodItem[];
  loading: boolean;
  error: string | null;
  selectedDate: string | null;
  selectedImageIndex: number | null;
}
