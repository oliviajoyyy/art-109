
/*  OPTION 2 OF TUTORIAL 5: MAKING IMAGES APPEAR
 */

document.querySelector('#image0').addEventListener('click', function() {
    document.querySelector('#image1').style.visibility = 'visible';
    alert('clicked image 0');
});

document.querySelector('#image1').addEventListener('click', function() {
    document.querySelector('#image2').style.visibility = 'visible';
});

document.querySelector('#image2').addEventListener('click', function() {
    document.querySelector('#image3').style.visibility = 'visible';
});

document.querySelector('#image3').addEventListener('click', function() {
    document.querySelector('#image4').style.visibility = 'visible';
});

document.querySelector('#image4').addEventListener('click', function() {
    document.querySelector('#image5').style.visibility = 'visible';
});

document.querySelector('#image5').addEventListener('click', function() {
    document.querySelector('#image6').style.visibility = 'visible';
});

document.querySelector('#image6').addEventListener('click', function() {
    alert('this is the last image');
});




/*  PART 2 OF TUTORIAL 5: HIDING IMAGES
 */

// document.querySelector('#image0').addEventListener('click', function() {
//     document.querySelector('#image0').style.visibility = 'hidden';
// });

// let imgDivs = document.querySelectorAll(".image-div");

// imgDivs.forEach((div) => {
//     div.addEventListener('click', () => {
//         div.style.visibility = 'hidden';
//         if (div == document.querySelector('#image0')) {
//             alert('hiding image 0');
//         }
//         // div.style.display = 'none';
//     });
// });



/* BELOW IS FROM PART 1 OF TUTORIAL 5: DOM + JAVASCRIPT 

console.log("hello world!");

let pageTitle = document.querySelector("#page-title");
let htmlHeader = document.querySelector("header");
let htmlBody = document.querySelector("body");


// JavaScript Timeout
// changes page title to pink after 3 seconds
setTimeout(function() {
    pageTitle.style.color = 'pink';
    //console.log("timeout worked!")
}, 3000); // 3 seconds (3000 milliseconds)


// Click event on header changes background color
// query selector to get the header
// header is a basic html element, so doesn't need a # or .
htmlHeader.onclick = function() {
    //console.log("clicked header");
    htmlBody.style.backgroundColor = 'black';
};
*/


/* Changing w/out storing in variables

// JavaScript Timeout
// changes page title to pink after 3 seconds
setTimeout(function() {
    document.querySelector("#page-title").style.color = 'pink';
    //console.log("timeout worked!")
}, 3000); // 3 seconds (3000 milliseconds)


// Click event on header changes background color
// query selector to get the header
// header is a basic html element, so doesn't need a # or .
document.querySelector("header").onclick = function() {
    console.log("clicked header");
    document.body.style.backgroundColor = 'black';
}

*/


