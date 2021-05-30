(function ($) {
    // remove unwanted style so that images and captions center align on small screens.
    $('figure.wp-caption.aligncenter').removeAttr('style')
    $('img.aligncenter').wrap('<figure class="centered-image" />')
})(jQuery)
