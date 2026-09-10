import { spawn } from "node:child_process";

const [service = "all", requestedPort] = process.argv.slice(2);
const port = requestedPort ?? process.env.PORT ?? "8080";

const child = spawn(
  process.execPath,
  ["--enable-source-maps", "./dist/index.mjs"],
  {
    env: {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV ?? "development",
      SERVICE: service,
      PORT: String(port),
    },
    stdio: "inherit",
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on("error", (error) => {
  console.error(`Unable to start ${service} service:`, error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});