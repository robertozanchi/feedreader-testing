/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application,
 * which are contained within the $() function.
 */

$(function() {
    // Test suite about the RSS feeds definitions
    describe('RSS Feeds', function() {
        // Test to make sure that the allFeeds variable has been defined and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test to ensure that feeds have a URL defined and that the URL is not empty
        it('have valid URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Test to ensure that feeds have a name defined and that the name is not empty
        it('all have valid names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    // Test suite about the menu elements 
    describe('The menu', function() {
        // Test that ensures a menu element is hidden by default
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Test that ensures the menu changes visibility when the menu icon is clicked
        it('changes visibility when the menu icon is clicked', function() {
            menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    // Test suite about initial entries in feed container
    describe('Initial Entries', function() {
         // Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container         
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('have at least one .entry element in feed container', function() {
            expect($('.feed.entry').children().length).not.toBe(0);
        });
    });

    // Test suite about new feed selection
    describe('New Feed Selection', function() {
        // Write a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes
        var feedBefore;
        var feedAfter;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedBefore = $('.feed').html();
                loadFeed(1, function() {
                    feedAfter = $('.feed').html();
                    done();
                });
            });
        });

        it('ensures that feed content changes', function() {
            expect(feedAfter).not.toEqual(feedBefore);
        });
    });

}());