## Description

Scraper service for get Hotel information from [Booking](https://booking.com)

## Installation

```bash
# Build and Run Docker container locally:
$ cd puppeteer
$ npm install
$ npm run uild
$ cd ..
$ docker-compose up --build
```
```bash
# Run Test
$ cd athlos_hotel_api
$ npm test
```

## Documentation

Docker Container running locally needed:
[Swagger Doc](http://localhost:3000/api/docs#/)

## Next Steps

Deploy Puppeteer in AWS Lambda.
Apply external Proxy to bypass Booking antibot.
Implement CI/CD using Github Action Worflow.
Add more information about the hotel.

## Development Process

I developped Puppeteer service to be deployed in AWS Lambda as goal. I founded there are some bugs conserning chromium, puppetter-extra and aws lambda. Had to change direction and moved the service to the server and db.
Locally I was able to run Puppeteer Scraper from a Docker container and store de data in the server.
Deployed the full service in [AWC EC2](http://13.48.25.152:3000/api/docs), but Booking return a different response meaning it has a detection for Amazon IP. 
