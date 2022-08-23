# Event Manager (React)

_(This project is still a work in progress.
Functionalities might be missing or bugs might be present)_

Event Manager allows you to manage your upcoming events, either create your own or subscribe to events from other users.
No login is required to take a look at available events, but the events you will see may be more limited.
Login is required to create, update or delete an event, or to subscribe to any event from other users.
A notification will be sent to you via socket 24 hours before the event starts, to remind you of it.

# Repositories

- Main repo: https://github.com/daxadal/event-manager-react

# Availability

_(This server is not currently being served on the Internet)_

# Previous steps

_This app needs to be connected to the [Event Manager (API)](https://github.com/daxadal/event-manager) project.
Check its [availability](https://github.com/daxadal/event-manager#availability) beforehand, or execute it locally._

Modify the `.env` with the server URL.

# Installation and execution

To run the app, first you have to install the dependencies:

```bash
npm ci
```

The app can be started using **one** of the following commands:

```bash
npm run serve # Hot-reloads for development
npm run build # Minifies for production
```

By default, the app is available at `http://localhost:8080`.

# Lint

Project can be linted using the following command:

```bash
npm run lint
```

# Storybook

A [Storybook](https://storybook.js.org/) of the project components can be started using the following command:

```bash
npm run storybook # Hot-reloads for development
npm run build-storybook # Minifies for production
```
