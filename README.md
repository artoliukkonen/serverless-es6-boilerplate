# serverless-es6-boilerplate


[![Build Status](https://travis-ci.org/artoliukkonen/serverless-es6-boilerplate.svg?branch=master)](https://travis-ci.org/artoliukkonen/serverless-es6-boilerplate)


Yet another Serverless Framework boilerplate with ES6/7, Jest & Eslint support.

## Why another boilerplate?

Because JS world needs one! And I didn't find any other good boilerplate to match my needs (Jest, Eslint, Babel). 

## Why only one handler?

Keeping all code in one Lambda helps you to keep your code "warm" without need for other hacks. It also reduces the amount of AWS specific boilerplate code and keeps it in one place. 

# Getting started

## Install service & dependencies

```
sls install -u https://github.com/artoliukkonen/serverless-es6-boilerplate
cd serverless-es6-boilerplate
yarn
```

## Next steps

* Edit `serverless.yml` `service` to something unique
* Follow "Hello world" example for adding new functions
