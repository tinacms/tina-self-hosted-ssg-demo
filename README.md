# TinaCMS Self-Hosted Static Site Demo

This is a demo of how one can self-host TinaCMS with a static site that does not utilize Next.js. This demo is set up to use [Vercel Functions](https://tina.io/docs/self-hosted/tina-backend/vercel-functions/) and [Netlify Functions](https://tina.io/docs/self-hosted/tina-backend/netlify-functions/) to host the [Tina backend](https://tina.io/docs/self-hosted/overview/).

This site is setup to use 11ty for the static site generator, but you can use any static site generator you want.

## Overview

This demo uses the [MongoDB database adapter](https://tina.io/docs/reference/self-hosted/database-adapter/mongodb/), [AuthJS authentication](https://tina.io/docs/reference/self-hosted/authentication-provider/next-auth/), and the [GitHub git provider](https://tina.io/docs/reference/self-hosted/git-provider/github/). These can be replaced with other adapters/providers as needed.

## Setup Instructions

### Setting Up MongoDB

You can use a local or remote MongoDB database. You'll need to provide the connection string in the `.env` file.

Check out [this guide](https://www.mongodb.com/basics/create-database) on how to create a free MongoDB database.

### Configuring Environment Variables

Copy the `.env.sample` and provide the appropriate values:

```bash
cp .env.sample .env
```

`GITHUB_OWNER`: The owner of the github repo you want to use
`GITHUB_REPO`: The name of the github repo you want to use
`GITHUB_BRANCH`: The branch of the github repo you want to use
`GITHUB_PERSONAL_ACCESS_TOKEN`: A [github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) with repo access to both read and write
`MONGO_URI`: The connection string for your MongoDB database
`NEXTAUTH_SECRET`: A random string used to encrypt the session

## Instal dependencies

```
yarn install
```

#### Setup with Vercel functions

When using vercel functions, your backend function is location at `/api/tina/backend.ts`.

To install the Vercel CLI, run:

```
yarn global add vercel
```

To run the app locally:

```
vercel dev
```

This will start the Vercel function and run the app locally.

### Setup with Netlify functions

When using netlify functions, your backend function is location at `netlify/functions/tina.ts`.

To install the Netlify CLI, run:

```
yarn global add netlify-cli
```

To run the app locally:

```
netlify dev
```

## Testing auth

Set `TINA_PUBLIC_IS_LOCAL` to "false" to test your auth integration locally

## Troubleshooting

If you are having issues please check out the [self hosted docs](https://tina.io/docs/self-hosted/overview/)

## Support

If you have any questions, please reach out to us on [Discord](https://discord.com/invite/zumN63Ybpf). We are happy to help!
