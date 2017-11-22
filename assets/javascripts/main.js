function viewForStop() {
  $('#startBtn').addClass('d-none');
  $('#stopState').addClass('d-none');
  $('#stopBtn').removeClass('d-none');
  $('#startState').removeClass('d-none');
}

function viewForStart() {
  $('#stopBtn').addClass('d-none');
  $('#startState').addClass('d-none');
  $('#startBtn').removeClass('d-none');
  $('#stopState').removeClass('d-none');
}

$(document).ready(function() {

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.poking === 'true') {
        viewForStop();
      } else {
        viewForStart();
      }
      sendResponse({
        poking: request.poking
      });
    });

  chrome.tabs.executeScript(null, {
    file: "/content/poke.js"
  });

  $('#startBtn').on('click', function() {
    chrome.tabs.executeScript({
      code: 'poking(true);'
    });
  });

  $('#stopBtn').on('click', function() {
    chrome.tabs.executeScript({
      code: 'poking(false);'
    });
  });

  $('#poke-link').on('click', function() {
    chrome.tabs.executeScript({
      code: 'location.replace("https://www.facebook.com/pokes");'
    });
  });
});
