window.addEventListener('DOMContentLoaded', (event) => {
  let keyboard = document.querySelector('.keyboard');
  let keys = [];
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let notes = document.querySelectorAll('.key');
  let oscillator;
  let count = 25;
  let keyCodes = [90, 83, 88, 68, 67, 70, 86, 71, 66, 72, 78, 74, 77, 75, 188, 76, 190, 186, 191];

  const playSound = function(event, keyCode) {
    let key;
    if (keyCode) {
      key = keys[keyCodes.indexOf(keyCode)] || null
    } else  {
      key = event.target;
    }

    if (key) {
      key.classList.add('active');
      oscillator = audioCtx.createOscillator();
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(key.id, audioCtx.currentTime);
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      setTimeout(()=> {
        stopSound(event)
      }, 700)
    }
  }

  const stopSound = function(event, keyCode) {
    let key;
    if (keyCode) {
      key = keys[keyCodes.indexOf(keyCode)] || null;
    } else  {
      key = event.target;
    }
    if (key) {
      key.classList.remove('active');
      oscillator.stop()
    }
  }

  for (var i=0; i < 19; i++) {
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
    key.setAttribute('value', keyCodes[i]);
    count+=25
    keys.push(key)
  }
  keyboard.append(...keys)

  document.addEventListener('keydown', (event)=>(playSound(event, event.keyCode)))

  document.addEventListener('keyup', (event)=>(stopSound(event, event.keyCode)))
});