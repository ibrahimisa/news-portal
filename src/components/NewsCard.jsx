import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import ReactPlaceholder from "react-placeholder";
import { TextBlock } from "react-placeholder/lib/placeholders";
import formatDate from "../FormatDate";

export default class NewsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false, imageReady: false };
  }

  handleImageLoaded() {
    this.setState({ imageReady: true });
  }

  render() {
    const article = this.props.article;
    const imageStyle = !this.state.imageReady ? { display: "none" } : {};
    const image = (
      <Card.Img
        src={article.urlToImage}
        style={{ width: "100%", height: "100%", ...imageStyle }}
        onLoad={(e) => {
          this.handleImageLoaded();
        }}
      />
    );

    if (article.title != undefined && !this.state.ready) {
      this.setState({ ready: true });
    }

    return (
      <Card className="border-0 m-2" bg="light">
        {(() => (
          <Fragment>
            <ReactPlaceholder
              type="rect"
              ready={this.state.imageReady}
              style={{
                borderRadius: "8px",
                minWidth: "312.5px",
                minHeight: "220.6px",
              }}
              showLoadingAnimation
            >
              {image}
            </ReactPlaceholder>
            {!this.state.imageReady && image}
          </Fragment>
        ))()}
        <Card.Body>
          <Card.Title className="fs-6">
            <ReactPlaceholder
              ready={this.state.ready}
              type="text"
              rows={2}
              color="#d3d1d1"
              showLoadingAnimation
            >
              <a href={article.url} className="stretched-link">
                {article.title}
              </a>
            </ReactPlaceholder>
          </Card.Title>
          <Card.Text>
            <ReactPlaceholder
              ready={this.state.ready}
              customPlaceholder={<TextBlock color="#E0E0E0" rows={4} />}
              showLoadingAnimation
            >
              {article.description}
            </ReactPlaceholder>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0">
          <small className="text-muted" style={{ display: "flex" }}>
            <ReactPlaceholder
              ready={this.state.ready}
              type="textRow"
              style={{ width: "40%", marginRight: "3px" }}
              showLoadingAnimation
            >
              {formatDate(`${article.publishedAt}`)} |{" "}
            </ReactPlaceholder>
            <ReactPlaceholder
              ready={this.state.ready}
              type="textRow"
              style={{ width: "40%" }}
              showLoadingAnimation
            >
              {article.source?.name}
            </ReactPlaceholder>
          </small>
        </Card.Footer>
      </Card>
    );
  }
}
