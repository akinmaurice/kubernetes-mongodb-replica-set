## Kubernetes Cluster with Mongo DB replica set and node api

This repository contains a Mongo Db Replica set for kubernetes and a node api connecting to the cluster.

## Getting started

Make sure you have `minikube` installed.

To install minikube using homebrew: [https://formulae.brew.sh/formula/minikube]()

Start minikube by running this command: `minikube --memory 8192 --cpus 2 start`

Execute `minikube status` to confirm minikube is running

#### `Clone`

Navigate to your work directory and clone the project, change directory to the `node-api-starter` and add a new remote origin pointing to the new project repo.

```console
$ git clone https://github.com/akinmaurice/kubernetes-mongodb-replica-set
$ cd kubernetes-mongodb-replica-set
```

#### Deploying

With minikube running now, cd into the `mongodb` directory in the and execute `kubectl create -f .`

This should create the replica sets for MongoDb.

Execute `kubectl get all` to see all replicas of mongoDb running

Once the Mongodb replicaSet is up, cd into the  `user-service `and execute `kubectl create -f .` This should create the node api deployment and connect to the mongoDb replica set.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://opensource.org/licenses/MIT) file for details
