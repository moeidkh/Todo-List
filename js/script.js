let $ = document;
const input = $.querySelector("#input");
let todoContainer = $.querySelector(".container");
let addBtn = $.querySelector("#add-btn");
let clearBtn = $.querySelector("#clear-todo-list");
let todoList = []
window.onload = function(){
    let items = JSON.parse(localStorage.getItem("todo"));
    if(items != null){
        items.forEach(function(item){
            addTodo(item)
            let obj = { }
            obj.todoTitle = item.todoTitle;
            obj.status = item.status
            todoList.push(obj);
        })
    }
}
input.addEventListener("keyup" , function(e){
    if(e.key === 'Enter'){
        let inputValue = input.value;
        if(inputValue != ""){
            input.value = "";
            let obj = { }
            obj.todoTitle = inputValue;
            obj.status = "incomplete";
            addTodo(obj);
            todoList.push(obj);
            localStorage.setItem("todo" , JSON.stringify(todoList));
        }else{
            alert("input is empty")
        }
    }
})
addBtn.addEventListener("click" , function(){
    let inputValue = input.value;
    if(inputValue != ""){
        input.value = "";
        let obj = { }
        obj.todoTitle = inputValue;
        obj.status = "incomplete";
        addTodo(obj);
        todoList.push(obj);
        localStorage.setItem("todo" , JSON.stringify(todoList));
    }
    else{
        alert("input is empty!")
    }
})
clearBtn.addEventListener("click" , function(){
    let boxesElem = $.querySelectorAll(".box")
    boxesElem.forEach((element)=>{
        element.remove()
    })
    localStorage.clear();
})
function addTodo(obj){
    let newElem = $.createElement("div");
    newElem.classList.add("box");
    let h3Elem = $.createElement("h3");
    let btnDelAndComp = $.createElement("div");
    h3Elem.classList.add("todo");
    h3Elem.innerHTML = obj.todoTitle;
    btnDelAndComp.classList.add("comp-del");
    let completeElem = $.createElement("div");
    completeElem.classList.add("complete");
    completeElem.addEventListener("click" , function(e){
        let h3Elem = e.target.parentElement.parentElement.firstChild;
        h3Elem.classList.toggle("completeItem");
        let todo = h3Elem.innerHTML;
        
        let index = todoList.findIndex(function(item){
            return item.todoTitle === todo;
        })
        if(completeElem.innerHTML != "Complete"){
            completeElem.innerHTML = "Complete";
            todoList[index].status = "Incomplete";
        }
        else{
            completeElem.innerHTML = "Incomplete";
            todoList[index].status = "Complete";
        }
        localStorage.setItem("todo" , JSON.stringify(todoList))
    })
    if(obj.status == "Complete"){
        h3Elem.classList.add("completeItem");
        completeElem.innerHTML = "Incomplete";
    }
    else{
        h3Elem.classList.remove("completeItem");
        completeElem.innerHTML = "Complete";
    }
    let deleteElem = $.createElement("div");
    deleteElem.classList.add("delete");
    deleteElem.innerHTML = "Delete";
    deleteElem.addEventListener("click" , function(e){
        let todo = e.target.parentElement.parentElement.firstChild.innerHTML;
        let index = todoList.findIndex(function(item){
            return item.todoTitle === todo;
        })
        if(index == 0){
            todoList = [];
        }
        else{
            todoList.splice(index,index);
        }

        localStorage.setItem("todo" , JSON.stringify(todoList));
        e.target.parentElement.parentElement.remove();
    })

    btnDelAndComp.appendChild(completeElem);
    btnDelAndComp.appendChild(deleteElem);
    newElem.appendChild(h3Elem);
    newElem.appendChild(btnDelAndComp);
    todoContainer.appendChild(newElem);
}
