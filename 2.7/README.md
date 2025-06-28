# Assignment

> Run a Postgres database and save the Ping-pong application counter into the database.
> 
> The Postgres database and Ping-pong application should **not be** in the same pod. A single Postgres database is enough and it may disappear with the cluster but it should survive even if all pods are taken down.
> 
> **Hint:** it might be a good idea to ensure that the database is operational and available for connections before you try connecting it from the Ping-pong app. For that purpose, you might just start a stand-alone pod that runs a Postgres image:
> 
>     kubectl run -it --rm --restart=Never --image postgres psql-for-debugging sh
>     $ psql postgres://yourpostgresurlhere
>     psql (16.2 (Debian 16.2-1.pgdg120+2))
>     Type "help" for help.
>     postgres=# \d
>     Did not find any relations.

# Solution

Application was built in Nodejs using `sqlx` crate. It connects to a database path defined in `DB_URL` environment variable. Upon initialisation the application runs a migration script, if not run previously. The script creates `pings` table and inserts a row with initial number of `pongs`. The application listens for a GET request on `localhost:8081/pingpong`. Upon receiving requests, the number of `pongs` in the database is updated. Secret manifest was used to pass in `DB_URL` environment variable, containing databse credentials. Secret manifest was used to pass in `POSTGRES_PASSWORD` environment variable.

## Commands

```bash
# Update images
docker build -t bachthyaglx/pingpong:latest ./pingpong
docker push bachthyaglx/pingpong:latest

# Apply changes on kube
kubectl apply -f postgres/k8s/ -n exercises
kubectl apply -f pingpong/k8s/ -n exercises

# Restart deployment 
kubectl rollout restart deployment pingpong-dep -n exercises

# Review running pods with namespace=exercises
kubectl get pods -n exercises

# Tests with postgres
kubectl run -it --rm --restart=Never --image=postgres --namespace=exercises psql-debug -- psql postgres://postgres:secretpassword@postgres-0.postgres.exercises.svc.cluster.local:5432/pingpong
\dt
select * from pingpong;
```

### Results

![alt text](image.png)

![alt text](image-1.png)