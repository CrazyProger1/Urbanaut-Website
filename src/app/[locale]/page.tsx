import Link from "next/link";
import {
  MapPin,
  Eye,
  Heart,
  Users,
  Globe,
  Calendar,
  ChevronRight,
  Trophy,
  Compass,
  Flame,
  Newspaper,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/config";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_PLACES = [
  {
    id: 1,
    name: "Abandoned Textile Factory",
    location: "Kharkiv, Ukraine",
    preservation: "HIGH",
    views: 4821,
    favorites: 312,
    gradient: "from-slate-800 to-slate-600",
    tags: ["factory", "industrial"],
  },
  {
    id: 2,
    name: "Soviet Sanatorium",
    location: "Crimea",
    preservation: "MEDIUM",
    views: 3940,
    favorites: 278,
    gradient: "from-zinc-800 to-zinc-600",
    tags: ["sanatorium", "soviet"],
  },
  {
    id: 3,
    name: "Underground Bunker #7",
    location: "Kyiv, Ukraine",
    preservation: "AWESOME",
    views: 3501,
    favorites: 241,
    gradient: "from-stone-800 to-stone-600",
    tags: ["bunker", "military"],
  },
  {
    id: 4,
    name: "Pripyat Culture Palace",
    location: "Chornobyl Zone",
    preservation: "LOW",
    views: 2988,
    favorites: 190,
    gradient: "from-neutral-800 to-neutral-600",
    tags: ["chernobyl", "culture"],
  },
  {
    id: 5,
    name: "Broken Glass Hospital",
    location: "Dnipro, Ukraine",
    preservation: "NONE",
    views: 2754,
    favorites: 155,
    gradient: "from-gray-800 to-gray-600",
    tags: ["hospital", "medical"],
  },
  {
    id: 6,
    name: "Steel Mill Complex",
    location: "Zaporizhzhia, Ukraine",
    preservation: "HIGH",
    views: 2301,
    favorites: 140,
    gradient: "from-slate-700 to-slate-500",
    tags: ["factory", "steel"],
  },
];

const MOCK_USERS = [
  { rank: 1, username: "ShadowStalker", rankLabel: "LEGEND", score: 4820, places: 143, tier: "legend" },
  { rank: 2, username: "NightCrawler_UA", rankLabel: "STALKER", score: 3210, places: 97, tier: "stalker" },
  { rank: 3, username: "UrbanPhoenix", rankLabel: "STALKER", score: 2980, places: 88, tier: "stalker" },
  { rank: 4, username: "GhostExplorer", rankLabel: "PROFI", score: 2140, places: 64, tier: "profi" },
  { rank: 5, username: "RuinsHunter77", rankLabel: "PROFI", score: 1870, places: 51, tier: "profi" },
];

const MOCK_EXPEDITIONS = [
  {
    id: 1,
    title: "Factory District Night Raid",
    date: "2026-04-12",
    location: "Kyiv, Ukraine",
    difficulty: "HARD",
    spots: 3,
    participants: 5,
  },
  {
    id: 2,
    title: "Soviet Sanatorium Tour",
    date: "2026-04-19",
    location: "Lviv, Ukraine",
    difficulty: "MEDIUM",
    spots: 7,
    participants: 3,
  },
  {
    id: 3,
    title: "Underground Bunker Descent",
    date: "2026-05-03",
    location: "Kharkiv, Ukraine",
    difficulty: "IMPOSSIBLE",
    spots: 2,
    participants: 6,
  },
];

const MOCK_NEWS = [
  {
    id: 1,
    category: "Update",
    title: "New AI-powered place search is now live",
    date: "2026-03-28",
    excerpt:
      "Our new AI search mode lets you describe a place in natural language and find matching locations on the map.",
  },
  {
    id: 2,
    category: "Community",
    title: "March Exploration Challenge results",
    date: "2026-03-22",
    excerpt:
      "Over 340 explorers participated in this month's challenge. See who topped the leaderboard and claimed the prizes.",
  },
  {
    id: 3,
    category: "Feature",
    title: "Expedition planning module — preview",
    date: "2026-03-15",
    excerpt:
      "We're building a full expedition management system. Coordinate teams, share routes, and track group progress.",
  },
];

const STATS = [
  { icon: MapPin, label: "Abandoned Objects", value: "2,847" },
  { icon: Users, label: "Explorers", value: "14,320" },
  { icon: Globe, label: "Countries", value: "38" },
  { icon: Compass, label: "Expeditions", value: "512" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRESERVATION_STYLES: Record<string, { bg: string; label: string }> = {
  NONE:    { bg: "rgba(255,255,255,0.2)", label: "No preservation" },
  LOW:     { bg: "rgba(255,60,60,0.4)",   label: "Low" },
  MEDIUM:  { bg: "rgba(255,220,0,0.4)",   label: "Medium" },
  HIGH:    { bg: "rgba(0,220,80,0.4)",    label: "High" },
  AWESOME: { bg: "rgba(160,0,255,0.4)",   label: "Excellent" },
};

const DIFFICULTY_STYLES: Record<string, { bg: string; label: string }> = {
  EASY:       { bg: "rgba(0,220,80,0.3)",  label: "Easy" },
  MEDIUM:     { bg: "rgba(255,220,0,0.3)", label: "Medium" },
  HARD:       { bg: "rgba(255,60,60,0.3)", label: "Hard" },
  IMPOSSIBLE: { bg: "rgba(160,0,255,0.3)", label: "Impossible" },
};

const RANK_SHADOW: Record<string, string> = {
  rookie:  "drop-shadow(3px 3px 5px rgba(255,255,255,0.3))",
  amateur: "drop-shadow(3px 3px 5px rgba(0,255,0,0.3))",
  profi:   "drop-shadow(3px 3px 5px rgba(255,255,0,0.3))",
  stalker: "drop-shadow(3px 3px 5px rgba(255,0,0,0.3))",
  legend:  "drop-shadow(3px 3px 5px rgba(157,0,255,0.3))",
};

const RANK_COLOR: Record<string, string> = {
  rookie:  "rgba(255,255,255,0.15)",
  amateur: "rgba(0,255,0,0.2)",
  profi:   "rgba(255,255,0,0.2)",
  stalker: "rgba(255,0,0,0.2)",
  legend:  "rgba(157,0,255,0.25)",
};

const CATEGORY_COLOR: Record<string, string> = {
  Update:    "rgba(30,144,255,0.3)",
  Community: "rgba(0,220,80,0.3)",
  Feature:   "rgba(160,0,255,0.3)",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  searchParams: Promise<Record<string, string>>;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Page = async ({}: Props) => {
  return (
    <main className="flex-1 overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-130 items-center overflow-hidden border-b">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-background via-background/95 to-muted/50" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
          <h1 className="mb-4 max-w-2xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Explore the
            <br />
            <span className="text-muted-foreground">Forgotten World</span>
          </h1>

          <p className="mb-8 max-w-xl text-base text-muted-foreground">
            Discover abandoned places, connect with urban explorers, plan expeditions,
            and document history before it disappears forever.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={PAGES.MAP}>
                <MapPin />
                Explore Map
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={PAGES.PROFILE}>
                <Users />
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-6 py-8">
              <Icon className="mb-1 size-5 text-muted-foreground" />
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top Abandoned Objects ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Top Abandoned Objects</h2>
            <p className="mt-1 text-sm text-muted-foreground">Most visited places by the community</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={PAGES.MAP}>
              View all <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PLACES.map((place) => {
            const ps = PRESERVATION_STYLES[place.preservation] ?? PRESERVATION_STYLES.NONE;
            return (
              <Card
                key={place.id}
                className="group cursor-pointer overflow-hidden py-0 transition-transform duration-200 hover:scale-[1.02]"
              >
                {/* Photo placeholder */}
                <div className={`relative h-44 bg-linear-to-br ${place.gradient} flex items-end p-3`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative flex flex-wrap gap-1.5">
                    {place.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-1.5 py-0.5 text-[10px] text-white/80"
                        style={{ background: "rgba(0,0,0,0.45)" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <CardContent className="pb-4 pt-4">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">{place.name}</p>
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
                      style={{ background: ps.bg }}
                    >
                      {ps.label}
                    </span>
                  </div>
                  <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {place.location}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3" /> {place.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" /> {place.favorites}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── Two-column: Leaderboard + Expeditions ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Top Explorers */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Top Explorers</h2>
                <p className="mt-1 text-sm text-muted-foreground">Community leaderboard</p>
              </div>
              <Trophy className="size-5 text-muted-foreground" />
            </div>

            <Card className="py-0">
              <CardContent className="p-0">
                {MOCK_USERS.map((user, idx) => (
                  <div
                    key={user.username}
                    className={`flex items-center gap-4 px-5 py-4${idx < MOCK_USERS.length - 1 ? " border-b" : ""}`}
                  >
                    <span className="w-6 shrink-0 text-center text-sm">
                      {user.rank <= 3 ? ["🥇", "🥈", "🥉"][user.rank - 1] : `#${user.rank}`}
                    </span>

                    <Avatar
                      className="size-9 shrink-0"
                      style={{ filter: RANK_SHADOW[user.tier] }}
                    >
                      <AvatarFallback
                        className="text-xs font-semibold"
                        style={{ background: RANK_COLOR[user.tier] }}
                      >
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.places} places</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white"
                        style={{ background: RANK_COLOR[user.tier] }}
                      >
                        {user.rankLabel}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.score.toLocaleString()} pts
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Expeditions */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Upcoming Expeditions</h2>
                <p className="mt-1 text-sm text-muted-foreground">Join a group exploration</p>
              </div>
              <Compass className="size-5 text-muted-foreground" />
            </div>

            <div className="flex flex-col gap-4">
              {MOCK_EXPEDITIONS.map((exp) => {
                const ds = DIFFICULTY_STYLES[exp.difficulty] ?? DIFFICULTY_STYLES.MEDIUM;
                const expDate = new Date(exp.date);
                return (
                  <Card
                    key={exp.id}
                    className="cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                  >
                    <CardContent className="flex items-start gap-4 py-4">
                      {/* Date block */}
                      <div
                        className="flex shrink-0 flex-col items-center justify-center rounded-lg px-3 py-2 text-center"
                        style={{ background: "rgba(255,255,255,0.06)", minWidth: 52 }}
                      >
                        <span className="text-lg font-bold leading-none">{expDate.getDate()}</span>
                        <span className="mt-0.5 text-[10px] uppercase text-muted-foreground">
                          {expDate.toLocaleString("en-US", { month: "short" })}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-sm font-semibold leading-snug">{exp.title}</p>
                        <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" /> {exp.location}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
                            style={{ background: ds.bg }}
                          >
                            {ds.label}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="size-3" />
                            {exp.participants}/{exp.participants + exp.spots}
                          </span>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="shrink-0">
                        Join
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}

              <Button variant="ghost" size="sm" className="self-start" asChild>
                <Link href={PAGES.CALENDAR}>
                  All expeditions <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── News ──────────────────────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Latest News</h2>
              <p className="mt-1 text-sm text-muted-foreground">Updates from the Urbanaut team</p>
            </div>
            <Newspaper className="size-5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_NEWS.map((news) => {
              const cc = CATEGORY_COLOR[news.category] ?? "rgba(255,255,255,0.1)";
              return (
                <Card
                  key={news.id}
                  className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white"
                        style={{ background: cc }}
                      >
                        {news.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="size-3" />
                        {fmtDate(news.date)}
                      </span>
                    </div>
                    <CardTitle className="text-sm leading-snug">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">{news.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pb-4 pt-0">
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      Read more <ChevronRight className="size-3" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Page;
