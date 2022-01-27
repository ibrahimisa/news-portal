import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import formatDate from "../FormatDate";

export default class CarouselCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageReady: false,
      responseReady: false,
    };
  }

  handleImageLoaded() {
    this.setState({ imageReady: true });
  }

  componentDidMount() {
    console.log("hurayyyy");
  }

  render() {
    let article = this.props.article;
    const { imageReady } = this.state;
    const imageStyle = !imageReady ? { display: "none" } : {};
    const image = (
      <Card.Img
        alt="Card image cap"
        style={{
          width: "100%",
          height: "100%",
          ...imageStyle,
        }}
        src={article.urlToImage}
        onLoad={this.handleImageLoaded.bind(this)}
      />
    );
    if (article.title != undefined && !this.state.responseReady) {
      this.setState({ responseReady: true });
    }

    return (
      <Card
        style={{
          width: "1330px",
          height: "611.5px",
        }}
        className="position-relative text-white border-0 rounded"
        inverse
      >
        {(() => (
          <Fragment>
            <ReactPlaceholder
              type="rect"
              ready={imageReady}
              style={{
                width: "100%",
                height: "100%",
              }}
              showLoadingAnimation
            >
              {image}
            </ReactPlaceholder>
            {!imageReady && image}
          </Fragment>
        ))()}
        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
          <Card.Title>
            <ReactPlaceholder
              ready={this.state.responseReady}
              type="textRow"
              style={{ width: "60%" }}
              showLoadingAnimation
            >
              <span className="bg-dark">{article.title}</span>
            </ReactPlaceholder>
          </Card.Title>
          <Card.Text>
            <small className="text-dark d-flex">
              <ReactPlaceholder
                ready={this.state.responseReady}
                type="textRow"
                style={{ width: "20%", marginRight: "3px" }}
                showLoadingAnimation
              >
                <span className="bg-light">
                  {formatDate(article.publishedAt)} |{" "}
                </span>
              </ReactPlaceholder>
              <ReactPlaceholder
                ready={this.state.responseReady}
                type="textRow"
                style={{ width: "20%" }}
                showLoadingAnimation
              >
                <span className="bg-light">{article.source?.name}</span>
              </ReactPlaceholder>
            </small>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    );
  }
}
