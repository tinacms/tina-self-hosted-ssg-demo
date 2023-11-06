import express from "express";
import type { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";
import {
  TinaNodeBackend,
  LocalBackendAuthentication,
} from "@tinacms/datalayer";
import { AuthJsBackendAuthentication, TinaAuthJSOptions } from "tinacms-authjs";
import cors from "cors";
import dotenv from "dotenv";

import { databaseClient } from "../../tina/__generated__/databaseClient";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

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

const handleTina: RequestHandler = async (req, res) => {
  const routes = req.params[0].split("/");
  console.log("routes", routes);
  req.query = {
    ...(req.query || {}),
    routes,
  };

  await tinaBackend(req, res);
};

app.post("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  handleTina(req, res, next);
});

app.get("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  handleTina(req, res, next);
});

export const handler = ServerlessHttp(app);
