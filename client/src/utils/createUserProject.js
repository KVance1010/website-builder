import { saveAs } from 'file-saver';
// import fs from 'fs';
// const fs = require('fs')

// class Render {
//     renderFiles (myBuildProp) {

//         let title = myBuildProp.title
//         let buildArr = myBuildProp.buildCode
//         let navTrue = false
//         let navInd
//         let bodyTrue = false
//         let bodyInd
//         let footerTrue = false
//         let footerInd
//         let navRender
//         for (let i = 0; i < buildArr.length; i++) {
//             if (buildArr[i].contentTitle == 'navbar') {
//                 navTrue = true
//                 navInd = i
//             }
//             if (buildArr[i].contentTitle == 'body') {
//                 bodyTrue = true
//             }
//             if (buildArr[i].contentTitle == 'footer') {
//                 footerTrue = true
//             }
//         }
//         let headCont = `
//         <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="./reset" />
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
//     integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
//     <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
//         integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
//         crossorigin="anonymous"></script>
//     <title>${title}</title>
// </head>
//         `
//         let bodyOpen = `<body>`
//         let bodyClose= `</body>\n</html>`

//         if (navTrue) {
//             let navSettings = buildArr[navInd]
//             let navLinksArr = navSettings.navLinks[0]
//             let navLinksContentArr = []
//             let navDir
//             for (let i = 0; i < navLinksArr.lenght; i++) {
//                 let content = `<li style="margin-right: 15px;color: ${navSettings.navLinksColor};font-family: ${navSettings.fontNavLinks};>
//             ${navLinksArr[i]}
//             </li>`
//                 navLinksContentArr.push(content)
//             }
//             if(navSettings.navDir == 'left'){
//                 navDir = 'start'
//             }
//             if(navSettings.navDir == 'right'){
//                 navDir = 'end'
//             }
//             let navContent = navLinksContentArr.join('')
//             navRender = `
//             <header style='background-color:${navSettings.navColor};>
//             <h1 style='width: 100%;font-size: 40px;text-align: center;color: ${navSettings.navTitleColor};font-family: ${navSettings.fontTitle}' >
//             ${navSettings.homeTitle}
//             </h1>
//             <ul  style="width: 100%; display: flex; margin-right: 15px; justify-content: ${navDir};">${navContent}</ul>
//             </header>
//             `

//         }
//         if (bodyTrue) {
//             let bodySettings = buildArr[bodyInd]

//         }
//         if (footerTrue) {
//             let footerSettings = buildArr[footerInd]

//         }

//         let fileContentArr = [headCont,bodyOpen,navRender,bodyClose]
//         let fileContent = fileContentArr.join('\n')

//             fs.writeFile('./file/index.txt',fileContent ,function(err){
//                 if(err){
//                     console.log(err)
//                 }
//             })
//     }
//    }

class RenderProject {
	renderFiles(project) {
		console.log('made render files');
		let blob = new Blob(project, {
			type: 'text/plain;charset=utf-8',
		});
		saveAs(blob, 'index.html');
		console.log('save file');
	}
}
export default new RenderProject();
