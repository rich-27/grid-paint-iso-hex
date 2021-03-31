function alterArtworkToSave(a) {
    
    if (a?.layers?.[0]?.grid === "iso-hex") {
        var artworkTagsInput = $('input[name=artwork_tags]')[0];
        var tags = artworkTagsInput.value.split(',');
        if(!tags.includes("iso-hex")) {
            tags.push("iso-hex");
            artworkTagsInput.value = tags.filter(s => s !== "").join(',');
        }
        a.layers[0].grid = "hex";
    }
    return a;
}

function alterArtworkPreparation() {
    var originalPreparation = prepareArtworkToSave;
    prepareArtworkToSave = function() { return alterArtworkToSave(originalPreparation()); }
}

document.addEventListener("DOMContentLoaded", function() {
    $('script').filter(function() { return $(this).attr('src')?.startsWith('/js/painter.js'); }).after('<script>alterArtworkPreparation()</script>');
});