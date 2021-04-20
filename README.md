# Nano React App Default Typescript Template

The default template project for [nano-react-app](https://github.com/adrianmcli/nano-react-app).

- `npm start` — This will spawn a development server with a default port of `3000`.
- `npm run build` — This will output a production build in the `dist` directory.
- `npm run typecheck` — This will run `tsc --noEmit` which basically just typechecks your project.
- `npm run typewatch` — This will run `tsc --noEmit --watch` which will typecheck your project as you make changes.

## Typechecking

Unforunately, Parcel does not perform typechecking. So you will need to make use of the `typecheck` and `typewatch` scripts above.

## Architecture

All React components are under `src/components`.

They are hooked up to a redux store in `src/index.ts`. The store is described in `src/redux/store.ts`.

The React components call apis via hooks, located in `src/hooks/*`. Each api has it's own hook.

The hooks then call the apis via Axios. The axios calls are wrapped in functions inside `src/api/callApi.ts`.
The hooks also update the `loading` state and `response` state via the actions described in `src/redux/*`.

## Deploy to GitHub Pages

You can also deploy your project using GitHub pages.
First install the `gh-pages` [package](https://github.com/tschaub/gh-pages):

`npm i -D gh-pages`

With Parcel's `--public-url` flag, use the following scripts for deployment:

```
"scripts": {
  "start": "parcel index.html",
  "build": "parcel build index.html --public-url '.'",
  "predeploy": "rm -rf dist && parcel build index.html --public-url '.'",
  "deploy": "gh-pages -d dist"
},
```

Then follow the normal procedure in GitHub Pages and select the `gh-pages` branch.
