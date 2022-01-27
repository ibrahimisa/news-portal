import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.css";
import ControlledCarousel from "./components/ControlledCarousel";
import WeatherWidget from "./components/WeatherWidget";
import TopHeadLines from "./components/TopHeadLines";
import MainLayout from "./MainLayout";
import Category from "./components/Category";
import Search from "./components/Search";
import SignInScreen from "./components/SignInScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsAPI from "./NewsAPI";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.newsapi = new NewsAPI("0b990834fb0b430ebf218f7ec1014b44");
    this.firebaseConfig = {
      apiKey: "AIzaSyCiFkPOlJRrte5CV75AFgHWfgLNt9QBjgc",
      authDomain: "news-portal-123.firebaseapp.com",
      projectId: "news-portal-123",
      storageBucket: "news-portal-123.appspot.com",
      messagingSenderId: "215947503843",
      appId: "1:215947503843:web:6f6778b6a921f0f2717dd6",
    };

    // Initialize Firebase

    this.app = firebase.initializeApp(this.firebaseConfig);
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => {
          this.signInSuccess();
        },
      },
    };
    this.state = {
      user: null,
      categories: [
        "Business",
        "Entertainment",
        "Health",
        "Science",
        "Sports",
        "Technology",
        "General",
      ],
      city: null,
      country_code: null,
      latitude: null,
      longitude: null,
      topHeadlines: new Array(7).fill({}),
      language: "en",
      page: 1,
      articlesArr: new Array(7).fill(new Array(16).fill({})), // articles for categories
      searchResult: {
        articles: new Array(16).fill({}),
      },
      queryValue: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.signInSuccess();
    });
    this.getLocation().then((data) => {
      let { latitude, longitude, country_code, city } = data.ip;
      this.setState({ latitude, longitude, country_code, city });

      this.newsapi
        .topHeadlines({ pageSize: "4", ...this.state })
        .then((newsArr) => {
          // console.log("news arr", newsArr)
          this.setState({ topHeadlines: newsArr });
        });
    });
  }

  loadNews(category, idx) {
    this.getLocation().then((data) => {
      this.state.country_code = data.ip.country_code;
      this.newsapi
        .topHeadlines({
          pageSize: "16",
          page: this.state.page,
          category,
          ...this.state,
        })
        .then((news) => {
          /*
            remove the last 16 elements (which contain an array of empty object)
            in the articlesArr[idx] array and replace them with new fetched articles.
            this will cause the skeleton loader to dismiss and render
            the fetched data.                        
          */

          // immutability is very important!!
          const articlesArr = this.state.articlesArr.slice();
          const prevArticles = articlesArr[idx].slice();
          prevArticles.splice(-16, 16, ...news.articles);
          articlesArr[idx] = prevArticles;

          this.setState({ articlesArr });
        });
    });
  }

  handleLoadMore(category, idx) {
    const articlesArr = this.state.articlesArr.slice();
    articlesArr[idx] = articlesArr[idx].concat(new Array(16).fill({}));
    this.setState({ articlesArr, page: this.state.page + 1 });
    this.loadNews(category, idx);
  }

  handleSearch(more) {
    console.log("search result:", this.state.searchResult);
    // this does a shallow copy to articles property
    const searchResult = Object.assign({}, this.state.searchResult);
    searchResult.articles = this.state.searchResult.articles.slice();
    if (more) {
      searchResult.articles = searchResult.articles.concat(
        new Array(16).fill({})
      );
      this.setState((state) => ({ searchResult }));

      this.getLocation().then((res) => {
        this.newsapi
          .search({
            pageSize: "16",
            page: this.state.page,
            query: this.state.queryValue,
          })
          .then((news) => {
            searchResult.articles.splice(-16, 16, ...news.articles);
            this.setState((state) => ({
              searchResult,
              page: this.state.page + 1,
            }));
          });
      });

      // this.handleSearch(false);
      return;
    }
    this.getLocation().then((res) => {
      this.newsapi
        .search({
          pageSize: "16",
          page: this.state.page,
          query: this.state.queryValue,
        })
        .then((news) => {
          searchResult.articles.splice(-16, 16, ...news.articles);
          this.setState((state) => ({
            searchResult,
            page: this.state.page + 1,
          }));
        });
    });
  }
  signInSuccess() {
    this.setState({ user: firebase.auth().currentUser.multiFactor.user });
  }
  signOut = () => {
    firebase.auth().signOut();
  };

  setQueryValue(queryValue) {
    this.setState({ queryValue });
  }

  async getLocation() {
    let response = await fetch("https://ip.nf/me.json");
    return await response.json();
  }

  render() {
    if (!this.state.user) {
      return (
        <SignInScreen
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
          handleSignInStateChange={this.handleSignInStateChange}
        />
      );
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                setQueryValue={this.setQueryValue.bind(this)}
                queryValue={this.state.queryValue}
                categories={this.state.categories.slice()}
                user={this.state.user}
                signOut={this.signOut}
              />
            }
          >
            <Route
              index
              element={
                <div>
                  <ControlledCarousel
                    hotTopics={this.state.topHeadlines.slice().pop()}
                  />
                  {/* general category is the last element */}
                  <TopHeadLines
                    topHeadlines={this.state.topHeadlines.slice()}
                    categories={this.state.categories}
                  />
                  <WeatherWidget
                    lat={this.state.latitude}
                    lon={this.state.longitude}
                    city={this.state.city}
                  />
                </div>
              }
            />
            {this.state.categories.slice().map((cat, idx) => (
              <Route
                path={cat}
                element={
                  <Category
                    key={idx}
                    loadNews={() => {
                      this.loadNews(cat, idx);
                    }}
                    handleLoadMore={() => {
                      this.handleLoadMore(cat, idx);
                    }}
                    articles={(() => {
                      return this.state.articlesArr[idx];
                    })()}
                  />
                }
              />
            ))}
            <Route
              path="search"
              element={
                <Search
                  search={(more) => {
                    this.handleSearch(more);
                  }}
                  searchResult={this.state.searchResult}
                  queryValue={this.state.queryValue}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
