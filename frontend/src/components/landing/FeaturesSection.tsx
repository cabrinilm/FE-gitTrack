import type { LandingFeatureItem } from "@/components/landing/types";

const features: LandingFeatureItem[] = [
  {
    title: "Daily challenge tracking",
    description:
      "Create focused challenges and stay clear on what needs to be completed each day.",
    tag: "Stay consistent",
    accent: "primary",
  },
  {
    title: "Activity-based progress",
    description:
      "Break bigger goals into small activities and track each completion with less friction.",
    tag: "Small wins",
    accent: "secondary",
  },
  {
    title: "Visual heatmap progress",
    description:
      "See your consistency over time and quickly spot strong periods or gaps in your routine.",
    tag: "Visible growth",
    accent: "success",
  },
  {
    title: "Simple routine building",
    description:
      "Turn habits and goals into a repeatable system that is easier to follow every week.",
    tag: "Build momentum",
    accent: "muted",
  },
];

const accentStyles: Record<
  NonNullable<LandingFeatureItem["accent"]>,
  string
> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-emerald-500/10 text-emerald-600",
  muted: "bg-background text-text-secondary border border-border/70",
};

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Core features
          </span>

          <h2 className="mb-5 text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
            Built to help you
            <br />
            follow through
          </h2>

          <p className="text-base leading-7 text-text-secondary sm:text-lg">
            GitTrack gives you a simple structure for tracking challenges,
            completing activities, and making progress visible.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-3xl border border-border/80 bg-surface p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
            >
              <div
                className={`mb-5 inline-flex rounded-2xl px-3 py-2 text-sm font-semibold ${accentStyles[feature.accent ?? "muted"]}`}
              >
                {feature.tag}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-text-primary">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-text-secondary">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}