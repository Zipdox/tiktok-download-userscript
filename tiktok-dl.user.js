// ==UserScript==
// @name        TikTok Downloader
// @version     1.2
// @grant       none
// @match       https://www.tiktok.com/@*
// @run-at      document-end
// @author      Zipdox
// @homepageURL https://github.com/Zipdox/tiktok-download-userscript
// @require     https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// ==/UserScript==

const icons = {
	download: '<span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve"><g> <g> <path d="M443.733,307.2c-9.426,0-17.067,7.641-17.067,17.067v102.4c0,9.426-7.641,17.067-17.067,17.067H68.267 c-9.426,0-17.067-7.641-17.067-17.067v-102.4c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v102.4 c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2v-102.4C460.8,314.841,453.159,307.2,443.733,307.2z"/> </g></g><g> <g> <path d="M335.947,295.134c-6.614-6.387-17.099-6.387-23.712,0L256,351.334V17.067C256,7.641,248.359,0,238.933,0 s-17.067,7.641-17.067,17.067v334.268l-56.201-56.201c-6.78-6.548-17.584-6.36-24.132,0.419c-6.388,6.614-6.388,17.099,0,23.713 l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.031c0.01-0.01,0.02-0.02,0.031-0.031l85.333-85.333 C342.915,312.486,342.727,301.682,335.947,295.134z"/> </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>',
	loading: '<span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 457.728 457.728" style="enable-background:new 0 0 457.728 457.728;" xml:space="preserve"><g><g><polygon points="73.728,0 73.728,39.936 96.768,39.936 360.96,39.936 384,39.936 384,0"/></g></g><g><g><polygon points="360.96,417.792 96.768,417.792 73.728,417.792 73.728,457.728 384,457.728 384,417.792"/></g></g><g><g><path d="M360.96,132.096v-71.68H96.768v71.68c0,5.632,2.56,11.264,6.656,14.848l94.72,81.92l-94.208,81.92 c-4.096,3.584-6.656,9.216-6.656,14.848v71.68h263.68v-71.68c0-5.632-2.56-11.264-6.656-14.848l-95.232-81.92l94.72-81.92 C357.888,143.36,360.448,137.728,360.96,132.096z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>',
	processing: '<span><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M256.001,0c-8.284,0-15,6.716-15,15v96.4c0,8.284,6.716,15,15,15s15-6.716,15-15V15C271.001,6.716,264.285,0,256.001,0z" /> </g> </g> <g> <g> <path d="M256.001,385.601c-8.284,0-15,6.716-15,15V497c0,8.284,6.716,15,15,15s15-6.716,15-15v-96.399 C271.001,392.316,264.285,385.601,256.001,385.601z"/> </g> </g> <g> <g> <path d="M196.691,123.272l-48.2-83.485c-4.142-7.175-13.316-9.633-20.49-5.49c-7.174,4.142-9.632,13.316-5.49,20.49l48.2,83.485 c2.778,4.813,7.82,7.502,13.004,7.502c2.545,0,5.124-0.648,7.486-2.012C198.375,139.62,200.833,130.446,196.691,123.272z"/> </g> </g> <g> <g> <path d="M389.491,457.212l-48.199-83.483c-4.142-7.175-13.316-9.633-20.49-5.49c-7.174,4.142-9.632,13.316-5.49,20.49 l48.199,83.483c2.778,4.813,7.82,7.502,13.004,7.502c2.545,0,5.124-0.648,7.486-2.012 C391.175,473.56,393.633,464.386,389.491,457.212z"/> </g> </g> <g> <g> <path d="M138.274,170.711L54.788,122.51c-7.176-4.144-16.348-1.685-20.49,5.49c-4.142,7.174-1.684,16.348,5.49,20.49 l83.486,48.202c2.362,1.364,4.941,2.012,7.486,2.012c5.184,0,10.226-2.69,13.004-7.503 C147.906,184.027,145.448,174.853,138.274,170.711z"/> </g> </g> <g> <g> <path d="M472.213,363.51l-83.484-48.199c-7.176-4.142-16.349-1.684-20.49,5.491c-4.142,7.175-1.684,16.349,5.49,20.49 l83.484,48.199c2.363,1.364,4.941,2.012,7.486,2.012c5.184,0,10.227-2.69,13.004-7.502 C481.845,376.825,479.387,367.651,472.213,363.51z"/> </g> </g> <g> <g> <path d="M111.401,241.002H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h96.401c8.284,0,15-6.716,15-15 S119.685,241.002,111.401,241.002z"/> </g> </g> <g> <g> <path d="M497,241.002h-96.398c-8.284,0-15,6.716-15,15s6.716,15,15,15H497c8.284,0,15-6.716,15-15S505.284,241.002,497,241.002z" /> </g> </g> <g> <g> <path d="M143.765,320.802c-4.142-7.175-13.314-9.633-20.49-5.49l-83.486,48.2c-7.174,4.142-9.632,13.316-5.49,20.49 c2.778,4.813,7.82,7.502,13.004,7.502c2.545,0,5.124-0.648,7.486-2.012l83.486-48.2 C145.449,337.15,147.907,327.976,143.765,320.802z"/> </g> </g> <g> <g> <path d="M477.702,128.003c-4.142-7.175-13.315-9.632-20.49-5.49l-83.484,48.2c-7.174,4.141-9.632,13.315-5.49,20.489 c2.778,4.813,7.82,7.503,13.004,7.503c2.544,0,5.124-0.648,7.486-2.012l83.484-48.2 C479.386,144.351,481.844,135.177,477.702,128.003z"/> </g> </g> <g> <g> <path d="M191.201,368.239c-7.174-4.144-16.349-1.685-20.49,5.49l-48.2,83.485c-4.142,7.174-1.684,16.348,5.49,20.49 c2.362,1.364,4.941,2.012,7.486,2.012c5.184,0,10.227-2.69,13.004-7.502l48.2-83.485 C200.833,381.555,198.375,372.381,191.201,368.239z"/> </g> </g> <g> <g> <path d="M384.001,34.3c-7.175-4.144-16.349-1.685-20.49,5.49l-48.199,83.483c-4.143,7.174-1.685,16.348,5.49,20.49 c2.362,1.364,4.941,2.012,7.486,2.012c5.184,0,10.226-2.69,13.004-7.502l48.199-83.483 C393.633,47.616,391.175,38.442,384.001,34.3z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></span>'
};

document.arrive(".share-group", function(){
  if(this.getElementsByClassName('downloadButton').length > 0) return;
  let shareButtons = this.getElementsByTagName('a');
  let downloadButton = document.createElement('a');
  this.insertBefore(downloadButton, shareButtons[4]);
  downloadButton.innerHTML = icons.download;
  downloadButton.className = shareButtons[1].className + ' downloadButton';
  downloadButton.onclick = downloadVideo;
  downloadButton.style.cursor = 'pointer';
});

function saveFile(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}

async function downloadVideo(){
  this.innerHTML = icons.loading;
  const watermarkedURL = document.getElementsByClassName('video-card-big')[0].getElementsByClassName('video-player')[0].src;
  const watermarkedVideoResponse = await fetch(watermarkedURL);
  const watermarkedVideoText = await watermarkedVideoResponse.text();
  this.innerHTML = icons.processing;
  const idpos = watermarkedVideoText.indexOf('vid:');
  var watermarklessURL;
  this.innerHTML = icons.processing;
  if(idpos == -1){
    if(confirm("Couldn't get watermarkless video with normal method, want to try a workaround?")){
      const getTokenPage = await fetch('https://ssstiktok.io/');
      const tokenPageText = await getTokenPage.text();
      const tokenDomParser = new DOMParser();
      const tokenDocument = tokenDomParser.parseFromString(tokenPageText, 'text/html');
      const token = tokenDocument.getElementById('token').value;
      const locale = tokenDocument.getElementById('locale').value;

      const getInfo = await fetch("https://ssstiktok.io/api/1/fetch", {
        "credentials": "include",
        "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "HX-Request": "true",
          "HX-Target": "target",
          "HX-Current-URL": "https://ssstiktok.io/",
          "HX-Active-Element": "submit",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        "body": `id=${encodeURIComponent(window.location.href)}&token=${token}&locale=${locale}`,
        "method": "POST",
        "mode": "cors"
      });
      const infoPageText = await getInfo.text();
      console.log(infoPageText);
      this.innerHTML = icons.loading;
      const infoDomParser = new DOMParser();
      const infoPage = infoDomParser.parseFromString(`<html><body>${infoPageText}</body></html>`, 'text/html');
      console.log(infoPage);
      const downloadLinks = infoPage.firstChild.getElementsByTagName('a');
      console.log(downloadLinks);
      for(downloadLink of downloadLinks){
        if(downloadLink.innerText == 'Without watermark [2]'){
          watermarklessURL = downloadLink.href;
        }
      }
    }else{
      watermarklessURL = watermarkedURL;
    }
    this.innerHTML = icons.processing;

  }else{
    const videoid = watermarkedVideoText.slice(idpos + 4, idpos + 36).toString();
  	watermarklessURL = `https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=${videoid}&vr_type=0&is_play_url=1&source=PackSourceEnum_PUBLISH&media_type=4`;
  }
  
  
  const watermarklessVideoResponse = await fetch(watermarklessURL, {
		headers: {
			'User-Agent': 'okhttp'
		}
	});
  const watermarklessVideo = await watermarklessVideoResponse.blob();
  
  const fileName = window.location.href.match(/video\/(\d{19})/)[1] + '.mp4';
  saveFile(watermarklessVideo, fileName);
  this.innerHTML = icons.download;
}