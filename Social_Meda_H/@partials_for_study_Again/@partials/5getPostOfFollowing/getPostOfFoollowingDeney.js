//Yani orijinalde yazilanlar burdan yola cixilarag yazilib
getPostOfFollowing = async (req, res) => {
  try {
    //1
    //! const user = await User.findById(req.user._id); //<==bu sekilde yazsaq bize asagidaki gibi dondurur
    //iki requestinde postmani=>http://localhost:4000/api/v1/posts
    /*
      !res.status(200).json({
      !success: true,
      !user,
    });

    */
    /*
    {
    "success": true,
    "user": {
        "avatar": {
            "public_id": "myCloud.public_id",
            "url": "myCloud.secure_url"
        },
        "_id": "62a6186048704656b13ea2e4",
        "name": "user33",
        "email": "user33@.ru",
        "posts": [
            "62a621dc194111a27bed46d4"
        ],
        "followers": [],
        "following": [
            "62a6188a48704656b13ea2e8"
        ],
        "__v": 6
    }
}
    */

    //2
    //*const user = await User.findById(req.user._id).populate("following"); //<==desek Asagidaki gibi dondurur
    /*
      *res.status(200).json({
      *success: true,
      *user,
    });

    */
    /*
{
    "success": true,
    "user": {
        "avatar": {
            "public_id": "myCloud.public_id",
            "url": "myCloud.secure_url"
        },
        "_id": "62a6186048704656b13ea2e4",
        "name": "user33",
        "email": "user33@.ru",
        "posts": [
            "62a621dc194111a27bed46d4"
        ],
        "followers": [],
        "following": [
            {
                "avatar": {
                    "public_id": "myCloud.public_id",
                    "url": "myCloud.secure_url"
                },
                "_id": "62a6188a48704656b13ea2e8",
                "name": "user11",
                "email": "user11@.ru",
                "posts": [],
                "followers": [
                    "62a6186048704656b13ea2e4"
                ],
                "following": [],
                "__v": 5
            }
        ],
        "__v": 6
    }
}
*/

    //3
    //3
    // const user = await User.findById(req.user._id).populate(
    //   "following",
    //   "posts"
    // );
    //sadece following icierisi fakrkli Difer parametreler Bir ve iki ile ayni
    /*
       ? res.status(200).json({
      ? success: true,
       ? user,
    });
    */
    /*
    "following": [
            {
                "_id": "62a6188a48704656b13ea2e8",
                "posts": []
            }
        ],
    */

    //
    //4
    const user = await User.findById(req.user._id).populate(
      "following",
      "posts"
    ); //==>
    /*
{
    "success": true,
    "user": [
        {
            "_id": "62a6188a48704656b13ea2e8",
            "posts": []
        }
    ]
}
*/
    res.status(200).json({
      success: true,
      user: user.following,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPostOfFollowing,
};
