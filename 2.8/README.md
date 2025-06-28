# Assignment

> Create a database and save the todos there. Again, the database should have its own pod.
> 
> Use Secrets and/or ConfigMaps to have the backend access the database.

# Solution

Application was built in Nodejs, using `axum` crate. The application listens to port `8081` by default, unless environment variable `PORT` is defined. It requires environment variable `DB_URL` to be set to the connection string for the database. It accepts `GET` and `POST` requests on `\todos` endpoint. Upon first initialisation the application runs migration scripts that create database structures to store todos, url to image and timestamp of when the image was last changed. 

The log reader app was modified to accept connections on `/logreader` route, so to not clash with todo app while running in the same cluster.

## Commands

```bash
# Update image
docker build -t bachthyaglx/todo-backend:latest ./todo-backend
docker push bachthyaglx/todo-backend:latest

# Tag postgres to namespace project
kubectl apply -f postgres/k8s/ -n project

# Create secret and config, and deploy PostgreSQL StatefulSet, apply all
kubectl apply -f postgres/k8s/
kubectl apply -f todo-backend/k8s/
kubectl apply -f todo-app/k8s/

# Restart deployment
kubectl rollout restart deployment todo-backend-dep
kubectl delete pod -n project -l app=todo-backend

# Test with db
kubectl run -it --rm --restart=Never --image=postgres --namespace=project psql-debug -- psql postgres://postgres:secretpassword@todo-postgres-0.todo-postgres.project.svc.cluster.local:5432/todos # table=todos
\dt
select * from todos;
```

## Results

![alt text](image.png)

![alt text](image-1.png)