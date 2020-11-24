# Portfolio Typescript Backend

## Description

Simple lambda function that creates a new AirTable record from contact form submissions on my porfolio site. You can find the repo for the frontend [here](https://github.com/angusbezzina/portfolio-typescript).

### Project Setup

Install node modules with `yarn`.

You will need to create your own AirTable table and enter the details in an .env file like the example included in this repo.

### `sls offline`

Emulates AWS λ and API Gateway on your local machine, to help speed up development cycles.

### `sls deploy`

Deploys this lambda function.

#### Additional notes

I use [Zapier](https://zapier.com/) as a way to notify me when a submission has been added to my AirTable.
