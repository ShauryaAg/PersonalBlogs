---
path: "/microservice-one"
date: "2021-07-07"
title: "How I designed and deployed a scalable microservice architecture with limited resources"
author: "ShauryaAg"
featured: True
---

Ok, so let’s start with what’s a microservice.

Basically, there are types are two types of services: a monolithic and a microservice.

# **Monolithic Architecture:**

A monolith architecture is just one big service deployed on one instance, where if one part of the service faces an issue, the whole site goes down.

# Microservice Architecture:

A microservice architecture has the whole service divided into multiple smaller services (called microservices). Each service is deployed separately and doesn’t affect the deployment of the other in any way.

Even if one service goes down, the other services are not affected in any way.

Let’s get started with setting up our microservice architecture…

At the moment we have three services (there will be more), an authentication service that authenticates users viva OTP, one service to upload files to AWS S3, and a GraphQL service for all our other needs at the moment.

> Note: This is not a tutorial on how to write a NodeJS API

Let’s get started…

Our directory structure is as following

```
├── appspec.yml
├── docker-compose.yml
├── env
│   └── ...
├── nginx
│   ├── Dockerfile
│   └── ...
├── nodeauth
│   ├── Dockerfile
│   └── ...
├── nodeupload
│   ├── Dockerfile
│   └── ...
└── scripts
    └── ...
```

In order to make the setup easy (on the deployment side), I **containerized** all the setup using docker.

Here’s our `**nodeservice/Dockerfile**` for all our NodeJS services.

> Note: The exposed **PORT** should be different for different services

Now, we need to setup **nginx** as our API gateway

For that we need the `**_nginx/Dockerfile_**` and nginx configuration files

and the `**_nginx.conf_**` file is as follows

Now, we have our three containers ready, we just need a docker-compose file to start them all with a single command.

`**_docker-compose.yml_**`

Viola! You got all your containers ready, now you just need to deploy those to the server. Package ’em all up and push to a git repository of your choice.

I used an AWS EC2 instance to deploy.

Go to your AWS EC2 Console and start up a new instance. I used a `t2.micro` instance with `ubuntu:20.04` image, (as it is covered under the free tier).

SSH into your EC2 instance, and clone the repository that you just made onto the machine using `git clone <repo-link>` .

Now, you need to install docker on your instance `sudo snap install docker` .

Once you have cloned the repo onto the machine and installed the dependencies, it’s time to build and start the docker containers. Well, that’s where containerizing everything helps, you only need to run one command to run everything.

```
sudo docker-compose up --build
```

> Make sure you have changed the directory into your cloned repository

You got it done! Now you just need to set the **ANAME** for your domain and you can make requests to your domain.

But wait…

The requests are only going to `http` instead of `https` . You need to set up `https` for your domain now.

In order to setup `https` for our server, we need to generate an SSL certificate. We can always do that stuff manually, but that’s no good when there are other people who have done this stuff for you.

I used `staticfloat/nginx-certbot` docker image to do this stuff for me.

We need to listen on **PORT** **443** for `https` instead of **PORT 80** in case of `http` , and specify **ssl_certificate, ssl_certificate_key** in your `**_nginx.conf_**`**_._**

And your `**nginx/Dockerfile**` changes to…

You also need to make changes in the `**docker-compose.yml**` to map the `letsencrypt/` directory of your container to that of your host machine.

You are all done! Just push these changes to your git repository, and pull them on your instance.

Configure the security group for your instance and enable HTTPS.

Now, all you gotta do is run `sudo docker-compose up --build` and you should get services running on `https` .

But think about it…

Do you really want to pull every change that you make on your service manually and restart the service again? No, right?

Neither do I, that’s why I set up CI/CD pipelines to deploy and restart the services automatically every time a new commit is pushed to the git repo.

Let’s get to that stuff in [**PART 2**](https://medium.com/setting-up-ci-cd-pipeline-for-a-monolithic-service-fe2cd7b009f5)….

**Read Next:**

- [**_PART 2_**: Setting up CI/CD Pipeline for a Monolithic Service](https://medium.com/setting-up-ci-cd-pipeline-for-a-monolithic-service-fe2cd7b009f5)
- [**_PART 3_**: How I designed a CI/CD setup for a Microservice Architecture at zero cost](https://medium.com/how-i-designed-a-ci-cd-setup-for-microservice-architecture-at-zero-cost-34d26b3d7200)
