---
path: "/microservice-three"
date: "2021-04-03"
title: "How I designed a CI/CD setup for a Microservice Architecture at zero cost"
author: "ShauryaAg"
featured: True
---

**Read first:**

- [**_PART 1_**: How I designed and deployed a scalable microservice architecture with limited resources](https://shauryaag.medium.com/how-i-designed-and-deployed-a-scalable-microservice-architecture-with-limited-resources-c326d8ab4282)
- [**_PART 2_**: Setting up CI/CD Pipeline for a Monolithic Service](https://shauryaag.medium.com/setting-up-ci-cd-pipeline-for-a-monolithic-service-fe2cd7b009f5)

In the last part we set up our pipeline for a Monolithic Architecture, but that’s not what I promised in the first part of the series.

Let’s get going…

Off to decoupling our services, so that they can live freely once again.

Well, that’s easy. Create a separate repository for each service, copy the workflow files to each of them. You are done! Ok, bye.

No, definitely not.

You can use that setup if all you have to do is run unit tests, but what about integration testing. Can’t do that on the production instance, and you are a struggling startup; you don’t have enough resources to spin up more instances just to run integration tests.

Well?

Ok, we will be putting each service in its own separate remote repository, but we will have one parent repository that refers to all the services’ repositories.

Let’s get started with git submodules…

Git Submodules are a way of adding a git repository inside a git repository. All submodules point to a commit in the remote repository.

The original intention behind git submodules was to keep a copy of a certain commit (or release) locally on which our project might depend.

You just need to run:

```
git submodule add <my-remote> <optional-path>
```

However, we need them to keep up-to-date with our services’ repository, that’s why it’s a good thing that we can make them point to a certain branch instead too.

```
git config -f .gitmodules submodule.<submodule-name>.branch <branch-name>
```

Now, you can keep all your submodules up-to-date with just one command

```
git submodule update --remote
```

Now, that git submodules are out of the way, let’s get to the actual “good” stuff.

Ok, let’s talk about the actual workflow that I follow:

- Each service’s repository contains its unit test
- After a commit is pushed to the service’s repository, it runs its unit tests.
- If all the unit test pass, then we commit it to the parent repository.

`_<submodule>/.github/workflows/test-and-push.yml_`

`gist:ShauryaAg/c668a761933edfcfcccd42608de76c33`

- The parent repo lists the submodules where the changes were made since the last push and only deploys those services again.

`<parent-repo>/.github/workflows/deploy.yml`

`gist:ShauryaAg/1f260238f05c5e50c0b0e2be8de46adc`

> _This way all the other services keep running without any disturbance, while one of the service is updated._

`<parent-repo>/scripts/deploy.sh`

`gist:ShauryaAg/67e17c3f20dd437c4ddff896b746b5a6`

> _I also created separate_ **Deployment Groups** _for each service of the name:_ `_<service-name>-prod_`_, i.e. for_ `_nodeauth_` _service, I created a_ `_nodeauth-prod_` _deployment group, with rest of the configuration same as we did in the previous part._

We also do need to modify the `appspec.yml` and our scripts.

- Since each service is a separate deployment, we need to put the `appspec.yml` in each service's repository.

`gist:ShauryaAg/a2669b7b92d2a83185c48737eaef8844`

- Since we have decoupled all the services from each other, we no longer run them using `sudo docker-compose up`, each service has to be started individually.

`<submodule>/scripts/start_app.sh`

`gist:ShauryaAg/8df11d84dcc7df2ae0f8f9b8ca286b6a`

- I wrote a bit complex script so that we can use the same set of scripts in all our services instead of writing them again and again as new services are added.
- The scripts can also be added as a git submodule to all the services’ repositories, which makes it easier to maintain (but they weren’t in my setup at the moment of writing this blog).

- `init.sh` contains code to install `docker` on the instance (if not already present).
- `cleanup.sh` contains code to remove the previous unused containers.

That’s it. You are finally done. You’ve got your own weird-ass setup to test and deploy a Microservice Architecture at zero cost. You can also keep the previous `docker-compose.yml` to maintain a local development setup.

> > The single instance’s cost is covered under AWS free-tier.

_disclaimer_: Yes, there is probably a better way of doing this. I hope there is.
