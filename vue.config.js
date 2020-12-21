module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['serialport', 'mqtt', 'electron-edge-js'],
      nodeModulesPath: ['./node_modules'],
      appId: 'com.thelaundry.kiosk',
      productName: '더런드리 키오스크 Test',
      win: {
        icon: 'icon.ico',
        target: [{ target: 'nsis', arch: ['ia32', 'x64'] }],
      },
    },
  },
};
