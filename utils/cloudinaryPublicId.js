const cloudinaryPublicId =(url)=>{
    const publicId = url.split("/").pop().split(".")[0];
    return publicId.trim()
}

module.exports = cloudinaryPublicId