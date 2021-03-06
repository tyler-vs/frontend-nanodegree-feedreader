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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL property in each object (that represents an RSS feed) that is defined and not empty', function() {

            // Use a for..of loop to loop through the array of feeds
            // and test the url object property value
            for (const feed of allFeeds) {

                // Should be defined
                expect(feed.url).toBeDefined();

                // Should not be an empty string
                expect(feed.url.toString()).not.toBe('');

                // EXTRA: since empty strings are considered a "falsy" value
                expect(feed.url).not.toBeFalsy();

                // EXTRA: Regex for valid URLS
                expect(feed.url).toMatch(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a NAME property in each object (that represents an RSS feed) that is defined and not empty', function() {

            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.toString()).not.toBe('');
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            // Check HTML body element for .menu-hidden class
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should change visibility when the menu icon is clicked', function() {

            var menuBtn = document.querySelector('.menu-icon-link');

            // Tigger click event on menu button/link
            menuBtn.click();

            // Check for active class on body element
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            // Tigger click event on menu button/link
            menuBtn.click();

            // Check for active class on body element
            expect(document.body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        // Before each spec test
        beforeEach(function(done) {

            // Reset the .feed container to have no child .entry elements
            var feedEl = document.querySelector('.feed');
            feedEl.innerHTML = '';

            loadFeed(1, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it('should complete asynchronous work, that there is at least a single .entry in the .feed container', function(done) {

            // Using a CSS-like selector, only .entry elements that are
            // children/descendant of then .feed element will return
            // a nodelist
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(1);

            done();
        });
    });

    // IDEA: Nest the above test suite with this one because they
    // have similar setup? This perhaps could ensure we abide by
    // no suite being dependent on another test suite.

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        var firstFeed;
        var secondFeed;

        // Setup initialization for test spec
        beforeEach(function(done) {

            // Emptry feed conainer in case any entries exist
            // $('.feed').empty();
            document.querySelector('.feed').innerHTML = '';

            // Load new feed
            loadFeed(1, function() {

                firstFeed = document.querySelectorAll('.feed .entry-link');
                firstFeed = [...firstFeed];
                // console.log('FOO');
                // console.log(firstFeed);

                // done();

                // $('.feed').empty();
                // NOTE: We do not have to remove any elements from the
                // feed again because the loadFeed takes care of that.
                // Just one


                // Nesting our second feed load inside the first feed load
                // this makes it more predicatable that this second load
                // will occur before the first??
                loadFeed(2, function() {

                    // Save nodelist of second feed
                    secondFeed = document.querySelectorAll('.feed .entry-link');
                    // Turn the nodeList into an array for easier to work with
                    // when comparing dom attributes (i.e. node[i].id)
                    secondFeed = [...secondFeed];

                    // console.log('BAR');
                    // console.log(secondFeed);

                    done();
                });
            });
        });


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it ('have new feed entries that are different from the existing/pre-loaded entries after loading a new feed', function(done) {

            // Loop through the first and second feed and compare
            // array elements that represent entries fro, each feed,
            // feeds can be of varying length so using only one feeds
            // length should suffice as a test pool
            var firstFeedLen = firstFeed.length;
            var secondFeedLen = secondFeed.length;
            var shortestFeed = Math.min(firstFeedLen, secondFeedLen);

            // console.log(`the shortest feed contained: ${shortestFeed} entries.`);

            // IDEA: ternary or using Math.min to find the min number
            // between the wo feeds entries lengths.
            // (firstFeedLen <= secondFeedLen) ? firstFeedLen : secondFeedLen;
            for (let i = 0, max = shortestFeed; i < max; i++) {
                // console.log(`ONE: ${firstFeed[i].href} and TWO: ${secondFeed[i].href}`);
                // Check if they have different href values
                expect(firstFeed[i].href).not.toEqual(secondFeed[i].href);
            }

            // Finish our async spec test
            done();
        });


    });
}());
