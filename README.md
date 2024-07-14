# pkg-demo

Essentially a clone of [mattpocock/pkg-demo](https://github.com/mattpocock/pkg-demo) but with a README and some modifications.

### github actions and changesets

This repo comes with some github actions. For them to work, you will need to add a `NPM_TOKEN` in repository secrets:

- create a (classic) npm token here `www.npmjs.com/settings/YOUR_NAME/tokens`
- add it on your github project: `settings -> Secrets and variables -> Actions -> Repository secrets`
  - also give actions write permission and allow them to create PRs `settings -> Actions -> General`

Changesets is a handy cli tool that helps you manage versioning and changelog. Any time you feel like your changes are merge worthy: run `pnpm changeset` and type a description (it only creates a `.changeset/*.md` file).

Any time the main branch is updated, the `publish` action will create a PR suggesting a release. Merging that PR will

- combine any `.changeset/*.md` into `CHANGELOG.md`
- update version in `package.json`
- build and publish the package to npm
- update main branch (with a release tag)

You dont have to accept the PR right away: pushing or merging more stuff will update the PR accordingly.
