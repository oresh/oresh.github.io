"use strict";
var book_name = document.querySelectorAll('h1')[0].innerText;
var book_series = document.querySelectorAll('.BookPageTitleSection__title h3')[0].innerText;
var book_img = document.querySelectorAll('.BookCover__image img')[0].getAttribute('src');
var book_url = location.href;
var book_authors = document.querySelectorAll('.ContributorLinksList .ContributorLink__name');
var authors_list = [];
for (var i = 0; i < book_authors.length; i++) {
    authors_list.push(book_authors[i].innerText);
}
var book_author = authors_list.join(', ');
var out = [];
out.push("<div class=\"book\" data-visible=\"true\" data-labels=\"\">");
out.push("    <img src=\"".concat(book_img, "\" alt=\"\" class=\"book-cover\">"));
out.push("    <div class=\"book-hint\">");
out.push("        <p class=\"book-series\">".concat(book_series, "</p>"));
out.push("        <p class=\"book-name\">".concat(book_name, "</p>"));
out.push("        <p class=\"book-author\">".concat(book_author, "</p>"));
out.push("        <a href=\"".concat(book_url, "\" class=\"book-link\">View on Goodreads</a>"));
out.push("    </div>");
out.push("</div>");
console.log(out.join('\n'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsidXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDN0QsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQzVGLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQzdCLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0FBQzdGLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQUU7QUFDL0YsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUUxQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLDZEQUF1RCxDQUFDLENBQUM7QUFDbEUsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBaUIsUUFBUSxzQ0FBOEIsQ0FBQyxDQUFDO0FBQ2xFLEdBQUcsQ0FBQyxJQUFJLENBQUMsK0JBQTZCLENBQUMsQ0FBQztBQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLDJDQUFrQyxXQUFXLFNBQU0sQ0FBQyxDQUFDO0FBQzlELEdBQUcsQ0FBQyxJQUFJLENBQUMseUNBQWdDLFNBQVMsU0FBTSxDQUFDLENBQUM7QUFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQywyQ0FBa0MsV0FBVyxTQUFNLENBQUMsQ0FBQztBQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDLDRCQUFvQixRQUFRLGlEQUEyQyxDQUFDLENBQUM7QUFDbEYsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDIn0=