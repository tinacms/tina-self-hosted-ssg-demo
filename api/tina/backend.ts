import {
  LocalBackendAuthentication,
  TinaNodeBackend,
} from "@tinacms/datalayer";
import { AuthJsBackendAuthentication, TinaAuthJSOptions } from "tinacms-authjs";
import databaseClient from "../../tina/__generated__/databaseClient";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

console.log(isLocal);

const tinaBackend = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : AuthJsBackendAuthentication({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
          debug: true,
        }),
      }),
  databaseClient,
});

// const tinaBackend = TinaNodeBackend({
//   authentication: LocalBackendAuthentication(),
//   databaseClient,
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = async (req: VercelRequest, res: VercelResponse) => {
  // console.log("WORKING");

  // Localhost is a dummy value since we are only interested in the pathname
  const url = new URL(req.url || "", "https://localhost:3000");
  const routes = url.pathname.replace("/api/tina/", "").split("/") || [];

  console.log("routes", routes);
  req.query = {
    ...(req.query || {}),
    routes,
  };
  console.log(req.url, url.pathname);
  // strip out query params
  req.url = url.pathname;
  console.log("req.query", req.query);

  tinaBackend(req, res);
};

export default handler;
