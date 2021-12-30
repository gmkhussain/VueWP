<?php
// only users who have published posts are returned by the request
add_filter('rest_user_query', 'remove_has_published_posts_from_api_user_query', 10, 2);
function remove_has_published_posts_from_api_user_query($prepared_args, $request)
{
    unset($prepared_args['has_published_posts']);
    return $prepared_args;
}
