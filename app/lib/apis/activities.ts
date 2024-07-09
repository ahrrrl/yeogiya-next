interface Activitie {
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

interface FetchActivities {
  activities: Activitie[];
  totalCount: number;
}
export async function fetchActivities(
  page = 1,
  size = 20
): Promise<FetchActivities> {
  const url = `https://sp-globalnomad-api.vercel.app/3-6/activities?method=offset&page=${page}&size=${size}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
