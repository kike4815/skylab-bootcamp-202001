function toggleFav(vehicleID, token, callback) {
    getUserInfo(token, (error, userInfo) => {
        if(error) {
            callback(error)
        } else {
            if(userInfo.favs.some(element => element === vehicleID)) {
                userInfo.favs.removeValue(vehicleID)
            } else {
                userInfo.favs.push(vehicleID)
            }

            updateFavs(userInfo.favs, token, error => {
                if(error) {
                    callback(error)
                } else {
                    callback()
                }
            })
        }
    })
}