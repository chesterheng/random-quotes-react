import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import htmlToText from 'html-to-text';
import axios from 'axios';
import { proxyURL, quotesOnDesignURL, twitterURL, getQuoteURL } from './config';
import './App.css';

class App extends Component {

    constructor(props){
        super(props)
        this.state = { text: '', author: '' }
    }
    render() {
        const {text, author } = this.state;
        return (
            <div id="quote-box">
                <h1 className="text-center">Random Quote Machine</h1>
                <blockquote className="blockquote text-right quote-text">
                    <i className="fa fa-quote-left float-left"></i>
                    <p className="text-center mb-0" id="text">
                        {renderHTML(text)}</p>
                    <footer className="blockquote-footer float-none" id="author">{author}</footer>
                </blockquote>
                <a className="button btn btn-secondary" id="tweet-quote" href={`${twitterURL}${htmlToText.fromString(text)}`}
                   target="_blank">
                    <i className="fa fa-twitter"></i> Tweet Quote
                </a>
                <button className="button btn btn-primary active" id="new-quote"
                        onClick={this.handleNewQuote}>
                    <i className="fa fa-random"></i> New Quote
                </button>
                <div className="copyright">
                    &copy; by Chester Heng. Powered by&nbsp;
                    <a href={quotesOnDesignURL}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="link">Quotes on Design</a>.
                </div>
            </div>
        );
    }

    handleNewQuote = () => {
        this.random();
    }

    componentDidMount = () => {
        this.random();

    }

    random = async () => {
        console.log(`${proxyURL}`);
        const json = await axios.get(`${proxyURL}${getQuoteURL}${new Date().getTime()}`);
        const text = json.data[0].content;
        const author = json.data[0].title;
        this.setState({text, author});
    };
}

export default App;
