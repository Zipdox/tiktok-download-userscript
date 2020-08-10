// ==UserScript==
// @name        TikTok Stream Extractor
// @version     1.0
// @grant       none
// @match       https://m.tiktok.com/share/live/*
// @run-at      document-end
// @author      Zipdox
// @homepageURL https://github.com/Zipdox/tiktok-download-userscript
// ==/UserScript==


const button = document.getElementsByClassName('open-btn')[0]; // select the red button
const parent = button.parentElement;                           // select the button's parent element
const cloneButton = button.cloneNode();                        // clone the button to remove existing click events
button.remove();                                               // remove the button
parent.appendChild(cloneButton);                               // append the clean new button
cloneButton.innerText = "Copy Stream";                         // put text in the new button

cloneButton.onclick = function(){                                                                    // when button is clicked
  const pageProps = getProps();                                                                      // get the page properties
  const liveData = pageProps.liveData;                                                               // get the liveData property
  if(liveData == undefined) return alert("This is not a live stream!");                              // if the livedata property is undefined, this is not a livestream
  const LiveUrl = liveData.LiveUrl;                                                                  // get the stream's URL
  if(LiveUrl == undefined) return alert("Can't find the stream URL");                                // if the LiveUrl property is undefined, there's no stream URL
  copyToClipboard(LiveUrl);                                                                          // copy the URL to the clipboard
  alert(`Stream link copied to clipboard!\nYou can play it in VLC: Media > Open Network Stream...`); // alert the user it's copied
}

function getProps(){
	const scripts = document.getElementsByTagName('script');             // gather all scripts in document
  for(script of scripts){                                              // loop through the collected scripts
    if(script.innerHTML.includes('window.__INIT_PROPS__')){            // check if this script contains the properties we're looking for
      const propText = script.innerHTML.split('__INIT_PROPS__ = ')[1]; // split the code so we can copy the second piece, which is the JSON we need
    	const props = JSON.parse(propText);                              // parse the JSON
    	return props["/share/live/:id"];                                 // return property "/share/live/:id"
    }
  }
}

function copyToClipboard(text){
  const copyText = document.createElement('textarea'); // create textarea
  copyText.value = text;                               // put text to be copied in the textarea
  document.body.appendChild(copyText);                 // add the textarea to the page
  copyText.select();                                   // select the tex area
  document.execCommand("copy");                        // copy the selected text
  document.body.removeChild(copyText);                 // remove the textarea once done
}
