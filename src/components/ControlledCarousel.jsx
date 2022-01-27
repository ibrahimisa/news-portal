import React, { Fragment } from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import formatDate from "../FormatDate";
import CarouselCard from "./CarouselCard";

export default class ControlledCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageReady: false,
      responseReady: false,
      articles: new Array(4).fill({}),
      index: 0
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex });
  };

  // handleImageLoaded() {
  //   this.setState({ imageReady: true });
  // }

  // componentDidUpdate(){
  //   let articles = this.props.hotTopics.articles;
  //   console.log("articles", articles)
  //   if (articles != undefined && !this.state.responseReady) {
  //     this.setState( { responseReady: true, articles } );
  //   }
  // }

  render() {
    let articles = new Array(4).fill({});

    if (this.props.hotTopics.articles) {
      articles = this.props.hotTopics.articles;
    }
    console.log(articles);

    return (
      <div>
        <h1 className="fs-1 mt-4 mb-3">Hot Topics</h1>
        <Carousel
          activeIndex={this.state.index}
          indicators={false}
          onSelect={this.handleSelect}
          interval="1500"
        >
          {articles.map((article, idx) => (
            <Carousel.Item >
              <CarouselCard key={idx} article={article} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}
