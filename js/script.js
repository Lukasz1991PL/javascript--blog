"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add("active");
  /* remove class 'active' from all articles */
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










////////////////////////////////////////////////////////////////////////////

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';



function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = "";

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles', articles)
  let html = "";

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    console.log(linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelectorAll(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(articleTagsArray);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML= html;
    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("tag was clicked");
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active')
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add("active");
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of allTagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    console.log(allTagLinks);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector)

  for ( let article of articles) {
    const titleList = article.querySelector(optArticleAuthorSelector);

    let html =''
    const articleAuthor = article.getAttribute('data-author');

    console.log(articleAuthor);

    const linkHTML = '<a href ="#author' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

    html = html + authorLinkHTML;
    
    titleList.innerHTML = html;
  }
}


function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author', '');

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');

  for(let activeAuthorLink of activeAuthorLinks){

    activeAuthorLink.classList.remove('active');

  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let authorLink of authorLinks){


    authorLink.classList.add('active');

  }

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){


  const allAuthorLinks = document.querySelectorAll('a[href^="#author"]');


  for(let allAuthorLink of allAuthorLinks){


    allAuthorLink.addEventListener('click', authorClickHandler);

  }
}

addClickListenersToAuthors();


