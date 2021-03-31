function alterArtworkOnLoad() {
    if (this.artwork?.layers?.[0]?.grid === "hex" && $('input[name=artwork_tags]')[0].value.split(',').includes("iso-hex")) {
        this.artwork.layers[0].grid = "iso-hex";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    $('script').filter(function() { return $(this).attr('src')?.startsWith('/js/painter.js'); }).before('<script>alterArtworkOnLoad()</script>');
});