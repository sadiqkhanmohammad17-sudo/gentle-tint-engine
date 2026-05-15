import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";
import App from "../App";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Smile Dental Care — Yellow Edition" },
      {
        name: "description",
        content:
          "Smile Dental Care — advanced dental treatments with a warm, golden touch.",
      },
      { property: "og:title", content: "Smile Dental Care — Yellow Edition" },
      {
        property: "og:description",
        content: "Where advanced technology meets compassionate care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Smile Dental Care — Yellow Edition" },
      { name: "description", content: "Golden Glow Redesign updates a website's visual theme to a yellowish color palette." },
      { property: "og:description", content: "Golden Glow Redesign updates a website's visual theme to a yellowish color palette." },
      { name: "twitter:description", content: "Golden Glow Redesign updates a website's visual theme to a yellowish color palette." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd4566f5-b663-4cf1-81cb-36913c7882ff/id-preview-ab045e4f--6b239028-57ee-4d53-ad3e-6e4706ec2c4e.lovable.app-1778829315984.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd4566f5-b663-4cf1-81cb-36913c7882ff/id-preview-ab045e4f--6b239028-57ee-4d53-ad3e-6e4706ec2c4e.lovable.app-1778829315984.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

function RootComponent() {
  return (
    <>
      <ClientOnly>
        <App />
      </ClientOnly>
      <Outlet />
    </>
  );
}
