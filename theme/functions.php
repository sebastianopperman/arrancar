<?php

function add_styles(){
  wp_enqueue_style('main_css', get_template_directory_uri() . '/dist/css/bundle.css');
}
add_action('wp_enqueue_scripts', 'add_styles');

function add_scripts(){
  wp_deregister_script('wp-embed.min.js');
  wp_deregister_script('wp-embed');
  wp_deregister_script('embed');
  wp_enqueue_script('bundle', get_template_directory_uri() . '/dist/js/bundle.js', array(), '1.0.1', true);
  wp_localize_script( 'bundle', 'BlogInfo', array('url' => get_bloginfo('template_directory').'/', 'site' => get_bloginfo('wpurl')));
}
add_action('wp_enqueue_scripts', 'add_scripts');