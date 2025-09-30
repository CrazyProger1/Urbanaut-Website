module.exports = {
  apps: [
    {
      name: "urbanaut-frontend-website",
      script: "npm",
      args: "start",
      env: {
        PORT: 3001,
        NODE_ENV: "production",
      },
    },
  ],
};
