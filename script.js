// ==UserScript==
// @name         BETTER PORTAINER
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make portainer great again
// @author       Radhamante
// @match        https://localhost:9443/
// @match        https://vectochronix.io/docker/
// @icon         https://vectochronix.io/docker/29d4ee6d4a5c786588a7.svg
// @grant        none
// ==/UserScript==

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const icon = `<svg class="MonButtonRestart" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`;
const createButton = quick_action_list => {
  quick_action_list.forEach(quick_action => {
    const button = document.createElement("span");
    button.innerHTML = icon;
    button.style = "cursor: pointer;color: #337ab7";

    button.addEventListener("click", () => {
      console.log(button);
      const row = quick_action.closest("tr");
      console.log(row);
      const input = row.querySelector(".lt-selection input");
      input.click();
      const restartButton = document.querySelector(".actionBar button:nth-child(4)");
      restartButton.click();
      input.click();
    });

    quick_action.append(button);
  });
};

(function () {
  "use strict";

  [].slice.call(document.styleSheets).filter(obj => {
    const index = [].slice.call(obj.cssRules).findIndex(rule => {
      return rule.selectorText == ".widget .widget-body table tbody *";
    });
    if (index != -1) {
      obj.deleteRule(index);
    }
  });

  var styles = `
      tr .lt-selection input, .md-checkbox label::before, .md-checkbox input {
      width:25px !important;
      height:25px !important
      }
      .app-react-docker-containers-components-ContainerQuickActions-ContainerQuickActions-module__root svg,
      .app-docker-components-container-quick-actions-ContainerQuickActions-module__root i,
      .app-docker-components-container-quick-actions-ContainerQuickActions-module__root svg{
          font-size: 16px !important;
      }
      .widget .widget-body table tbody * {
  font-size: 13px
      }
  `;

  var styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.append(styleSheet);

  let quick_action_list;

  const t = setInterval(() => {
    /*const option = document.querySelector('.limitSelector select')
              if(option){
                  option.value="100";
                  option.dispatchEvent(new Event("change"))
              }*/

    quick_action_list = document.querySelectorAll(".app-react-docker-containers-components-ContainerQuickActions-ContainerQuickActions-module__root, .app-docker-components-container-quick-actions-ContainerQuickActions-module__root");
    if (quick_action_list.length != 0) {
      if (!document.querySelector(".MonButtonRestart")) {
        createButton(quick_action_list);
      }
    }
  }, 500);

  // Your code here...
})();
