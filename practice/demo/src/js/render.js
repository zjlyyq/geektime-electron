const { ipcRenderer, Dock } = require('electron')
const Timer = require('timer.js')

function startWork() {
    let workTime = new Timer({
        ontick: (ms) => {
            document.getElementById("timer_show").innerHTML = ms / 1000
        },
        onend:() => {
            notification()
        }
    })

    workTime.start(10)
}

async function notification() {
    let res = await ipcRenderer.invoke('work-notification')

    if (res === 'rest') {
        setTimeout(() => {
            alert('休息')
        }, 5 * 1000)
    }else if (res === 'work') {
        startWork()
    }
}

startWork()