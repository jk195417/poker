function pokeBack() {
  var btns = [...document.querySelectorAll('a[ajaxify^="/pokes/inline/?"]')]
  var pokeBackBtns = btns.filter(btn => btn.textContent === "戳回去");
  if (isPoking) {
    pokeBackBtns.forEach(btn => btn.click());
  }
  setNextPoke();
}

function setNextPoke() {
  var time = randomTime();
  window.setTimeout(pokeBack, time);
}

function randomTime(min = 5000, max = 14000) {
  return Math.round(Math.random() * (max - min) + min);
}

function meta() {
  return document.querySelector('meta[id="poker"][data-poking]')
}

function isPoking() {
  meta().dataset.poking
}

function poking(bool) {
  meta().dataset.poking = bool;
  sendPokingSignal();
}

function sendPokingSignal() {
  chrome.runtime.sendMessage({
    poking: meta().dataset.poking
  }, function(response) {
    if (response.poking === 'true') {
      console.log('Poker is running');
    } else {
      console.log('Poker is resting');
    }
  });
}

function initPoker() {
  if (meta() === null) {
    var dom = document.createElement('meta');
    dom.id = 'poker'
    dom.dataset.poking = false;
    document.body.appendChild(dom);
  }
  sendPokingSignal();
}

if (location.href.indexOf("https://www.facebook.com/pokes") === 0) {
  initPoker();
  pokeBack();
} else {
  console.log("Poker only work at https://www.facebook.com/pokes");
}
