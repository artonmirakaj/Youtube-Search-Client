import _ from 'lodash';
import React, { Component } from 'react';//class based
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyA2rhl55VEFm8rn9IG1vgPDqLHZejhaehc';

class App extends Component {
  constructor(props) {
    super(props);
    //list of videos
    this.state = {
      videos: [],//empty array
      selectedVideo: null//select video to play
    };
    this.videoSearch('');
  }

//search method- string term
  videoSearch(term){ //search user input
    YTSearch({key: API_KEY, term: term}, (videos) => {//key and value are identical, condense it, will update videos
      this.setState({
        videos: videos,//list of videos
        selectedVideo: videos[0]//first video
      });
    });
  }

//render into DOM
  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);
    //function passsed into debounce, returns new function once every 500 milliseconds, throttle user input
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>//VideoList gets access to videos on App state, passing props
    );
  }
}

//render App, insert it into html document, (ex. class="container"), root node of Applicatin
ReactDOM.render(<App />, document.querySelector('.container'));
