module.exports = {
  apps: [
    {
      name: "ollama-api",  
      script: "dist/index.js",  
      watch: true,  
      autorestart: true,  
      env: {
        NODE_ENV: "production", 
      },
      instances: 1,  
      exec_mode: "fork", 
      max_restarts: 5,  
      restart_delay: 5000, 
    },
  ],
};
