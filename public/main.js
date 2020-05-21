function onOff() {
    document
    .querySelector("#modal")
    .classList
    .toggle("hide")

    document
    .querySelector("body")
    .classList
    .toggle("hideScroll")

}

function checkFields(event){
    const valuesToCheck = [
        "title",
        "category",
        "description",
        "link",
        "image"
    ]

    const isEmpty = valuesToCheck.find(function(value){

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        
        if(checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    /*for( let value of valuesToCheck) {
        console.log(event.target[value].value)
    }*/
    if(isEmpty){
        event.preventDefault()
        alert("Ei gaiato, preencha todos os campos")
        
    }
}


//document
//    .querySelector("button.fat")
//    .addEventListener("click", onOff);
