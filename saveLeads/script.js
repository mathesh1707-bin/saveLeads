let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn=document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}

function render(leads) {
    let listItems=""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a target='_blank' href='#'>" + myLeads[i] + "</a></li>"
        listItems += `
        <li>
            <a target='_blank' href=https://${leads[i]}> 
                ${leads[i]} 
            </a>
        </li>`
    }
    ulEl.innerHTML=listItems
}


inputBtn.addEventListener("click", function () {
    let lead = inputEl.value
    if (lead != '') {
        myLeads.push(lead)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    }
    render(myLeads) 
})

tabBtn.addEventListener("click", function () {
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})
