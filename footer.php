<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jazzclub
 */

?>

<footer id="colophon" class="site-footer">

    <nav class="footer-menu">
        <?php
        wp_nav_menu(array('theme_location' => 'footer'));
        ?>
    </nav><!-- .footer-menu class -->

    <div class="site-info">
        <a href="<?php echo esc_url(__('https://wordpress.org/', 'jazzclub')); ?>">
            <?php
            /* translators: %s: CMS name, i.e. WordPress. */
            printf(esc_html__('Proudly powered by %s', 'jazzclub'), 'WordPress');
            ?>
        </a>
        <span class="sep"> | </span>
        <?php
        /* translators: 1: Theme name, 2: Theme author. */
        printf(esc_html__('Theme: %1$s by %2$s.', 'jazzclub'), 'jazzclub', '<a href="https://github.com/cp3402-students/cp3402-2021-site-cp3402-2021-team05">CP3402 Team 05</a>');
        ?>
    </div><!-- .site-info -->
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
