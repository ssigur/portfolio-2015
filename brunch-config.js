exports.config = {

    optimize: true,
    sourceMaps: false,

    "paths": {
        "watched": ["app"],
        "public": "kirby-2.2.0",
        "compass": './compass.rb', 
    },
    
    "files": {
        "stylesheets": {
            "joinTo": "assets/css/styles.min.css",
        },
        "javascripts": {
            "joinTo": "assets/js/app.min.js"
        }
    },
    
    "conventions": {
        "assets": /static[\\/]/
    },
    "sprites":{
        "path": 'app/images/sprites', 
        "destCSS": '_sprites.scss', 
        "cssFormat": 'sass',
        "algorithm": 'top-down', 
        "engine": 'canvas',
        "imgOpts":{
            "format": 'auto', 
            "quality": 10,
        }
    },
    "plugins": {
        "imageoptmizer": {
            smushit: false,
            path: 'assets/images/'
        },
        "autoReload": {
            "enabled": false
        },
        "cleancss":{
          keepSpecialComments: 0,
          removeEmpty: true
        },
        "retina":{
            regexp: /(@2[xX])\.(?:gif|jpeg|jpg|png)$/,
            path: 'images',
            assetsPath: 'kirby-2.2.0/assets',
            minWidth: 0,
            minHeight: 0
        }
    },
    "modules": {
        "wrapper": false,
        "definition": false
    },
    

    "overrides": {
        "DEV": {
            "optimize": false,
            "sourceMaps": true,

            "plugins": {
                
                "autoReload": {
                    "enabled": true
                }
            }
        }
    }
}