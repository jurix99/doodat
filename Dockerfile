FROM node:22-bookworm-slim

WORKDIR /app

# Needed for `expo start --tunnel` without interactive prompt
RUN npm i -g @expo/ngrok@^4.1.0

# Install deps first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source
COPY . .

EXPOSE 8081 19000 19001 19002

# Default: easiest connectivity from phone is tunnel
CMD ["npx","expo","start","--tunnel","--clear"]


