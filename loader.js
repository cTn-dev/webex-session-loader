'use strict';

console.log('Webex Teams Session Loader: Injected');

let liveToken = sessionStorage.getItem('web-client-internal-bounded');
let previousToken = localStorage.getItem('web-client-internal-bounded');

if (liveToken) {
  let liveTokenParsed = JSON.parse(liveToken);

  if (Object.keys(liveTokenParsed.Credentials).length) {
    console.log('Webex Teams Session Loader: Storage updated after initialization');
    console.log('Webex Teams Session Loader: 1 minute token update interval started, enjoy');

    localStorage.setItem('web-client-internal-bounded', liveToken);
    previousToken = liveToken;

    setInterval(() => {
      liveToken = sessionStorage.getItem('web-client-internal-bounded');

      if (liveToken != previousToken) {
        console.log('Webex Teams Session Loader: Storage updated');

        localStorage.setItem('web-client-internal-bounded', liveToken);
        previousToken = liveToken;
      }
    }, 60000);
  } else if (previousToken) {
    console.log('Webex Teams Session Loader: Loaded token from storage, reloading in 1 second ...');

    sessionStorage.setItem('web-client-internal-bounded', previousToken);
    setTimeout(() => location.reload(), 1000);
  }
}
