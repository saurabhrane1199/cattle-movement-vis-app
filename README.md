
# Cattle Movement Visualiser

The app takes data from csv builds it into a database and visualize it on maps.

Tech Stack:

- Frontend - **React**
- Backend - **Flask**
- Database - **SQLite3**

## Running it on your pc:

``git clone <repo>``

``docker compose up --build``

``Go to localhost:3000``

## Known Bugs, System Limitations, Future Work

- Form Input Validation.
  Creation forms lack input validation, which is why the app only handles when apt data is entere
- Error msgs and Toasts for the user incase of incorrect actions and credentials
- Population Data and Movements Data are interlinked, thus records are displayed correctly only if for each Farm in population has a premise id associated in Movements table
- Proper Error Handling and error code propogation in the backend for server side logs.

## Kubernetes Setup

1. Ensure Docker is running

```bash
minikube start
```

2. Follow instructions
  
https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/




