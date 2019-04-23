FROM node:11.13.0

ENV APP_HOME /app
ENV YARN_CACHE_FOLDER /yarn

WORKDIR $APP_HOME
RUN mkdir -p $YARN_CACHE_FOLDER
RUN mkdir -p $APP_HOME

RUN apt-get update -qq
RUN yarn config set cache-folder $YARN_CACHE_FOLDER

ADD package.json yarn.lock $APP_HOME/

RUN yarn

ADD . $APP_HOME
