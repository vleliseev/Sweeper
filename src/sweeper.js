
/**
 * listen for context menu event
 * and set nodeToClean to currently selected node
 * 
 * @param {Event} e 
 */
function rightClickListener(e) {
    nodeToClean = e.target;
}


/**
 * recursively find element with 
 * filter property and set it 
 * to none to make element(s) visible
 * 
 * @param {Element} element 
 */
function wash(element) {
    // computed style of current element 
    let style = window.getComputedStyle(element);
    
    if (style['filter'] && style['filter'] !== 'none') {
        
        // set filter property value to 'none' if it
        // is not empty or 'none' already
        element.style.filter = 'none';
    } else {

        // check parent node for filter property
        wash(element.parentElement);
    }
}


/**
 * remove selected element from page
 * 
 * @param {Element} element 
 */
function erase(element) {
    element.parentElement.removeChild(element);
}


/**
 * listen for message from background script
 * and wash/erase selected element
 * 
 * @param {Object} message 
 */
function onMessage(message) {

    if (message.action === "wash") {
        wash(nodeToClean);

    } else if (message.action === "erase") {
        erase(nodeToClean);

    }
}

/**
 * last element that was selected
 * with context menu event (right click)
 * 
 * @type {Element}
 */
var nodeToClean;

console.log('executed');
document.addEventListener('contextmenu', rightClickListener);
try {
browser.runtime.onMessage.addListener(onMessage);
} catch(err) {
    console.log(err);
}