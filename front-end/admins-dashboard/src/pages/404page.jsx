import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground">
          404
        </h1>
        <p className="mt-4 text-muted-foreground">
          Oops, the page you are looking for could not be found.
        </p>
        <div className="mt-6">
          <Link
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
            prefetch={false}
            style={{ textDecoration: "none" }}
            to={"/"}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
