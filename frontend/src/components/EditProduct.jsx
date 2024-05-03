import React, { useState } from 'react'
import api from '../utils/api'

const EditProduct = ({ closeModal, token, data }) => {
  const [name, setName] = useState(data?.name)
  const [description, setDescription] = useState(data?.description)
  const [price, setPrice] = useState(data?.price)
  const [productType, setProductType] = useState(data?.type)
  const [images, setImages] = useState([]);;
  const [imagePreviews, setImagePreviews] = useState(
    data?.images?.map((image) => image) || []
  );

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevGallaryImages) =>
      prevGallaryImages.concat(files)
    );
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      images?.forEach((image) => {
        formData.append('images', image);
      });
      formData.append("type", productType)
      await api.put(`/product/update/${data?._id}`, formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: token
        }
      });
      closeModal();
    } catch (error) {
      console.error("Error update product:", error);
    }
  };

  return (
    <>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }} >
        <div className="modal-dialog" role="document">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                  </div>
                  <input required type="text" className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Price</span>
                  </div>
                  <input type="number" min={0} className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Description</span>
                  </div>
                  <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} aria-label="With textarea"></textarea>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Product Type</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" value={productType} onChange={(e) => setProductType(e.target.value)}>
                    <option value="Sports">Sports</option>
                    <option value="Lifestyles">Lifestyles</option>
                  </select>
                </div>
                <div className="mb-3 row">
                  <label
                    // htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Images:
                  </label>
                  <div className="col-md-10">
                    <div className="fileupload_block">
                      <input
                        type="file"
                        name="gallary_image"
                        className="form-control"
                        multiple
                        onChange={handleFileSelect}
                        id="example-text-input"
                      />
                    </div>
                    <div className="fileupload_img col-md-10 mt-3">
                      {imagePreviews.length <= 0 && (
                        <img
                          type="image"
                          alt="product image"
                          height={100}
                          width={100}
                        />
                      )}
                      {imagePreviews?.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt="Preview"
                          style={{ marginTop: "15px", marginLeft: "15px" }}
                          height={100}
                          width={100}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProduct
