---
path: "/intro-git"
date: "2019-09-12"
title: "Introduction to Git"
author: "ShauryaAg"
featured: True
featuredImage: logo.png
---

**Git** is a version control system. A version control system is a tool that helps in maintaining different versions of a project. If you made a project and then realized you need another feature in the project, but while coding the new feature you screwed up and need to know what mistake did you make, you can look at the previous version of the code. It also helps in collaborating with multiple people on a project.

You can download Git through [_here_](https://git-scm.com/downloads).

# Git v/s GitHub/GitLab:

A lot of people get confused between **Git** and **GitHub**. So, Git is the version control system that manages the different versions of the files while GitHub is a platform (website) where you can host your remote repositories. There are multiple hosting platforms available like GitHub, GitLab, BitBucket, etc that can be used to host your remote repository, GitHub is just one of them. Using GitHub is not at all necessary to use Git. Git can also be used to maintain records of your personal work on your own PC.

# Some Basic Terminologies:

**_Repository_**: The folder of the project.

**_Remote Repository_**: The project folder that is available online.

**_Cloning_**: Downloading the code from the remote repository.

**_Forking_**: means copying the repository in your account, so you can make some changes into it.

**_Commit_**: It’s like a checkpoint which you can go back to when you screw up.

**_Branches_**: Suppose you are working on a feature in the project, while your partner decides to work on another feature in the same project, so he can make a new branch in the project and work separately without disrupting the other person’s work, and they can merge the two branches together when both are done.

**_Push_**: Making the changes onto the remote repository after you have modified the code on the local repository.

**_Pull_**: Making the changes onto the local repository (the one that is present on your PC, not online) from the remote repository after someone else pushed some changes onto the remote repository.

**_Pull Request:_** Asking the owner the original repository to merge your changes into their repository. (You can make a pull request on GitHub \[called **_Merge Request_** on GitLab\] after you have done some changes in your forked repository or on some other branch in the same repository)

# Git Command Line:

Command Line Interface is the environment where you can interact with your PC only using the textual commands (that is, without the use of mouse). You need to memorise the commands (or look them up every time) in order to use the command line properly. There is a list of some basic Git commands below that will help you get started, and [**_here’s_**](https://gist.github.com/ShauryaAg/18f06df2520a2af8f1d79ed631a2a9de) a link to a **_Git cheat sheet_**_._

It is not at all necessary to use _Git Command Line Interface (CLI)_ with Git. You can also use _Git Graphical User Interface (GUI)_ to use all the Git features (**no one** uses that, though).

You can also use other GUIs like [_GitHub Desktop_](https://desktop.github.com/) to use Git features.

## Most Basic Commands:

**_git clone \[url\]_**: Downloads the local from the remote repository (only to be used when starting a project)

**_git init_**: Initializes the git repository (A repository has to be initialized as a git repository before it can start tracking the changes).

**_git remote add \[remote-name\] \[remote-url\]_**: remote-name is the name by which you refer the remote repository URL (like the URL of the GitHub/Gitlab repository)

**_git add \[file-name\]_**: adds the files to the staging area (git does not commit all the files every time. Unlike some other version control tools, only the ones that are added to the staging area)

**_git commit -m “\[message\]”_**: commits the added files

**_git push \[remote-name\] \[branch-name\]_**: pushes the files onto the remote repository.

**_git fetch \[remote-name\]_**: downloads the files from the remote repository.

**_git merge \[branch-name\]_**: merges the current local branch with the specified branch-name.

**_git pull \[remote-name\] \[branch-name\]_**: basically fetching and merging in one command.

**_git checkout \[branch-name\]_**: to go to the specified branch
