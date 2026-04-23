import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";

export function CTASection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border/60 bg-background py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to build
          <span className="text-primary"> momentum </span>
          every day?
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Start your first challenge, track your consistency, and turn progress
          into something you can actually see.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/auth/signup">
            <Button variant="secondary" size="lg">
              Get started free
            </Button>
          </Link>

          <Link to="/auth/login">
            <Button variant="outline" size="lg">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}