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
