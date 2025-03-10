// ==UserScript==
// @name         Player X's Client
// @version      1.0
// @description  Player X's custom client.
// @author       Player X
// @license      haha, whats that?
// @match        https://starblast.io/
// @run-at       document-end
// @grant        none
// ==/UserScript==
const log = (msg) => console.log(`%c[Open Source Client] ${msg}`, "color: #ffff00");
const modlog = (msg) => console.log(`%c[Mod] ${msg}`, "color: #FF00A6");
const stylelog = (msg) => console.log(`%c[Style] ${msg}`, "color: #06c26d");
console.clear();
document.open();
document.write(
    `<html><head><title>Loading...</title></head><body style="background-color:#293449;"><div style="margin: auto; width: 50%;"><h1 style="text-align: center;padding: 170px 0;font-family:Play,Verdana;">Loading Player X's Client</h1><h1 style="text-align: center;font-family:Play,Verdana;">Please wait</h1></div></body></html>`
);
document.close();
log(`Started`);

function ClientLoader() {
    if (window.location.pathname !== "/") {
        log(`Injection not needed`);
        return;
    }

    var url = "https://starblast.io";
    var xhr = new XMLHttpRequest();
    log("Fetching starblast src...");
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var ClientCode = xhr.responseText;
            if (ClientCode !== undefined) {
                log(`Src fetched successfully`);
            }
            if (localStorage.getItem("gemColor1") === null) {
                localStorage.setItem("gemColor1", "#ff0000");
            }

            if (localStorage.getItem("gemColor2") === null) {
                localStorage.setItem("gemColor2", "#ff0000");
            }
            const start_time = performance.now();
            log("Loading Mods...");
            //Emotes
            function modifyVocabulary(mode, additionalEmotes) {
                const modeRegex = new RegExp(
                    `(this\\.${mode}=function\\(e\\)\\{)([\\s\\S]*?)(this\\.vocabulary=\\[)([\\s\\S]*?)(\\])`
                );
                const matchMode = ClientCode.match(modeRegex);
                if (matchMode) {
                    const prefix = matchMode[1];
                    const middleCode = matchMode[2];
                    const vocabularyPrefix = matchMode[3];
                    const existingVocabulary = matchMode[4];
                    const suffix = matchMode[5];
                    let modifiedVocabulary;
                    if (mode === "DeathMatchMode" || mode === "BattleRoyaleMode") {
                        modifiedVocabulary = additionalEmotes;
                    } else {
                        modifiedVocabulary = existingVocabulary + "," + additionalEmotes;
                    }
                    ClientCode = ClientCode.replace(
                        modeRegex
                        , `${prefix}${middleCode}${vocabularyPrefix}${modifiedVocabulary}${suffix}`
                    );
                }
            }
            //I dont suggest to edit the Keys, only test and icon!!!!
            modifyVocabulary(
                "TutorialMode"
                , '{text:"Example",icon:"®",key:"I"},{text:"Example",icon:"®",key:"J"},{text:"Me",icon:"?",key:"E"},{text:"You",icon:">",key:"D"},{text:"IM a Loser",icon:" ",key:"V"}'
            );
            modifyVocabulary(
                "SurvivalMode"
                , '{text:"Example",icon:"®",key:"I"},{text:"Example",icon:"®",key:"J"},{text:"Me",icon:"?",key:"E"},{text:"You",icon:">",key:"D"},{text:"IM a Loser",icon:" ",key:"V"}'
            );
            modifyVocabulary(
                "TeamMode"
                , '{text:"Example",icon:"®",key:"I"},{text:"Example",icon:"®",key:"J"},{text:"contribute",icon:"°",key:"L"},{text:"Hello",icon:":",key:"W"},{ text: "Bye", icon: "F", key: "H" }'
            );
            modifyVocabulary(
                "InvasionMode"
                , '{text:"Example",icon:"®",key:"T"},{text:"Example",icon:"®",key:"J"},{text:"Alien",icon:"0",key:"W"},{text:"Boss",icon:"¿",key:"V"}'
            );
            modifyVocabulary(
                "DeathMatchMode"
                , '{text:"Good Game",icon:"GG",key:"G"}'
            );
            modifyVocabulary(
                "BattleRoyaleMode"
                , '{text:"Good Game",icon:"GG",key:"G"}'
            );
            modlog("Emotes added");
            //Badges
            const badgersus = localStorage.getItem("badgergers");

            if (!badgersus) {
                console.warn(
                    `Local storage key "badgergers" not found or empty. Nothing will be loaded.`
                );
            } else {
                const badgegersData = JSON.parse(badgersus);

                if (Array.isArray(badgegersData) && badgegersData.length > 0) {
                    const newCaseTemplate = `case "{name}": this.icon = "{url}"; break;`;
                    let newCases = "";
                    let newBadges = "";

                    badgegersData.forEach(({
                        name
                        , url
                    }) => {
                        const sanitizedCaseName = name.replace(/\s/g, "");
                        newCases += newCaseTemplate
                            .replace("{name}", sanitizedCaseName)
                            .replace("{url}", url);
                        newBadges += `"${sanitizedCaseName}":"${name}",`;
                    });

                    const seasonalIndex = ClientCode.indexOf('case"seasonal":');
                    if (seasonalIndex !== -1) {
                        ClientCode =
                            ClientCode.slice(0, seasonalIndex) +
                            newCases +
                            ClientCode.slice(seasonalIndex);
                    }

                    const blankIndex = ClientCode.indexOf('blank:"Blank"');
                    if (blankIndex !== -1) {
                        newBadges = newBadges.replace(/,\s*$/, "");
                        ClientCode =
                            ClientCode.slice(0, blankIndex + 'blank:"Blank"'.length) +
                            "," +
                            newBadges +
                            ClientCode.slice(blankIndex + 'blank:"Blank"'.length);
                    }
                }
            }
            modlog("Badges added");
            const lowercaseName = localStorage.getItem("lowercaseName");
            const emotes = localStorage.getItem("Emote Capacity");
            const gemColor1 = localStorage.getItem("gemColor1");
            const gemColor2 = localStorage.getItem("gemColor2");
            const stationisten = localStorage.getItem("Custom Station Models");
            const weaponisten = localStorage.getItem("Custom Weapon Models");
            const voicechat = localStorage.getItem("voicechat");
            const blankbadge = localStorage.getItem("blankbadge");
            //main settings
            ClientCode = ClientCode.replace("LEADERBOARD", "Leaderboard");
            if (voicechat) {
                let vcscript = document.createElement("script");
                vcscript.src =
                    "https://vc.pixelmelt.dev/public/sbvc.user.js";
                document.body.appendChild(vcscript);
                modlog(`Voice Chat loaded`);
            }
            if (weaponisten === "true") {
                let script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/gh/bhpsngum/starblast-snippets@latest/CustomWeaponModels/loader.user.js";
                document.body.appendChild(script);
                modlog(`Custom Weapons added`);
            }

            if (stationisten === "true") {
                let sbibt = document.createElement("script");
                sbibt.src =
                    "https://cdn.jsdelivr.net/gh/bhpsngum/starblast-snippets@latest/CustomStationModuleModels/loader.user.js";
                document.body.appendChild(sbibt);
                modlog(`Custom Bases added`);
            }

            if (emotes) {
                ClientCode = ClientCode.replace(/>=\s*4/, `>= ${emotes}`);
                modlog(emotes + " Emotes added");
            }

            ClientCode = ClientCode.replace(/16711680/g, `"${gemColor1}"`);
            ClientCode = ClientCode.replace(/specular:16744576/g, `specular:"${gemColor2}"`);
            modlog("Crystal Color changed");

            if (lowercaseName === "true") {
                ClientCode = ClientCode.replace(/\.toUpperCase\(\)/g, "");
                ClientCode = ClientCode.replace(/text-transform:uppercase;/gim, "");
                modlog(`Lowercase added`);
            }
            if (blankbadge === "true") {
                ClientCode = ClientCode.replace(/"blank"\s*!==\s*this\.custom\.badge/, '"imbetterthanyou"!==this.custom.badge');
            }
            ClientCode = ClientCode.replace(
                "https://starblast.data.neuronality.com/img/starblast_io_logo.svg?3"
                , "https://png.pngtree.com/png-clipart/20230801/ourmid/pngtree-x-logo-icon-blue-neon-effect-for-png-image_9118534.png"
            );
            modlog(`Logo replaced`);
            const end_time = performance.now();
            log(`Loaded Mods successfully (${(end_time - start_time).toFixed(0)}ms)`);
            document.open();
            document.write(ClientCode);
            document.close();
            log("Document loaded");
            setTimeout(() => {
                stylelog("Loading Style");
                console.log("Settings loaded");

                var socialDie1 = document.querySelector(".social");

                if (socialDie1) {
                    var loveIcon = document.createElement("i");
                    loveIcon.className = "sbg sbg-menu";
                    socialDie1.appendChild(loveIcon);
                    var settingstab = null;

                    loveIcon.addEventListener("mousedown", function(event) {
                        if (!settingstab) {
                            //settings tab
                            console.log("Settings opened");
                            settingstab = document.createElement("div");
                            settingstab.id = "settings-manager";
                            settingstab.style.width = "500px";
                            settingstab.style.background = "hsla(201, 100%, 50%, 0.3)";
                            settingstab.style.borderRadius = "20px";
                            settingstab.style.padding = "40px";
                            settingstab.style.boxShadow = "0 0 10px rgba(0,0,0,.3)";
                            settingstab.style.position = "fixed";
                            settingstab.style.left = "50%";
                            settingstab.style.top = "50%";
                            settingstab.style.transform = "translate(-50%, -50%)";
                            settingstab.style.backdropFilter = "blur(5px)";
                            settingstab.style.webkitBackdropFilter = "blur(5px)";
                            settingstab.style.zIndex = "9999";
                            settingstab.style.display = "none";
                            let offsetX
                                , offsetY
                                , isDragging = false;
                            settingstab.addEventListener("mousedown", (e) => {
                                const target = e.target;

                                if (
                                    target.tagName !== "INPUT" &&
                                    target.tagName !== "BUTTON" &&
                                    target.type !== "color" &&
                                    target.type !== "range" &&
                                    target.type !== "checkbox"
                                ) {
                                    isDragging = true;
                                    offsetX =
                                        e.clientX -
                                        (settingstab.getBoundingClientRect().left +
                                            settingstab.offsetWidth / 2);
                                    offsetY =
                                        e.clientY -
                                        (settingstab.getBoundingClientRect().top +
                                            settingstab.offsetHeight / 2);
                                }
                            });

                            document.addEventListener("mousemove", (e) => {
                                if (!isDragging) return;

                                const x = e.clientX - offsetX;
                                const y = e.clientY - offsetY;

                                settingstab.style.left = `${x}px`;
                                settingstab.style.top = `${y}px`;
                            });

                            document.addEventListener("mouseup", () => {
                                isDragging = false;
                            });
                            //close button
                            var closeButtonTopRight1 = document.createElement("button");
                            closeButtonTopRight1.textContent = "X";
                            closeButtonTopRight1.style.position = "absolute";
                            closeButtonTopRight1.style.top = "10px";
                            closeButtonTopRight1.style.right = "10px";
                            closeButtonTopRight1.style.userSelect = "none";
                            closeButtonTopRight1.addEventListener("click", function(event) {
                                event.stopPropagation();
                                settingstab.remove();
                                settingstab = null;
                            });
                            settingstab.appendChild(closeButtonTopRight1);
                            //header
                            var header = document.createElement("h2");
                            header.innerText = "Client Settings";
                            header.style.userSelect = "none";
                            header.style.pointerEvents = "none";
                            settingstab.appendChild(header);
                            //br element
                            var br1 = document.createElement("br");
                            br1.style.userSelect = "none";
                            br1.style.pointerEvents = "none";
                            //Lowercase Name
                            var lwerlol = document.createElement("input");
                            lwerlol.type = "checkbox";
                            lwerlol.id = "lowercaseName";
                            var lowerlol = document.createElement("label");
                            lowerlol.htmlFor = "lowercaseName";
                            lowerlol.appendChild(document.createTextNode("Lowercase Name"));
                            lowerlol.style.userSelect = "none";
                            lowerlol.style.pointerEvents = "none";
                            //Custom Station Modules
                            var molds = document.createElement("input");
                            molds.type = "checkbox";
                            molds.id = "customstation";
                            var modls = document.createElement("label");
                            modls.htmlFor = "customstation";
                            modls.appendChild(document.createTextNode("Custom Station Models"));
                            modls.style.userSelect = "none";
                            modls.style.pointerEvents = "none";
                            //Custom Weapon Modules
                            var morlds = document.createElement("input");
                            morlds.type = "checkbox";
                            morlds.id = "customweapons";
                            var mordls = document.createElement("label");
                            mordls.htmlFor = "customweapons";
                            mordls.appendChild(document.createTextNode("Custom Weapon Models"));
                            mordls.style.userSelect = "none";
                            mordls.style.pointerEvents = "none";
                            //Voice Chat
                            var oiceat = document.createElement("input");
                            oiceat.type = "checkbox";
                            oiceat.id = "voicechat";
                            var voias = document.createElement("label");
                            voias.htmlFor = "voicechat";
                            voias.appendChild(document.createTextNode("Voice Chat"));
                            voias.style.userSelect = "none";
                            voias.style.pointerEvents = "none";
                            //Blank Badges
                            var ankages = document.createElement("input");
                            ankages.type = "checkbox";
                            ankages.id = "blankbadge";
                            var anges = document.createElement("label");
                            anges.htmlFor = "blankbadge";
                            anges.appendChild(document.createTextNode("Blank Badges"));
                            anges.style.userSelect = "none";
                            anges.style.pointerEvents = "none";
                            //Emotes
                            var ebot = document.createElement("label");
                            ebot.htmlFor = "emoteCapacity";
                            ebot.classList.add("emote-label");
                            ebot.style.userSelect = "none";
                            ebot.style.pointerEvents = "none";
                            ebot.htmlFor = "emoteCapacity";
                            ebot.appendChild(document.createTextNode("Emote Capacity:"));
                            var ebote = document.createElement("span");
                            ebote.id = "emoteCapacityValue";
                            ebote.classList.add("emote-value");
                            ebote.appendChild(document.createTextNode("1"));
                            ebote.style.userSelect = "none";
                            ebote.style.pointerEvents = "none";
                            var eboti = document.createElement("input");
                            eboti.type = "range";
                            eboti.id = "emoteCapacity";
                            eboti.min = "1";
                            eboti.max = "5";
                            eboti.classList.add("emote-slider");
                            //Gem Color
                            var gemus = document.createElement("label");
                            gemus.htmlFor = "gemColor1";
                            gemus.classList.add("color-label");
                            gemus.style.userSelect = "none";
                            gemus.style.pointerEvents = "none";
                            gemus.appendChild(document.createTextNode("Gem Color:"));
                            var gembus = document.createElement("input");
                            gembus.type = "color";
                            gembus.id = "gemColor1";
                            gembus.classList.add("color-input");
                            //Gem Color 2
                            var gemobus = document.createElement("label");
                            gemobus.htmlFor = "gemColor2";
                            gemobus.classList.add("color-label");
                            gemobus.style.userSelect = "none";
                            gemobus.style.pointerEvents = "none";
                            gemobus.appendChild(document.createTextNode("Gem Color 2:"));
                            var gembomus = document.createElement("input");
                            gembomus.type = "color";
                            gembomus.id = "gemColor2";
                            gembomus.classList.add("color-input");
                            //apply button
                            var applythng = document.createElement("button");
                            applythng.id = "applyChangesBtn";
                            applythng.innerHTML = "Apply Changes";
                            applythng.style.padding = "6px 10px";
                            applythng.style.fontSize = ".95vw";
                            applythng.style.cursor = "pointer";
                            applythng.style.margin = "5px 0 0 0";
                            applythng.style.textAlign = "center";
                            applythng.style.background =
                                "radial-gradient(ellipse at center, hsla(201, 100%, 27%,1) 0, hsla(201, 100%, 27%,.5) 150%)";
                            applythng.style.boxShadow = "0 0 6px hsla(201,100%,80%,1)";
                            applythng.style.textShadow = "0 0 7px hsla(201,100%,80%,1)";
                            applythng.style.color = "hsla(201,100%,90%,.8)";
                            applythng.style.fontFamily = "Play, Verdana";
                            applythng.style.border = "0";
                            applythng.style.borderRadius = "20px";

                            //apply things to the Settings Menu
                            settingstab.appendChild(lwerlol);
                            settingstab.appendChild(lowerlol);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(molds);
                            settingstab.appendChild(modls);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(morlds);
                            settingstab.appendChild(mordls);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(oiceat);
                            settingstab.appendChild(voias);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(ankages);
                            settingstab.appendChild(anges);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(ebot);
                            settingstab.appendChild(ebote);
                            settingstab.appendChild(eboti);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(gemus);
                            settingstab.appendChild(gembus);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(gemobus);
                            settingstab.appendChild(gembomus);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(applythng);
                            //apply Settings Menu to game
                            document.body.appendChild(settingstab);
                            settingstab.style.display = "block";
                            loadSettings();
                            attachEventListeners();
                        }
                    });
                }

                function attachEventListeners() {
                    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(function(checkbox) {
                        checkbox.addEventListener("change", function() {
                            saveSetting(checkbox.id, checkbox.checked);
                        });
                    });

                    var rangeInput = document.getElementById("emoteCapacity");
                    if (rangeInput) {
                        rangeInput.addEventListener("input", function() {
                            saveSetting("emoteCapacity", Number(rangeInput.value));
                            document.getElementById("emoteCapacityValue").textContent =
                                rangeInput.value;
                        });
                        rangeInput.value = getSettingValue("emoteCapacity");
                        document.getElementById("emoteCapacityValue").textContent =
                            rangeInput.value;
                    }

                    var colorInput = document.getElementById("gemColor");
                    if (colorInput) {
                        colorInput.addEventListener("input", function() {
                            saveSetting("gemColor", colorInput.value);
                        });
                        colorInput.value = getSettingValue("gemColor");
                    }
                    var colorInput2 = document.getElementById("gemColor1");
                    if (colorInput2) {
                        colorInput2.addEventListener("input", function() {
                            saveSetting("gemColor1", colorInput2.value);
                        });
                        colorInput2.value = getSettingValue("gemColor1");
                    }

                    var applyChangesBtn = document.getElementById("applyChangesBtn");
                    if (applyChangesBtn) {
                        applyChangesBtn.addEventListener("click", function() {
                            saveSetting();
                            location.reload();
                        });
                    }
                }

                function loadSettings() {
                    var settings = [
                        "emoteCapacity"


                        , "gemColor1"


                        , "gemColor2"


                        , "lowercaseName"


                        , "customstation"


                        , "customweapons"


                        , "voicechat"


                        , "blankbadge"


                    , ];

                    settings.forEach(function(setting) {
                        var key = getKey(setting);
                        var value = localStorage.getItem(key);
                        if (value !== null) {
                            if (setting === "emoteCapacity") {
                                document.getElementById(setting).value = value;
                                document.getElementById("emoteCapacityValue").textContent = value;
                            } else if (setting === "gemColor1") {
                                document.getElementById(setting).value = value;
                            } else if (setting === "gemColor2") {
                                document.getElementById(setting).value = value;
                            } else {
                                document.getElementById(setting).checked = JSON.parse(value);
                            }
                        }
                    });
                }

                function saveSetting(setting, value) {
                    var key = getKey(setting);
                    if (setting === "gemColor1") {
                        localStorage.setItem(key, value);
                    } else if (setting === "gemColor2") {
                        localStorage.setItem(key, value);
                    } else {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                }

                function getKey(setting) {
                    switch (setting) {
                        case "customweapons":
                            return "Custom Weapon Models";
                        case "customstation":
                            return "Custom Station Models";
                        case "emoteCapacity":
                            return "Emote Capacity";
                        case "gemColor1":
                            return "gemColor1";
                        case "gemColor2":
                            return "gemColor2";
                        case "lowercaseName":
                            return "lowercaseName";
                        case "voicechat":
                            return "voicechat";
                        case "blankbadge":
                            return "blankbadge";
                        default:
                            return setting;
                    }
                }

                function getSettingValue(setting) {
                    var key = getKey(setting);
                    var value = localStorage.getItem(key);

                    if (setting === "emoteCapacity") {
                        if (value === null) {
                            localStorage.setItem(key, 4);
                            return 4;
                        } else {
                            return Number(value);
                        }
                    } else if (setting === "gemColor") {
                        return value || "#ff0000";
                    } else if (setting === "gemColor1") {
                        return value || "#ff0000";
                    }

                    return value ? JSON.parse(value) : false;
                }


                var socialDiv = document.querySelector('.social');

                if (socialDiv) {
                    var alienIcon = document.createElement('i');
                    alienIcon.className = 'sbg sbg-alien';
                    socialDiv.appendChild(alienIcon);
                    var badgeManager = null;

                    alienIcon.addEventListener('mousedown', function(event) {
                        if (!badgeManager) {
                            console.log('Badge manager opened');
                            badgeManager = document.createElement('div');
                            badgeManager.id = 'badge-manager';
                            badgeManager.style.width = '500px';
                            badgeManager.style.background = 'hsla(201, 100%, 50%, 0.3)';
                            badgeManager.style.borderRadius = '20px';
                            badgeManager.style.padding = '40px';
                            badgeManager.style.boxShadow = '0 0 10px rgba(0,0,0,.3)';
                            badgeManager.style.position = 'fixed';
                            badgeManager.style.left = '50%';
                            badgeManager.style.top = '50%';
                            badgeManager.style.transform = 'translate(-50%, -50%)';
                            badgeManager.style.backdropFilter = 'blur(5px)';
                            badgeManager.style.webkitBackdropFilter = 'blur(5px)';
                            badgeManager.style.zIndex = '9999'; // Set a high z-index to bring it to the front
                            badgeManager.style.display = 'none';
                            let offsetX, offsetY, isDragging = false;
                            badgeManager.addEventListener('mousedown', (e) => {
                                isDragging = true;
                                offsetX = e.clientX - (badgeManager.getBoundingClientRect().left + badgeManager.offsetWidth / 2);
                                offsetY = e.clientY - (badgeManager.getBoundingClientRect().top + badgeManager.offsetHeight / 2);
                            });

                            document.addEventListener('mousemove', (e) => {
                                if (!isDragging) return;

                                const x = e.clientX - offsetX;
                                const y = e.clientY - offsetY;

                                badgeManager.style.left = `${x}px`;
                                badgeManager.style.top = `${y}px`;
                            });

                            document.addEventListener('mouseup', () => {
                                isDragging = false;
                            });
                            var closeButtonTopRight = document.createElement('button');
                            closeButtonTopRight.textContent = 'X';
                            closeButtonTopRight.style.position = 'absolute';
                            closeButtonTopRight.style.top = '10px';
                            closeButtonTopRight.style.right = '10px';
                            closeButtonTopRight.style.userSelect = 'none';

                            closeButtonTopRight.addEventListener('click', function(event) {
                                event.stopPropagation();
                                badgeManager.remove();
                                badgeManager = null;
                            });

                            badgeManager.appendChild(closeButtonTopRight);

                            var header = document.createElement('h2');
                            header.innerText = 'Badge Manager';
                            header.style.userSelect = 'none';
                            header.style.pointerEvents = 'none';
                            badgeManager.appendChild(header);

                            var addBadgeButton = document.createElement('button');
                            addBadgeButton.innerText = 'Add Badge';
                            addBadgeButton.style.userSelect = 'none';
                            addBadgeButton.onclick = function() {
                                var name = prompt('Enter a name for the badge:');
                                if (name !== null && name !== '') {
                                    var url = prompt('Enter a valid link with jpg or png:');
                                    if (url !== null && validateUrl(url)) {
                                        saveBadge(name, url);
                                        location.reload();
                                        displayBadge(name, url);
                                    } else {
                                        alert('Please enter a valid link with jpg or png.');
                                    }
                                }
                            };
                            badgeManager.appendChild(addBadgeButton);

                            document.body.appendChild(badgeManager);
                            badgeManager.style.display = 'block';
                            var savedBadges = JSON.parse(localStorage.getItem('badgergers')) || [];
                            savedBadges.forEach(function(badge) {
                                displayBadge(badge.name, badge.url);
                            });
                        }
                    });
                }

                function validateUrl(url) {
                    var regex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
                    return regex.test(url);
                }

                function saveBadge(name, url) {
                    var badges = JSON.parse(localStorage.getItem('badgergers')) || [];
                    badges.push({
                        "name": name
                        , "url": url
                    });
                    localStorage.setItem('badgergers', JSON.stringify(badges));
                }

                function displayBadge(name, url) {
                    var badge = document.createElement('div');
                    badge.style.display = 'flex';
                    badge.style.alignItems = 'center';
                    badge.style.marginBottom = '10px';

                    var img = document.createElement('img');
                    img.src = url;
                    img.style.width = '64px';
                    img.style.height = '64px';
                    img.style.userSelect = 'none';
                    img.style.pointerEvents = 'none';
                    badge.appendChild(img);

                    var badgeName = document.createElement('p');
                    badgeName.innerText = name;
                    badgeName.style.marginLeft = '10px';
                    badgeName.style.userSelect = 'none';
                    badgeName.style.pointerEvents = 'none';
                    badge.appendChild(badgeName);

                    var closeButton = document.createElement('button');
                    closeButton.innerText = 'x';
                    closeButton.style.marginLeft = 'auto';
                    closeButton.style.userSelect = 'none';
                    closeButton.style.userSelect = 'none';
                    closeButton.onclick = function() {
                        badge.remove();
                        location.reload();
                        updateLocalStorage();
                    };
                    badge.appendChild(closeButton);

                    badgeManager.appendChild(badge);
                }

                function updateLocalStorage() {
                    var badges = [];
                    document.querySelectorAll('#badge-manager div').forEach(function(badgeElement) {
                        var name = badgeElement.querySelector('p').innerText;
                        var url = badgeElement.querySelector('img').src;
                        badges.push({
                            "name": name
                            , "url": url
                        });
                    });

                    if (badges.length > 0) {
                        localStorage.setItem('badgergers', JSON.stringify(badges));
                    } else {
                        localStorage.removeItem('badgergers');
                    }
                }



                stylelog(`Css applied`);
                stylelog(`Settings added`);
                stylelog(`Badge Manager added`);
                stylelog("Style loaded successfully");
                log(`Client loaded successfully`);
            }, 30);
        }
    };
    xhr.send();
}
setTimeout(ClientLoader, 1);
