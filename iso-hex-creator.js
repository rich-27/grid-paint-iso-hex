function addIsoHexGridSelector(){
    var hexGrid = document.getElementById('hex');
    var hexGridContainer = hexGrid.parentElement;
    var isoHexGridContainer = hexGridContainer.cloneNode(true);
    isoHexGrid = isoHexGridContainer.firstElementChild;
    isoHexGrid.id = 'iso-hex';
    hexGridContainer.insertAdjacentElement("afterend",isoHexGridContainer);
    console.log('Created iso-hex element');
}

document.addEventListener("DOMContentLoaded", addIsoHexGridSelector);
