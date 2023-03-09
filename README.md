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

### Solution design
The whole flow of the API is:
1. We create initial request for the course data;
2. If it exist, we request trainer and learners data in parallel;
    * If not, return 404 HTTP error;
3. After successful receive, we aggregate this data and return it to the consumer.

Since it's pretty straightforward, no technical constraints were met. So I decided to go with:
* `Express.js` as a main framework for its simplicity and popularity;
* `TypeScript` in order to have proper typing, so we can have higher maintainability of the code-base;
* `jest` as a test runner since it has everything out of the box (for the unit tests, of course);
* `prettier/eslint` quality tools for consistent styling and additional static analysis.

In terms of architecture, I've decided to follow layered architecture pattern. So conceptually we have:
* `*.api.ts` -  Data Access logic. Just an abstraction layer above `axios` HTTP calls.;
* `*.service.ts` - Service Layer to contain business logic;
* `*.controller.ts` - to orchestrate Data and Service layers calls and produce Views.
* `*.routes.ts` - define endpoints and connect controllers with it.

Those files are united conceptually within the `module` folder, so everything is located closely.

I put data aggregation logic into the controller (thus, we don't have any `*.service.ts` files) because I don't consider this operation a
business logic - we don't define any use-cases or rules, hence, just operate with it as a View.

### Potential improvements

For a small MVP it pretty much does its job. But here are some possible improvements:
* Add tests for the `handleErrorMiddleware` — I've decided to skip it for now (in order to save time) since it's logic is quite simple
  and optional;
* Cover the case when trainer or some of the learners data is missing;
* I would probably try to add proper caching of the courses/trainers/learners data in
  order to speed up the response times. Something like `Redis` would work for this particular task;
* Add proper logging library (or even full monitoring solution, if we try to raise the stakes)
  — right now it's just a bunch of `console.*`;
* Add data-contract testing with `Pact.js` in order to validate integration with the data provider.
* Add E2E API tests in order to check the work of the whole flow in the real-life scenario;
* Improve the Data-Access Layer of the app to make it scalable and more convenient.
  Current approach with `*.api.ts` is super straight-forward and basically a wrapper around the `axios` calls.
  Some sort of Object Relation Mapping solution would be a great thing to have;
* Maybe implement this app as a `GraphQL` service,
  since it's current main concern is to request and aggregate the data.
* Dockerize this app in order to simplify its set-up and deployment.
