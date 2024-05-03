import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import ShowProduct from '../components/ShowProduct'
import AddProduct from '../components/AddProduct'
import EditProduct from '../components/EditProduct'

const Product = ({ token, user }) => {

    const [productData, setProductData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedProductData, setSelectedProductData] = useState()

    useEffect(() => {
        const getProductData = async () => {
            try {
                const res = await api.get("/product/list", {
                    headers: {
                        Authorization: token
                    }
                })
                setProductData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getProductData()
    }, [isModalOpen, isUpdateModalOpen])

    const handleAddProduct = () => {
        setIsModalOpen(true)
    }

    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/product/delete/${productId}`, {
                headers: {
                    Authorization: token
                }
            });
            setProductData(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProduct = async (product) => {
        setSelectedProductData(product)
        setIsUpdateModalOpen(true)
    }

    return (
        <div className='container'>
            <h3>Products</h3>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={handleAddProduct}>
                Add Product
            </button>
            <ShowProduct data={productData} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} />
            {isModalOpen && <AddProduct closeModal={() => setIsModalOpen(false)} token={token} />}
            {isUpdateModalOpen && <EditProduct closeModal={() => setIsUpdateModalOpen(false)} token={token} data={selectedProductData} />}
        </div>
    )
}

export default Product
