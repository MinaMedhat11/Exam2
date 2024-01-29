var xhr = new XMLHttpRequest();

function mainDisplay(query) {
    xhr.open('get', `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == 4) {
            displayMeals(JSON.parse(xhr.responseText).meals);
            console.log(JSON.parse(xhr.responseText));
        }
    });

    xhr.send();
}

mainDisplay('')

function displayMeals(data) {
    var cartona = '';
    for (var i = 0; i < data.length; i++) {
        cartona += `
            <div class="col-md-3 py-3">
                <div class="meal" onclick="mealPage('${data[i].idMeal}')">
                    <img src="${data[i].strMealThumb}" class="w-100 ">
                    <div class="meal-desc d-flex align-items-center opacity-75 text-black">
                        <h2 class="opa">${data[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById('allMeals').innerHTML = cartona;
}




$(".open-close-icon").click(function () {
    $("#nav").animate({ width: "320px" });
    $('#nav-inner').css('width', '256px')
    $('#nav-inner').css('visibility', 'visible')
    $(".choices").animate({ top: "0" });
    $('#open').css('display', 'none')
    $('#close').css('display', 'block')

});

$('.fa-x').click(function () {
    closenav()

});


function displaySearch() {
    $('#search').css('display', 'block')

}
function closenav() {
    $("#nav").animate({ width: "0px" });
    $('#nav-inner').css('visibility', 'hidden')
    $('#nav-inner').css('width', '0px')
    $('#open').css({display: 'block'})
    $('#close').css('display', 'none')

};



var nameSearch = document.getElementById('nameSearch')
var letterSearch = document.getElementById('letterSearch')



nameSearch.addEventListener('keyup', function nameSearchType() {
    mainDisplay(nameSearch.value)
    console.log(nameSearch.value);
})

letterSearch.addEventListener('keyup', function nameSearchType() {
    mainDisplay(letterSearch.value)
    console.log(letterSearch.value);
})


function category() {
    var newXhr = new XMLHttpRequest
    newXhr.open('get', 'https://www.themealdb.com/api/json/v1/1/categories.php')

    newXhr.addEventListener('readystatechange', function () {
        if (newXhr.readyState == 4) {
            console.log((JSON.parse(newXhr.responseText).categories))
            displayCategories(JSON.parse(newXhr.responseText).categories)
            closenav()
        }
    })
    newXhr.send()
}
function displayCategories(data) {
    var cartona = ``
    for (var i = 0; i < data.length; i++) {

        cartona += `
        
        <div class="col-md-3 py-3">
        <div class="meal" onclick='categoryPage(${ee = JSON.stringify(data[i].strCategory)})'>
        <img  src="${data[i].strCategoryThumb}" class="w-100 ">
        <div class="meal-desc d-flex flex-column align-items-center opacity-75 text-black">
        <h2 class="opa">${data[i].strCategory}</h2>
        <p>${data[i].strCategoryDescription}</p>
        </div>
        </div>
        
        </div>
        `
    }
    document.getElementById('allMeals').innerHTML = cartona
}

function test(ee) {
    JSON.stringify(ee)
}
function area() {
    var newXhr = new XMLHttpRequest();
    newXhr.open('get', 'https://www.themealdb.com/api/json/v1/1/list.php?a=list');

    newXhr.addEventListener('readystatechange', function () {
        if (newXhr.readyState == 4) {
            var response = JSON.parse(newXhr.responseText);
            console.log(response);
            displayAreas(response.meals);
            closenav();
        }
    });

    newXhr.send();
}


function displayAreas(data) {
    var cartona = '';

    for (var i = 0; i < data.length; i++) {
        cartona += `
            <div class="col-md-3 py-3 text-center meeal" data-area="${data[i].strArea}">
                <i class="fa-solid fa-house-laptop fa-4x text-center text-white"></i>
                <div class="meeal-desc text-center">
                    <h2 class="opa text-white">${data[i].strArea}</h2>
                </div>
            </div>`;
    }

    document.getElementById('allMeals').innerHTML = cartona;

    document.getElementById('allMeals').addEventListener('click', function (event) {
        var targetArea = event.target.closest('.meeal');
        if (targetArea) {
            areaFilter(targetArea.dataset.area);
        }
    });
}

function ingredients() {
    var newXhr = new XMLHttpRequest
    newXhr.open('get', 'https://www.themealdb.com/api/json/v1/1/list.php?i=list')

    newXhr.addEventListener('readystatechange', function () {
        if (newXhr.readyState == 4) {
            console.log((JSON.parse(newXhr.responseText)))
            displayingredients(JSON.parse(newXhr.responseText).meals)
            closenav()
        }
    })
    newXhr.send()
}
function displayingredients(data) {
    var cartona = ``
    for (var i = 0; i < 20; i++) {
        cartona += `
<div class="col-md-3 py-3 text-center">
                <div class="meeal"  onclick='ingFilter(${ee = JSON.stringify(data[i].strIngredient)})' >
                <i class="fa-solid fa-drumstick-bite fa-4x text-center text-white"></i>
                    <div class="meeal-desc text-center ">
                        <h2 class="opa text-white">${data[i].strIngredient}</h2>
                        <p style="height: 75px;overflow:hidden;color:white">${data[i].strDescription}</p>
                    </div>
                </div>
                
            </div>
`
    }
    document.getElementById('allMeals').innerHTML = cartona
}


function mealPage(e) {
    var newXhr = new XMLHttpRequest
    newXhr.open('get', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)

    newXhr.addEventListener('readystatechange', function () {
        if (newXhr.readyState == 4) {
            console.log((JSON.parse(newXhr.responseText)))
            displayMealPage(JSON.parse(newXhr.responseText).meals)
            $('#allMeals').css('display', 'none')
            $('#mealPaage').css('display', 'flex')

            closenav()

        }
    })
    newXhr.send()
}

function displayMealPage(data) {
    var cartona = ``
    for (var i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-4">
        <img src="${data[i].strMealThumb}" alt="" class="w-100">
        <h2 class="text-white">${data[i].strMeal}</h2>
    </div>
    <div class="col-md-8 meal-page">
        <h2>Instructions</h2>
        <p>${data[i].strInstructions}</p>
        <h3>Area : <span>${data[i].strArea}</span> </h3>
        <h3>Category : <span>${data[i].strCategory}</span> </h3>
        <h3>Recipies</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${data[i].strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${data[i].strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${data[i].strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${data[i].strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${data[i].strIngredient5}</li></ul>
            <h3>Tags : </h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1"> ${data[i].strTags}   </li>
                <li class="alert alert-danger m-2 p-1">   ${data[i].strTags} </li>
                <li class="alert alert-danger m-2 p-1">  ${data[i].strTags}  </li>
                <li class="alert alert-danger m-2 p-1"> ${data[i].strTags}   </li></ul>
                <button class="btn btn-success"><a href='${data[i].strSource}'>Source</a></button>
                <button class="btn btn-danger"><a href='${data[i].strYoutube}'>Youtube</a></button>

    </div>
`
    }
    document.getElementById('mealPaage').innerHTML = cartona
}

function hideMealDetails() {
    $('#allMeals').css('display', 'flex')
    $('#mealPaage').css('display', 'none')

}

function categoryPage(ee) {
    console.log(ee);
    mainDisplay(ee)
}
/////////////////////////////////////////////////

function areaFilter(area) {
    mainDisplay(area)
    console.log(area);
}


function ingFilter(ing) {
    mainDisplay(ing)
    console.log(ing);
}




function contactUs(){
    $('#allMeals').css('display', 'none')


}


/////////////////////////////////////////////////
//!regex-----------------------------------------------------------------------------
