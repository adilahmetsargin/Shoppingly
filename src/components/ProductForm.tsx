import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { addProduct } from "../features/products/productsSlice";
import { useAppDispatch } from "../hooks";

interface FormValues {
  name: string;
  qty: number | "";
  imageFile: File | null;
}

const validation = Yup.object().shape({
  name: Yup.string().min(1).max(100).required("Required"),
  qty: Yup.number().min(1, "Minimum 1").required("Required"),
});

const ProductForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function toDataUrl(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  return (
    <Formik
      initialValues={{ name: "", qty: "", imageFile: null } as FormValues}
      validationSchema={validation}
      onSubmit={async (values, { resetForm }) => {
        let image: string | undefined = undefined;
        if (values.imageFile) {
          image = await toDataUrl(values.imageFile);
        }
        dispatch(
          addProduct({ name: values.name, qty: Number(values.qty), image })
        );
        resetForm();
        if (fileRef.current) fileRef.current.value = "";
      }}
    >
      {({ setFieldValue }) => (
        <Form className="product-form">
          <div className="form-row">
            <label className="sr-only">Name</label>
            <Field name="name" placeholder="Product name" />
            <ErrorMessage name="name" component="div" className="error" />

            <Field name="qty" type="number" placeholder="Qty" />
            <ErrorMessage name="qty" component="div" className="error" />

            <input
              ref={fileRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files && e.currentTarget.files[0];
                setFieldValue("imageFile", file || null);
              }}
            />

            <button type="submit" className="btn-primary">
              Add
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
