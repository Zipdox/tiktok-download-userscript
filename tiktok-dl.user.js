// ==UserScript==
// @name     TikTok Downloader
// @version  1.0
// @grant    none
// @match    https://www.tiktok.com/@*/*
// @run-at   document-idle
// @author   Zipdox
// @homepageURL https://github.com/Zipdox/tiktok-download-userscript
// ==/UserScript==

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
  const pageDataJSON = document.getElementById('__NEXT_DATA__').innerHTML;
  const pageData = JSON.parse(pageDataJSON);
  const watermarkedURL = pageData.props.pageProps.videoData.itemInfos.video.urls[0];
  
  const watermarkedVideoResponse = await fetch(watermarkedURL);
  const watermarkedVideoText = await watermarkedVideoResponse.text();
  const idpos = watermarkedVideoText.indexOf('vid:');
  const videoid = watermarkedVideoText.slice(idpos + 4, idpos + 36).toString();
  const watermarklessURL = `https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=${videoid}&vr_type=0&is_play_url=1&source=PackSourceEnum_PUBLISH&media_type=4`;
  console.log(watermarklessURL);
  
  const watermarklessVideoResponse = await fetch(watermarklessURL, {
		headers: {
			'User-Agent': 'okhttp'
		}
	});
  const watermarklessVideo = await watermarklessVideoResponse.blob();
  console.log(watermarklessVideo);
  const fileName = pageData.props.pageProps.videoData.itemInfos.id + 'mp4';
  saveFile(watermarklessVideo, fileName);
}

async function createDownloadButton(){
  const shareBox = document.getElementsByClassName('share-group')[0];
  if(shareBox == undefined) return setTimeout(createDownloadButton, 500);
  const shareButtons = shareBox.getElementsByTagName('a');
  const downloadButton = document.createElement('a');
  downloadButton.innerHTML = '<span><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve"><g>	<g>		<path d="M443.733,307.2c-9.426,0-17.067,7.641-17.067,17.067v102.4c0,9.426-7.641,17.067-17.067,17.067H68.267			c-9.426,0-17.067-7.641-17.067-17.067v-102.4c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v102.4			c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2v-102.4C460.8,314.841,453.159,307.2,443.733,307.2z"/>	</g></g><g>	<g>		<path d="M335.947,295.134c-6.614-6.387-17.099-6.387-23.712,0L256,351.334V17.067C256,7.641,248.359,0,238.933,0			s-17.067,7.641-17.067,17.067v334.268l-56.201-56.201c-6.78-6.548-17.584-6.36-24.132,0.419c-6.388,6.614-6.388,17.099,0,23.713			l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.031c0.01-0.01,0.02-0.02,0.031-0.031l85.333-85.333			C342.915,312.486,342.727,301.682,335.947,295.134z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>';
  downloadButton.className = shareButtons[1].className;
  downloadButton.onclick = downloadVideo;
  downloadButton.style.cursor = 'pointer';
  shareBox.insertBefore(downloadButton, shareButtons[4]);
}



setTimeout(createDownloadButton, 500);
