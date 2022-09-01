"use strict";
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";
const optArticleAuthorSelector = ".post-author";
const optTagsListSelector = ".tags.list";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");
  console.log("clickedElement (with plus): " + clickedElement);
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".post");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log("customSelector", customSelector);
  console.log(optArticleSelector + customSelector);
  /* get the article id */
  let html = "";
  for (let article of articles) {
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    console.log("linkHTML", linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");
  console.log("links", links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);
  /* find all articles */
  for (let article of articles) {
    /* START LOOP: for every article: */
    const tagsList = article.querySelector(optArticleTagsSelector);
    /* find tags wrapper */
    let html = "";
    /* make html variable with empty string */
    const articleTags = article.getAttribute("data-tags");
    /* get tags from data-tags attribute */
    const articleTagsArray = articleTags.split(" ");
    /* split tags into array */
    for (let tag of articleTagsArray) {
      /* START LOOP: for each tag */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span> ' + tag + " </span></a></li>";
      console.log("linkHTML", linkHTML);
      /* generate HTML of the link */
      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag) == -1) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
    }
    /* END LOOP: for every article: */
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(" ");
    console.log(allTags);
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove("active");
  } /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    tagLink.classList.add("active");
    /* add class active */

    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
}

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace("#author", "");
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll("active");
  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add("active");
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-authors~="' + author + '"]');
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* find author wrapper */
    const authorsList = article.querySelectorAll(optArticleAuthorSelector);
    let html = "";
    const articleAuthor = article.getAttribute("data-author");

    const linkHTML =
      '<li><a href="#author-' +
      articleAuthor +
      '"><span>"' +
      articleAuthor +
      '"></span></a></li>';

    html = html + linkHTML;

    authorsList.innerHTML = html;
  }
}
function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author"]');
  /* START LOOP: for each link */
  for (const link of links) {
    /* add authorClickHandler as event listener for that link */
    link.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}
generateAuthors();
addClickListenersToAuthors();
