/** Time to wait for the page to settle, increase if issues happen **/
const SETTLE_TIMEOUT = 100;
/** The index of the sorting option to use, update if that changes/you want to change sorting **/
const SORT_BY_NAME_INDEX = 2;
/** The index of the master duel packs in the pack list, update if that changes **/
const MASTER_DUEL_PACK_INDEX = 2;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollToBottom() {
    var height = 0;
    while (height != document.body.scrollHeight) {
        height = document.body.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);

        // Scrolling takes a bit of time, so we need to wait.
        await timeout(SETTLE_TIMEOUT);
    }

    // Wait for the page to settle before continuing
    await timeout(SETTLE_TIMEOUT);
}

async function pickAndSortProduct() {
    let changeProductEvent = new Event("change");
    let productButton = document.getElementById("packtype_select");
    productButton.selectedIndex = MASTER_DUEL_PACK_INDEX;
    productButton.dispatchEvent(changeProductEvent);

    let sortEvent = new Event("change");
    let sortButton = document.getElementById("packtype_sort");
    sortButton.selectedIndex = SORT_BY_NAME_INDEX;
    sortButton.dispatchEvent(sortEvent);

    await timeout(SETTLE_TIMEOUT);
}

async function writePackNumbers() {
    let packSelection = document.getElementById("pack-selection");
    let packs = packSelection.getElementsByClassName("card");
    for (let index = 0; index < packs.length; index++) {
        let number = document.createElement("span");
        number.innerHTML = index + 1;

        pack = packs.item(index);

        pack.prepend(number);
    }

    await timeout(SETTLE_TIMEOUT);
}

async function main() {
    await pickAndSortProduct();
    await scrollToBottom();
    await writePackNumbers();

    alert("Done!");
}

main();
