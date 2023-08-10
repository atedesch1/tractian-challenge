# Back End Software Engineer Challenge

This is a solution to the Back End Software Engineer Challenge from Tractian. It is the code for an API which performs a CRUD where the user can register companies, units, assets and users.

## Deploy
The API was deployed to GCP using docker and is listening for requests on [this url](https://tractian-challenge-3fzbrnzjyq-rj.a.run.app). Continuous deployment was also setup using GCP. The Mongo database being used in production is the one provided by Mongo Atlas.

## Local Development
In order to run the API you will need to set some environment variables.

Create a ".env" file in the root directory and set the variables:
- MONGODB_URI=mongodb://root:pass@mongo:27017
- PORT=3000

To run the API and the DB instance locally you can use docker and docker-compose in the root of the project:
```
docker-compose up
```

This will serve the API on **http://localhost:3000/**

## Observations and Caveats
- Authentication: Ideally I would have implemented some kind of authentication for users and permissions for normal users and managers (I would use Firebase to do this easily). However I chose to keep it simple and supply the authentication as a request header passing the user ID (Auth: userId).
- Get All endpoints: Endpoints which get all entities of a type are not protected and only used for quickly testing.
- User registration: A user can be created if you also register a company at the same time (being assigned as the manager of that company) or if you invite the user as a member of a company supplying the authentication for the manager.
- Images: In order to keep it simple I used multer to store the images, however in a real application I would use a Blob Storage such as GCP's buckets.

There are more caveats, however I would prefer to discuss it verbally in a call.

## Endpoints Specification

### Users
- Get All Users: GET '/users/'
- Register User With Company: POST '/users/'
- Invite User: POST '/users/invite'

### Companies
- Get All Companies: GET '/companies/'
- Get Company Overview: GET '/companies/:companyId'
- Update Company: PUT '/companies/'
- Update Company Member: PUT '/companies/members/:userId'
### Units
- Get All Units: GET '/units/'
- Get Unit With Assets: GET '/units/:unitId'
- Register Unit: POST '/units/'

### Assets
- Get All Assets: GET '/assets/'
- Get Asset Images: GET '/assets/:assetId/image'
- Create Asset: POST '/assets/:'
