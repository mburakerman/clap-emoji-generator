"use strict";

var ClapEmojiGenerator = {

    start: function start() {
        var your_text = document.getElementById("your_text");
        var clap_emoji_text = document.getElementById("clap_emoji_text");
        var tweet_it = document.querySelector(".tweet_it");

        ["keypress", "paste", "input"].forEach(function(event) {
            your_text.addEventListener(event, function() {

                your_text.value = your_text.value.replace(/\s/gi, " ");

                tweet_it.classList.remove("show_tweet_button");

                setTimeout(function() {
                    clap_emoji_text.value = your_text.value.replace(/\s/gi, " 👏 ");
                }, 100);

            }, false);
        });

        function copyToClipboard() {
            var textField = document.createElement("textarea");
            textField.innerText = document.querySelector("#clap_emoji_text").value;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();

            if (clap_emoji_text.value.length > 0) {
                tweet_it.classList.add("show_tweet_button");
            }

            tweet_it.setAttribute("href", "https://twitter.com/share?url=https://mburakerman.github.io/clapemojigenerator/&text=" + clap_emoji_text.value);
        }

        clap_emoji_text.addEventListener("click", function() {
            copyToClipboard();
            this.select();
        });

    }

};
ClapEmojiGenerator.start();
