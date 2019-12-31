import React, {Component} from 'react'
import '../App.scss'

class QuoteBox extends Component {
  constructor() {
    super()    
    this.state = {      
      isLoading: false,
      author: '',
      quote: '',
      quotes: []
    }
    this.handleChange = this.handleChange.bind(this)   
  }  

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => {                     
        const randomNo = Math.floor(Math.random() * this.state.quotes.length)           
        this.setState({
          author: data[randomNo].author,
          quote:  data[randomNo].text,
          quotes: data
        })
      })                  
  }

  
  handleChange(event) {
    event.preventDefault()
    const randomNo = Math.floor(Math.random() * this.state.quotes.length)
    const randomQuote = this.state.quotes[randomNo]
    this.setState({
      author: randomQuote.author,
      quote: randomQuote.text
    })
  }
  
  render() {        
    return (            
      <div id="quote-box">        
        <div id="text">
          <blockquote>
            <p id="quote">{this.state.quote}</p>
            <footer id="author" style={{display: this.state.author ? 'block' : 'none'}}>&ndash; {this.state.author}</footer>
          </blockquote>
        </div>
        <div id="wrapper">
          <a 
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${this.state.quote}" - ${this.state.author}`}
            className="button"
            rel="noopener noreferrer" 
            title="Tweet this quote!"
            target="_blank"
          >
            <i className="fab fa-twitter"></i>            
          </a>
          <button id="new-quote" type="submit" onClick={this.handleChange}>New Quote</button>
        </div>                               
      </div>      
    )
  }
}

export default QuoteBox