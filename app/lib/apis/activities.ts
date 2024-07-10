import { BASE_URL } from '../constant';
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

  const url = `${BASE_URL}/activities?${params.toString()}`;

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
