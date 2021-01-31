const product = require('../../model/admin/Product');


class Product {
    async addProduct() {
        try {

        } catch(e) {
            console.log(e);
        }
    }

    async getProduct(req, res) {
        try {
            const getProduct = await product.find().lean();
            return getProduct;
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = new Product;