define(
	// dependencies
	[
		"utils"
	],

	function( Utils ) {
		"use strict";
		/**
		 * Instagram Feed using Basic Display API
		 *
		 * Usage:
		 * To render an Instagram embed instantiate a new InstagramFeedLoader
		 *
		 * this.instagramFeedLoader = new instagramFeedLoader();
		 *
		 * We call the init function on contenteditformview
		 * this.instagramFeedLoader.init();
		 *
		 * This will place the required script tag on the page.
		 *
		 * When you need to dynamically render an instagram embed, such as on the fly content insertion in
		 * redactor or on gallery slides, call:
		 *
		 * this.instagramFeedLoader.renderInstagram();
		 *
		 * @class instagramFeedLoader
		 */
		return function() {

			/** @lends InstagramFeedLoader */
			return {
				init : function() {

					this.test_token = 'IGQVJWLUF2cG9kWXhnZAjJlLUJvWW0xZAEVuMnBPM0RJVW9TaDVHSTVkdzJ0Y05wZAmI3OWVFYkQ2RGlmRnhtTkpGQ1NTTWRNNUY5MGZAKVEg0SmtqblVBQUJQV3VUcDk1REp4UmxZAbksxNE40ODlwdEVCMwZDZD'; 

					// Load instagram if it's not already
					if ( typeof window.insta_feed === "undefined" ) {
						this.renderInstagram();
					}
				},

				//1 step - request user login password
				requestCredentials: function(){
					//content will be provided after Submit for App analysis process.
				},

				//2 step - set the token returned from success authentication (step 1)
				authenticate: function(){
					//content will be provided after Submit for App analysis process.
				},

				//4 step - display the grid
				renderInstagram: function(){
					const url = 'https://graph.instagram.com/me/media';
					const params = {
						'access_token': this.test_token,
						'fields': 'media_url,media_type,caption,permalink,like_count'
					}

					Ajaxer.run({
						"method" : "GET",
						"url" : Utils.formUrlWithParams( url, params )
					}, function( err, data ) {
						let images = response.data;
						let grid_content = '<div class="row">';
							for(let c = 0; c < 16; c++){
								let pic = images[c];                

								if(pic.media_type !== 'IMAGE'){
									continue;
								}

								let caption = pic.caption !== null ? pic.caption : '';
								grid_content += '<div class="col-4"><a target="_target" href="'+pic.permalink+'">'
								+ '<figure>'
								+ '<img title="'+caption+'" alt="'+caption+'" src="'+pic.media_url+'" width="128" class="img-fluid lazyload">'
								+ '</figure>'
								+ '</a></div>';
							}
						grid_content += '</div>';
						$('#insta-placeholder').html(grid_content);
						//flag true or other relevant info here
						window.insta_feed = true;
					});
				}
			};
		};
	}
);
