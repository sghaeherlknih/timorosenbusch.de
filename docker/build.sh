#!/bin/sh
VERSION=${1:-1.0.0}
IMAGE=timorosenbusch-de

docker build -t ${IMAGE}:${VERSION} -t ${IMAGE}:latest .
echo "Built ${IMAGE}:${VERSION} and ${IMAGE}:latest"
