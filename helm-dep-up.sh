#!/bin/bash

cd apps
for folder in *; do
  cd $folder/k8s
  if [ -e Chart.yaml ]; then
    for subDir in $(awk -F'repository: file://' '{print $2}' Chart.yaml); do
      echo "Updating charts in "$(pwd)"/"$subDir
      rm -rf "$(pwd)"/"$subDir"/charts
      helm dep up "$(pwd)"/"$subDir"
      echo
    done
    echo "Updating charts in "$(pwd)
    rm -rf "$(pwd)"/charts
    helm dep up "$(pwd)"
    echo
  fi
  cd ../..
done
cd ..
