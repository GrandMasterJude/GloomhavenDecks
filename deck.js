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
    document.getElementById("decktotal").innerHTML = "Total Cards in Deck: " + charDeck.length;
    document.getElementById("modifieraverage").innerHTML = "Average Modifier: ";
    

}

CalculatePercents();



function Remove(thisPerk) {
if(thisPerk.checked == true) {
    for (let i = 0; i < thisPerk.dataset.rnumber; i++) {
        if (charDeck.includes(thisPerk.dataset.rcard)) {
            let remove = charDeck.indexOf(thisPerk.dataset.rcard);
            charDeck.splice(remove, 1);
        }
    }
}
if(thisPerk.checked == false) {
    for (let i = 0; i < thisPerk.dataset.rnumber; i++) {
        charDeck.push(thisPerk.dataset.rcard);
    }
}
CalculatePercents();
}

function Add(thisPerk) {
    if(thisPerk.checked == true) {
        for (let i = 0; i < thisPerk.dataset.addnumber; i++) {
        charDeck.push(thisPerk.dataset.addcard);
        }
    }
    if(thisPerk.checked == false) {
        for (let i = 0; i < thisPerk.dataset.addnumber; i++) {
            if (charDeck.includes(thisPerk.dataset.addcard)) {
                let remove = charDeck.indexOf(thisPerk.dataset.addcard);
                charDeck.splice(remove, 1);
            }
        }
    }
    CalculatePercents();
}

function Replace(thisPerk) {

    Add(thisPerk);
    Remove(thisPerk);
}

function AddOneRollingEarthAir(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+0 Earth Rolling','+0 Air Rolling');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Earth Rolling')) {
            let remove = charDeck.indexOf('+0 Earth Rolling');
            charDeck.splice(remove, 1);
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Air Rolling')) {
            let remove = charDeck.indexOf('+0 Air Rolling');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddOneRollingLightDark(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+0 Light Rolling','+0 Dark Rolling');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Light Rolling')) {
            let remove = charDeck.indexOf('+0 Light Rolling');
            charDeck.splice(remove, 1);
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Dark Rolling')) {
            let remove = charDeck.indexOf('+0 Dark Rolling');
            charDeck.splice(remove, 1);
        }
    }
    CalculatePercents();
}

function AddRollingDisarmMuddle(thisPerk) {

    if(thisPerk.checked == true) {
        charDeck.push('+0 Disarm Rolling','+0 Muddle Rolling');
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Disarm Rolling')) {
            let remove = charDeck.indexOf('+0 Disarm Rolling');
            charDeck.splice(remove, 1);
        }
    }
    if(thisPerk.checked == false) {
        if (charDeck.includes('+0 Muddle Rolling')) {
            let remove = charDeck.indexOf('+0 Muddle Rolling');
            charDeck.splice(remove, 1);
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