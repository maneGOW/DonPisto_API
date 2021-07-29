const { Router } = require("express");
const admin = require("firebase-admin");
const router = Router();
const db = admin.firestore();

router.post("/api/products/newProduct", async (req, res) => {
    try{
        await db.collection("productos")
        .doc("/" + req.body.id + "/")
        .create({ prod_desc: req.body.desc, prod_nom: req.body.nom, prod_stock: req.body.stock });
    return res.status(200).json({status: 0});
    }catch(error){
        return res.status(500).send(error);
    }
});

router.get("/api/products/getProducts/:product_id", async (req, res) => {
    try{
        const doc = db.collection("productos").doc(req.params.product_id);
        const item = await doc.get();
        const response = item.data()
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

router.get("/api/products/getAllProducts", async (req, res) => {
    try{
        const query = db.collection("productos");
        const querySnapshot = await query.get();
    
        const response = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().prod_nom,
            description: doc.data().prod_desc,
            stock : doc.data().prod_stock
        }));
    
        return res.status(200).json(response);
    }
    catch(error){
        return res.status(500).send(error);
    }
});

router.delete("/api/products/deleteProduct/:product_id", async (req, res) =>{
    try{
        const doc = db.collection("productos").doc(req.params.product_id);
        await doc.delete();
        return res.status(200).json({message: "producto eliminado"});
    }
    catch(error){
        return res.status(500).send(error);
    }
});

router.put("/api/products/updateProduct/:product_id", async (req, res) =>{
    try{
        const doc = db.collection("productos").doc(req.params.product_id);
        await doc.update({
            prod_nom: req.body.name,
            prod_desc: req.body.desc,
            prod_stock: req.body.stock
        });

        return res.status(200).json({message: "producto actualizado correctamente"});
    }catch(error){
        return res.status(500).send(error);
    }
});

module.exports = router;