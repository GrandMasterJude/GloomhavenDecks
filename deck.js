var charDeck = ['+0','+0','+0','+0','+0','+0','-1','-1','-1','-1','-1','+1','+1','+1','+1','+1','+2','-2','Miss','x2',];
var discard = [];
var possiblecards = charDeck.filter(UniqueArray);

function Reset() {
    charDeck = ['+0','+0','+0','+0','+0','+0','-1','-1','-1','-1','-1','+1','+1','+1','+1','+1','+2','-2','Miss','x2',];
    discard = [];
    document.getElementById("cardFront").src = "img/Blank.png";
    document.getElementById("cardBack").src = "img/Back.png";

    CalculatePercents();

    //TODO uncheck all perk boxes
    // $(document).ready(function(){
    // $('#formID input[type=checkbox]').attr('checked',false);
    // });
    // Something like the above but it doesn't work because they come from a template?
}

function LoadCharacterPerks(character) {
    Reset();
    $("#perks").load("templates/" + character + ".html");
}

function Chance(deck, card) {
    let count = 0;

    for(var i = 0; i < deck.length; ++i){
        if(deck[i] == card)
            count++;
    };
    if (charDeck.length >= 1) {
        return Math.floor(count * (100/charDeck.length) * 1000) / 1000;  
        }
    else {
        document.getElementById("cardBack").src = "";
        return 0;
        } 
    }

function Draw() {
    if (charDeck.length >= 1) {

    let card = Math.floor(Math.random() * charDeck.length);
    document.getElementById("cardFront").src = "img/"+charDeck[card]+".png";
        if (charDeck[card] == 'Bless') {
            let cardIndex = charDeck.indexOf(charDeck[card]);

            charDeck.splice(cardIndex,1);
        }
        else if (charDeck[card] == 'Curse') {
            let cardIndex = charDeck.indexOf(charDeck[card]);

            charDeck.splice(cardIndex,1);
        }
        else {
            discard.push(charDeck[card]);

            let cardIndex = charDeck.indexOf(charDeck[card]);

            charDeck.splice(cardIndex,1);
        }
        
    CalculatePercents();
    if (charDeck.length == 0) {
        document.getElementById("cardBack").src = "img/Blank.png";
        }
    }

}

function Shuffle() {

    charDeck = charDeck.concat(discard);
    document.getElementById("cardBack").src = "img/Back.png";
    document.getElementById("cardFront").src = "img/Blank.png";
    discard = [];

    CalculatePercents();
}

function AddBless() {
    let count = 0;

    for(var i = 0; i < charDeck.length; ++i){
        if(charDeck[i] == 'Bless')
            count++;
    };
    if (count < 10) {
        charDeck.push('Bless');
        CalculatePercents();
    }
}

function AddCurse() {
    let count = 0;

    for(var i = 0; i < charDeck.length; ++i){
        if(charDeck[i] == 'Curse')
            count++;
    };
    if (count < 10) {
        charDeck.push('Curse');
        CalculatePercents();
    }
}

function UniqueArray(value, index, self) {
    return self.indexOf(value) === index;
}

function UpdatePossibleCards() {
    possiblecards = charDeck.filter(UniqueArray);
    possiblecards.sort();
}

function makeUl(array) {
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');

        
        item.appendChild(document.createTextNode(array[i] + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +  Chance(charDeck,array[i]) + " %")) ;

        list.appendChild(item);
    }
    return list;
}

function CalculatePercents() {
    UpdatePossibleCards();
    document.getElementById("percentChance").innerHTML = "";
    document.getElementById("percentChance").appendChild(makeUl(possiblecards));
}

CalculatePercents();






//Put all of these in another file
// probably make the remove cards check the discard as well?

// All of the Perk Functions are below

function RemoveTwo1s(thisPerk) {

    if(thisPerk.checked == true) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes("-1")) {
                let remove = charDeck.indexOf("-1");
                charDeck.splice(remove, 1);
            }
        }
    }

    if(thisPerk.checked == false) {
        charDeck.push('-1','-1');
    }
    CalculatePercents();
}


function RemoveFour0s(thisPerk) {

    if(thisPerk.checked == true) {
        for (let i = 0; i < 4; i++) {
            if (charDeck.includes("+0")) {
                let remove = charDeck.indexOf("+0");
                charDeck.splice(remove, 1);
            }
        }
    }

    if(thisPerk.checked == false) {
        charDeck.push('+0','+0','+0','+0');
    }
    CalculatePercents();
}

function ReplaceTwo1With2s(thisPerk) {

    if(thisPerk.checked == true) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes("+1")) {
                let remove = charDeck.indexOf("+1");
                charDeck.splice(remove, 1);
            }
        }
        charDeck.push('+2','+2');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes("+2")) {
                let remove = charDeck.indexOf("+2");
                charDeck.splice(remove, 1);
            }
        }
        charDeck.push('+1','+1');
    }
    CalculatePercents();
}


function Replace2With0(thisPerk) {

    if(thisPerk.checked == true) {
        if (charDeck.includes('-2')) {
            let remove = charDeck.indexOf('-2');
            charDeck.splice(remove, 1);
            charDeck.push('+0');
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0')) {
            let remove = charDeck.indexOf('+0');
            charDeck.splice(remove, 1);
            charDeck.push('-2');
        }
    }
    CalculatePercents();
}

function AddOne2Ice(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+2 Ice');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+2 Ice')) {
            let remove = charDeck.indexOf('+2 Ice');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}


function AddTwoRolling1s(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('+1 Rolling', '+1 Rolling');
    }
    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('+1 Rolling')) {
                let remove = charDeck.indexOf('+1 Rolling');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}


function AddThreeRollingPull1s(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Pull 1','Rolling Pull 1','Rolling Pull 1');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 3; i++) {
            if (charDeck.includes('Rolling Pull 1')) {
                let remove = charDeck.indexOf('Rolling Pull 1');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddThreeRollingMuddles(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Muddle','Rolling Muddle','Rolling Muddle');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 3; i++) {
            if (charDeck.includes('Rolling Muddle')) {
                let remove = charDeck.indexOf('Rolling Muddle');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}


function AddTwoRollingImmobilize(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Immobilize','Rolling Immobilize');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Immobilize')) {
                let remove = charDeck.indexOf('Rolling Immobilize');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}


function AddOneRollingStun(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Stun');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Stun')) {
            let remove = charDeck.indexOf('Rolling Stun');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}


function AddRollingDisarmMuddle(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Disarm','Rolling Muddle');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Stun')) {
            let remove = charDeck.indexOf('Rolling Stun');
            charDeck.splice(remove, 1);
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Muddle')) {
            let remove = charDeck.indexOf('Rolling Muddle');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function Replace1With1(thisPerk) {

    if(thisPerk.checked == true) {
        if (charDeck.includes('-1')) {
            let remove = charDeck.indexOf('-1');
            charDeck.splice(remove, 1);
            charDeck.push('+1');
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1')) {
            let remove = charDeck.indexOf('+1');
            charDeck.splice(remove, 1);
            charDeck.push('-1');
        }
    }
    CalculatePercents();
}

function AddTwo1s(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('+1', '+1');
    }
    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('+1')) {
                let remove = charDeck.indexOf('+1');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddOne3(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+3');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+3')) {
            let remove = charDeck.indexOf('+3');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne1(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+1');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1')) {
            let remove = charDeck.indexOf('+1');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddThreeRollingPush1s(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Push 1','Rolling Push 1','Rolling Push 1');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 3; i++) {
            if (charDeck.includes('Rolling Push 1')) {
                let remove = charDeck.indexOf('Rolling Push 1');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddTwoRollingPierce3s(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Pierce 3','Rolling Pierce 3');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Pierce 3')) {
                let remove = charDeck.indexOf('Rolling Pierce 3');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddOneRollingStun(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Stun');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Stun')) {
            let remove = charDeck.indexOf('Rolling Stun');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOneRollingAddTarget(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Add Target');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Add Target')) {
            let remove = charDeck.indexOf('Rolling Add Target');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne1Shield1(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+1 Shield 1 Self');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1 Shield 1 Self')) {
            let remove = charDeck.indexOf('+1 Shield 1 Self');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function Replace0With2(thisPerk) {

    if(thisPerk.checked == true) {
        if (charDeck.includes('+0')) {
            let remove = charDeck.indexOf('+0');
            charDeck.splice(remove, 1);
            charDeck.push('+2');
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+2')) {
            let remove = charDeck.indexOf('+2');
            charDeck.splice(remove, 1);
            charDeck.push('+0');
        }
    }
    CalculatePercents();
}

function AddTwoRollingPoisons(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Poison','Rolling Poison');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Poison')) {
                let remove = charDeck.indexOf('Rolling Poison');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddTwoRollingMuddles(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Muddle','Rolling Muddle');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Muddle')) {
                let remove = charDeck.indexOf('Rolling Muddle');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddOneRollingInvisible(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Invisible');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Invisible')) {
            let remove = charDeck.indexOf('Rolling Invisible');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne0Stun(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+0 Stun');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Stun')) {
            let remove = charDeck.indexOf('+0 Stun');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne1Wound(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+1 Wound');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1 Wound')) {
            let remove = charDeck.indexOf('+1 Wound');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne1Immobilize(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+1 Immobilize');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1 Immobilize')) {
            let remove = charDeck.indexOf('+1 Immobilize');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne1Curse(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+1 Curse');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1 Curse')) {
            let remove = charDeck.indexOf('+1 Curse');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddTwo2Fires(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('+2 Fire','+2 Fire');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('+2 Fire')) {
                let remove = charDeck.indexOf('+2 Fire');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddTwo2Ices(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('+2 Ice','+2 Ice');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('+2 Ice')) {
                let remove = charDeck.indexOf('+2 Ice');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddOneRollingEarthAir(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Earth','Rolling Air');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Earth')) {
            let remove = charDeck.indexOf('Rolling Earth');
            charDeck.splice(remove, 1);
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Air')) {
            let remove = charDeck.indexOf('Rolling Air');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOneRollingLightDark(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('Rolling Light','Rolling Dark');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Light')) {
            let remove = charDeck.indexOf('Rolling Light');
            charDeck.splice(remove, 1);
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('Rolling Dark')) {
            let remove = charDeck.indexOf('Rolling Dark');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddTwoRollingFires(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Fire','Rolling Fire');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Fire')) {
                let remove = charDeck.indexOf('Rolling Fire');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddOne1Heal2(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+1 Heal 2');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+1 Heal 2')) {
            let remove = charDeck.indexOf('+1 Heal 2');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne0AddTarget(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+0 Add Target');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Add Target')) {
            let remove = charDeck.indexOf('+0 Add Target');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOne2Muddle(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+2 Muddle');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+2 Muddle')) {
            let remove = charDeck.indexOf('+2 Muddle');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddTwoRollingPush2s(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Push 2','Rolling Push 2');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Push 2')) {
                let remove = charDeck.indexOf('Rolling Push 2');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddTwoRollingEarth(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Earth','Rolling Earth');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Earth')) {
                let remove = charDeck.indexOf('Rolling Earth');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddTwoRollingAir(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('Rolling Air','Rolling Air');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('Rolling Air')) {
                let remove = charDeck.indexOf('Rolling Air');
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function AddOne2AndTwo2s(thisPerk) {
    if(thisPerk.checked == true) {
        charDeck.push('+2','+2','-2');
    }

    if(thisPerk.checked == false) {
        for (let i = 0; i < 2; i++) {
            if (charDeck.includes('+2')) {
                let remove = charDeck.indexOf('+2');
                charDeck.splice(remove, 1);
            }
        }
        if (charDeck.includes('-2')) {
            let remove = charDeck.indexOf('12');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

// This is the future, refactor character templates to work with the functions below



// function Remove(thisPerk) {
// if(thisPerk.checked == true) {
//     for (let i = 0; i < thisPerk.dataset.number; i++) {
//         if (charDeck.includes(thisPerk.dataset.card)) {
//             let remove = charDeck.indexOf(thisPerk.dataset.card);
//             charDeck.splice(remove, 1);
//         }
//     }
// }
// if(thisPerk.checked == false) {
//     charDeck.push(thisPerk.dataset.card,thisPerk.dataset.card);
// }
// CalculatePercents();
// }

// function Add(thisPerk) {
//     if(thisPerk.checked == true) {
//         charDeck.push(thisPerk.dataset.card, thisPerk.dataset.card);
//     }
//     if(thisPerk.checked == false) {
//         for (let i = 0; i < thisPerk.dataset.number; i++) {
//             if (charDeck.includes(thisPerk.dataset.card)) {
//                 let remove = charDeck.indexOf(thisPerk.dataset.card);
//                 charDeck.splice(remove, 1);
//             }
//         }
//     }
//     CalculatePercents();
// }

// function Replace(thisPerk) {
//     //Needs to be two different datasets to differentiate addCards and removeCards, maybe number of each too?
// }