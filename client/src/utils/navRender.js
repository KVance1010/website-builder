export const buildNav = (navSettings) => {
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
    let navRender = `
    <header style='${headBack}'>
    <h1 style='width: 100%;font-size: 40px;text-align: center; color: ${navSettings.navTitleColor};font-family: ${navSettings.fontTitle}' >
    ${navSettings.homeTitle}
    </h1>
    <ul  style="width: 100%; display: flex; margin-right: 15px; margin-bottom: 0px; justify-content: ${navDir};">${navContent}</ul>
    </header>
    `
    return navRender;
};