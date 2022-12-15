
export const buildCard = (cardSettings) => {
let dimensions = cardSettings.dimenstions
let cardsArr = cardSettings.cardsArr
let cardContentsArr = []
for(let i=0;i<cardsArr.length;i++){ 
    let currentCard = cardsArr[i]
    let height = ((currentCard.height)/(dimensions.height - 32))* 100;
    let width = ((currentCard.width)/(dimensions.width - 32) )* 100
    let top = ((currentCard.top - 16)/(dimensions.height - 32))* 100
    let left = ((currentCard.left - 16)/(dimensions.width - 32))* 100
    let contentCode = [`<div style= "border-radius: 10px; background-color: rgb(${currentCard.body.style.r},${currentCard.body.style.g},${currentCard.body.style.b}); position: absolute; z-index: 2; top: ${top}%; left: ${left}%; width: ${width}%; height: ${height}%">`]
    let closeContent = ` </div>`
    if(currentCard.header != null){
        let header = currentCard.header
        let style = header.style
        let textSize = (((style.fontSize)/(currentCard.height))*height)
        
        let headerCode = `
        <div style="background-color: rgb(${style.backgroundColor.r},${style.backgroundColor.g},${style.backgroundColor.b}); border-radius: 10px 10px 0 0;">
            <h2 style="border-radius: 10px 10px 0 0; alight-text: center; font-family: ${style.fontFamily}; margin:0; padding: 16px; color:${style.color};font-size:${textSize}dvh">
                ${header.text}
            </h2>
        </div>
        `
        contentCode.push(headerCode)
    }
    let paragraphArr = [];
    let parBody = currentCard.bodyStyles
    for(let i = 0;i<parBody.length;i++){
        let innerPar = currentCard.bodyStyles[i]
        let innerStyle = innerPar.style
        let pText = (((innerStyle.fontSize)/(currentCard.height))*height)
        let parCode = `
        <p style="border-radius: 0px 0px 10px 10px; font-family: ${innerStyle.fontFamily}; margin:0; padding: 16px; color: rgb(${innerStyle.color.r},${innerStyle.color.g},${innerStyle.color.b}); font-size:${pText}dvh">
        ${innerPar.text}
        </p>
        `
        paragraphArr.push(parCode)
    }

    let paragraphCont = paragraphArr.join('\n')
    let contentMainCard = `
    <div style="background-color: rgb(${currentCard.body.style.r},${currentCard.body.style.g},${currentCard.body.style.b})">
    ${paragraphCont}
    </div>
    `
    contentCode.push(contentMainCard)
    contentCode.push(closeContent)
    let contentRend = contentCode.join('\n')
    cardContentsArr.push(contentRend)
    }
    let cardContents = cardContentsArr.join('\n')
    let cardRender=`
    <div style='color: white'>
        ${cardContents}
    </div>
      `  
return cardRender;
}