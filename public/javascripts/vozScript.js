// Variables del DOM
let language = document.getElementById('lang')
let resTxt = document.getElementById('resTxt')
let btnStart = document.getElementById('btnStart')
let btnStop = document.getElementById('btnStop')
let final = document.getElementById('final')
let interim = document.getElementById('interim')

// Variables para Reconocimiento de Voz
let recognition = new webkitSpeechRecognition()

// Script Reconocimiento de Voz
function recog() {
    if ("webkitSpeechRecognition" in window) {
        recognition.continuous = true
        recognition.interimResults = true;
        recognition.lang = language.value
        recognition.onresult = event => {
            let finalTranscript = ''
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                let x = event.results[i][0].transcript

                if (event.results[i].isFinal) {
                    finalTranscript += x
                } else {
                    interimTranscript += x
                }
            }

            final.innerHTML = finalTranscript
            interim.innerHTML = interimTranscript
        }

    } else {
        final.innerHTML = "Speech Recognition Not Available"
    }
}

btnStart.addEventListener('click', () => {
    if (language.value == '') {
        console.log('Escoja un lenguaje')
    } else {
        recog()
        recognition.start()
    }
})

btnStop.addEventListener('click', () => {
    recognition.stop()
})