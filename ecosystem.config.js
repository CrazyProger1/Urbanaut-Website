module.exports = {
  apps: [
    {
      name: "urbanaut-frontend-website",
      script: "npm",
      args: "start",
      env: {
        PORT: 4000,
        NODE_ENV: "production",
      },
    },
  ],
};
