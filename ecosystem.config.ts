module.exports = {
    apps: [
      {
        name: "AppName",
        script: "npm",
        args: "run dev",
        interpreter: "cmd.exe",
        env: {
            PORT: 3001,
          }, // important for Windows
      },
    ],
  };