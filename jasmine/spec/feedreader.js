/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined and are not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 it('have URL defined and are not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});         
        });		

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */		 
		 it('have name defined and are not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});   
        });
    });

    /* A new test suite named "The menu" */
	describe('The menu', function() {		

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		var $myBody = $('body'), $myMenuIcon = $('.menu-icon-link');
		
		it('is hidden by default', function() {
			expect($myBody.hasClass('menu-hidden')).toBeTruthy();
		});		

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('changes visibility when the menu icon is clicked', function() {
			$myMenuIcon.click();
			expect($myBody.hasClass('menu-hidden')).toBeFalsy();
			
			$myMenuIcon.click();
			expect($myBody.hasClass('menu-hidden')).toBeTruthy();			
		});		  
	});	

    /* A new test suite named "Initial Entries" */
	describe('Initial Entries', function() {		
	
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */	 		 
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});		
		
		it('have at least one entry', function(done) {
			var $numEntries = $('.feed .entry').length;			
			expect($numEntries).toBeGreaterThan(0);
			done();
		});
	});	

    /* A new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		var $currentContent;
		
		beforeEach(function(done) {	
			loadFeed(0, function() {				
				$currentContent = $('.feed').html();	
				done();
			});									
		});
		
		it('changes content when a new feed is loaded', function(done) {
			loadFeed(1, function() {
				var $newContent = $('.feed').html();
				expect($currentContent).not.toBe($newContent);
				done();
			});				
		});
	});
}());