import axiosInstance from '../axios/instance';
import { FetchActivities } from '../tpyes/Activity';

export async function fetchActivities({
  page = '1',
  size = '12',
  keyword,
}: {
  page?: string;
  size?: string;
  keyword?: string;
}): Promise<FetchActivities> {
  const params = new URLSearchParams({
    method: 'offset',
    page,
    size,
  });

  if (keyword) {
    params.set('keyword', keyword);
  }

  try {
    const response = await axiosInstance.get(
      `/activities?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
