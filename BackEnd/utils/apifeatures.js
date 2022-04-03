class ApiFeature {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr; //querystr= keyword
    }

    search() {
        const keyword = this.querystr.keyword
            ? {
                name: {
                    $regex: this.querystr.keyword,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find(keyword); //{...keyword}
        return 1;
    }
    filter() {
        const querycopy = { ...this.querystr };
        console.log("query1",querycopy)
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => {
            delete querycopy[key];
        });

        //for price filter---->
        let querystring = JSON.stringify(querycopy);
        console.log("query",querystring)
        querystring = querystring.replace(
            /\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log("qu",this.query)
        this.query = this.query.find(JSON.parse(querystring));
        // console.log(querystring)
        return this;
    }

    pagination(productPerPage) {
        const currentPage = Number(this.querystr.page || 1);
        const skip = productPerPage * (currentPage - 1);
        this.query = this.query.limit(productPerPage).skip(skip)

        return this;

    }
}

module.exports = ApiFeature;
