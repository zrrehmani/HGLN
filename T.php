$data = wpgetapi_endpoint( 'Json_holder', 'POSTS', array('debug' => false) );
foreach ($data as $result) {

    echo $result['id'];
	echo $result['title'];
    echo "<br>";
	
}


function Get_All_Posts(){
	$args = array(
'post_type'=> 'post',
'orderby'    => 'ID',
'post_status' => 'publish',
'order'    => 'DESC',
'posts_per_page' => -1 // this will retrive all the post that is published 
);
	// The Query
$the_query = new WP_Query( $args );

// The Loop
if ( $the_query->have_posts() ) {
	echo '<ul>';
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
		echo '<li>' . get_the_title() . '</li>';
	}
	echo '</ul>';
} else {
	// no posts found
}
/* Restore original Post Data */
wp_reset_postdata();
}



function PostCreator(
		$name      = 'AUTO POST',
		$type      = 'post',
		$content   = 'DUMMY CONTENT',
		$category  = array(1,2),
		$template  = NULL,
		$author_id = '1',
		$status    = 'publish'
	) {

		define( POST_NAME, $name );
		define( POST_TYPE, $type );
		define( POST_CONTENT, $content );
		define( POST_CATEGORY, $category );
		define( POST_TEMPLATE, '' );
		define( POST_AUTH_ID, $author_id );
		define( POST_STATUS, $status );

		if ( $type == 'page' ) {
			$post      = get_page_by_title( POST_NAME, 'OBJECT', $type );
			$post_id   = $post->ID;
			$post_data = get_page( $post_id );
			define( POST_TEMPLATE, $template );
		} else {
			$post      = get_page_by_title( POST_NAME, 'OBJECT', $type );
			$post_id   = $post->ID;
			$post_data = get_post( $post_id );
		}

		function hbt_create_post() {
			$post_data = array(
				'post_title'    => wp_strip_all_tags( POST_NAME ),
				'post_content'  => POST_CONTENT,
				'post_status'   => POST_STATUS,
				'post_type'     => POST_TYPE,
				'post_author'   => POST_AUTH_ID,
				'post_category' => POST_CATEGORY,
				'page_template' => POST_TEMPLATE
			);
			wp_insert_post( $post_data, $error_obj );
		}

		if ( ! isset( $post ) ) {
			add_action( 'admin_init', 'hbt_create_post' );
			return $error_obj;
		}

	}


Get_All_Posts();