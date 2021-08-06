import axios from "axios";
import Instantiate from "./Instantiate";


const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  //Element Instantiation
  const card = Instantiate('div');
  const headline = Instantiate('div');
  const author = Instantiate('div');
  const img = Instantiate('div');
  const authorPhoto = Instantiate('img');
  const authorName = Instantiate('span');

  //Setting Class
  card.classList.add('card');
  headline.classList.add('headline');
  author.classList.add('author');
  img.classList.add('img-container');

  //Hierarchy Instantiation
  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(img);
  img.appendChild(authorPhoto);
  author.appendChild(authorName);

  //Setting Attributes
  headline.textContext = article.headline;
  authorPhoto.src = article.authorPhoto;
  authorName.textContext = `By ${article.authorName}`;

  //Console Logging Event Listener
  card.addEventListener('click', function(){
    console.log(article.headline);
  })

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  //Append Callback
  const cards = document.querySelector(selector);

  function Append(type) {
    return cards.appendChild(type);
  }

  //Pulling data from API to iterate over each item and pass the data to the
  //'Card' function, then calling back to 'Append' to return appended cards.
  axios.get(`http://localhost:5000/api/articles`)
  .then((res) => {
    res.data.articles.javascript.forEach(item => {
      const cardZero = Card(item)
      Append(cardZero)
    })
    res.data.articles.bootstrap.forEach(item => {
      const cardOne = Card(item)
      Append(cardOne)
    })
    res.data.articles.technology.forEach(item => {
      const cardTwo = Card(item)
      Append(cardTwo)
    })
    res.data.articles.jquery.forEach(item => {
      const cardThree = Card(item)
      Append(cardThree)
    })
    res.data.articles.node.forEach(item => {
      const cardFour = Card(item)
      Append(cardFour)
    })
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    console.log('done')
  })
};

export { Card, cardAppender }
