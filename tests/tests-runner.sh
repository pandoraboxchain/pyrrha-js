#!/bin/sh

# Exit script as soon as a command fails.
set -o errexit

if [ "$WITH_COVERAGE" -eq 0 ]; then 
    echo "Running tests without coverage"
    npx mocha --exit --require @babel/register -R spec --timeout 70000 ./tests/spec/**/*.test.js

else 
    echo "Running tests with coverage"
    npx istanbul cover _mocha --report lcovonly -- --exit --require @babel/register -R spec --timeout 70000 ./tests/spec/**/*.test.js
    cat ./coverage/lcov.info | npx codacy-coverage --token b9f35cad059c44b792590ef78c8b81f8
fi
