//graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: ['graphql/schema.graphql', 'directives.graphql'],
      documents: ['/graphql.{graphql,js,ts,jsx,tsx}'],
    },
  },
};