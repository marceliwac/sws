# About

This project uses moleculer framework to provide a microservice workload that counts words on a page.

It exposes the following REST API:

> **GET** 
> 
> **/api/swsapi/wordCount**
> 
> **Query Parameters:**
> - address
>  - Fully qualified address of the page to count words on.
> - mode 
>   - *optional* 
>   - Mode of fetching the address (can be `RAW` or `BROWSER`).
> - key
>   - *optional*
>   - CSS key to select the element(s) of interest.
> - strategy 
>   - *optional*
>   - Strategy to filter through the elements selected by the key (can be `FIRST`, `LAST` or `ALL`).

The API can be used to query both SSR and CSR pages, where CSR pages need to be queried with `mode=BROWSER` parameter.
A default grace period for page loading using `mode=BROWSER` is set to 3s. 

# Usage

This project can be run using moleculer's own tooling, docker (via the docker-compose) and on a kubernetes cluster (by applying the template).

## Moleculer-Runner

To run the project using moleculer:

1. Install the dependencies.
```shell
npm install
```

2. Run the project.
```shell
# To start the project locally
npm run start

# To start the project with hot reload and REPL console
npm run dev
```

## Docker

To run the project via docker:

1. Ensure docker engine is running.

2. Launch the docker-compose configuration.

```shell
docker-compose up
```

## Kubernetes

To deploy the project to a kubernetes cluster:

1. Build the docker image.

```shell
docker build . -t sws
```

2. Upload the docker image to a desired registry and update image name in `k8s.yaml`'s container image spec to reflect it.

3. Apply the configuration file.

```shell
kubectl apply -f k8s.yaml
```

# Minikube setup

Minikube can be used to setup a local kubernetes cluster. To install minikube follow the [instructions](https://minikube.sigs.k8s.io/docs/start/).

1. Create local minikube cluster. Docker might need to be configured to provision necessary resources (CPU, memory).

```shell
minikube start.
```

2. Connect the docker to the docker daemon inside minikube.

```shell
eval $(minikube docker-env)
```

3. Build the image so that it's available locally within minikube's docker.

```shell
docker build -t sws . 
```

4. Apply the kubernetes template (kubectl associated with minikube will be downloaded for the first time).

```shell
minikube kubectl -- apply -f k8s.yaml 
```

5. Expose the URL of the **api** service running within a cluster.

```shell
minikube service api --url 
```

To rebuild the image and refresh the deployed services:
```shell
docker build -t sws . && kc delete $(kc get pods -o name) && minikube service api --url      
```
