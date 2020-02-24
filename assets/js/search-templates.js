function makeDateOrdinal(date) {
  const DAY = date.split(" ")[0];
  let digit = DAY.length === 1 ? DAY[0] : DAY[1];
  digit = Number(digit);
  let ordinalString;
  switch (digit) {
    case 1:
      ordinalString = "st";
      break;
    case 2:
      ordinalString = "nd";
      break;
    case 3:
      ordinalString = "rd";
      break;
    default:
      ordinalString = "th";
  }
  date = date.split(" ");
  return `${date[0]}${ordinalString} ${date[1]} ${date[2]}`
}

const SEARCH_RESULT_TEMPLATE = (url, result) => {
  if (result.custom_excerpt) {
    result.excerpt = result.custom_excerpt;
  }
  return `
    <a class="post-preview-link search-preview" href="${url}/${result.tags[0].name}/${result.slug}">
        <article class="post-preview">
            <header class="post-preview-header">
                <h1 class="post-preview-title"><span class="post-preview-title" href="${url}">${result.title}</span></h1>
                <section class="post-preview-meta">
                    <time class="post-preview-meta-date" datetime="${result.published_at}" format="Do MMMM YYYY">${makeDateOrdinal(new Date(result.published_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }))}</time>
                </section>


            </header>

            <figure class="post-preview-image" style="background-image: url(${result.feature_image})">
            </figure>

            <section class="post-preview-excerpt"><p>${result.excerpt.slice(0,300).trim()}...</p></section> 

            <footer class="post-preview-footer">
                <span href="${url}" class="read-article">
                    <span>Read</span>
                    <i class="fas fa-book-open"></i>
                </span>
            </footer>
        </article>
    </a>
    `
}

const LETTER_RESULT_TEMPLATE = (url, result) => {
  return `
    <a class="post-preview-link search-preview" href="${url}/${result.tags[0].name}/${result.slug}">
        <article class="post-preview">
            <header class="post-preview-header">
                <h1 class="post-preview-title"><span class="post-preview-title" href="${url}">${result.title}</span></h1>
                <section class="post-preview-meta">
                    Sent <time class="post-preview-meta-date" datetime="${result.published_at}" format="Do MMMM YYYY">${makeDateOrdinal(new Date(result.published_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }))}</time>
                    <i class="fas fa-envelope-open"></i>
                </section>


            </header>

            <figure class="post-preview-image" style="background-image: url(${result.feature_image})">
            </figure>

            <section class="post-preview-excerpt"><p>${result.excerpt.slice(0,300).trim()}...</p></section> 

            <footer class="post-preview-footer">
            <span href={{url}} class="read-article">
              <span>Read letter</span>
              <i class="fas fa-file-alt"></i>
            </span>
            </footer>
        </article>
    </a>
    `
}

const BOOK_RESULT_TEMPLATE = (url, result) => {
  return `
  <a class="book-preview-link search-preview" href="${url}/${result.tags[0].name}/${result.slug}">
    <article class="book-preview">
      <header class="book-preview-header">
        <h1 class="book-preview-title desktop-only">Book Recommendation</h1>
        <i class="fas fa-book book-icon"></i>
      </header>
      <span class="book book-search-result" id="${result.tags[result.tags.length-2].name}">
        <i class="load-icon fas fa-spinner"></i>
      </span>
      <footer class="book-preview-footer">
        <span href="${url}" class="read-article">
            <span>More</span>
            <i class="fas fa-book-open"></i>
        </span>
      </footer>
    </article>
  </a>
  `
}

const QUOTE_RESULT_TEMPLATE = (url, result) => {
  return `
    <a href="${url}/${result.tags[0].name}/${result.slug}" class="quote-preview-link">
      <article class="quote-preview search-preview">
  
      <header class="quote-full-header">
          <h1 class="quote-full-title">Quote</h1>
          <i class="fas fa-comment-alt quote-icon"></i>        
      </header>
  
      <blockquote class="quote-search-preview">
          <span class="quote-content">
              <i class="fas fa-quote-left quote-left"></i>
              ${result.title}
              <i class="fas fa-quote-right quote-right"></i>
          </span>
          <h6 class="quote-author">${result.tags[1].name}</h6>
      </blockquote>
  
    </article>
  </a>
    `
}