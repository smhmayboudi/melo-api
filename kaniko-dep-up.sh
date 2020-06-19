#!/bin/bash

kubectl create namespace melo
kubectl apply -f kaniko/kaniko-cache-claim.yaml
kubectl apply -f kaniko/kaniko-cache-volume.yaml
kubectl apply -f kaniko/kaniko-secret.yaml
kubectl apply -f kaniko/kaniko-service-account.yaml
kubectl apply -f kaniko/kaniko-warmer.yaml