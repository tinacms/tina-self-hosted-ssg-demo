import express, { RequestHandler } from "express";
import {
  TinaNodeBackend,
  LocalBackendAuthentication,
} from "@tinacms/datalayer";
import { AuthJsBackendAuthentication, TinaAuthJSOptions } from "tinacms-authjs";
import cookieParser from "cookie-parser";

import cors from "cors";
import dotenv from "dotenv";

import { databaseClient } from "../tina/__generated__/databaseClient";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static("_site"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : AuthJsBackendAuthentication({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

const handleTina: RequestHandler = async (req, res) => {
  req.query = {
    ...(req.query || {}),
    routes: req.params[0].split("/"),
  };

  await handler(req, res);
};

app.post("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  handleTina(req, res, next);
});

app.get("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  handleTina(req, res, next);
});

app.listen(port, () => {
  console.log(`express backend listing on port ${port}`);
});
