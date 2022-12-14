export const buildFooter = (footerSettings) => {
            let footerLinksArr = footerSettings.footerlinks[0]
            let footerLinksContentArr = []
            let FooterDirection 
            let footerBackgroundCol
            for (let i = 0; i < footerLinksArr.length; i++) {
                let content = `<li style="margin-right: 15px; color: ${footerSettings.footerFontColor };font-family: ${footerSettings.fontFooter};
                onMouseOver="this.style.color='white'" onMouseOut="this.style.color=${footerSettings.footerFontColor}">
            ${footerLinksArr[i]}
            </li>`
                footerLinksContentArr.push(content)
            }
            if(footerSettings.footerLinksDir == 'left'){
                FooterDirection = 'start'
            }
            if(footerSettings.footerLinksDir  == 'right'){
                FooterDirection = 'end'
            }
            if(footerSettings.footerGradVal  == 'Yes'){
                footerBackgroundCol = `background-image: linear-gradient(to bottom right,${footerSettings.footerColor}, ${footerSettings.footerColorGrad});`
            }
            if(footerSettings.footerGradVal  == 'No'){
                footerBackgroundCol = `background-color:${footerBackgroundCol}`
            }
            let footerContent = footerLinksContentArr.join('')
            let footerBuild = `
            <footer style='${footerBackgroundCol}'>
            <p style='width: 100%; font-size: 20px; text-align: center; color: ${footerSettings.footerColor}; font-family: ${footerSettings.fontFooter}'> ${footerSettings.footerBottomText}
            </p>
            <ul  style="width: 100%; display: flex; margin-right: 15px; justify-content: ${FooterDirection};">${footerContent}</ul>
            </footer>
            `
    return footerBuild;
};