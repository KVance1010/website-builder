const navForm = document.querySelector('#navForm');
let navBar; 
function genNav(event) {
    let navArr = []
    let navTemp = []
    event.preventDefault();
    const navYN = document.querySelector('#navYN').value.trim();
    const navLinks = document.querySelector('#navLinks').value.trim();
    console.log(navYN)
    if(navYN != 'yes'){
        console.log('success')
        return
    }
    let navLinksList = navLinks.split(',')
    console.log(navLinksList)
    navArr.push('<ul style="list-style-type: none; margin:0; padding:0; overflow:hidden;">')
    for(i=0;i<navLinksList.length;i++){
        navTemp.push('<li style="float:'+float+'"><a style="display: block; padding:8px;" href="#home">')
        navTemp.push(navLinksList[i])
        navTemp.push('</a></li>')
        let tempVal = navTemp.join('')
        navArr.push(tempVal)
        navTemp = []
    }
    navArr.push('</ul>')
    navBar = navArr.join('\n')
    console.log(navBar)
}

navForm.addEventListener('submit', genNav);
