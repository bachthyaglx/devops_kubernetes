* Create a cluster (if not yet)
```bash
k3d cluster create -a 2 (create a server node with 2 agent nodes, default name: k3s-default)
k3d cluster list
```

* Prepare Dockerfile, build and push image to Docker hub
```bash
docker build -t <image>:<tag> .
docker push <image>:<tag> 
# if error: docker tag <image>:<tag> yourusername/<image>:<tag>
```

* Import image to k3d:
```bash
k3d image import <image>:<tag> -c k3s-default
```

* Prepare deployment.yml, create deployment
```bash
kubectl apply -f manifests/deployment.yaml
kubectl create deployment <deployment_name> --image=<image>:<tag>
kubectl get deployments

```

* Forward a local port to a pod
```bash
kubectl port-forward deployment/<app_name> 3000:3000
```
-------------------------------------------------------------------------------------------

* Access services exposed via Ingress (like Traefik) using http://localhost:8081
```bash
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

* When you update the image, just:
```bash
docker build -t <image>:<new_tag> .
docker push <image>:<new_tag>
k3d image import <image>:<new_tag> -c k3s-default

# Then update deployment.yaml → change image: hashgenerator:v2
kubectl delete -f manifests/deployment.yaml

# or edit deployment.yaml so that the tag is updated to the <new_tag> and run
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
kubectl apply -f manifests/ingress.yaml
kubectl apply -f manifests/ # all in one restart
kubectl rollout restart deployment pingpong-app
```

* Check materials created
```bash
kubectl cluster-info
kubectl get deployments
kubectl get pods #find pods in the cluster
kubectl logs -f <pod> #find logs of app running in the pod#
kubectl describe pod <pod>
kubectl describe deployment <image>:<tag>
kubectl get svc,ing
```

* Delete deployment
```bash
kubectl get deployments
kubectl delete deployment <image>:<tag>
```

* Forward running port (3000 to 3003)
```bash
kubectl port-forward <pod> 3003:3000
kubectl get pods -n kube-system
kubectl get svc -n kube-system
```

* Start/Stop/Delete cluster
```bash
k3d cluster stop mycluster
k3d cluster start mycluster
k3d cluster delete mycluster
```

-------------------------------------------------------------------------------

* Namespace

```bash
kubectl create namespace exercises
kubectl get all -n exercises
kubectl get all --all-namespaces
```

* Secret

```bash
kubectl create secret generic pg-credentials --from-literal=DATABASE_URL=xxxxxx -n exercises
```

* NOTE:
deployment.yaml – Khởi tạo Pod & Container
    Tạo Pod chứa Container chạy ứng dụng (VD: Express.js server).
    Label app: my-app được gán cho Pod để Service tìm thấy nó.
service.yaml – Mở đường đi nội bộ
    Trỏ đến các Pod được label app: my-app.
    Gửi lưu lượng từ cổng 80 đến cổng 3000 trong container.
    Đây là địa chỉ nội bộ để Ingress có thể truy cập Pod thông qua Service.
ingress.yaml – Expose ra bên ngoài
    Xác định đường /myapp trên localhost:8081/myapp.
    Chuyển tiếp request đến Service my-service, Service này tiếp tục chuyển đến Container.

* Flow 
User --> Ingress --> Service --> Pod/Container (ứng dụng thực tế)
    User truy cập: http://localhost:8081/myapp
    Ingress: định tuyến /myapp → my-service:80
    Service: chuyển đến Pod:3000 (ứng dụng lắng nghe)