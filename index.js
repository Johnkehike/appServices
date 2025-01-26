let form = document.getElementById('form');
let title = document.getElementById('title-input');
let description = document.getElementById('description-input');
let startContainer = document.getElementById('start-items-container');
let progressContainer = document.getElementById('progress-items-container');
let completedContainer = document.getElementById('completed-items-container');
let addNew = document.getElementById('add-new');
let tasks = document.getElementById('tasks');
let searchInput = document.getElementById('search-apply');
let fromDate = document.getElementById('from');
let toDate = document.getElementById('to');
let icon = document.getElementById('toCalendar');
let icon2 = document.getElementById('fromCalendar');



icon.addEventListener('click', () => {
  
  
  toDate.showPicker(); 
});

icon2.addEventListener('click', () => {
  if (!fromDate.showPicker()) {
    fromDate.showPicker();
  }
  
})

searchInput.addEventListener('input', searchfn);

let filteredArray = [];

function searchfn(event){
    event.preventDefault();

    let searchString = event.target.value;
    console.log(searchString);
    
    filteredArray = myArray.filter((item) => {
        console.log(item.title);
        if (item.title.toString().toLowerCase().includes(searchString.toLowerCase()) || item.description.toString().toLowerCase().includes(searchString.toLowerCase())) {
            return item;
            
        }
      
    })
    console.log(filteredArray);
    

   
    displaySearch()
}
function displaySearch() {
    // Clear all containers at the start
    startContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    completedContainer.innerHTML = '';
  
    // Check if there are items in the filtered array
    if (filteredArray.length > 0) {
      filteredArray.forEach((item, index) => {
        // Create the main task container
        let eachTask = document.createElement('div');
        eachTask.classList.add('each-task');
        eachTask.setAttribute('id', `${index}`);
        eachTask.setAttribute('data-action', 'each-task');
        eachTask.addEventListener('click', (e) => {
          e.preventDefault();
          clickAction(index);
        });
  
        // Create the title container
        let itemTitle = document.createElement('div');
        itemTitle.classList.add('item-title');
        itemTitle.setAttribute('data-action', 'item-title');
  
        let hTitle = document.createElement('h3');
        hTitle.textContent = item.title;
  
        // Create the vertical menu (ellipsis icon and popup)
        let vert = document.createElement('div');
        vert.classList.add('vert');
  
        let iTag = document.createElement('i');
        iTag.classList.add('fa-solid', 'fa-ellipsis-vertical');
  
        let popUp = document.createElement('div');
        popUp.classList.add('pop-up');
  
        let edit = document.createElement('a');
        edit.classList.add('edit');
        edit.setAttribute('data-action', 'edit');
        edit.textContent = `Edit`;
        edit.addEventListener('click', (e) => {
          e.preventDefault();
          editfn(index);
        });
  
        let deleteItem = document.createElement('a');
        deleteItem.classList.add('delete');
        deleteItem.setAttribute('data-action', 'delete');
        deleteItem.textContent = 'Delete';
        deleteItem.addEventListener('click', (e) => {
          e.preventDefault();
          deletefn(index);
        });
  
        // Create the body and date container
        let itemBody = document.createElement('div');
        itemBody.classList.add('item-body');
  
        let itemBodyP = document.createElement('p');
        itemBodyP.textContent = item.description;
        itemBodyP.setAttribute('data-action', 'bodyP');
  
        let itemDate = document.createElement('div');
        itemDate.classList.add('item-created-date');
  
        let itemDateP = document.createElement('p');
        itemDateP.textContent = item.date;
  
        // Append elements conditionally based on itemStat
        popUp.append(edit, deleteItem);
        vert.append(iTag, popUp);
        itemTitle.append(hTitle, vert);
        itemBody.append(itemBodyP);
        itemDate.append(itemDateP);
        eachTask.append(itemTitle, itemBody, itemDate);
  
        if (item.itemStat === 'start') {
          startContainer.append(eachTask, addNew);
        } else if (item.itemStat === 'progress') {
          progressContainer.append(eachTask);
        } else if (item.itemStat === 'completed') {
          completedContainer.append(eachTask);
        }
      });
    }
  };
  



//get date form was submitted
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let todayDate = `${day}/${month}/${year}`;

let myArray = [];
let editingSignal = -1;
let myArrayIndex = myArray.length - 1;
let fetchingSignal = 0;





//open form
let openFormbtn = document.getElementById('plus-black');
let openFormbtn2 = document.getElementById('plus-new');
let closeFormbtn = document.getElementById('formbtn-btn');

// console.log(openFormbtn2);


openFormbtn.addEventListener('click', formOpen);
openFormbtn2.addEventListener('click', formOpenNew);
// closeFormbtn.addEventListener('click', formClose);
// console.log(closeFormbtn);


// function formClose(){
//     if (form.classList.contains('form')) {
//         form.classList.remove('form');
//         form.classList.add('form-no');
//         openFormbtn.classList.remove('plus-black-no');
//         openFormbtn.classList.add('plus-black');
//     }else {
//         form.classList.remove('form-no');
//         form.classList.add('form');
//         openFormbtn.classList.remove('plus-black');
//         openFormbtn.classList.add('plus-black-no');
//     }
// }

function formOpenNew(event){
    event.preventDefault();
    console.log(event.target);
    form.classList.remove('form-no');
    form.classList.add('form');
    openFormbtn.classList.remove('plus-black');
    openFormbtn.classList.add('plus-black-no');
}
function formOpen(event){
    event.preventDefault();
    if (form.classList.contains('form-no')) {
        form.classList.remove('form-no');
        form.classList.add('form');
        openFormbtn.classList.remove('plus-black');
        openFormbtn.classList.add('plus-black-no');
        
    }else {
        form.classList.remove('form');
        form.classList.add('form-no');
        openFormbtn.classList.remove('plus-black-no');
        openFormbtn.classList.add('plus-black');

    }
    
    
    // if (form.classList.contains === `form-no`) {
    //     form.classList.remove('form-no');
    //     form.classList.add('form');
    //     openFormbtn.classList.remove('plus-black');
    //     openFormbtn.classList.add('plus-black-no');
    // }else{
    //     form.classList.remove('form');
    //     form.classList.add('form-no');
    //     openFormbtn.classList.remove('plus-black-no');
    //     openFormbtn.classList.add('plus-black');
    // }
}

form.addEventListener("submit", submitForm);

function submitForm(event){
    event.preventDefault();
    
    
    let Title = title.value;
    let Description = description.value;
   
    if (myArray.length === 0 && Title == '') {
        alert('item needed')
    }else if (editingSignal >= 0) {
        myArray = myArray.map((item, index) => {
            if (editingSignal === index) {
                return{
                    
                    title : Title,
                    description : Description,
                    itemStat : 'progress',
                    id :item.id,
                    date : item.date,
                    completed : item.completed
                    

                }
                
            }else{
                return{
                    
                    title : item.title,
                    description : item.description,
                    itemStat : item.itemStat,
                    id :item.id,
                    date : item.date,
                    completed : item.completed
                }
            }

        })
        editingSignal = -1;
        localStorage.setItem('object', JSON.stringify(myArray));
        
        form.reset();
        fetchItems();
        form.classList.remove('form');
        form.classList.add('form-no');
        openFormbtn.classList.remove('plus-black-no');
        openFormbtn.classList.add('plus-black');
    }else{
        const object = {
            id: new Date().getTime().toString(),
            title : Title,
            description : Description,
            itemStat : 'start',
            date : todayDate,
            completed : false
        };
    
        myArray.push(object);
    
        localStorage.setItem('object', JSON.stringify(myArray));
        
        form.reset();
        fetchItems();
        
        form.classList.remove('form');
        form.classList.add('form-no');
        openFormbtn.classList.remove('plus-black-no');
        openFormbtn.classList.add('plus-black');
    };

}


function fetchItems(){
    myArray=[];
    let formSubmit = localStorage.getItem('object');
    
    
    if (formSubmit) {
        myArray = JSON.parse(formSubmit);
    }

   

    displayUI();
}

let myArrayIndexNew = myArray.length -1;


if (myArray.length > 0) {
  fetchItems();
}else if(myArray.length === 0){
  fetchItems();
}




function displayUI(){
    



  myArray.forEach((item, index) =>{
    if (item.itemStat !== 'start') {
      progressContainer.innerHTML = '';
      completedContainer.innerHTML = '';
    }
    else{
      startContainer.innerHTML = '';
      progressContainer.innerHTML = '';
      completedContainer.innerHTML = '';
    }
  })


  // Check if there are items in the filtered array
  if (myArray.length > 0) {
    myArray.forEach((item, index) => {
      // Create the main task container
      let eachTask = document.createElement('div');
      eachTask.classList.add('each-task');
      eachTask.setAttribute('id', `${index}`);
      eachTask.setAttribute('data-action', 'each-task');
      eachTask.addEventListener('click', (e) => {
        e.preventDefault();
        clickAction(index);
      });

      // Create the title container
      let itemTitle = document.createElement('div');
      itemTitle.classList.add('item-title');
      itemTitle.setAttribute('data-action', 'item-title');

      let hTitle = document.createElement('h3');
      hTitle.textContent = item.title;

      // Create the vertical menu (ellipsis icon and popup)
      let vert = document.createElement('div');
      vert.classList.add('vert');

      let iTag = document.createElement('i');
      iTag.classList.add('fa-solid', 'fa-ellipsis-vertical');

      let popUp = document.createElement('div');
      if (item.itemStat === 'completed') {
        
        popUp.classList.add('complete-pop');
      }else if (item.itemStat === 'start' || item.itemStat === 'progress'){
        
        popUp.classList.add('pop-up');
      }
      
      

      let edit = document.createElement('a');
      edit.classList.add('edit');
      edit.setAttribute('data-action', 'edit');
      edit.textContent = `Edit`;
      edit.addEventListener('click', (e) => {
        e.preventDefault();
        editfn(index);
      });

      let deleteItem = document.createElement('a');
      deleteItem.classList.add('delete');
      deleteItem.setAttribute('data-action', 'delete');
      deleteItem.textContent = 'Delete';
      deleteItem.addEventListener('click', (e) => {
        e.preventDefault();
        deletefn(index);
      });

      // Create the body and date container
      let itemBody = document.createElement('div');
      itemBody.classList.add('item-body');

      let itemBodyP = document.createElement('p');
      itemBodyP.textContent = item.description;
      itemBodyP.setAttribute('data-action', 'bodyP');

      let itemDate = document.createElement('div');
      itemDate.classList.add('item-created-date');

      let itemDateP = document.createElement('p');
      itemDateP.textContent = item.date;

      // Append elements conditionally based on itemStat
      popUp.append(edit, deleteItem);
      vert.append(iTag, popUp);
      itemTitle.append(hTitle, vert);
      itemBody.append(itemBodyP);
      itemDate.append(itemDateP);
      eachTask.append(itemTitle, itemBody, itemDate);

      if (item.itemStat === 'start') {
        startContainer.append(eachTask, addNew);
      } else if (item.itemStat === 'progress') {
        progressContainer.append(eachTask);
      } else if (item.itemStat === 'completed') {
        completedContainer.append(eachTask);
      }
    });
  }



   

       


    // })


}

// startContainer.addEventListener('click', clickAction);
// progressContainer.addEventListener('click', clickAction);
// completedContainer.addEventListener('click', clickAction);

function clickAction(e, value){
    



    const targetUser = event.target;
    
    
    const parent = targetUser.parentElement;
    const secondChild = parent.children[1];
    
    
    
    
    
    const greatGrand = event.target.parentElement.parentElement.parentElement;
    // const newGrand = event.target.parentElement.parentElement.parentElement.parentElement;
    // console.log(event.target.parentElement.parentElement.parentElement.parentElement);
    
    
    
    if (!greatGrand.classList.contains('each-task')) return;
    // if (!newGrandid.classList.contains('each-task')) return;
    

    // let value = Number(greatGrand.id);
    // console.log(value);
    
    
    // console.log(targetUser.dataset.action);

    console.log(event.target.parentElement.children[1].classList);
    

    if (event.target.parentElement.children[1].classList.contains('pop-up')) {
        secondChild.classList.remove('pop-up');
        secondChild.classList.add('no-pop-up');
        
    
    }else if (event.target.parentElement.children[1].classList.contains('complete-pop')) {
      secondChild.classList.remove('complete-pop');
      secondChild.classList.add('incomplete-pop');
    }
    
    
    else if(event.target.parentElement.children[1].classList.contains('no-pop-up') ){
        secondChild.classList.remove('no-pop-up')
        secondChild.classList.add('pop-up')
    }else if (event.target.parentElement.children[1].classList.contains('incomplete-pop') ) {
      secondChild.classList.remove('incomplete-pop');
      secondChild.classList.add('complete-pop');
    }
    // else if (event.target.parentElement.children[1].classList.contains('pop-up-2') || tasks.contains(event.target)) {
    //   secondChild.classList.remove('no-pop-up-2');
    //   secondChild.classList.add('pop-up-2');
    // }



    
    
    // if (targetted === 'edit') {
    //     edit(value);
    // }else if (targetted === 'delete') {
    //     deletefn(value);
    // }


    
}

function deletefn(value){
    let each_task = event.target.parentElement.parentElement.parentElement.parentElement;
    
    myArray.forEach((item, index) => {
        if (value === index) {
            myArray.splice(index, 1);
            localStorage.setItem('object', JSON.stringify(myArray));
            each_task.innerHTML=``;
            each_task.classList.remove('each-task');
            fetchItems();
            
            
        }
    })
    event.target.parentElement.classList.remove('no-pop-up');
    event.target.parentElement.classList.add('pop-up');
}

function editfn(value2){

    title.value = myArray[value2].title;
    description.value = myArray[value2].description;

    
    let tiTle = myArray[value2].title;
    let desCription = myArray[value2].description;



    title.value = tiTle;
    description.value = desCription;
    editingSignal = value2;

    event.target.parentElement.classList.remove('no-pop-up');
    event.target.parentElement.classList.add('pop-up');

    closeFormbtn.textContent = `Update`;
    form.classList.remove('form-no');
    form.classList.add('form');
    openFormbtn.classList.remove('plus-black');
    openFormbtn.classList.add('plus-black-no');

}

function editForm(){



    myArray.findIndex(

    )


    myArray.map((item, index) => {
        
        console.log(myArray[index].id);
        if (myArray[index].id === item.id) {
            let newid = item.title
            console.log(newid);
            
            myArray[value2]={
                ...item,
                title : item.title,
                description : item.description,
                itemStat : 'progress'
            }
        }
    
    localStorage.setItem('object', JSON.stringify(myArray));
    form.reset();
    fetchItems();
    
    
    form.classList.remove('form');
    // form.classList.add('form-no');
    // openFormbtn.classList.remove('plus-black-no');
    // openFormbtn.classList.add('plus-black');
    })
}

