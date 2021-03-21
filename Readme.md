# Iso Grid for Grid Paint

This script adds the relevant functions to draw and use an iso-grid to Grid Paint (https://www.grid-paint.com)

## Setup

Install the Resource Override extension from your browser's relevant addon/extension store. See [the project and readme on Github](https://github.com/kylepaulsen/ResourceOverride) for details.

Add two tab groups with the following configurations respectively: 
* For `*grid-paint.com/*`, add a URL -> File rule with the url parameter `*/js/grid-hex.js`. Add the contents of the file [grid-hex.js](grid-hex.js) to the Edit File dialog.
* For `*grid-paint.com/new-image`, add an Inject File rule, selecting File Type: `js` and Inject into: `Body`. Add the contents of the file [iso-hex-creator.js](iso-hex-creator.js) to the Edit File dialog.

<img src="https://i.imgur.com/gpxuOCf.png">

Navigate to [Grid Paint's New Image page](https://www.grid-paint.com/new-image), and you should see the new iso-hex image type, as below.

<img src="https://i.imgur.com/FU5cYwn.png">

Click on the new iso-hex image to navigate to [a new iso-hex image](https://www.grid-paint.com/painter?artwork_width=2000&artwork_height=2000&cell_size=24&artwork_grid=iso-hex). This can also be done manually by navigating to previous the url directly, as detailed below:

```
https://www.grid-paint.com/painter?artwork_width=2000&artwork_height=2000&cell_size=24&artwork_grid=iso-hex
```

The resulting editor should look something like this!

<img src="https://i.imgur.com/j53Ctna.png">

## How It Works

The `GridIsoHex` class registered in [grid-hex.js](grid-hex.js) uses the same URL parameter mechanic, the `artwork_grid` parameter, as the existing grid types. It registers a new grid handler in the `gridFactory` variable, enabling the use of the grid identifier `iso-hex` to draw and manage the new grid.

The grid creation and drawing all happens through this new class, meaning you can skip the `*grid-paint.com/new-image` Inject File rule mentioned above if you only create new images by manually navigate to the URL.

The [grid-hex.js](grid-hex.js) file also contains the content of the original file after the new `iso-hex` class to ensure the exisitng `hex` grid still works.

It appears the `iso-hex` was originally intended to be a part of the site or was an option that was subsequently removed, given comments in `grids.js` reference an `iso-hex` grid.

## Known Issues

* Saving does not currently seem to work. My theory is that this is due to the server not supporting the `iso-hex` grid value. I think I need to hook into the save dialog form submission to persist it as a `hex` grid, and then catch image loading and swap out the grid type. The iso-hex grid type could potentially be stored in a tag.

## Authors

I made this to facilitate easy design prototyping for the game Opus Magnum. All rights and credit for Grid Paint belong to Vlad Alexeev. Vlad, feel free to use my code to add official `iso-hex` support if desired!
