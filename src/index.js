import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import reportWebVitals from './reportWebVitals';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const authors = [
  {
    name: 'Mark Twin',
    imageUrl: require('./images/marktwain.jpg'),
    imageSource: "blank",
    books: ['The Adventure of Tom Saywer']
  },
  {
    name: 'R.K. NARAYAN',
    imageUrl: require('./images/RK-Narayan.jpg'),
    imageSource: "ddc",
    books: ['One Hundred Years of Solitude']
  },
  {
    name: 'MULK RAJ ANAND',
    imageUrl: require('./images/Mulk-Raj-Anand.jpg'),
    imageSource: "sdc",
    books: ['Moby Dick']
  },
  {
    name: 'RUSKIN BOND',
    imageUrl: require('./images/Ruskin-Bond.jpg'),
    imageSource: "vsdcc",
    books: ['The Odyssey']
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(
    function (p, c, i) {
      return p.concat(c.books);
    }, []
  );

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) =>
        title === answer)),
  }
}

function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign(
        {},
        state, {
        highlight: isCorrect ? 'correct' : 'wrong'
      }
      );
    case 'CONTINUE':
      return Object.assign({}, state, {
        highlight: '',
        turnData: getTurnData(state.authors)
      });
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      })
    default: return state;
  }
}

let store = Redux.createStore(reducer);

// function render() {
// const navigate = useNavigate();
(root.render(<React.StrictMode>
  <BrowserRouter>
  <ReactRedux.Provider store={store}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" element={<AuthorQuiz />} />
        <Route exact path="/add" element={<AddAuthorForm />} />
      </Switch>
    </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>
</React.StrictMode>)
)
// }

// render();

reportWebVitals();
