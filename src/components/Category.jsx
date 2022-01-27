import React from "react";
import { CardGroup, Button } from "react-bootstrap";
import NewsCard from "./NewsCard";

export default class Category extends React.Component {
  componentDidMount() {
    this.props.loadNews();
  }

  render() {
    return (
      <>
        <CardGroup
          xs={3}
          md={4}
          className="p-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
          }}
        >
          {this.props.articles.map((article, idx) => (
            <NewsCard key={idx} article={article} />
          ))}
        </CardGroup>
        <div className="text-center">
          <Button variant="outline-success" size="lg" onClick={()=>{this.props.handleLoadMore()}}>Load More</Button>
        </div>
      </>
    );
  }
}
