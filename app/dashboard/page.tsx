import { fetchActivities } from '../lib/apis/activities';
import ActivitiesList from '../ui/dashboard/ActivitiesList';
import Pagination from '../ui/dashboard/Pagination';
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
  const { activities, totalCount } = await fetchActivities(query);
  const totalPages = Math.floor(totalCount / 12 + 1);
  return (
    <main>
      <SearchBar placeholder='검색해보세요!' />
      <ActivitiesList activities={activities} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
