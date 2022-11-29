var finaltext = "";
var count = 0;


const download = async () =>{
    var blob2 = new Blob([finaltext], {type: "text/plain"});
    var url2 = URL.createObjectURL(blob2);
    var anchor2 = document.createElement('a');
    anchor2.href = url2;
    anchor2.download = true;
    anchor2.setAttribute('download', 'test2.txt');

    document.body.appendChild(anchor2);

    anchor2.click();
    
    document.body.removeChild(anchor2);
}
function checkbuttoneventhandler(){
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
            // alert(text);
            if(!finaltext.includes(text)){
                count += 1
                finaltext += "\n\nAds number " + count.toString() + "\n"  + text;
                
            }
            
        }
        else if(adtitle2 != undefined && adtitle2.length > 0){
            text = "Ad detected\nTitle : " + adtitle2[0].innerText + "\nType : Video\nNumber : "+ vidnum + "\nDuration : "+ adtime[0].innerText + "\nWebsite : " + ls[2] + "\nSkippable : " + skippable
            // alert(text);
            if(!finaltext.includes(text)){
                count += 1
                finaltext += "\n\nAds number " + count.toString() + "\n"  + text;
            }
        }

    }
    else if(imgads != undefined && imgads.length > 0){
        // alert("Ad detected\nTitle : -\nType : Banner");
        text = "Ad detected\nTitle : -\nType : Banner";
        if(!finaltext.includes(text)){
            count += 1
            finaltext += "\n\nAds number " + count.toString() + "\n"  + text;
        }
        
    }
    else if(caption != undefined && caption.length > 0 ){
        let x = false;
        for (let step = 0; step < caption.length; step++) {
            if(caption[step].innerText.includes("this video is sponsored")){
                // alert("Ad detected at " + currenttime[0].innerText);
                text =  caption[step].innerText +"\nAd detected at " + currenttime[0].innerText;
                if(!finaltext.includes(text)){
                    count += 1
                    finaltext += "\n\nAds number " + count.toString() + "\n"  + text;
                }
                x = true;
                break;

            }
            
        }
        if(!x){
            // alert("Ad undetected");
        }
    }
    else{
        // alert("Ad undetected");

    }
};

  
function test(){

    const checkbuttonexist = document.getElementsByClassName("bookmark-btn")[0];    

    checkbuttoneventhandler();



    if (!checkbuttonexist) {
        const checkbutton = document.createElement("div");
        

        //   checkbutton.src = chrome.runtime.getURL("assets/bookmark.png");
        checkbutton.className = "ytp-button " + "bookmark-btn";
        checkbutton.title = "Click me!";
        checkbutton.innerHTML = 'Check Ads!'

        youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer = document.getElementsByClassName('video-stream')[0];

        youtubeLeftControls.appendChild(checkbutton);
        checkbutton.addEventListener("click", download);
    
    }

};
setInterval(test,1000);

