FROM node:9

LABEL maintainer="kostysh@gmail.com"

ARG PYRRHA_CONSENSUS_BRANCH=master
ARG WITH_COVERAGE=0

COPY ./src /pyrrha-js/src
COPY ./tests /pyrrha-js/tests
COPY ./package.json /pyrrha-js/package.json
COPY ./.babelrc /pyrrha-js/.babelrc
COPY ./.git /pyrrha-js/.git

# Fetching of contracts sources
WORKDIR /
RUN git clone -b $PYRRHA_CONSENSUS_BRANCH https://github.com/pandoraboxchain/pyrrha-consensus.git /pyrrha-consensus && \
    mkdir /pyrrha-js/contracts && cp -r /pyrrha-consensus/contracts /pyrrha-js/contracts && \
    mkdir /pyrrha-js/migrations && cp -r /pyrrha-consensus/migrations /pyrrha-js/migrations && \
    cp /pyrrha-consensus/truffle.js /pyrrha-js/truffle.js && \
    cp /pyrrha-consensus/truffle-config.js /pyrrha-js/truffle-config.js

# Installing of dependencies
WORKDIR /pyrrha-js
RUN npm i --silent && \
    npm i truffle-core --silent && \
    npm i truffle-hdwallet-provider --silent && \
    npm i truffle-privatekey-provider --silent && \
    npm i zeppelin-solidity --silent && \
    npm i ganache-cli --silent

RUN sh -c 'if [ $WITH_COVERAGE = 0 ]; \
then echo "Running test without coverage\n" && node /pyrrha-js/tests/tests-runner.js; \
else echo "Running test with coverage\n" && npx istanbul cover _mocha --report lcovonly -- --require @babel/register -R spec --timeout 120000 ./tests/spec/**/*.test.js && cat ./coverage/lcov.info | npx codacy-coverage --token b9f35cad059c44b792590ef78c8b81f8 && npx rimraf ./coverage; fi'
