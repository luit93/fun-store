class ApiMethods {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchProducts() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filterCategory() {
    const filterObj = { ...this.queryStr };
    //filter category

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete filterObj[key];
    });

    let filterStr = JSON.stringify(filterObj);

    filterStr = filterStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    //filter price + rating
    this.query = this.query.find(JSON.parse(filterStr));

    return this;
  }
  pagination(productsPerPage){
    const curr = Number(this.queryStr.page) || 1

    const skip = productsPerPage * (curr -1)
    this.query =this.query.limit(productsPerPage).skip(skip)
    return this
  }
}

module.exports = ApiMethods;
