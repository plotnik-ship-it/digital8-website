// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'digital8-website',
      script: './dist/server/entry.mjs',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
