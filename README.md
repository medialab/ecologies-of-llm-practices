# EL2MP Website

<img width="5088" height="3344" alt="image" src="https://github.com/user-attachments/assets/b1ccbbaa-8bf4-494a-ad3e-281c163aad14" />


## Development Notes

- Package manager policy: use Bun and keep `bun.lock` as the single lockfile.
- Deployment policy: this repository is configured for custom-domain root hosting (`kit.paths.base = ""`).
- Media policy: `*.mp4` assets are tracked with Git LFS (see `.gitattributes`).
- CI/deploy policy: GitHub Actions checkout must pull LFS objects (`actions/checkout` with `lfs: true`) so media assets deploy correctly on GitHub Pages.
