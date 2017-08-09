node-react-survey-front
=======================

This frontend app is a simple survey built with Node.js and React. It connects to the [node-redis-survey-back](https://github.com/ironmysocks/node-redis-survey-back) API to store and retrieve data.

A [working demo is available here](https://salty-woodland-89307.herokuapp.com/) on Heroku.

For the future
--------------
* The app is hard-coded to use question "1", even though it supports an unlimited number and has multiple in the database. In the future, it would be nice to be able to put a question_id as a URL parameter to switch between questions, as in GET /:question_id.

* The API could send HTTP response codes along with the json content.
