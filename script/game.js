var teamOverviewGroup1;
var teamOverviewGroup2;
var teamOverviewGroup3;
var teamOverviewGroup4;

var teamOverviewName1;
var teamOverviewPopulation1;
var teamOverviewInvention1;
var teamOverviewTotal;

var teamOverviewName2;
var teamOverviewPopulation2;
var teamOverviewInvention2;
var teamOverviewTotal;

var teamOverviewName3;
var teamOverviewPopulation3;
var teamOverviewInvention3;
var teamOverviewTotal;

var teamOverviewName4;
var teamOverviewPopulation4;
var teamOverviewInvention4;
var teamOverviewTotal;

var currentTurnDisplay;

var populationRollResult;
var inventionRollResult;
var nextTurnButton;
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
var lastClickedDiv;
var inputVal;

function getElements() {
	teamOverviewGroup1 = document.getElementById("group-1");
	teamOverviewGroup2 = document.getElementById("group-2");
	teamOverviewGroup3 = document.getElementById("group-3");
	teamOverviewGroup4 = document.getElementById("group-4");

	teamOverviewName1 = document.getElementById("group-name1");
	teamOverviewPopulation1 = document.getElementById("population-1");
	teamOverviewInvention1 = document.getElementById("invention-1");
	teamOverviewTotal1 = document.getElementById("total-1");

	teamOverviewName2 = document.getElementById("group-name2");
	teamOverviewPopulation2 = document.getElementById("population-2");
	teamOverviewInvention2 = document.getElementById("invention-2");
	teamOverviewTotal2 = document.getElementById("total-2");

	teamOverviewName3 = document.getElementById("group-name3");
	teamOverviewPopulation3 = document.getElementById("population-3");
	teamOverviewInvention3 = document.getElementById("invention-3");
	teamOverviewTotal3 = document.getElementById("total-3");

	teamOverviewName4 = document.getElementById("group-name4");
	teamOverviewPopulation4 = document.getElementById("population-4");
	teamOverviewInvention4 = document.getElementById("invention-4");
	teamOverviewTotal4 = document.getElementById("total-4");

	currentTurnDisplay = document.getElementById("current-turn");

	populationRollResult = document.getElementById("result-pop");
	inventionRollResult = document.getElementById("result-inv");

	nextTurnButton = document.getElementById("next-turn-button");
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

	$(".title-edit").click(divClicked);
	$(".number-view").click(divClicked);
	$(".editable-text").blur(editableTextBlurred);

	playing = true;
	gameLoop = setInterval(play, 1000/10);
}

function enterPressed() {
		$("textarea").keypress(function(e) {
		if (e.which === 13) {
			console.log("asdasd");
			$(this).blur();
		}
	});
}

function divClicked() {
	lastClickedSpan = event.target.id;
	lastClickedDiv = $(this);
    var divHtml = $(this).html();
    var textLength = divHtml.length + 3;
    var editableText = $('<textarea class="num-edit" rows="1" cols="' + textLength +'">');
    editableText.val(divHtml);
    $(this).replaceWith(editableText);
    editableText.focus();
    enterPressed();
    editableText.blur(editableTextBlurred);
}

function editableTextBlurred() {
    var html = $(this).val();
    var viewableText = $("<span>");
    if (lastClickedDiv.hasClass("number-view")) {
    	viewableText.addClass("number-view");
    	console.log("mamd");	
    } else {
    	console.log("raw");
    	viewableText.addClass("title-edit");
    }
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
	} else if (lastClickedSpan === "group-name1") {
		group1.name = html;
	} else if (lastClickedSpan === "group-name2") {
		group2.name = html;
	} else if (lastClickedSpan === "group-name3") {
		group3.name = html;
	} else if (lastClickedSpan === "group-name4") {
		group4.name = html;
	}
    $(viewableText).click(divClicked);
}

function play() {
	teamOverviewPopulation1.innerHTML = group1.population;
	teamOverviewInvention1.innerHTML = group1.invention;
	teamOverviewTotal1.innerHTML = group1.total;
	teamOverviewPopulation2.innerHTML = group2.population;
	teamOverviewInvention2.innerHTML = group2.invention;
	teamOverviewTotal2.innerHTML = group2.total;
	teamOverviewPopulation3.innerHTML = group3.population;
	teamOverviewInvention3.innerHTML = group3.invention;
	teamOverviewTotal3.innerHTML = group3.total;
	teamOverviewPopulation4.innerHTML = group4.population;
	teamOverviewInvention4.innerHTML = group4.invention;
	teamOverviewTotal4.innerHTML = group4.total;
	groups[currentTurn].updateTotal();

	if (currentTurn === 0) {
		currentTurnDisplay.innerHTML = groups[currentTurn].name;
		teamOverviewGroup1.style.backgroundColor = "#00FF18";
		teamOverviewGroup1.style.color = "black";
		teamOverviewGroup4.style.color = "#f4f4f4";
		teamOverviewGroup4.style.backgroundColor = "transparent";
	} else if (currentTurn === 1) {
		currentTurnDisplay.innerHTML = groups[currentTurn].name;
		teamOverviewGroup2.style.backgroundColor = "#00FF18";
		teamOverviewGroup2.style.color = "black";
		teamOverviewGroup1.style.color = "#f4f4f4";
		teamOverviewGroup1.style.backgroundColor = "transparent";
	} else if (currentTurn === 2) {
		currentTurnDisplay.innerHTML = groups[currentTurn].name;
		teamOverviewGroup3.style.backgroundColor = "#00FF18";
		teamOverviewGroup3.style.color = "black";
		teamOverviewGroup2.style.color = "#f4f4f4";
		teamOverviewGroup2.style.backgroundColor = "transparent";
	} else if (currentTurn === 3) {
		currentTurnDisplay.innerHTML = groups[currentTurn].name;
		teamOverviewGroup4.style.backgroundColor = "#00FF18";
		teamOverviewGroup4.style.color = "black";
		teamOverviewGroup3.style.color = "#f4f4f4";
		teamOverviewGroup3.style.backgroundColor = "transparent";
	}

	if (currentTurn > 3) currentTurn = 0;

	if (!playing) {
		clearInterval(gameLoop);
	}
}

function nextTurnClick() {
	currentTurn++;
	if (currentTurn > 3) {
		currentTurn = 0;
	}
	populationRollResult.innerHTML = "N/A";
	inventionRollResult.innerHTML = "N/A";
}

function populationRoll() {
	console.log("rollo");
	var resultPop = Math.floor(Math.random() * 10 * 1000);
	populationRollResult.innerHTML = resultPop;
	groups[currentTurn].population += resultPop;
}

function inventionRoll() {
	console.log("rollo");
	var resultInv = Math.floor(Math.random() * 12 * 1000);
	inventionRollResult.innerHTML = resultInv;
	groups[currentTurn].invention += resultInv;
}

function Group(name, population) {
	this.name = name;
	this.population = parseInt(population);
	this.invention = 0;
	this.inventions = [];

	this.init = function() {
		groups.push(this);
		this.total = this.population + this.invention;
	};

	this.updateTotal = function() {
		this.total = this.population + this.invention;
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