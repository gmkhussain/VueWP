<?php

function get_user_roles($object, $field_name, $request) {
    return get_userdata($object['id'])->roles;
  }
  
  add_action('rest_api_init', function() {
    register_rest_field('user', 'roles', array(
      'get_callback' => 'get_user_roles',
      'update_callback' => null,
      'schema' => array(
        'type' => 'array'
      )
    ));
  });

  
?>