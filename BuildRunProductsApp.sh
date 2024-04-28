#!/bin/bash

# Build and run backend
echo "Building and running singular products backend..."
cd C:\Users\27810\source\repos\singular-products-app\singular-products-app.Server
dotnet build
dotnet run 

# Wait for backend to start
sleep 7

# Build and run frontend
echo "Building and running fsingular products rontend..."
cd C:\Users\27810\source\repos\singular-products-app\singular-products-app.client

npm run build
npm start
npm install