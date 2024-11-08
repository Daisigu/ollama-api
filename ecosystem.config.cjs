module.exports = {
  apps: [
    {
      name: 'index',
      script: 'dist/index.js',  // Указываем путь к скомпилированному файлу
      watch: true,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
