# Iso Grid for Grid Paint

This script adds the relevant functions to draw and use an iso-grid to Grid Paint (https://www.grid-paint.com)

## Setup

Install the Resource Override extension from your browser's relevant addon/extension store. See [the project and readme on Github](https://github.com/kylepaulsen/ResourceOverride) for details.

Add two tab groups with the following configurations respectively: 
* For `*grid-paint.com/*`, add:
    * An Inject File rule with the url parameter `/js/grid-iso-hex.js`. Select File Type: `js` and Inject into: `Body`. Add the contents of the file [grid-iso-hex.js](grid-iso-hex.js) to the Edit File dialog.
    * An Inject File rule with the url parameter `/js/iso-hex-save.js`. Select File Type: `js` and Inject into: `Body`. Add the contents of the file [iso-hex-save.js](iso-hex-save.js) to the Edit File dialog.
    * An Inject File rule with the url parameter `/js/iso-hex-load.js`. Select File Type: `js` and Inject into: `Body`. Add the contents of the file [iso-hex-load.js](iso-hex-load.js) to the Edit File dialog.
* For `*grid-paint.com/new-image`, add an Inject File rule with the url parameter `/js/iso-hex-creator.js`. Select File Type: `js` and Inject into: `Body`. Add the contents of the file [iso-hex-creator.js](iso-hex-creator.js) to the Edit File dialog.

<img src="https://i.imgur.com/tQtBf1F.png">

Navigate to [Grid Paint's New Image page](https://www.grid-paint.com/new-image), and you should see the new iso-hex image type, as below.

<img src="https://i.imgur.com/FU5cYwn.png">

Click on the new iso-hex image to navigate to [a new iso-hex image](https://www.grid-paint.com/painter?artwork_width=2000&artwork_height=2000&cell_size=24&artwork_grid=iso-hex). This can also be done manually by navigating to previous the url directly, as detailed below:

```
https://www.grid-paint.com/painter?artwork_width=2000&artwork_height=2000&cell_size=24&artwork_grid=iso-hex
```

The resulting editor should look something like this!

<img src="https://i.imgur.com/j53Ctna.png">

## How It Works

The `GridIsoHex` class in [grid-iso-hex.js](grid-iso-hex.js) is registered as a new grid handler for `iso-hex` grids in the `gridFactory` dictionary, enabling the existing `artwork_grid` URL parameter with the value `iso-hex` to use `GridIsoHex` to draw and manage the new grid.

The grid creation and drawing all happens through this new class, meaning you can skip the `*grid-paint.com/new-image` Inject File rule mentioned above if you only create new images by manually navigate to the URL.

It appears the `iso-hex` was originally intended to be a part of the site or was an option that was subsequently removed, given comments in `grids.js` reference an `iso-hex` grid.

## Changes

* Implemented saving and loading via hotswapping the `grid` property in the first layer of `artwork`. `iso-hex` grids are now stored as `hex` grids and have the tag `iso-hex` appended. Loading checks for the `iso-hex` tag and, if present, hotswaps the saved grid from `hex` to `iso-hex`.
* Swapped registering the iso-hex grid on the `DOMContentLoaded` event for programmatically injecting an additional script element to ensure the grid is loaded after `/js/grids.js`, which initialises the `gridsFactory` dictionary.  This should fix an intermittent bug causing iso-hex grids not to render.
* Redirecting `grid-hex.js` to the Resource Override file has been replaced with loading in [grid-iso-hex.js](grid-iso-hex.js). This was previously required as I was overriding `hex` grid creation during initial development, but now `iso-hex` is used as the grid type and no functions are being overriden, so it can be moved to it's own file and registered on the `DOMContentLoaded` event.

## Known Issues

* Saving does not currently seem to work. My theory is that this is due to the server not supporting the `iso-hex` grid value. I think I need to hook into the save dialog form submission to persist it as a `hex` grid, and then catch image loading and swap out the grid type. The iso-hex grid type could potentially be stored in a tag.

## Authors

I made this to facilitate easy design prototyping for the game Opus Magnum. All rights and credit for Grid Paint belong to Vlad Alexeev. Vlad, feel free to use my code to add official `iso-hex` support if desired!
