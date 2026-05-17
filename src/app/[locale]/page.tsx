import {
  HeroSection,
  LeaderboardSection,
  NewsSection,
  StatsSection,
} from "@/components/modules/main";
import { getSession } from "@/utils/session";
import { getGlobalStats, getNews, getTeams, getUsers } from "@/services";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const Page = async ({}: Props) => {
  const session = await getSession();
  const stats = await getGlobalStats();
  const news = await getNews({ ordering: "-published_at" });
  const users = await getUsers({ ordering: "-score" });
  const teams = await getTeams({ ordering: "-score" });

  return (
    <main className="flex-1 overflow-x-hidden">
      <HeroSection isAuthenticated={!!session} />

      {stats.success && <StatsSection stats={stats} />}

      {users.success && users.results.length > 0 && (
        <LeaderboardSection users={users.results} teams={teams.results} />
      )}

      {news.success && news.results.length > 0 && <NewsSection news={news.results} />}
    </main>
  );
};

export default Page;
