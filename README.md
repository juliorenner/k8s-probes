
```
docker build . --tag k8s-probes

docker run --rm -p 3000:3000 docker.io/library/k8s-probes
```

To trigger the startup endpoint, the pod needs to be directly port-forwarded.

```
kubectl port-forward pod/startup-... 3002:3000
```