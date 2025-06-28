# Assignment

> Finally, create a new workflow so that deleting a branch deletes the environment.


# Solution

In order for a github action to be triggered when a branch in a repo is deleted the following `.yaml` file has to be placed in `.github/workflows` directory in the main branch. Placing the action in the branch that will be deleted does nothing, since the action will be deleted with the branch. There is no need to check which branch is being deleted, since it is not possible to delete the default (main) branch in git. 

## Commands

![Commands for Exercise 3.05](https://raw.githubusercontent.com/VikSil/DevOps_with_Kubernetes/refs/heads/trunk/Part3/Exercise_3.05/Exercise_3.05_commands.png)

![Commands for Exercise 3.05](https://raw.githubusercontent.com/VikSil/DevOps_with_Kubernetes/refs/heads/trunk/Part3/Exercise_3.05/Exercise_3.05_commands2.png)

![Commands for Exercise 3.05](https://raw.githubusercontent.com/VikSil/DevOps_with_Kubernetes/refs/heads/trunk/Part3/Exercise_3.05/Exercise_3.05_commands3.png)

![Commands for Exercise 3.05](https://raw.githubusercontent.com/VikSil/DevOps_with_Kubernetes/refs/heads/trunk/Part3/Exercise_3.05/Exercise_3.05_commands4.png)
