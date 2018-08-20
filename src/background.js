/**
 * Object of item in browser context menu
 * 
 * @type {Object}
 */
const mainMenuItem = {
    id: 'sweeper-addon',
    title: 'Sweeper',
    contexts: ['all']
}

/**
 * Object of dialog item that appears
 * on 'Sweeper' context menu item selection;
 * Releases washing of element(s)
 * 
 * @type {Object}
 */
const cleanDialogItem = {
    parentId: 'sweeper-addon',
    id: 'sweeper-clean',
    title: 'Wash',
    icons: { "16": "res/wash.svg" },
    contexts: ['all']
}

/**
 * Object of dialog item that appears
 * on 'Sweeper' context menu item selection;
 * Releases removing of selected element
 * 
 * @type {Object}
 */
const eraseDialogItem = {
    parentId: 'sweeper-addon',
    id: 'sweeper-erase',
    title: 'Erase',
    icons: { "16": "res/erase.svg" },
    contexts: ['all']
}


/**
 * Listen for context menu items click
 * and send message to content script (sweeper.js) 
 * with selected action
 * 
 * @param {OnClickData} clicked 
 * @param {Tab} tab 
 */
function contextMenuListener(clicked, tab) {
    if (clicked.menuItemId === "sweeper-clean") {
        browser.tabs.sendMessage(tab.id, { action: "wash" });
    } else if (clicked.menuItemId === "sweeper-erase") {
        browser.tabs.sendMessage(tab.id, { action: "erase" });
    }
}

browser.contextMenus.create(mainMenuItem);
browser.contextMenus.create(cleanDialogItem);
browser.contextMenus.create(eraseDialogItem);
browser.contextMenus.onClicked.addListener(contextMenuListener);
browser.tabs.executeScript({ file: "sweeper.js"})
    .catch((err) => console.log(err));