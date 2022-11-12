class ApiFeatures {
    constructor(query, queryStr) {
        //query in the url means antyhing after ?
        //http://localhost:4000/api/v1/products?keyword=samsara
        //yani artg keyword ile request versek bize o producti getirer
        //ama keywordsuz butun productlari getirer
        //so query is => keyword=samsara whixh we can get from backend like req.query
        this.query = query;
        this.queryStr = queryStr
    }

    //this.queryStr { keyword: 'd' }
    //console.log(keyword); //{ name: { '$regex': 'd', '$options': 'i' } }
    search() {
        const keyword =
            this.queryStr.keyword
                ? { name: { $regex: this.queryStr.keyword, $options: "i" } }
                : {};
        this.query = this.query.find({ ...keyword })
        return this
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        // console.log(`qury`, queryCopy);
        // console.log(queryCopy);

        //deleting category all
        if (queryCopy.category === "All") {
            for (var key in queryCopy) {
                if (key === "category") delete queryCopy[key];
            }
        }

        //todo removinfg some fields
        //!http://localhost:4000/api/v1/products?keyword=samsara&category=texno&limit=3
        // console.log(queryCopy); //{ keyword: 'samsara', category: 'texno', limit: '3' }
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        //todo Filter from price and for rating
        //request=>/api/v1/products?price[gt]=989&price[lt]=2000
        //console.log(JSON.stringify(queryCopy)); //{"price":{"gt":"989","lt":"2000"}}

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // console.log(queryStr); //{"price":{"$gt":"989","$lt":"2000"}} bele cevirmesek ERROR VERER DI (PRICE IS INVALID DEYEprice
        // console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; //50-10
        // console.log(this.queryStr.page);

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);


        return this;
    }
}

module.exports = ApiFeatures;
