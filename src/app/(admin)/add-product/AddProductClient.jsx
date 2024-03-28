"use client";

import React, { useState } from "react";
import { categories, initState } from "./CONSTANTS";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import styles from "./AddProduct.module.scss";
const AddProductClient = () => {
  /* STATE */
  const [product, setProduct] = useState(initState);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /* EVENT */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {};

  const addProduct = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["product-wrapper"]}>
      {isLoading && <Loader />}

      <div className={styles.product}>
        <Heading title="새 상품 생성하기" />
        <form onSubmit={addProduct}>
          <label>상품 이름:</label>
          <input
            type="text"
            placeholder="상품 이름"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <div>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading... ${uploadProgress}`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              type="file"
              placeholder="상품 이미지"
              accept="image/*"
              name="image"
              required
              onChange={(e) => handleImageChange(e)}
            />

            {product.imageURL === "" ? null : (
              <input
                type="text"
                name="imageURL"
                disabled
                value={product.imageURL}
                required
                placeholder="이미지 URL"
              />
            )}
          </div>
          <label>상품 가격:</label>
          <input
            type="number"
            placeholder="상품 가격"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
          <label>상품 카테고리:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              --상품 카테고리 선택
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <label>상품 브랜드/회사:</label>
          <input
            type="text"
            placeholder="상품 브랜드/회사"
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          <label>상품 설명:</label>
          <textarea
            name="desc"
            value={product.desc}
            cols={10}
            rows={10}
            required
            onChange={(e) => handleInputChange(e)}
          ></textarea>

          <Button type="submit">상품 생성</Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductClient;
