
const checkbuttoneventhandler = async () => {
    var skipBotton = document.getElementsByClassName("ytp-ad-skip-button");
    var skipBotton2 = document.getElementsByClassName("ytp-ad-preview-container");
    var imgads = document.getElementsByClassName("ytp-ad-overlay-image");
    var adtitle1 = document.getElementsByClassName("ytp-title-link yt-uix-sessionlink ytp-title-fullerscreen-link");
    var adtitle2 = document.getElementsByClassName("ytp-ad-text ytp-flyout-cta-headline");
    var adinfo = document.getElementsByClassName("ytp-ad-player-overlay-instream-info");
    var adtime = document.getElementsByClassName("ytp-time-duration");
    var caption = document.getElementsByClassName("ytp-caption-segment");
    var currenttime = document.getElementsByClassName("ytp-time-current");
    var text = ""
    


    if ((skipBotton != undefined && skipBotton.length > 0) || (skipBotton2 != undefined && skipBotton2.length > 0)) {

        let ls = adinfo[0].innerText.split("\n")
        let vidnum = 0
        
        if (ls[0].includes("2")){
            vidnum = 2
        }
        else{
            vidnum = 1
        }

        let skippable = false
        if (skipBotton != undefined && skipBotton.length > 0){
            skippable = true
        }

        if(adtitle1 != undefined && adtitle1.length > 0){ 
            text =  "Ad detected\nTitle : " + adtitle1[0].innerText + "\nType : Video\nNumber : "+ vidnum + "\nDuration : "+ adtime[0].innerText + "\nWebsite : " + ls[2] + "\nSkippable : " + skippable
            alert(text);
        }
        else if(adtitle2 != undefined && adtitle2.length > 0){
            text = "Ad detected\nTitle : " + adtitle2[0].innerText + "\nType : Video\nNumber : "+ vidnum + "\nDuration : "+ adtime[0].innerText + "\nWebsite : " + ls[2] + "\nSkippable : " + skippable
            alert(text);
        }

        var blob = new Blob([text], {type: "text/plain"});
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = true;
        anchor.setAttribute('download', 'test.txt');

        document.body.appendChild(anchor);

        anchor.click();
    
        document.body.removeChild(anchor);
            

    }
    else if(imgads != undefined && imgads.length > 0){
        alert("Ad detected\nTitle : -\nType : Banner");
        finaltext += "\n" + "Ad detected\nTitle : -\nType : Banner";
    }
    else if(caption != undefined && caption.length > 0 ){
        let x = false;
        for (let step = 0; step < caption.length; step++) {
            if(caption[step].innerText.includes("this video is sponsored")){
                alert(caption[step].innerText + "\nAd detected at " + currenttime[0].innerText);
                x = true;
                break;

            }
            
        }
        if(!x){
            alert("Ad undetected");
        }
    }
    else{
        alert("Ad undetected");

    }
};

  
function test(){

    const checkbuttonexist = document.getElementsByClassName("bookmark-btn")[0];
    const downloadbuttonexist = document.getElementsByClassName("download-btn")[0];
    

    var sub_caption = document.getElementsByClassName("ytp-caption-segment");
    var sub_currenttime = document.getElementsByClassName("ytp-time-current");

    
    if(sub_caption != undefined && sub_caption.length > 0 ){
        for (let step = 0; step < sub_caption.length; step++) { 
            if(sub_caption[step].innerText.includes("this video is sponsored")){
                alert("Ad detected at " + sub_currenttime[0].innerText);
                break;

                
            }
            
        }
    }



    if (!checkbuttonexist) {
        const checkbutton = document.createElement("div");
        

        //   checkbutton.src = chrome.runtime.getURL("assets/bookmark.png");
        checkbutton.className = "ytp-button " + "bookmark-btn";
        checkbutton.title = "Click me!";
        checkbutton.innerHTML = 'Check Ads!'

        youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer = document.getElementsByClassName('video-stream')[0];

        youtubeLeftControls.appendChild(checkbutton);
        checkbutton.addEventListener("click", checkbuttoneventhandler);
    
    }

};
setInterval(test,1000);

