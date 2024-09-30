import { cn } from "@/lib/utils"; // Assuming this is a utility function you've defined

function SidebarNav({ className, items, ...props }) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href} // React Router's Link uses "to" instead of "href"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default SidebarNav;
