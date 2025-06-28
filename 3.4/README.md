# Assignment

> Your ping-pong app now most likely needs to respond to the URL /pingpong to work in the cluster setup. It would be nice if we were not forced to reflect the cluster-level URL structures in the applications, and instead the app itself could provide the behavior in the root path /. Thanks to the flexibility of the Gateway API, this can be easily done by route rewriting.

Make this change to your ping-pong app and to the HTTP route!

# Solution

```bash
kubectl apply -f route.yaml
kubectl logs deployment/pingpong

```

