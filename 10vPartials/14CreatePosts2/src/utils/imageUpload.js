export const checkImage = (file) => {
    let err = ""
    if (!file) return err = "File does not exist."
    // 1mb
    if (file.size > 1024 * 1024) err = "The largest image size is 1mb."

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = "Image format is incorrect."

    return err;
}


export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData()


        // if (item.camera) {
        //     formData.append("file", item.camera)
        // } else {
        formData.append("file", item)
        // }

        formData.append("upload_preset", "utwsyu1s")
        formData.append("cloud_name", "dyplegxqx")

        let url = "https://api.cloudinary.com/v1_1/dyplegxqx/upload"
        const res = await fetch(url, { method: "POST", body: formData })
        const data = await res.json()

        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr;
}


/*
data => const data = await res.json()

access_mode: "public"
asset_id: "2e07a7cf96db8baebfe238c0e891dd24"
bytes: 23572
created_at: "2023-01-12T11:21:06Z"
etag: "a2e196682d3f3c9fefde0117f8f157a5"
folder: "v-social"
format: "jpg"
height: 394
original_extension: "jpeg"
original_filename: "WhatsApp Image 2022-12-05 at 13.11.29 (1)"
placeholder: false
public_id: "v-social/vsayz4wndt1eafzpbozq"
resource_type: "image"
secure_url"https://res.cloudinary.com/dyplegxqx/image/upload/v1673522466/v-social/vsayz4wndt1eafzpbozq.jpg"
signature: "b94c787250a32e63a22489e7ea7586e1bf34956e"
tags: []
type: "upload"
url: "http://res.cloudinary.com/dyplegxqx/image/upload/v1673522466/v-social/vsayz4wndt1eafzpbozq.jpg"
version: 1673522466
version_id: "ac339317f9d95696087cbc8fe21f6018"
width: 700
*/