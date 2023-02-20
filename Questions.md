# Questions

## Question 3

Database constraints are used to enforce rules on the data that is stored in a database. These constraints are used to ensure the integrity and correctness of the data in the database.

On the other hand, validation in TypeScript is used to ensure that the data being used in the application meets certain criteria. This can be used to ensure that the data being passed to a function is in the correct format, or to check that an object has all the required properties before it is used.

## Question 4

Models validations can serve the security of our application by verifying the format of any input sent by the user before the data are pushed to the database. We can scape characters or strings in the input (i.e the ";" character, which is commonly used in SQL injection attacks)

# HTTP Endpoint

## Question 1

For GET Requests paths, the path just indicates the resource to be retrieved.

If we want to retrieve all resources of a certain type, we use the path /web-api/resources.

If we want to retrieve a specific resource, we use the path /web-api/resources/{id}.

For POST Requests paths, the path indicates the resource to be created.

If we want to create a new resource, we use the path /web-api/resources and we specifiy the payload in the request body.

For PUT Requests paths, the path indicates the resource to be replaced.

If we want to replace a resource, we use the path /web-api/resources/{id} and we specifiy the payload in the request body.

For PATCH Requests paths, the path indicates the resource to be updated.

If we want to update a resource, we use the path /web-api/resources/{id} and we specifiy the payload in the request body.

For DELETE Requests paths, the path indicates the resource to be deleted.

If we want to delete a resource, we use the path /web-api/resources/{id}.

For HEAD Requests paths, the path indicates the resource to be retrieved.

If we want to retrieve the headers of a resource, we use the path /web-api/resources/{id}.

If we want to retrieve the headers of all resources of a certain type, we use the path /web-api/resources.

## Question 2

The POST path /web-api/users is used to create a new user.

The POST path /web-api/sessions is used to create a new session.

## Question 5

For stateful sessions :
    - Scalability: can be scaled vertically as it needs to have high availability.
    - Architecture complexity : High complexity, needs to implements the saving of the session on the server side.
    - Type and quantity of information known by the client : High quantity of information
    - Impact if a session leaks : High, because all the details can leak.
    - Common weaknesses due to misconfigurations : Session fixation, session hijacking, data breach.
    - Client-side strategy to protect and submit the token (or session identifier) : Cookies
    - Additional library requirements : library to manage the session with cookies eventually (cookie-session, express-session, etc...)

For stateless sessions :
    - Scalability: horizontal scalability in order to make sure the server does not crash
    - Architecture complexity : Low complexity
    - Type and quantity of information known by the client : not so much quantity of information known by the client as it just needs to know the token
    - Impact if a session leaks : limited impact as the token have a limited time of validation
    - Common weaknesses due to misconfigurations :
    - Client-side strategy to protect and submit the token (or session identifier) : HTTP headers
    - Additional library requirements : JWT library

## Question 6

Solutions to protect the confidentiality of the session identifier stored in a browser's cookie:
    - Use HTTPS
    - Use the HttpOnly flag in the set-cookie response header to prevent the cookie from being accessed by client-side scripts. (<https://owasp.org/www-community/HttpOnly>)
    - Use the Secure flag to prevent the cookie from being sent over HTTP (works only if the site is served over HTTPS)(<https://docs.microfocus.com/UCMDBB/4.15.1/Content/Browser/Config_SecureCookie.htm#:~:text=The%20purpose%20of%20the%20secure,an%20encrypted%20connection%20(HTTPS).>)
    - Use the SameSite flag to prevent the cookie from being sent in cross-site requests (<https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite>)
