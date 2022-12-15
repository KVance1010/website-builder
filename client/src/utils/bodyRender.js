import {buildAside} from './asideRender';

export const buildBody = (bodySettings) => {
    let asideArea ='';
    let mainArea;
    let pageLayout;
    
    if(bodySettings.aside ==='Yes'){
        asideArea = buildAside(bodySettings.asideContent)
    }
  
    if(bodySettings.backgroundImg){
    mainArea = `img style='position: relative; z-index: 0; max-width: 100%; max-height: 100%;' src=${bodySettings.bodyImgLink}
    <div>

    </div>`
    }else{
    mainArea = `<div style="background-color:${bodySettings.colorBody}; color:${bodySettings.mainTextColor}; font-family:${bodySettings.fontMainTextVal}; height:100vh; width: 100%;">
    
    </div>`
    }

    if(asideArea){
      if (bodySettings.asideDir === 'Left'){
        pageLayout = `${asideArea} ${mainArea} `;
      }else{
        pageLayout = `${mainArea} ${asideArea} `;
      }
    } 
    let bodyRender=`
    <main style="width:100% display: flex; background-color: ${bodySettings.colorMainBackground}">
    <h1 style="background-color: ${bodySettings.colorMainHeaders};margin-bottom: 0px; color:${bodySettings.colorMain}; font-family:${bodySettings.fontMainHeadersVal};">${bodySettings.mainTitle}</h1> 
      <div style="display: flex;">
       ${pageLayout}
       </div>
       </main>
      `
      
return bodyRender;
}


// BODY **********        
// H1  **********
//            colorMain: colorMainBackground,
//            colorMainHeaders: colorMainHeaders,
// 	          fontMainHeadersVal: fontMainHeadersVal,
// 	          mainTitle: mainTitle,
// MAIN **********
//             colorBody: colorBody,  
//             mainTextColor: colorMainText 
//             colorMainBackground: colorMainBackground = body backgroundColor options...
//             fontMainTextVal: fontMainTextVal,
// IMG **********
//             bodyBackgroundImagePubID: imageName3,
//             mainImagePubID: imageName2,
//             bodyImgLink: bodyImgLink,
//             mainImgLink: mainImgLink,
