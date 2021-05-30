# Theme
This custom theme was based off of the starter Underscores theme.

## Fonts
The fonts used in the theme can be found in the `functions.php` file. The body uses PT Serif and the headings use Source Sans Pro as well as some custom heading sizes.
- To change the fonts of the theme, go to the `functions.php` file and find the `wp_enqueue_style(jazzclub-fonts)`, change the link there with another google fonts link to the new desired fonts. 

## Custom logo functionality
Custom functionality was added to the site logo. 
- The site's title and description will automatically adjust to accomodate any changes. 

## Header
The header has been given functionality for a custom image .
- The site admin can choose to add an optimal image to the header.
- The header image has been set to sit below the header.
- The header image has set dimensions of 2000px x 850px.

## Footer
A footer was put at the bottom of the site.
- The menu has also been put into the footer for convenience.

## Responsive layouts
Responsive layouts were added to the theme.
- Two variables have been created to be used in media queries. They refer to common screen sizes used on the web.
- These variables can be found in `sass` -> `abstracts` -> `variables` -> `_structure.scss`.
