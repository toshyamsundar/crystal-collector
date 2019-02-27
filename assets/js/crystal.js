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

  //Function that returns a random number between 2 values
  var generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var setAttribute = (elemId, attrName, attrValue) => {
    // console.log("Element ID: " + elemId);
    // console.log("AttrName:AttrValue " + attrName + ":" + attrValue);
    $(elemId).attr(attrName, attrValue);
  };

  var getAttribute = (elemId, attrName) => {
    elemId = "#" + elemId;
    // console.log("Element ID: " + elemId);
    // console.log("AttrName:AttrValue " + attrName + ":" + $(elemId).attr(attrName));
    return $(elemId).attr(attrName);
  };

  var setText = (elemId, textValue) => {
    console;
    $(elemId).text(textValue);
  };

  var initGame = () => {
    magicNumber = generateRandom(19, 120);
    console.log("Magic Number: " + magicNumber);
    setText(magicNumberId, magicNumber);

    yellowCrystalValue = generateRandom(1, 12);
    console.log("Yellow Value: " + yellowCrystalValue);
    setAttribute(yellowCrystalId, attributeName, yellowCrystalValue);

    pinkCrystalValue = generateRandom(1, 12);
    console.log("Pink Value: " + pinkCrystalValue);
    setAttribute(pinkCrystalId, attributeName, pinkCrystalValue);

    greenCrystalValue = generateRandom(1, 12);
    console.log("Green Value: " + greenCrystalValue);
    setAttribute(greenCrystalId, attributeName, greenCrystalValue);

    redCrystalValue = generateRandom(1, 12);
    console.log("Red Value: " + redCrystalValue);
    setAttribute(redCrystalId, attributeName, redCrystalValue);

    totalScore = 0;
    setText(totalScoreId, totalScore);
  };

  var addElem = (elTag, elClass, elText) => {
    var newElem = $(elTag);
    newElem.text(elText);
    $(elClass).append(newElem);
  };

  var showMessage = (title, message) => {
    $(".modal-title").text(title);
    addElem("<p>", ".modal-body", message);
    $("#overlay").modal("show");

    // Hide the dialog after 2 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 3000);
  };

  $(".crystal-img").on("click", function() {
    if (!startPlay) {
      showMessage("Rules!!", "Click on Play to begin");
    } else {
      // console.log("Total Score Before: " + totalScore);
      // console.log("This: " + $(this));
      // console.log("Attribute Name: " + attributeName);
      totalScore += parseInt(getAttribute($(this).attr("id"), attributeName));
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
      }
    }
  });

  $(".btn").on("click", function() {
    initGame();
    startPlay = true;
  });
});
