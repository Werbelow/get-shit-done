#!/usr/bin/env node

var program = require('commander');
var Progress = require('ts-progress');
var notifier = require('node-notifier');
var chalk = require('chalk');

program
    .arguments('<minutes>')
    .option('-b, --break', 'Want a 5 minute break after timer is done? (add flag if you want a break)')
    .option('-n, --notification', 'Show notification (add flag if you want a notification)')    
    .option('-c, --color <color>', 'Color of progress bar - red, yellow, green, blue, cyan, magenta or black')
    .action(function(minutes){
        var pause = program.break || false 
        var color = program.color || "green"
        var notification = program.notification || false 
        handleFocus(minutes, pause, color, notification);
    })
    .parse(process.argv);

function handleFocus(minutes, pause, color, notification) {
    var total = minutes * 60, count = 0;
    console.log(chalk.green("You have " + minutes + " minutes to get shit done! GO!"));

    var colors = ["red", "yellow", "green", "blue", "cyan", "magenta", "black"]
    var bar = colors.indexOf(color) > -1 ? 'Getting Shit Done...: {bar.white.'+ [color] + '.20}' : 'Getting Shit Done...: {bar.white.green.20}'

    var progress = new Progress(total, bar);
    var iv = setInterval(function () {
    count++;
    progress.update();
    if (count == total) {
        clearInterval(iv);
        if(notification){
            notifier.notify({
                'title': 'Timer is done!',
                'message': 'Did you get shit done?'
            });
        }
        if(pause){
            handlePause(notification);
        } else {
            console.log(chalk.green("DID YOU GET SHIT DONE?!"));            
        }
    }
    }, 1000);

}

function handlePause(notification) {
    console.log(chalk.green("DID YOU GET SHIT DONE?!"));            
    console.log(chalk.blue("5 Minute Break"));
    var pause = new Progress(300, 'Taking a break... {bar.white.blue.20}')
    var pauseCount = 0;

    var pauseIV = setInterval(function(){
        pauseCount++;
        pause.update();
        if(pauseCount == 300){
            clearInterval(pauseIV);
            if(notification){
                notifier.notify({
                    'title': 'Break is over!!',
                    'message': 'Time to get shit done!'
                });
            }
            console.log(chalk.blue("BREAK IS OVER... TIME TO GET SHIT DONE!!"));
        }
    }, 1000)
}   

