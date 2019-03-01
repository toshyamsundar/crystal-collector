$(document).ready(function() {
  var magicNumber;
  var yellowCrystalValue;
  var pinkCrystalValue;
  var greenCrystalValue;
  var redCrystalValue;
  var winCount = 0;
  var lossCount = 0;
  var totalScore = 0;
  var startPlay = false;

  var yellowCrystalId = "#yellowCrystal";
  var pinkCrystalId = "#pinkCrystal";
  var greenCrystalId = "#greenCrystal";
  var redCrystalId = "#redCrystal";
  var totalScoreId = "#totalScore";
  var magicNumberId = "#magicNumber";
  var lossCountId = "#lossCount";
  var winCountId = "#winCount";
  var attributeName = "value";

  var gameRules = [
    "Click Play to begin",
    "A magic number will be displayed on the screen",
    "Each one of the crystals will be assigned a random secret value",
    "Clicking on the crystals will add to the total score",
    "If your total score goes over the magic number, you lose",
    "You win, if your total score matches the magic number",
    "Clicking on the crystals will randomly rearrange them",
    "Your win and loss count gets tracked",
    "Clicking on play again will reset the random numbers"
  ];

  //Function to return a random number between 2 values
  var generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Function to set attribute of an element
  var setAttribute = (elemId, attrName, attrValue) => {
    // console.log("Element ID: " + elemId);
    // console.log("AttrName:AttrValue " + attrName + ":" + attrValue);
    $(elemId).attr(attrName, attrValue);
  };

  // Function the get the value of an attribute
  var getAttribute = (elemId, attrName) => {
    //elemId = "#" + elemId;
    // console.log("Element ID: " + elemId);
    // console.log("AttrName:AttrValue " + attrName + ":" + $(elemId).attr(attrName));
    return $(elemId).attr(attrName);
  };

  // Function to set the text value for an element
  var setText = (elemId, textValue) => {
    console;
    $(elemId).text(textValue);
  };

  // Function to initialize the game
  var initGame = () => {
    magicNumber = generateRandom(19, 120);
    // console.log("Magic Number: " + magicNumber);
    setText(magicNumberId, magicNumber);

    yellowCrystalValue = generateRandom(1, 12);
    // console.log("Yellow Value: " + yellowCrystalValue);
    setAttribute(yellowCrystalId, attributeName, yellowCrystalValue);

    pinkCrystalValue = generateRandom(1, 12);
    // console.log("Pink Value: " + pinkCrystalValue);
    setAttribute(pinkCrystalId, attributeName, pinkCrystalValue);

    greenCrystalValue = generateRandom(1, 12);
    // console.log("Green Value: " + greenCrystalValue);
    setAttribute(greenCrystalId, attributeName, greenCrystalValue);

    redCrystalValue = generateRandom(1, 12);
    // console.log("Red Value: " + redCrystalValue);
    setAttribute(redCrystalId, attributeName, redCrystalValue);

    totalScore = 0;
    setText(totalScoreId, totalScore);
  };

  // Function to add elements to any div
  var addElem = (elTag, elClass, elText) => {
    var newElem = $(elTag);
    newElem.text(elText);
    $(elClass).append(newElem);
  };

  // Function to display modal with messages
  var showMessage = (title, message) => {
    $(".modal-title").text(title);
    addElem("<p>", ".modal-body", message);
    $("#overlay").modal("show");

    // Hide the dialog after 3 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 3000);
  };

  // This function displays the rules when the page loads
  var showRules = () => {
    $(".modal-title").text("Rules!");
    for (var i = 0; i < gameRules.length; i++) {
      addElem("<p>", ".modal-body", gameRules[i]);
    }

    $("#overlay").modal("show");

    // Hide the dialog after 25 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 25000);
  };

  // Function to reset the data-position value for each crystal to a random number between 1 & 20
  var resetCrystalPosition = () => {
    var newPosition;
    $(".crystals")
      .children("a")
      .each(function() {
        newPosition = generateRandom(1, 20);
        // console.log(
        //   "Crystal: " +
        //     $(this)
        //       .children("img")
        //       .attr("id") +
        //     " " +
        //     newPosition
        // );
        $(this).data("position", newPosition);
      });
  };

  // Function to sort elements
  var sortElements = (a, b) => {
    // console.log("a: " + parseInt($(b).data("position")));
    // console.log("b: " + parseInt($(a).data("position")));
    // console.log("---------------------");
    return parseInt($(b).data("position")) - parseInt($(a).data("position"));
  };

  // Function to rearrange the crystals based on the data-position value
  var rearrangeCrystals = () => {
    setTimeout(function() {
      $(".crystals a")
        .sort(sortElements)
        .appendTo(".crystals");
    }, 100);
  };

  // Callback function for crystal onClick event
  $(".crystal-img").on("click", function() {
    if (!startPlay) {
      showMessage("Rules!!", "Click Play to begin");
    } else {
      // console.log("Total Score Before: " + totalScore);
      // console.log("This: " + $(this));
      // console.log("Attribute Name: " + attributeName);
      totalScore += parseInt(getAttribute("#" + $(this).attr("id"), attributeName));
      // console.log("Total Score After: " + totalScore);
      setText(totalScoreId, totalScore);

      if (totalScore > magicNumber) {
        lossCount++;
        setText(lossCountId, lossCount);
        magicNumber = 0;
        setText(magicNumberId, magicNumber);
        showMessage("You Lose", "Can't you win this silly game?");
        startPlay = false;
      } else if (totalScore === magicNumber) {
        winCount++;
        setText(winCountId, winCount);
        magicNumber = 0;
        setText(magicNumberId, magicNumber);
        showMessage("You Win", "Care to play again?");
        startPlay = false;
      } else {
        resetCrystalPosition();
        rearrangeCrystals();
      }
    }
  });

  // Callback function for button onClick
  $(".btn").on("click", function() {
    initGame();
    startPlay = true;
  });

  $(".close").on("click", function() {
    $(".modal-body").empty();
  });

  // Call the showRules function as soon as the page loads
  showRules();
});
