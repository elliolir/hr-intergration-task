# HR Integration Test Task

Node.js integration service built with `TypeScript` and `Express.js`. The main goal is to provide aggregation of the courses data from the HR system.

### Requirements:
* `node.js@19`
* `npm@9.2.0`

### Set up steps
Add proper `ENV` variables defined inside the `env.example` file (either manually or with `.env` file). Then run:

```bash
npm i
```

```bash
npm start
```

and you're good to go.


### Additional scripts
* `npm run dev` — runs a dev server with a hot-reload;
* `npm test` — runs `jest`-based unit tests;
* `npm run lint` and `npm run lint:fix` — checks and fixes styling/linting issues respectively;

### Available endpoints
* GET `api/courses/` - returns the list of existing courses with just a trainer/learners id's. Created for the self-testing purposes in order to retrieve the valid `courseId`;
* GET `api/courses/${courseId}` - returns the selected course, as well as full information about its trainer and learners.
