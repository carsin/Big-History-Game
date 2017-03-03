
var teamOverviewGroup1;
var teamOverviewGroup2;
var teamOverviewGroup3;
var teamOverviewGroup4;

var teamOverviewName1;
var teamOverviewPopulation1;
var teamOverviewInvention1;

var teamOverviewName2;
var teamOverviewPopulation2;
var teamOverviewInvention2;

var teamOverviewName3;
var teamOverviewPopulation3;
var teamOverviewInvention3;

var teamOverviewName4;
var teamOverviewPopulation4;
var teamOverviewInvention4;

var currentTurnDisplay;

var populationRollResult;
var inventionRollResult;
var gameLoop;

var group1;
var group2;
var group3;
var group4;

var nextTurnCounter = 0;
var groups = [];
var currentTurn = 0;
var playing;
var popRolled;
var invRolled;
var lastClickedSpan;
var inputVal;

function getElements() {
	teamOverviewGroup1 = document.getElementById("group-1");
	teamOverviewGroup2 = document.getElementById("group-2");
	teamOverviewGroup3 = document.getElementById("group-3");
	teamOverviewGroup4 = document.getElementById("group-4");

	teamOverviewName1 = document.getElementById("group-name1");
	teamOverviewPopulation1 = document.getElementById("population-1");
	teamOverviewInvention1 = document.getElementById("invention-1");

	teamOverviewName2 = document.getElementById("group-name2");
	teamOverviewPopulation2 = document.getElementById("population-2");
	teamOverviewInvention2 = document.getElementById("invention-2");

	teamOverviewName3 = document.getElementById("group-name3");
	teamOverviewPopulation3 = document.getElementById("population-3");
	teamOverviewInvention3 = document.getElementById("invention-3");

	teamOverviewName4 = document.getElementById("group-name4");
	teamOverviewPopulation4 = document.getElementById("population-4");
	teamOverviewInvention4 = document.getElementById("invention-4");

	currentTurnDisplay = document.getElementById("current-turn");

	populationRollResult = document.getElementById("result-pop");
	inventionRollResult = document.getElementById("result-inv");
}

function init() {
	getElements();

	group1 = new Group(getParameterByName("n1"), getParameterByName("p1"));
	group2 = new Group(getParameterByName("n2"), getParameterByName("p2"));
	group3 = new Group(getParameterByName("n3"), getParameterByName("p3"));
	group4 = new Group(getParameterByName("n4"), getParameterByName("p4"));
	group1.init();
	group2.init();
	group3.init();
	group4.init();

	teamOverviewName1.innerHTML = group1.name;
	teamOverviewName2.innerHTML = group2.name;
	teamOverviewName3.innerHTML = group3.name;
	teamOverviewName4.innerHTML = group4.name;

	$(".number-view").click(divClicked);
	$("editable-text").blur(editableTextBlurred);

	playing = true;
	gameLoop = setInterval(play, 1000/20);
}

function divClicked() {
	lastClickedSpan = event.target.id;
    var divHtml = $(this).html();
    var editableText = $("<textarea/>");
    editableText.val(divHtml);
    $(this).replaceWith(editableText);
    editableText.focus();
    // setup the blur event for this new textarea
    editableText.blur(editableTextBlurred);
}

function editableTextBlurred() {
    var html = $(this).val();
    var viewableText = $("<span>");
    viewableText.addClass("number-view");
    viewableText.attr('id', lastClickedSpan);
    viewableText.html(html);
    $(this).replaceWith(viewableText);
    if (lastClickedSpan === "population-1") {
    	group1.population = parseInt(html);	
    	getElements();
    } else if (lastClickedSpan === "invention-1") {
    	group1.invention = parseInt(html);	
    	getElements();
	} else if (lastClickedSpan === "population-2") {
		group2.population = parseInt(html);
		getElements();
    } else if (lastClickedSpan === "invention-2") {
		group2.invention = parseInt(html);
		getElements();
	} else if (lastClickedSpan === "population-3") {
		group3.population = parseInt(html);
		getElements();
	} else if (lastClickedSpan === "invention-3") {
		group3.invention = parseInt(html);
		getElements();
	} else if (lastClickedSpan === "population-4") {
		group4.population = parseInt(html);
	} else if (lastClickedSpan === "invention-4") {
		group4.invention = parseInt(html);
		getElements();	
	} 
    // setup the click event for this new div
    $(viewableText).click(divClicked);
}

function play() {
	teamOverviewPopulation1.innerHTML = group1.population;
	teamOverviewInvention1.innerHTML = group1.invention;
	teamOverviewPopulation2.innerHTML = group2.population;
	teamOverviewInvention2.innerHTML = group2.invention;
	teamOverviewPopulation3.innerHTML = group3.population;
	teamOverviewInvention3.innerHTML = group3.invention;
	teamOverviewPopulation4.innerHTML = group4.population;
	teamOverviewInvention4.innerHTML = group4.invention;

	currentTurnDisplay.innerHTML = groups[currentTurn].name;

	if (currentTurn === 0) {
		teamOverviewGroup1.style.backgroundColor = "#00C92B";
		teamOverviewGroup4.style.backgroundColor = "#A8A8A8";
	} else if (currentTurn === 1) {
		teamOverviewGroup2.style.backgroundColor = "#00C92B";
		teamOverviewGroup1.style.backgroundColor = "#A8A8A8";
	} else if (currentTurn === 2) {
		teamOverviewGroup3.style.backgroundColor = "#00C92B";
		teamOverviewGroup2.style.backgroundColor = "#A8A8A8";
	} else if (currentTurn === 3) {
		teamOverviewGroup4.style.backgroundColor = "#00C92B";
		teamOverviewGroup3.style.backgroundColor = "#A8A8A8";
	}
	if (popRolled && invRolled) {
		currentTurn++; 
		popRolled = false;
		invRolled = false;
	}

	if (currentTurn > 3) currentTurn = 0;

	if (!playing) {
		clearInterval(gameLoop);
	}
}

function populationRoll() {
	if (!popRolled) {
		console.log("rollo");
		var resultPop = Math.floor(Math.random() * 10 * 1000);
		populationRollResult.innerHTML = resultPop;
		groups[currentTurn].population += resultPop;
		popRolled = true;
	} else {
		populationRollResult.innerHTML = "You already rolled this!";
	}

}

function inventionRoll() {
	if (!invRolled) {
		console.log("rollo");
		var resultInv = Math.floor(Math.random() * 12 * 1000);
		inventionRollResult.innerHTML = resultInv;
		groups[currentTurn].invention += resultInv;
		invRolled = true;
	} else {
		inventionRollResult.innerHTML = "You already rolled this!";
	}
}

function Group(name, population) {
	this.name = name;
	this.population = parseInt(population);
	this.invention = 0;

	this.init = function() {
		groups.push(this);
	};
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = function() {
	init();
};
