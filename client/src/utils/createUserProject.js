import { saveAs } from 'file-saver';

class RenderProject {
    renderFiles(myBuildProp) {
        let title = myBuildProp.title;
        let buildArr = myBuildProp.buildCode;
        let navTrue = false;
        let navInd;
        let bodyTrue = false;
        let bodyInd;
        let footerTrue = false;
        let footerInd;
        let navRender;
        let footerBuild
        for (let i = 0; i < buildArr.length; i++) {
            if (buildArr[i].contentTitle == 'navbar') {
                navTrue = true
                navInd = i
            }
            if (buildArr[i].contentTitle == 'body') {
                bodyTrue = true
                bodyInd = i
            }
            if (buildArr[i].contentTitle == 'footer') {
                footerTrue = true
                footerInd = i
            }
        }
        let headCont = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./reset" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"></script>
    <title>${title}</title>
</head>
        `
        let bodyOpen = `<body>`
        let bodyClose = `</body>\n</html>`

        if (navTrue) {
            let navSettings = buildArr[navInd]
            let navLinksArr = navSettings.navlinks[0]
            let navLinksContentArr = []
            let navDir
            let headBack
            for (let i = 0; i < navLinksArr.lenght; i++) {
                let content = `<li style="margin-right: 15px;color: ${navSettings.navLinksColor};font-family: ${navSettings.fontNavLinks};>
            ${navLinksArr[i]}
            </li>`
                navLinksContentArr.push(content)
            }
            if (navSettings.navDir == 'left') {
                navDir = 'start'
            }
            if (navSettings.navDir == 'right') {
                navDir = 'end'
            }
            if (navSettings.gradVal == 'Yes') {
                headBack = `background-image: linear-gradient(to bottom right,${navSettings.navTitleColor}, ${navSettings.navgradColor});`
            }
            if (navSettings.gradVal == 'No') {
                headBack = `background-color:${navSettings.navColor}`
            }
            let navContent = navLinksContentArr.join('')
            navRender = `
            <header style='${headBack}'>
            <h1 style='width: 100%;font-size: 40px;text-align: center; color: ${navSettings.navTitleColor};font-family: ${navSettings.fontTitle}' >
            ${navSettings.homeTitle}
            </h1>
            <ul  style="width: 100%; display: flex; margin-right: 15px; margin-bottom: 0px; justify-content: ${navDir};">${navContent}</ul>
            </header>
            `
        }
        if (bodyTrue) {
            let bodySettings = buildArr[bodyInd]



        }
        if (footerTrue) {
            let footerSettings = buildArr[footerInd];
            let footerLinksArr = footerSettings.footerlinks[0];
            let footerLinksContentArr = [];
            let FooterDirection;
            let footerBackgroundCol;
            let FooterTextAlign;
            for (let i = 0; i < footerLinksArr.lenght; i++) {
                let content = `<li style="margin-right: 15px;color: ${footerSettings.footerFontColor};font-family: ${footerSettings.fontFooter};
                onMouseOver="this.style.color='white'" onMouseOut="this.style.color=${footerSettings.footerFontColor}">
            ${footerLinksArr[i]}
            </li>`
                footerLinksContentArr.push(content)
            }
            if (footerSettings.footerLinksDir == 'left') {
                FooterDirection = 'start'
            }
            if (footerSettings.footerLinksDir == 'right') {
                FooterDirection = 'end'
            }
            if (footerSettings.footerTextDir == 'left') {
                FooterTextAlign = 'start'
            }
            if (footerSettings.footerTextDir == 'right') {
                FooterTextalign = 'end'
            }
            if (footerSettings.footerGradVal == 'Yes') {
                footerBackgroundCol = `background-image: linear-gradient(to bottom right,${footerSettings.footerColor}, ${footerSettings.footerColorGrad});`
            }
            if (footerSettings.footerGradVal == 'No') {
                footerBackgroundCol = `background-color:${footerBackgroundCol}`
            }
            let footerContent = footerLinksContentArr.join('')
            footerBuild = `
            <footer style='${footerBackgroundCol}'>
            <p style='width: 100%; font-size: 20px; text-align: ${FooterTextAlign}; color: ${footerSettings.footerColor};font-family: ${footerSettings.fontFooter}'> ${footerSettings.footerBottomText}</p>
            <ul  style="width: 100%; display: flex; margin-right: 15px; justify-content: ${FooterDirection};">${footerContent}</ul>
            </footer>
            `
        }

        let fileContentArr = [headCont, bodyOpen, navRender, footerBuild, bodyClose]
        let fileContent = fileContentArr.join('\n')

        let file = new File([fileContent], {
            type: 'text/plain;charset=utf-8',
        });
        saveAs(file, 'index.html');
        console.log('save file');
    }
}
export default new RenderProject();
