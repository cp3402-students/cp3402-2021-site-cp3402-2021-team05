/* global jazzclubScreenReaderText */
/**
 * This navigation file has been copied from the twentyseventeen theme.
 *
 * Contains handlers for navigation and widget area.
 */

(function( $ ) {
    var masthead, menuToggle, siteNavigation;

    function initMainNavigation( container ) {

        // Add dropdown toggle that displays child menu items.
        var dropdownToggle = $( '<button />', { 'class': 'dropdown-toggle', 'aria-expanded': false })
            .append( $( '<span />', { 'class': 'dropdown-symbol', text: '+' }) )
            .append( $( '<span />', { 'class': 'screen-reader-text', text: jazzclubScreenReaderText.expand }) );

        container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( dropdownToggle );

        container.find( '.dropdown-toggle' ).click( function( e ) {
            var _this = $( this ),
                screenReaderSpan = _this.find( '.screen-reader-text' );
            dropdownSymbol = _this.find( '.dropdown-symbol' );
            dropdownSymbol.text( dropdownSymbol.text() === '-' ? '+' : '-');

            e.preventDefault();
            _this.toggleClass( 'toggled-on' );
            _this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

            _this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );

            screenReaderSpan.text( screenReaderSpan.text() === jazzclubScreenReaderText.expand ? jazzclubScreenReaderText.collapse : jazzclubScreenReaderText.expand );
        });
    }

    initMainNavigation( $( '.main-navigation' ) );

    masthead       = $( '#masthead' );
    menuToggle     = masthead.find( '.menu-toggle' );
    siteNavigation = masthead.find( '.main-navigation > div > ul' );

    // Enable menuToggle.
    (function() {

        // Return early if menuToggle is missing.
        if ( ! menuToggle.length ) {
            return;
        }

        // Add an initial values for the attribute.
        menuToggle.add( siteNavigation ).attr( 'aria-expanded', 'false' );

        menuToggle.on( 'click.jazzclub', function() {
            $( siteNavigation.closest( '.main-navigation' ), this ).toggleClass( 'toggled-on' );

            $( this )
                .add( siteNavigation )
                .attr( 'aria-expanded', $( this ).add( siteNavigation ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
        });
    })();

    // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
    (function() {
        if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
            return;
        }

        // Toggle `focus` class to allow submenu access on tablets.
        function toggleFocusClassTouchScreen() {
            if ( 'none' === $( '.menu-toggle' ).css( 'display' ) ) {

                $( document.body ).on( 'touchstart.jazzclub', function( e ) {
                    if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
                        $( '.main-navigation li' ).removeClass( 'focus' );
                    }
                });

                siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' )
                    .on( 'touchstart.jazzclub', function( e ) {
                        var el = $( this ).parent( 'li' );

                        if ( ! el.hasClass( 'focus' ) ) {
                            e.preventDefault();
                            el.toggleClass( 'focus' );
                            el.siblings( '.focus' ).removeClass( 'focus' );
                        }
                    });

            } else {
                siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' ).unbind( 'touchstart.jazzclub' );
            }
        }

        if ( 'ontouchstart' in window ) {
            $( window ).on( 'resize.jazzclub', toggleFocusClassTouchScreen );
            toggleFocusClassTouchScreen();
        }

        siteNavigation.find( 'a' ).on( 'focus.jazzclub blur.jazzclub', function() {
            $( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
        });
    })();

    // Add the default ARIA attributes for the menu toggle and the navigations.
    function onResizeARIA() {
        if ( 'block' === $( '.menu-toggle' ).css( 'display' ) ) {

            if ( menuToggle.hasClass( 'toggled-on' ) ) {
                menuToggle.attr( 'aria-expanded', 'true' );
            } else {
                menuToggle.attr( 'aria-expanded', 'false' );
            }

            if ( siteNavigation.closest( '.main-navigation' ).hasClass( 'toggled-on' ) ) {
                siteNavigation.attr( 'aria-expanded', 'true' );
            } else {
                siteNavigation.attr( 'aria-expanded', 'false' );
            }
        } else {
            menuToggle.removeAttr( 'aria-expanded' );
            siteNavigation.removeAttr( 'aria-expanded' );
            menuToggle.removeAttr( 'aria-controls' );
        }
    }

    $( document ).ready( function() {
        $( window ).on( 'load.jazzclub', onResizeARIA );
        $( window ).on( 'resize.jazzclub', onResizeARIA );
    });

})( jQuery );
