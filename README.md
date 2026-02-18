# EL2MP Website

## Development Notes

- Package manager policy: use Bun and keep `bun.lock` as the single lockfile.
- Media policy: `*.mp4` and `*.webm` are tracked with Git LFS (see `.gitattributes`).
- CI/deploy policy: GitHub Actions checkout must pull LFS objects (`actions/checkout` with `lfs: true`) so media assets deploy correctly on GitHub Pages.
