#!/bin/bash

kubectl create namespace melo
kubectl apply -f kaniko/kaniko-secret.yaml
kubectl apply -f kaniko/kaniko-service-account.yaml