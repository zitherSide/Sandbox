const builder = require("electron-builder")
const Platform = builder.Platform

builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
        "productName": "Sample Electron for me",
        "copyright": "Copyright (c) 2020 ${author} Software",
        "appId": "com.exmaple.eletron.SamplApp",
        "win": {
            "icon": "build/icon.ico",
            "target": [
                {
                    "target": "appx",
                    "arch": [
                        "x64",
                        "ia32"
                    ]
                }
            ]
        },
        "nsis": {
            "installerIcon": "build/installerIcon.ico",
            "oneClick": false,
            "perMachine": false,
            "allowElevation": true,
            "allowToChangeInstallationDirectory": true,
            "runAfterFinish": false
        },
    }
}).then(() => console.log('\n**** Build-process is finished ****\n'))
.catch(e => console.log(e.message))