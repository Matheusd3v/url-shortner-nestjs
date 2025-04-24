#!/bin/bash

BASE_PATH="$(dirname "$0")"
ENV_PATH="$BASE_PATH/../.env"
TEMP_ENV_PATH="$BASE_PATH/tmp-env-stripped"

if [ ! -f "$ENV_PATH" ]; then
  echo "❌ .env file not found at: $ENV_PATH"
  exit 1
fi

# Strip surrounding double quotes from values
sed -E 's/^(.*)=["'"'"'](.*)["'"'"']$/\1=\2/' "$ENV_PATH" > "$TEMP_ENV_PATH"

SECRET_PATH="$BASE_PATH/secret.yml"

kubectl create secret generic api-url-shortener-secret \
  --from-env-file="$TEMP_ENV_PATH" \
  --dry-run=client -o yaml > "$SECRET_PATH"
sleep 2
kubectl apply -f "$SECRET_PATH"
rm "$TEMP_ENV_PATH"

sleep 1
echo "Secrets created ✅"

kubectl apply -f "$BASE_PATH/postgresql-statefulset.yml"
kubectl apply -f "$BASE_PATH/postgres-clusterip.yml"
sleep 1
echo "Database created ✅"

kubectl apply -f "$BASE_PATH/api-deployment.yml"
kubectl apply -f "$BASE_PATH/api-load-balancer.yml"
sleep 31

if [ $? -eq 0 ]; then
  echo "Api created ✅"
  echo "All infrastructure created! API is running at http://localhost:3000"
  kubectl port-forward services/api-loadbalancer 3000:3000
else
  echo "❌ Failed to create API load balancer. Skipping port-forward."
  exit 1
fi
