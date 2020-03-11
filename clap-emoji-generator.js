"use strict";

var ClapEmojiGenerator = {

    init: function start() {
        var claps = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"];
        var userTextarea = document.getElementById("userTextarea");
        var clapEmojiTextarea = document.getElementById("clapEmojiTextarea");
        var multiculturalCheckbox = document.getElementById("multiculturalCheckbox");
        var tweetButton = document.getElementById("tweetButton");

        // events
        ["keypress", "paste", "input"].forEach(function (event) {
            document.addEventListener(event, function () {

                userTextarea.value = userTextarea.value.replace(/\s/gi, " ");
                tweetButton.classList.remove("active");

                setTimeout(function () {
                    clapEmojiTextarea.value = multiculturalCheckbox.checked ? multiculturalOutput(userTextarea) : defaultOutput(userTextarea);
                }, 100);
            }, false);
        });


        // clapped texts
        function defaultOutput(text) {
            return text.value.replace(/\s/g, " 👏 ");
        }
        function multiculturalOutput(text) {
            return text.value.split(/\s/).reduce(function (a, c, i) {
                return (a === "" ? "" : a + " " + claps[i % claps.length] + " ") + c;
            }, "");
        }

        // clicpboard
        function copyToClipboard() {
            var textField = document.createElement("textarea");
            textField.innerText = document.querySelector("#clapEmojiTextarea").value;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();

            if (clapEmojiTextarea.value.length > 0) {
                tweetButton.classList.add("active");
            }

            tweetButton.setAttribute("href", "https://twitter.com/share?url=https://mburakerman.github.io/clap-emoji-generator/&text=" + clapEmojiTextarea.value);
        }

        clapEmojiTextarea.addEventListener("click", function () {
            copyToClipboard();
            this.select();
        });
    }

};

ClapEmojiGenerator.init();
