const { CartProduct } = require("../database/models");

module.exports = {
    async viewCart(req, res) {
        //Mostrar el carrito
        // mostrar los productos que agregó usuario actual

        const cartProducts = await CartProduct.findAll({
            where: {
                userId: req.currentUser.id,
            },
            include: ["product"],
        });

        res.render("cart", {
            cart: cartProducts,
            totalPrice: cartProducts.reduce(
                (acc, cartProduct) => acc + cartProduct.product.price * cartProduct.count,
                0
            ),
        });
    },

    async addProductToCart(req, res) {
        const productId = req.params.id;
        //Verificar si el producto está agregado
        const productInCartToModify = await CartProduct.findOne({
            where: {
                userId: req.currentUser.id,
                productId: productId,
            },
        });

        if (productInCartToModify) {
            // Si está agregado: Incrementar el contador de ese Producto
            productInCartToModify.count++;
            await productInCartToModify.save();
        } else {
            // Sino: Agregarlo
            await CartProduct.create({
                userId: req.currentUser.id,
                productId: productId,
                count: 1,
            });
        }

        res.redirect("/me/cart");
    },

    async decreaseProductToCart(req, res) {
        const productId = req.params.id;
        //Verificar si el producto está agregado
        const productInCartToModify = await CartProduct.findOne({
            where: {
                userId: req.currentUser.id,
                productId: productId,
            },
        });

        if (productInCartToModify) {
            // Si está agregado: Disminuir el contador de ese Producto
            // Si el contador es 1, removerlo de la lista completamente.
            if (productInCartToModify.count == 1) {
                await productInCartToModify.destroy();
            } else {
                productInCartToModify.count--;
                await productInCartToModify.save();
            }
        }

        res.redirect("/me/cart");
    },

    buyCart(req, res) {
        //To be done
    },

    async clearCart(req, res) {
        await CartProduct.destroy({
            where: {
                userId: req.currentUser.id,
            },
        });
        res.redirect("/me/cart");
    },

    async clearProductFromCart(req, res) {
        const productId = req.params.id;
        const productInCartToClear = await CartProduct.findOne({
            where: {
                userId: req.currentUser.id,
                productId: productId,
            },
        });

        if (productInCartToClear) await productInCartToClear.destroy();

        res.redirect("/me/cart");
    },
};
