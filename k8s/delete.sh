#!/bin/bash

BASE_PATH="$(dirname "$0")"

# Delete all K8s resources from your manifests
kubectl delete -f "$BASE_PATH/"

# Wait a moment for resources to terminate cleanly
sleep 2

# Delete the PVC used by PostgreSQL (typically just one if 1 replica)
PVC_NAME=$(kubectl get pvc -l app=postgres-statefulset --no-headers -o custom-columns=NAME:.metadata.name | head -n 1)

if [ -n "$PVC_NAME" ]; then
  kubectl delete pvc "$PVC_NAME"
  echo "PersistentVolumeClaim '$PVC_NAME' deleted ✅"
else
  echo "No PersistentVolumeClaim found to delete."
fi

echo "🧹 All infrastructure has been deleted!"
