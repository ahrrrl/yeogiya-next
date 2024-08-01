export interface Activity {
  id: number;
  title: string;
  userId: number;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface FetchActivities {
  activities: Activity[];
  totalCount: number;
}

export interface SchedulePlusId extends Schedule {
  id: number;
}

interface SubImageUrls {
  id: number;
  imageUrl: string;
}

export interface SpaceDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImageUrls[];
  schedules: SchedulePlusId[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
