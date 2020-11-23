var wordSizeField = document.getElementById("wordSize");
var textToCompressField = document.getElementById("textToCompress");
var compressedTextField = document.getElementById("compressedText");
var originalSizeField = document.getElementById("originalSize");
var newSizeField = document.getElementById("newSize");
var percentField = document.getElementById("percent");



function compress() {
    var wordSize = parseInt(wordSizeField.value);
    var textToCompress = textToCompressField.value;
    var fullDictionary = buildFullDictionary(wordSize, textToCompress);
    var dictionary = simplifyDictionary(fullDictionary);
    var result = encodeText(dictionary, textToCompress);

    compressedTextField.value = result;

    fillResultsFields();
}

function buildFullDictionary(wordSize, textToCompress) {
    var result = [];

    for (var i = 0; i < textToCompress.length; i += wordSize) {
        var word = textToCompress.substring(i, i + wordSize);
        var wordItem = result.filter(e => e.word == word)[0];

        if (wordItem) 
            wordItem.count++;
        else 
            result.push({ word, count : 1 });
    }

    return result;
}

function simplifyDictionary(dictionary) {
    var result = dictionary.filter(e => e.count > 1);
    return result;
}

function encodeText(dictionary, text) {
    var firstLine = "";

    for (var i = 0; i < dictionary.length; i++) {
        var item = dictionary[i];
        firstLine += "|" + item.word;
        text = text.replaceAll(item.word, "[" + i.toString() + "]");
    }

    var result = firstLine.substring(1) + "\n" + text;

    return result;
}



function uncompress() {
    var compressedText = compressedTextField.value;
    var items = compressedText.split('\n')[0].split("|");
    var result = compressedText.substring(compressedText.indexOf("\n") + 1);
    items.forEach((item, i) => result = result.replaceAll("[" + i.toString() + "]", item));

    textToCompressField.value = result;

    fillResultsFields();
}



function fillResultsFields() {
    var originalSize = textToCompressField.value.length;
    var newSize = compressedTextField.value.length;

    originalSizeField.innerText = originalSize;
    newSizeField.innerText = newSize;
    percentField.innerText = (100 - (100 * newSize / originalSize)).toFixed(2);
}