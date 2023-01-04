export default class NewsAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async search({ pageSize, page, query }){
    let results = await this.getNews({ endpoint: "everything", pageSize, page, query });
    return results;
  }

  async topHeadlines({ categories, category , country_code, pageSize, page}) {
    const config = {
      endpoint: "top-headlines",
      category,
      country_code,
      pageSize,
      page,
    };

    if(category){
      let catNews = await this.getNews(config);
      return catNews;
    }

    let promisesArr = categories.map((category) => {
      return this.getNews({ ...config, category }).then((news) => news);
    });
    let resolvedPromises = await Promise.allSettled(promisesArr);
    return resolvedPromises.map((el) => el.value);
  }

  async getNews({ endpoint, category, country_code, pageSize, page = 1, query }) {
    let url = `https://maroon-snail-yoke.cyclic.app/${endpoint}?${
      country_code ? 'country=' + country_code + '&' : ''
    }${
      category ? `category=${category}&` : ''
    }pageSize=${pageSize}&page=${page}&${query ? `q=${query}` : ''}&apiKey=${
      this.apiKey
    }`;
   
    let response = await fetch(url);

    // "news.json"
    return await response.json();
  }
}
