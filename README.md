# udacity-ms-2
# udacity-microservice-project
Udacity Microservices Project

In this repo, there are 4 services with containerization and kubernetes incorporated.

They are:

Frontend application
Backend user service
Backend feed service
Reverse Proxy

Getting Started

Clone the github project by running:
git clone https://github.com/mengestu/udacity-ms-2

Update the following configuration files

`aws-secret.yaml`
`env-configmap.yaml`
`env-secret.yml`

Update your .profile or .bash_profile with the values for the following environment variables

* POSTGRESS_USERNAME
* POSTGRESS_PASSWORD
* POSTGRESS_DB
* POSTGRESS_HOST

* URL=http://localhost:8100

* AWS_REGION
* AWS_PROFILE
* AWS_BUCKET
* JWT_SECRET
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

Running the application


Install the dependencies for each project npm install

Using docker


# Build the docker images
`docker-compose -f docker-compose-build.yaml build --parallel`

Run the container
docker-compose up

Access the frontend in the browser with url `http://localhost:8100`

Access the API via postman using `http://localhost:8080/api/v0`

# Using kubernetes

Apply each .yaml configuration file in the deployment folder

`kubectl apply -f aws-secret.yaml`


Do the same for the rest ensuring the secret files are applied first then the backend and front end service and deployments followed by the reverse proxy service and deployment files

# Start the reverseproxy service

* `kubectl expose deployment frontend --type=LoadBalancer --name=publicfrontend`
* `kubectl expose deployment reverseproxy --type=LoadBalancer --name=reverseproxy`



# Scaling the application

Scaling the app up/down can be done using

`kubectl scale deployment/backend-feed --replicas 1`
