import { saveAs } from 'file-saver';
import {buildNav} from './navRender';
import {buildBody} from './bodyRender';
import {buildFooter} from './footerRender';

class RenderProject {
    renderFiles(myBuildProp) {
        let title = myBuildProp.title;
        let buildArr = myBuildProp.buildCode;
        let navTrue = false;
        let navInd;
        let bodyTrue = false;
        let bodyInd;
        let bodyBuild;
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
             navRender = buildNav(buildArr[navInd]);
        }
        if (bodyTrue) {
            bodyBuild = buildBody(buildArr[bodyInd]);
        }
        if (footerTrue) {
            footerBuild = buildFooter(buildArr[footerInd]);
        }

        let fileContentArr = [headCont, bodyOpen, navRender, bodyBuild, footerBuild, bodyClose]
        let fileContent = fileContentArr.join('\n')

			let file = new File([fileContent], {
				type: 'text/plain;charset=utf-8',
			});
			saveAs(file, 'index.html');
			console.log('save file');
    }
   }
export default new RenderProject();
