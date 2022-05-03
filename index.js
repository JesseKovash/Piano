window.addEventListener('DOMContentLoaded', (event) => {
  let keyboard = document.querySelector('.keyboard');
  let keys = [];
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator;
  let count = 25;

  const playSound = function(event) {
    console.log('inplaysound')

    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(event.target.id, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(()=> {
      console.log('insettimeout')
      stopSound(event)
    }, 700)
  }

  const stopSound = function(event) {
    oscillator.stop()
  }

  for (var i=0; i < 37; i++) {
    let key = document.createElement('div');
    if (i % 2 === 0) {
      key.classList.add('white')
    } else {
      key.classList.add('black')
    }
    key.addEventListener('mousedown', playSound)
    key.addEventListener('mouseup', stopSound)
    key.classList.add('key')
    key.setAttribute('id', count);
    count+=25
    keys.push(key)
  }
  keyboard.append(...keys)

});