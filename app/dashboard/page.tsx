import { fetchActivities } from '../lib/apis/activities';
import ActivitiesList from '../ui/dashboard/ActivitiesList';
import SearchBar from '../ui/dashboard/SearchBar';

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    keyword?: string;
  };
}) {
  const query = searchParams || {};
  const { activities } = await fetchActivities(query);
  return (
    <main>
      <SearchBar placeholder='검색해보세요!' />
      <ActivitiesList activities={activities} />
    </main>
  );
}
