import './App.css';
import './bootstrap.min.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

function Hero() {
  return (<div style={{ marginLeft: '5%' }}><div className='row' style={{ backgroundColor: 'grey', width: '100%', height: '60%', alignSelf: 'center', alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
    <div className='jumbotron col-10 offset-1'>
      <h1>Author Quiz</h1>
      <h6><p>Select the book written by author shown</p></h6>
    </div>
  </div></div>)
}

function Book({ title, image, onClick }) {
  return (
    <div className='answer' onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  )
}



function Turn({ author, books, highlight, onAnswerSelected }) {
  function setBackGroundColor(highlight) {
    const mapping = {
      'correct': 'green',
      'wrong': 'red',
      'none': ''
    };
    return mapping[highlight];
  }
  return (
    <div className='row turn' style={{ backgroundColor: setBackGroundColor(highlight), marginTop: 5, borderRadius: 10 }}>
      <div className='col-4 offset-1'>
        <img
          src={author.imageUrl}
          className='authorimage'
          alt='Author'
        />
      </div>
      <div className='col-6'>
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
      </div>
    </div>
  )
}

function Continue({show, onContinue}) {
 return(
  <div className='="row continue'>
    {
      show ?
      <div className='col-11'>
        <button className='btn btn-primary btn-lg float-right' onClick={onContinue}>Continue</button>
      </div>:
      null
    }

  </div>
 );
}

function Footer() {
  return (<div className='row' id="footer">
    <p className='text-muted credit'>
      All images are downloaded from <a href='https://www.wikipedia.org/'>Wikipedia</a>
    </p>
  </div>
  )
}

function mapStateToProps(state){
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch){
  return{
    onAnswerSelected: (answer) =>{
      dispatch({type: 'ANSWER_SELECTED', answer});
    },
    onContinue: () =>{
      dispatch({type: 'CONTINUE'})
    }
  }
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({ turnData, highlight, onAnswerSelected, onContinue }) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight==='correct'} onContinue={onContinue} />
        <p><Link to="/add">Add Author</Link></p>
        <Footer />
      </div>
    );
  }
);

export default AuthorQuiz;
