# Theme

This document is intended to help anybody new to developing this theme.

## Fonts
The fonts currently being used in the theme are [PT Serif](https://fonts.google.com/specimen/PT+Serif?query=pt+serif) and [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro?query=source+sans+pro). Both are loaded in from [Google Fonts](https://fonts.google.com).  

If you want to change web fonts you must modify the `wp_enqueue_style('jazzclub-fonts)` function located in `functions.php`.  
The fonts are stored as variables located in `_typography` in the `variables` directory.

## Custom logo functionality
Custom logo functionality has been added to the site header. The site admin can choose to display a custom logo on their WordPress page if they would like to. This functionality is accessed via the WordPress customizer.  
Currently the logo size is set to `100px`. This can be changed in the `_header.scss` file.

## Custom header image
Custom header functionality has been added to the site header, to allow the site admin to add a header image if they would like to do so. It displays only on the home/front page.  
The header image dimensions are currently `2000px` x `850px`. These can be modified in the `custom-header.php` file.

## Menus
There are currently two menus as part of this theme. A primary menu located at the top of the page, and a secondary one located in the footer.

## Responsive layouts
To make development easier, 2 common screen sizes are stored as variables inside the `structure.scss` file. These 2 variables are used inside `@media queries` throughout the site.


