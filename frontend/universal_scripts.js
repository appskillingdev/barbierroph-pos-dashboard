console.group('Loading universal scripts');
function gE() {
    console.groupEnd()
}

//asd

try {
    console.group('.....')
} catch (error) {
    console.error("Error occurred:", error)
} finally{
    console.groupEnd()
}

function smoothTransitionOut(cardElement) {
    try {

        cardElement.classList.add('animate-pick');

        setTimeout(() => {


            // 5. Trigger smooth CSS drop animation on just this card
            cardElement.classList.remove('animate-pick');
            cardElement.remove()

        }, 300);
    } catch (error) {
        console.error("Error during smoothTransitionOut:", error)
    }
}


function smoothTransitionMove(cardElement, targetContainer) {

    cardElement.classList.add('animate-pick');

    setTimeout(() => {


        // 5. Trigger smooth CSS drop animation on just this card
        cardElement.classList.remove('animate-pick');
        targetContainer.appendChild(cardElement);


        cardElement.classList.add('animate-drop');
        setTimeout(() => cardElement.classList.remove('animate-drop'), 600);

    }, 300);
}

console.log('Universal scripts loaded successfully');
gE()