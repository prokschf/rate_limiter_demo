Dear Ultramarin Team,
please enjoy this demo of a rate limiter tester. The back-end is written in python and FastAPI. The front-end is in JS react and tailwind. 

The animations are added in as a tech demo and may or may not be suitable based on the desired audience. All in all it does not not follow a fully fleshed out design language but it should do the trick for the purposes of a take home showcase.
The framing headlines, 'lorem ipsum' and the left column are purely decorative. Also the front-end could could be further modularized, linted, tested, etc. - at this point I chose to stop. Let me know if you want to see examples of any of those.

##Functionality

Adjust the slider to send N requests to the back-end. 
Click the cogwheel button on the top right to adjust the rate limit.

The indicator bar is not FULLY synchronized with the back-end in this application in that it will not reset once the rate limiter backoff is reached -- the back-end doesn't provide this functionality but it seemed to make sense to add it for visuals. So the rate limiter will start accepting requests again but the indicator bar doesnt visually reset.


##Install

Run on a device with docker engine:

docker-compose up --build


##Further Work

    Scalability: The current throttling logic works in a single instance. In production, with horizontal scaling, you might have multiple instances, and the throttling would need to be centralized or coordinated. Solutions like Redis can be used to manage centralized rate-limiting.

    Database: For more persistent data storage (for example, if you want to keep track of rate limits across restarts or in a distributed setup), we might consider using a database.

    Authentication and Authorization: In a production scenario, we'd likely want to authenticate users and possibly have different rate limits based on user tiers, roles.

    Logging and Monitoring: Integrate logging and monitoring to keep track of requests, errors, and potential misuse or attacks.

    Error Handling: More comprehensive error handling and user-friendly error messages could be implemented.

    Performance Optimizations: Profiling and performance tuning could be used to ensure optimal performance, especially under high loads.

    TLS/SSL: In production, secure the communication using HTTPS.

    Resilience: Consider strategies to handle service failures, such as implementing retries, circuit breakers, and fallback mechanisms.

    Use a More Optimized Python Image: In the Dockerfile, we might consider using a more optimized image for Python (like Alpine-based images) to reduce the image size.

    Rate Limit Headers: Add response headers like X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset to inform users about their current rate limit status.

    Fine-grained Rate Limiting: Instead of a single global rate limit, we might consider implementing endpoint-specific or method-specific rate limits.

    Documentation: Use tools like Swagger or Redoc to provide API documentation.

    Testing: Implement unit tests, integration tests, and load tests to ensure the system behaves correctly under various scenarios and loads.