export const buildNav = (navSettings) => {
    let navLinksArr = navSettings.navlinks[0]
    let navLinksContentArr = []
    let navDir
    let headBack
    for (let i = 0; i < navLinksArr.length; i++) {
        let content = `<li href='${navLinksArr[i]}' style="list-style-type: none; margin-right: 15px;color: ${navSettings.navLinksColor};font-family: ${navSettings.fontNavLinks};">
    ${navLinksArr[i]}
    </li>`
        navLinksContentArr.push(content)
    }
    if (navSettings.navDir == 'Left') {
        navDir = 'start'
    }
    if (navSettings.navDir == 'Right') {
        navDir = 'end'
    }
    if (navSettings.gradVal == 'Yes') {
        headBack = ` width: 100%; background-image: linear-gradient(to bottom right,${navSettings.navTitleColor}, ${navSettings.navgradColor});`
    }
    if (navSettings.gradVal == 'No') {
        headBack = ` width: 100%; background-color:${navSettings.navColor}`
    }
    let navContent = navLinksContentArr.join('\n')
    let navRender = `
    <header style='${headBack}'>
    <h1 style='font-size: 40px; text-align: center; color: ${navSettings.navTitleColor};font-family: ${navSettings.fontTitle}' >
    ${navSettings.homeTitle}
    </h1>
    <ul  style="width: 100%; display: flex; margin-right: 15px; margin-bottom: 0px; justify-content: ${navDir};">${navContent}</ul>
    </header>
    `
    return navRender;
};