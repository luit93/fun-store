
const {AccountSchema}= require("../models/accountModel")
const storeRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
      try {
        AccountSchema.findOneAndUpdate(
          { _id }, //filter
          {
            $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() }, //data to be updated
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  module.exports= {
    storeRefreshJWT
  }