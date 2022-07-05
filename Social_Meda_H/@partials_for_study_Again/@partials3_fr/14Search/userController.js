const getAllUsers = async (req, res) => {
  try {
    //*yeni
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//? Mesela routerde => router.route("/users?name=elgun").get(isAuthenticated, getAllUsers); seklinde ki gibi olarsa ,O zaman yuxarda yazilan query.name ksm esit olacag =>  elgun
