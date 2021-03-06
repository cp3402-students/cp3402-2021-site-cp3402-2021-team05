<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jazzclub
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'jazzclub'); ?></a>
    
    <header id="masthead" class="site-header">
        <div class="site-branding">

            <div class="custom-logo">
                <?php the_custom_logo(); ?>
            </div>

            <div class="site-branding-text">
                <?php
                if (is_front_page() && is_home()) :?>
                    <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
                                              rel="home"><?php bloginfo('name'); ?></a></h1>
                <?php
                else :
                    ?>
                    <p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
                                             rel="home"><?php bloginfo('name'); ?></a></p>
                <?php
                endif;
                $jazzclub_description = get_bloginfo('description', 'display');
                if ($jazzclub_description || is_customize_preview()) :
                    ?>
                    <p class="site-description"><?php echo $jazzclub_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        ?></p>
                <?php endif; ?>
            </div><!-- .site-branding-text class -->
        </div><!-- .site-branding -->

        <nav id="site-navigation" class="main-navigation">
            <button class="menu-toggle" aria-controls="primary-menu"
                    aria-expanded="false"><?php esc_html_e('Menu', 'jazzclub'); ?></button>
            <?php
            wp_nav_menu(
                array(
                    'theme_location' => 'menu-1',
                    'menu_id' => 'primary-menu',
                )
            );
            ?>
        </nav><!-- #site-navigation -->
    </header><!-- #masthead -->

    <div class="header-image-container">
        <?php if (get_header_image() && is_front_page()) : ?>
            <figure class="header-image">
                <img src="<?php header_image(); ?>" width="<?php echo esc_attr(get_custom_header()->width); ?>"
                     height="<?php echo esc_attr(get_custom_header()->height); ?>" alt="Header Image"
            </figure> <!-- .header-image class -->
        <?php endif; // End header image check ?>
    </div>

