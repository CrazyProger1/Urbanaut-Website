import {
  HeroSection,
  LeaderboardSection,
  NewsSection,
  StatsSection,
} from "@/components/modules/main";
import { getSession } from "@/utils/session";
import { getGlobalStats, getLatestNews, getUsers } from "@/services";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const Page = async ({}: Props) => {
  const session = await getSession();
  const stats = await getGlobalStats();
  const news = await getLatestNews();
  const users = await getUsers();

  return (
    <main className="flex-1 overflow-x-hidden">
      <HeroSection isAuthenticated={!!session} />

      {stats.success && <StatsSection stats={stats} />}

      {users.success && users.results.length > 0 && <LeaderboardSection users={users.results} />}

      {news.success && news.results.length > 0 && <NewsSection news={news.results} />}

      {/*<section className="mx-auto max-w-6xl px-6 py-14">*/}
      {/*  <div className="mb-8 flex items-center justify-between">*/}
      {/*    <div>*/}
      {/*      <h2 className="text-2xl font-bold">Top Abandoned Objects</h2>*/}
      {/*      <p className="text-muted-foreground mt-1 text-sm">*/}
      {/*        Most visited places by the community*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <Button variant="ghost" size="sm" asChild>*/}
      {/*      <Link href={PAGES.MAP}>*/}
      {/*        View all <ChevronRight className="size-4" />*/}
      {/*      </Link>*/}
      {/*    </Button>*/}
      {/*  </div>*/}

      {/*  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">*/}
      {/*    {MOCK_PLACES.map((place) => {*/}
      {/*      const ps = PRESERVATION_STYLES[place.preservation] ?? PRESERVATION_STYLES.NONE;*/}
      {/*      return (*/}
      {/*        <Card*/}
      {/*          key={place.id}*/}
      {/*          className="group cursor-pointer overflow-hidden py-0 transition-transform duration-200 hover:scale-[1.02]"*/}
      {/*        >*/}
      {/*          /!* Photo placeholder *!/*/}
      {/*          <div*/}
      {/*            className={`relative h-44 bg-linear-to-br ${place.gradient} flex items-end p-3`}*/}
      {/*          >*/}
      {/*            <div className="absolute inset-0 bg-black/20" />*/}
      {/*            <div className="relative flex flex-wrap gap-1.5">*/}
      {/*              {place.tags.map((tag) => (*/}
      {/*                <span*/}
      {/*                  key={tag}*/}
      {/*                  className="rounded px-1.5 py-0.5 text-[10px] text-white/80"*/}
      {/*                  style={{ background: "rgba(0,0,0,0.45)" }}*/}
      {/*                >*/}
      {/*                  #{tag}*/}
      {/*                </span>*/}
      {/*              ))}*/}
      {/*            </div>*/}
      {/*          </div>*/}

      {/*          <CardContent className="pt-4 pb-4">*/}
      {/*            <div className="mb-1 flex items-start justify-between gap-2">*/}
      {/*              <p className="text-sm leading-snug font-semibold">{place.name}</p>*/}
      {/*              <span*/}
      {/*                className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"*/}
      {/*                style={{ background: ps.bg }}*/}
      {/*              >*/}
      {/*                {ps.label}*/}
      {/*              </span>*/}
      {/*            </div>*/}
      {/*            <p className="text-muted-foreground mb-3 flex items-center gap-1 text-xs">*/}
      {/*              <MapPin className="size-3" />*/}
      {/*              {place.location}*/}
      {/*            </p>*/}
      {/*            <div className="text-muted-foreground flex gap-4 text-xs">*/}
      {/*              <span className="flex items-center gap-1">*/}
      {/*                <Eye className="size-3" /> {place.views.toLocaleString()}*/}
      {/*              </span>*/}
      {/*              <span className="flex items-center gap-1">*/}
      {/*                <Heart className="size-3" /> {place.favorites}*/}
      {/*              </span>*/}
      {/*            </div>*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</section>*/}
    </main>
  );
};

export default Page;
