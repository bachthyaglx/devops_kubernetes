# Assignment

> Choose one service provider such as Rancher and compare it to another such as OpenShift.
> Decide arbitrarily which service provider is "better" and argue for it against the other service provider.
> For the submission a bullet points are enough.

### Results

| Feature                       | Rancher                          | OpenShift                         |
|-------------------------------|----------------------------------|-----------------------------------|
| 🧩 Setup complexity           | Lightweight, simple (with k3d)   | Heavy, complex                    |
| ⚙️ Kubernetes compatibility   | Works with any distro (GKE, EKS) | Tightly coupled with Red Hat      |
| 💻 Local development support  | Excellent (via k3d)              | Limited (via crc, heavier)        |
| 🔍 Kubernetes transparency    | Closer to vanilla Kubernetes     | Abstracts many K8s internals      |
| 🧑‍💻 Open source                | Fully open source                | Partially (OKD vs OpenShift)      |
| 📊 Multi-cluster management   | Strong with clean UI             | Good but OpenShift-focused        |
| 🎓 Learning curve             | Easier for Kubernetes learners   | Steeper, more opinionated         |

-> Winner: **Rancher** - better for flexibility, learning, and lightweight environments.
