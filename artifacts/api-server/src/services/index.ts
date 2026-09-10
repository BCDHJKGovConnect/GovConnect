import type { Express } from "express";
import connectorRouter from "./connector/routes";
import identityRouter from "./identity/routes";
import propertyRouter from "./property/routes";
import revenueRouter from "./revenue/routes";

const routes = {
  identity: { prefix: "/identity", router: identityRouter },
  property: { prefix: "/property", router: propertyRouter },
  revenue: { prefix: "/revenue", router: revenueRouter },
  connector: { prefix: "/connectors", router: connectorRouter },
} as const;

export function mountServiceRoutes(app: Express, service: string): void {
  if (service === "all") {
    Object.values(routes).forEach(({ prefix, router }) => {
      app.use(prefix, router);
      app.use(`/api${prefix}`, router);
    });
  } else if (service in routes) {
    const selected = routes[service as keyof typeof routes];
    app.use(selected.prefix, selected.router);
  } else {
    throw new Error(
      `Unknown SERVICE "${service}". Use all, identity, property, revenue, or connector.`,
    );
  }
}