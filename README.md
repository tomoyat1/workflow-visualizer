# workflow-visualizer

Let's say you happen to have a "workflow" written in the following YAML format...

```yaml
---
migrate-db: 
  after: 
  type: "run-job"
deploy-canary: 
  after: 
  - "migrate-db"
  type: "deploy-manifest"
deploy-baseline: 
  after: 
  - "migrate-db"
  type: "deploy-manifest"
deploy-main: 
  after: 
  - "deploy-baseline"
  - "deploy-canary"
  type: "deploy-manifest"
webhook: 
  after: 
  - "deploy-main"
  type: "webhook"
```

, and you want a handy tool to visualize it. Use `workflow-visualizer`!


## Running

```console
% git clone ssh://git@github.com/tomoyat1/workflow-visualizer
% cd workflow-visualizer
% npm i
% npm run start
```

After it starts up, go to `localhost:3000` and paste the above YAML in the textbox.
The steps should be visualized in a graph.
