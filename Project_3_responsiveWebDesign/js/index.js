// Logic for menu buttons navigating around the page
let pageSections=["top5", "garlic", "loaded", "ranch", "finder"];

let navElements = document.querySelectorAll("button")

for (let i = 0; i < navElements.length; ++i){
      navElements[i].addEventListener("click", function(ev){
            // remove selected from every nav element
            // for (let i = 0; i < navElements.length; i++){
            //       navElements[i].classList.remove("selected");
            // }
            // add selected to clicked nav element
            let el = ev.currentTarget;
            // console.log(el)
            // el.classList.add("selected");

            //hide all the content
            for (section of pageSections){
                  // console.log(section)
                  let el = document.getElementById(`${section}Section`);
                  // console.log(el)
                  // Hide previous content
                  if (el.classList.contains("showItem")){
                        el.classList.toggle("showItem");
                        el.classList.toggle("hideItem")
                  }
                  // el.classList.remove("showItem");
                  // // el.classList.add("hideItem")
                  // el.classList.add("hideItem")
            }
            // now show the one selected section
            console.log(el.name)
            let name = `${el.name}Section`
            console.log(name)
            let showEl=document.getElementById(name);
            console.log(showEl)
            showEl.classList.add('showItem');
            showEl.classList.remove('hideItem');
            // el.classList.toggle("hideItem")
      })
}
//start with top5 clicked
document.getElementById("home").click();







// Logic for Fry Finder checkboxes

var itemsToFilter = document.querySelectorAll("#itemsToFilter li");
// var itemsToShow = Array()

for (var i = 0; i < itemsToFilter.length; i++){
      addClass(itemsToFilter[i], "hideItem")
}
  
//setup click event handlers on our checkboxes
var checkBoxes = document.querySelectorAll(".filterSection li input");
  
for (var i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("click", filterItems, true);
    checkBoxes[i].checked = false;
}
// the event handler!
function filterItems(e) {
    var clickedItem = e.target;
    if (clickedItem.checked == true) {
      //  itemsToShow.push(clickedItem.value);
        hideOrShowItems(clickedItem.value, "hideItem", "showItem");
    } else if (clickedItem.checked == false) {
      // itemsToShow = itemsToShow.filter(function(newItems) {return newItems != clickedItem.value});
      // itemsToShow.splice(itemsToShow(clickedItem.value),1)  
      hideOrShowItems(clickedItem.value, "showItem", "hideItem");
    } else {
        // deal with the indeterminate state if needed
    }
      
//     if (clickedItem.checked == true) {
//       //  itemsToShow.push(clickedItem.value);
//         hideOrShowItems(clickedItem.value, "hideItem", "showItem");
//     } else if (clickedItem.checked == false) {
//       // itemsToShow = itemsToShow.filter(function(newItems) {return newItems != clickedItem.value});
//       // itemsToShow.splice(itemsToShow(clickedItem.value),1)  
//       hideOrShowItems(clickedItem.value, "showItem", "hideItem");
//     } else {
//         // deal with the indeterminate state if needed
//     }
}
  
// add or remove classes to show or hide our content
// Toggle function, doesn't sort whole checkboxes, but can make sure item has all tags
function hideOrShowItems(itemType, classToRemove, classToAdd) {
          // check filter state for all checkboxes
//     for (items of checkBoxes){
//       console.log(items.checked)
//       if (items.checked == true)
//       console.log(items.value)
//     }

    for (var i = 0; i < itemsToFilter.length; i++) {
        var currentItem = itemsToFilter[i];
      // Check all tags in the data-type:
      var matches = false;
      tags = (currentItem.getAttribute("data-type")).split(" ")
      // console.log(tags.length)
      for (let i = 0; i < tags.length; i++){
            // console.log(tags[i])
            if (tags[i] == itemType){
                  matches = true;
            }
            // Check all other checkboxes
      if (matches == true){
            removeClass(currentItem, classToRemove);
            addClass(currentItem, classToAdd);
      }

      } 
    }
}
  
//
// Helper functions for adding and removing class values
//
function addClass(element, classToAdd) {
    var currentClassValue = element.className;
        
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        } else {
            element.className += " " + classToAdd;
        }
    }
}
        
function removeClass(element, classToRemove) {
    var currentClassValue = element.className;
  
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
  
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
  
    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
  
    element.className = filteredList.join(" ");
}
