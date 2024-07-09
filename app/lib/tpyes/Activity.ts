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

export interface FetchActivities {
  activities: Activity[];
  totalCount: number;
}
