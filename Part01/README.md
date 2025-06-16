* Create a cluster (if not yet)
```bash
k3d cluster create -a 2 (create a server node with 2 agent nodes, default name: k3s-default)
```

* Access services exposed via Ingress (like Traefik) using http://localhost:8081
```bash
k3d cluster create k3s-default --api-port 6550 -p "8081:80@loadbalancer"
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
kubectl create deployment <deployment_name> --image=<image>:<tag>
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
kubectl rollout restart deployment pingpong-app
```

* Check materials created
```bash
kubectl cluster-info
k3d cluster list (find k3d cluster)
kubectl get pods (find pods in the cluster)
kubectl logs -f <pod> (find logs of app running in the pod)
kubectl describe pod <pod>
kubectl describe deployment <image>:<tag>
kubectl get svc,ing
```

* Delete deployment
```bash
kubectl delete deployment <image>:<tag>
```

* Forward running port (3000 to 3003)
```bash
kubectl port-forward <pod> 3003:3000
kubectl get pods -n kube-system
kubectl get svc -n kube-system
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