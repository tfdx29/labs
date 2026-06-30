import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { Worker } from "alchemy/cloudflare";
import { D1Database } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  config({ path: "../../apps/web/.env" });
  config({ path: "../../apps/server/.env" });
}

const app = await alchemy("labs");

const db = await D1Database("database", {
  name: "labs-db",
  migrationsDir: "../../packages/db/src/migrations",
});

export const server = await Worker("server", {
  name: "labs-api",
  cwd: "../../apps/server",
  entrypoint: "src/index.ts",
  compatibility: "node",
  url: true,
  bindings: {
    DB: db,
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
  },
  dev: {
    port: 8085,
  },
});

export const web = await Vite("web", {
  name: "labs",
  cwd: "../../apps/web",
  assets: "dist",
  entrypoint: "src/worker.ts",
  bindings: {
    VITE_SERVER_URL: server.url!.replace(/\/$/, ""),
    SERVER: server,
  },
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

await app.finalize();
