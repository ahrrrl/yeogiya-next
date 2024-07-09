import { fetchActivities } from '../lib/apis/activities';

export default async function Dashboard() {
  const { activities } = await fetchActivities();
  return (
    <main>
      {activities.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.price}</div>
          </div>
        );
      })}
    </main>
  );
}
