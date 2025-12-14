## doodat (React Native / Expo)

Dark-neon, slightly unhinged challenges with a points system.

### Run (recommended): Docker (works even if your WSL Node is old)

From `doodat/`:

```bash
docker compose up --build
```

Then on your phone:
- Install **Expo Go**
- Scan the QR code shown in the logs (tunnel mode)

If you don't see a QR in the terminal, open Expo DevTools in your browser:
- `http://localhost:19002`

If Expo complains a dependency is in `package.json` but not installed, reset volumes and restart:

```bash
docker compose down -v
docker compose up --build
```

### Run in WSL (requires Node 20+)

Your WSL currently shows Node 12, which is too old for Expo SDK 54.

If you use `nvm`:

```bash
nvm install 22
nvm use 22
node -v
```

Then:

```bash
cd doodat
npm install
npm run start:tunnel
```


