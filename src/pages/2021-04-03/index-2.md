---
path: "/microservice-two"
date: "2021-07-07"
title: "Setting up CI/CD Pipeline for a Monolithic Service"
author: "ShauryaAg"
featured: True
---

**Read first:**

- [**_PART 1:_** How I designed and deployed a scalable microservice architecture with limited resources](https://medium.com/how-i-designed-and-deployed-a-scalable-microservice-architecture-with-limited-resources-c326d8ab4282)

As mentioned in the last part, we have already setup and deployed our three services, but we don’t want to keep pulling the changes every time we make a small change in the codebase, that’s why we need to setup our CI/CD Pipeline.

Let’s get started…

Let’s first treat all our services as Monolithic, and deploy them to the instance.

# Create IAM Roles for CodeDeploy and EC2 Instance.

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*DyxUZzd2Otlu-icL" width="700" height="210" srcSet="https://miro.medium.com/max/552/0\*DyxUZzd2Otlu-icL 276w, https://miro.medium.com/max/1104/0\*DyxUZzd2Otlu-icL 552w, https://miro.medium.com/max/1280/0\*DyxUZzd2Otlu-icL 640w, https://miro.medium.com/max/1400/0\*DyxUZzd2Otlu-icL 700w" sizes="700px" role="presentation"/>

- Go to `IAM → Roles` in your AWS Console
- Create an IAM Role with `AmazonEC2RoleforAWSCodeDeploy` and `AutoScalingNotificationAccessRole` policies.
- Let’s name this IAM Role as `CodeDeployInstanceRole`
- Create another IAM Role with `AWSCodeDeployRole` policy.
- Let’s name this one as `CodeDeployServiceRole`

# Configure EC2 Instance for the application

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*y5VPhsEInXeGNNGB" width="700" height="397" srcSet="https://miro.medium.com/max/552/0\*y5VPhsEInXeGNNGB 276w, https://miro.medium.com/max/1104/0\*y5VPhsEInXeGNNGB 552w, https://miro.medium.com/max/1280/0\*y5VPhsEInXeGNNGB 640w, https://miro.medium.com/max/1400/0\*y5VPhsEInXeGNNGB 700w" sizes="700px" role="presentation"/>

Make sure you already have an instance running.

You just gotta modify the tags to let the CodeDeploy Agent know which instances to deploy the code on.

- Let’s put two tags: `env: production` and `name: my-application`

# Create S3 Bucket for application revision

This bucket will be used to store our revised application before it is deployed to the instance.

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*u9c8ZdQB6VEuOrQ3" width="700" height="697" srcSet="https://miro.medium.com/max/552/0\*u9c8ZdQB6VEuOrQ3 276w, https://miro.medium.com/max/1104/0\*u9c8ZdQB6VEuOrQ3 552w, https://miro.medium.com/max/1280/0\*u9c8ZdQB6VEuOrQ3 640w, https://miro.medium.com/max/1400/0\*u9c8ZdQB6VEuOrQ3 700w" sizes="700px" role="presentation"/>

> _Note: Creating this bucket is necessary if you want to add some files to the codebase that you couldn’t store in the Github repository, such as_ `_.env_` _files._
>
> _If you don’t have any such thing, then you can skip this step._

- You may name the bucket whatever you like.
- Make sure `Block all public access` option is checked.

# Configure CodeDeploy

- Navigate to `CodeDeploy` in AWS Management Console.
- Create an application and give it a name.
- Under `Compute Platform` choose `EC2/On-premises`
- Create Application.

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*s5iZyy0LgG5RL53F" width="700" height="374" srcSet="https://miro.medium.com/max/552/0\*s5iZyy0LgG5RL53F 276w, https://miro.medium.com/max/1104/0\*s5iZyy0LgG5RL53F 552w, https://miro.medium.com/max/1280/0\*s5iZyy0LgG5RL53F 640w, https://miro.medium.com/max/1400/0\*s5iZyy0LgG5RL53F 700w" sizes="700px" role="presentation"/>

- After creating the application, create a deployment group
- Name it whatever you’d like, and under `Service Role` choose `CodeDeployServiceRole`.

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*0D7fQyw8aFINz35\_" width="700" height="540" srcSet="https://miro.medium.com/max/552/0\*0D7fQyw8aFINz35\_ 276w, https://miro.medium.com/max/1104/0\*0D7fQyw8aFINz35\_ 552w, https://miro.medium.com/max/1280/0\*0D7fQyw8aFINz35\_ 640w, https://miro.medium.com/max/1400/0\*0D7fQyw8aFINz35\_ 700w" sizes="700px" role="presentation"/>

- Under `Deployment Type` choose `In-place`.
- For `Environment Configuration` choose `Amazon EC2 instances` and specify the tags that we specified previously for our instances: `env: production` and `name: my-application`
- For `Deployment Settings` choose `CodeDeployDefault.OneAtATime`.

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*N-OQBmwmnQHRV\_9O" width="700" height="627" srcSet="https://miro.medium.com/max/552/0\*N-OQBmwmnQHRV\_9O 276w, https://miro.medium.com/max/1104/0\*N-OQBmwmnQHRV\_9O 552w, https://miro.medium.com/max/1280/0\*N-OQBmwmnQHRV\_9O 640w, https://miro.medium.com/max/1400/0\*N-OQBmwmnQHRV\_9O 700w" sizes="700px" role="presentation"/>

- **Deselect** `Enable Load Balancing`
- Create Deployment Group.

Phew, we are done with setting up on the AWS side, now let’s get to the good stuff.

# Setting up on the Code Repository Side

Create an `appspec.yml` file, and place it in the root of the directory.

Let’s setup our CI workflow now. I am using Github Actions for my CI/CD setup.

Create a `.github/workflow/deploy.yml` file

> _Note: In the_ `_Configure Secrets_` _step, we are fetching our secrets from a AWS S3 Bucket where we have stored to_ `_.env_` _files, as those can not be stored on the Github repository._
>
> _If you don’t have any secrets to configure, you can deploy directly from Github repository. Instead_ `_s3-location_`_, you'd need to specify_ `_github-location_`_:_ [**reference**](https://docs.aws.amazon.com/cli/latest/reference/deploy/create-deployment.html)

Now, we just have to configure _AWS Credentials_ that we used above.

# Setting up CodeDeploy IAM User

- Go to `IAM -> Users` in your AWS Console.
- Create a new IAM User, let’s name it `CodeDeployUser`, and give it `Programmatic Access`

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*MxJvqjPIKAP2gVpy" width="700" height="361" srcSet="https://miro.medium.com/max/552/0\*MxJvqjPIKAP2gVpy 276w, https://miro.medium.com/max/1104/0\*MxJvqjPIKAP2gVpy 552w, https://miro.medium.com/max/1280/0\*MxJvqjPIKAP2gVpy 640w, https://miro.medium.com/max/1400/0\*MxJvqjPIKAP2gVpy 700w" sizes="700px" role="presentation"/>

- We need 2 sets of permissions: `AmazonS3FullAccess` and `AWSCodeDeployDeployerAccess`

<img alt="" class="fs es eo ke w" src="https://miro.medium.com/max/1400/0\*EF-cOpo-57Lxx2Fk" width="700" height="174" srcSet="https://miro.medium.com/max/552/0\*EF-cOpo-57Lxx2Fk 276w, https://miro.medium.com/max/1104/0\*EF-cOpo-57Lxx2Fk 552w, https://miro.medium.com/max/1280/0\*EF-cOpo-57Lxx2Fk 640w, https://miro.medium.com/max/1400/0\*EF-cOpo-57Lxx2Fk 700w" sizes="700px" role="presentation"/>

- Create the user, and save the user’s credentials `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY`

Set those secrets in your Github Repository and you are all good to go!

Great! now, every push you do to your repository will be deployed to your EC2 instance.

But, wait. If you push to your repository after modifying just one of the services, all of them need to be restarted, that’s not how a Microservice Architecture works.

We need to decouple all our services from each other for all of them to operate separately.

Let’s get to that stuff in [**_PART 3_**](https://medium.com/how-i-designed-a-ci-cd-setup-for-microservice-architecture-at-zero-cost-34d26b3d7200)…

**Read Next:**

- [**_PART 3_**: How I designed a CI/CD setup for a Microservice Architecture at zero cost](https://medium.com/how-i-designed-a-ci-cd-setup-for-microservice-architecture-at-zero-cost-34d26b3d7200)
