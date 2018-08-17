FROM node:9

LABEL maintainer="kostysh@gmail.com"

ARG PYRRHA_CONSENSUS_BRANCH=master
ARG WITH_COVERAGE=0
ENV WITH_COVERAGE=$WITH_COVERAGE
ENV NODE_ENV=testing

RUN mkdir /pyrrha-js
COPY ./package.json /pyrrha-js/package.json

# Installing of dependencies
WORKDIR /pyrrha-js
RUN npm i --silent && \ 
    npm i \ 
        ganache-sandbox@https://github.com/pandoraboxchain/ganache-sandbox.git#v0.3.7 \
        openzeppelin-solidity \
        mocha \
        mocha-lcov-reporter \
        chai \
        istanbul@1.1.0-alpha.1 \
        codacy-coverage --silent

# Fetching of contracts sources
WORKDIR /
RUN git clone -b "$PYRRHA_CONSENSUS_BRANCH" https://github.com/pandoraboxchain/pyrrha-consensus.git /pyrrha-consensus && \
    mkdir /pyrrha-js/contracts && cp -r /pyrrha-consensus/contracts/* /pyrrha-js/contracts && \
    mkdir /pyrrha-js/migrations && cp -r /pyrrha-consensus/migrations/* /pyrrha-js/migrations

COPY ./src /pyrrha-js/src
COPY ./dist /pyrrha-js/dist
COPY ./tests /pyrrha-js/tests
COPY ./tests/truffle.js /pyrrha-js/truffle.js
COPY ./tests/truffle-config.js /pyrrha-js/truffle-config.js
COPY ./.babelrc /pyrrha-js/.babelrc
COPY ./.git /pyrrha-js/.git
COPY ./tests/tests-runner.sh /pyrrha-js/tests-runner.sh

WORKDIR /pyrrha-js
CMD [ "/pyrrha-js/tests-runner.sh" ]
