import {asideBuild} from './asideRender';

export const buildBody = (bodySettings) => {
    let asideArea ='<div></div>'
    
    
    if(bodySettings.aside){
        let asideArea = asideBuild(bodySettings.asideContent)
    }
    
    let bodyRender=`
    <div style="display: flex;">
    <h1 style="background-color: ${bodySettings.colorMainHeaders}; color:${bodySettings.colorMain}; font-family:${bodySettings.fontMainHeadersVal};">${bodySettings.mainTitle}</h1> 
      <div style="display: flex;">
      ${asideArea} 
      <div style="background-color:${bodySettings.colorBody}; color:${bodySettings.mainTextColor}; font-family:${bodySettings.fontMainTextVal}; height:100vh; width: 100%;"></div>`
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
