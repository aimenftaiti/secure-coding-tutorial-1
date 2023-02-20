FROM --platform=linux/amd64 node:19 AS build

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node
WORKDIR /home/node/app
COPY --chown=node:node /package.json /srv/api/
COPY --chown=node:node /src/ /srv/api/src/
USER root
RUN npm install

FROM --platform=linux/amd64 node:19-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node
WORKDIR /home/node/app
EXPOSE 4000

COPY --from=build --chown=node:node /srv/api/src/  /srv/api/src/
COPY --from=build --chown=node:node /srv/api/package.json /srv/api/package.json /srv/api/
USER root
RUN npm install
ENV NODE_ENV=production

USER node
CMD ["node", "src/app.js"]