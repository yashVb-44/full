import React from 'react'

const ShowProduct = ({ data, onDelete, onUpdate }) => {
    const handleDelete = (productId) => {
        onDelete(productId);
    };
    const handleUpdate = (product) => {
        onUpdate(product)
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">image</th>
                        <th scope="col">price</th>
                        <th scope="col">description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data?.map((product, index) => (
                        <>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{product?.name}</td>
                                <td><img src={product?.images?.[0]} alt="product" height={50} width={50} /></td>
                                <td>{product?.price}</td>
                                <td>{product?.description}</td>
                                <td>
                                    <button onClick={() => handleUpdate(product)}>Edit</button>
                                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ShowProduct
