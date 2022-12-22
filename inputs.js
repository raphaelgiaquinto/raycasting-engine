var inputs = [];

function registerInput(key, trigger) {
    inputs.push({
        activate: false,
        key,
        trigger
    })
}


window.addEventListener("keydown", (event)=>{
    if(event.key) {
        var input = inputs.find(input => event.key.toLowerCase() == input.key);
        if(input){
            input.activate = true;
        }
    }
});

window.addEventListener("keyup", (event)=>{
    if(event.key) {
        var input = inputs.find(input => event.key.toLowerCase() == input.key);
        if(input){
            input.activate = false;
        }
    }
});

function updateInputs() {
    inputs.filter(input => input.activate).forEach(input => input.trigger());
}