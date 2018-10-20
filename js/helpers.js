/* Helpers.js
 *
 * This is not a spec file but instead helps utilize the
 * Handlerbars templating engine used... and also allows for
 * some neat spec tests to be created (i.e. limiting the RSS feed
 * item's description string)
 */


(function() {
  'use strict';

  /* Register a handlebars.js helper called content__excerpt
   * to format the content string to under a specified character limit. (90)
   */
  Handlebars.registerHelper('content__excerpt', function() {

    // Use Handlebars utility to sanitize the incoming content/data
    var desc = Handlebars.escapeExpression(this.description);

    // Check if description exists
    if (!desc || desc.length === 0) {

      // If not then return some alternative text
      return new Handlebars.SafeString('No description. Click title to read!');

    } else {

      // Shorten the description down
      var descToExcerpt = desc.substring(0, 90);

      // Return formatted string with an appended ellipses
      return new Handlebars.SafeString(descToExcerpt + '…');

    }
  });


  /* Register a handlebarsjs helper called pubdate__time_el
   * to formate the publishing date of the entry.
   */
  Handlebars.registerHelper('pubdate__time_el', function() {

    // Use the `this` to get contextual pubDate value
    var pubDate = Handlebars.escapeExpression(this.pubDate);

    // Convert to a JavaScript Built-in Date Object
    var pubDateToDate = new Date(pubDate);

    // Format the date as desired using a 3rd party library called moment.js
    var pubDateToMoment = moment(pubDateToDate).format('MMM Do YYYY');

    // Return the published date using the semantic HTML5 `time` element
    return new Handlebars.SafeString(
      // example:
      // '<time datetime="2016-05-12T12:00">May 12, 2016</time>'
      '<time datetime="' + pubDate + '">' + pubDateToMoment + '</time>'

      );

  });

})();