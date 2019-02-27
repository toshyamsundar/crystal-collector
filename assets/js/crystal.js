$(document).ready(function() {
  var magicNumber;
  var yellowCrystalValue;
  var pinkCrystalValue;
  var greenCrystalValue;
  var redCrystalValue;
  var winCount;
  var lossCount;

  //Function that returns a random number between 2 values
  var generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var setAttribute = (elemName, attrName, attrValue) => {
    $(elemName).attr(attrName, attrValue);
  };

  var setText = (elemName, textValue) => {
    $(elemName).text(textValue);
  };

  var initGame = () => {
    magicNumber = generateRandom(19, 120);
    setText(".magicNumber", magicNumber);
  };
});
