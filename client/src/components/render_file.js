import React, { useState } from 'react';
import { getContent } from '../utils/api';
import Auth from "../utils/auth";
const fs = require('fs')

const render = ({ myBuildProp }) => {
    const renderFiles = () => {
        let title = myBuildProp.title
        let buildArr = myBuildProp.buildCode
        let navTrue = false
        let navInd
        let bodyTrue = false
        let bodyInd
        let footerTrue = false
        let footerInd
        let navRender
        for (i = 0; i < buildArr.length; i++) {
            if (buildArr[i].contentTitle == 'navbar') {
                navTrue = true
                navInd = i
            }
            if (buildArr[i].contentTitle == 'body') {
                bodyTrue = true
            }
            if (buildArr[i].contentTitle == 'footer') {
                footerTrue = true
            }
        }
        if (navTrue) {
            let navSettings = buildArr[navInd]
            let navLinksArr = navSettings.navLinks[0]
            let navLinksContentArr = []
            let navDir
            for (i = 0; i < navLinksArr.lenght; i++) {
                content = `<li style="margin-right: 15px;color: ${navSettings.navLinksColor};font-family: ${navSettings.fontNavLinks};>
            ${navLinksArr[i]}
            </li>`
                navLinksContentArr.push(content)
            }
            if(navSettings.navDir == left){
                navDir = 'start'
            }
            if(navSettings.navDir == right){
                navDir = 'end'
            }
            let navContent = navLinksContentArr.join('')
            navRender = `
            <header style='background-color:${navSettings.navColor};>
            <h1 style='width: 100%;font-size: 40px;text-align: center;color: ${navSettings.navTitleColor};font-family: ${fontTitle}' >
            ${navSettings.homeTitle}
            </h1>
            <ul  style="width: 100%; display: flex; margin-right: 15px; justify-content: ${navDir};">${navContent}</ul>
            </header>
            `


        }
        if (bodyTrue) {
            let bodySettings = buildArr[bodyInd]



        }
        if (footerTrue) {
            let footerSettings = buildArr[footerInd]



        }

        let fileContentArr = [navRender]
        let fileContent = fileContentArr.join('')
    }
    return (
        <button onClick={renderFiles}>
            Download Build
        </button>
    )


}
export default render;