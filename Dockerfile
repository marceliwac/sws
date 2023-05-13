FROM node:16-slim

ENV NODE_ENV=production

# Install the puppeteer dependencies
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

RUN groupadd -r pptruser  \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/.cache \
    && cp -r ~/.cache/puppeteer/ /home/pptruser/.cache/puppeteer \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app \
    && chown -R pptruser:pptruser ./node_modules \
    && chown -R pptruser:pptruser ./package.json \
    && chown -R pptruser:pptruser ./package-lock.json \
    && chown -R pptruser:pptruser ~/.cache \
    && chmod -R o+rwx ~/.cache/puppeteer/

USER pptruser

CMD ["npm", "start"]
