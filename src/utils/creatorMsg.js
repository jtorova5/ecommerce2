
const invalidParamsProduct = (body)=>{
    return `Error, there are some fields missing. The required parameters are:
    * Title: the title is a required field and the input is: ${body.title}
    * Description: the title is a required field and the input is: ${body.description}
    * Code: the title is a required field and the input is: ${body.code}
    * Price: the title is a required field and the input is: ${body.price}
    * Category: the title is a required field and the input is: ${body.category}
    `
}

const invalidId = (req)=> {
    return `A valid id is required, the id entered is: ${req.params.id}
    `
}

module.exports = {invalidParamsProduct, invalidId,}