const body = document.getElementById('body');
const input = document.getElementById('search');
const html = document.documentElement;
const cleanBtn = document.getElementById('clean__btn');
const overFill = document.getElementById('too__full');


let arrOfElem = [];
function getDeepestElement (ele) {

    let a = 0;
    let result = ele;

    if (ele.children !== null) {

        while (a === 0) {

            ele = ele.children[0];

            if (ele === null || ele === undefined) {
                a = 1;     
                break;       
            }
        
            result = ele;
        }

    }

    return result;
}  



function getEleWithSiblings (ele) {

    saveEle = ele;
    ele = ele.parentElement;

    if (ele !== null) {
        if (ele.tagName === 'P' || ele.tagName === 'H1' || ele.tagName === 'H2' || ele.tagName === 'H3' || ele.tagName === 'H4' || ele.tagName === 'H5' || ele.tagName === 'H6') {
            arrOfElem.push(ele);
        }
        
        if (ele.nextElementSibling === null) {
            return getEleWithSiblings(ele);
        } else {
            return ele.nextElementSibling;
        }

    } else {
        return saveEle;
    }
}


function getOtherElements (ele) {
    
    if (ele.nextElementSibling !== null) {
        ele = ele.nextElementSibling;
        ele = getDeepestElement(ele);

        if (ele.tagName === 'P' || ele.tagName === 'H1' || ele.tagName === 'H2' || ele.tagName === 'H3' || ele.tagName === 'H4' || ele.tagName === 'H5' || ele.tagName === 'H6') {
            arrOfElem.push(ele);
        }

        getOtherElements(ele);

    } else if (ele.nextElementSibling === null) {
        ele = getEleWithSiblings(ele);
        if (ele === html) {
            return ''
        }
        ele = getDeepestElement(ele);
        
        if (ele.tagName === 'P' || ele.tagName === 'H1' || ele.tagName === 'H2' || ele.tagName === 'H3' || ele.tagName === 'H4' || ele.tagName === 'H5' || ele.tagName === 'H6') {
            arrOfElem.push(ele);
        }

        getOtherElements(ele);
    }
}



let indexesOfSearch = [];
function search (arrOfElem) {
    let arr;
    let elem;

    for (let k = 0; k < arrOfElem.length; k++) {

        elem = arrOfElem[k];
        arr = arrOfElem[k].textContent.split('');

        let inputVal = input.value.split('');
        let arrOfIdex = [];

        for (let i = 0; i < arr.length; i++) {

            if (arr[i] === inputVal[0]) {
                arrOfIdex.push(i);
            }
        }
            
        let dec = 0;
        for (let j = 0; j < arrOfIdex.length; j++) {

            for (let k = 0; k < inputVal.length; k++) {
                
                if (inputVal[k] === arr[arrOfIdex[j] + dec]) {
                    
                    dec++;

                    if (dec === inputVal.length) {
                        indexesOfSearch.push(elem);
                        indexesOfSearch.push(arrOfIdex[j]);
                        indexesOfSearch.push(arrOfIdex[j] + dec - 1);
                    }

                }
            }

            dec = 0;
        }
    }
}

getOtherElements(getDeepestElement(body));


function getValues (arr) {

    let arrOfValues = [];

    for (let i = 0; i < arr.length; i++) {
        arrOfValues.push(arr[i].textContent);
    }

    return arrOfValues;
}


const arrOfValues = getValues(arrOfElem);


function addTegs (arr) {

    if (arr.length > 0) {

        let content;
        let string;
        let ele;
        let dec = 0;

        for (let i = 0; i < arr.length; i += 3) {

            if (arr[i] !== arr[i - 3]) {
                content = arr[i].textContent.split('');
                dec = 0;
            }

            content.splice(arr[i + 1] + dec, 0, '<b class="color__element">');
            content.splice(arr[i + 2] + 2 + dec, 0, '</b>');

            string = content.join('');

            ele = arr[i];
            ele.innerHTML = string;

            string = '';
            ele = 0;
            dec += 2;
        }

    }
}  


input.addEventListener('input', function () {
    
    if (input.value.length > 100) {

        input.value = '';

        overFill.classList.add('showing');
        cleanBtn.classList.remove('showing');

        for (let i = 0; i < arrOfElem.length; i++) {
            arrOfElem[i].textContent = arrOfValues[i];
        }

    } else {

        overFill.classList.remove('showing');

        if (input.value !== '') {
            cleanBtn.classList.add('showing');
        } else {
            cleanBtn.classList.remove('showing');
        }

        for (let i = 0; i < arrOfElem.length; i++) {
            arrOfElem[i].textContent = arrOfValues[i];
        }

        search(arrOfElem);
        addTegs(indexesOfSearch);

        if (indexesOfSearch[0] !== undefined) {
            indexesOfSearch[0].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        }

        indexesOfSearch = [];
    }

});


cleanBtn.addEventListener('click', function () {
    input.value = '';

    for (let i = 0; i < arrOfElem.length; i++) {
        arrOfElem[i].textContent = arrOfValues[i];
    }

    cleanBtn.classList.remove('showing');
});


cleanBtn.addEventListener('mouseover', function () {
    cleanBtn.firstElementChild.classList.add('clean__search--black');
    cleanBtn.lastElementChild.classList.add('clean__search--black');
});

cleanBtn.addEventListener('mouseout', function () {
    cleanBtn.firstElementChild.classList.remove('clean__search--black');
    cleanBtn.lastElementChild.classList.remove('clean__search--black');
});