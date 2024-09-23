FROM ubuntu

WORKDIR /app/

COPY .env.local ./.env.local
COPY .gitignore ./.gitignore
COPY .nvmrc ./.nvmrc
COPY .prettierignore ./.prettierignore
COPY .prettierrc.cjs ./.prettierrc.cjs
COPY Dockerfile ./Dockerfile
COPY eslint.config.js ./eslint.config.js
COPY index.html ./index.html
COPY package.json ./package.json
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.js ./tailwind.config.js
COPY tsconfig.app.json ./tsconfig.app.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.node.json ./tsconfig.node.json
COPY vite.config.ts ./vite.config.ts
COPY yarn.lock ./yarn.lock
COPY ./src ./src
COPY ./public ./public

# Update apt-get
RUN apt-get update

# Install curl
RUN apt-get install curl -y

ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18.20.4

# Install nvm & node js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION

ENV NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm i -g yarn
RUN yarn
RUN yarn build
RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]