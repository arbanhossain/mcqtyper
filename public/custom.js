HandleImageSetting = (delimiter, pattern, cls) => {
    let elem = document.querySelectorAll(cls);

    elem.forEach( item => {
        let occ = item.innerHTML.match(pattern);
        //console.log(occ);
        if(occ === null) return;
        for(let i = 0; i < occ.length; i++) {
            let imgName = occ[i].replaceAll(delimiter, '');
            console.log(imgName);
            item.innerHTML = item.innerHTML.replaceAll(occ[i], `<br><img src="${imgName}"><br>`);
        }
    });
}