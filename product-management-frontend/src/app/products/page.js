"use client";

import axios from '../lib/axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for edit and delete
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/navigation';
import "./products.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(null); // State to hold the token
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '' });
    const [addingProduct, setAddingProduct] = useState(false); // State to control the visibility of the add product form
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token'); // Get token from localStorage
        if (storedToken) {
            setToken(storedToken);
        }
    }, []); // Only run once when the component mounts

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        // Toggle edit mode
        const updatedProducts = products.map(p => 
            p.id === product.id ? { ...p, isEditing: !p.isEditing } : p
        );
        setProducts(updatedProducts);
    };

    const handleUpdate = async (e, id) => {
        e.preventDefault(); // Prevent default form submission
        const product = products.find(p => p.id === id);
        const confirmed = window.confirm('Are you sure you want to update this product?');
        if (!confirmed) return; // Exit if not confirmed

        try {
            const { data } = await axios.put(`/products/${id}`, {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
            }, {
                headers: { 'x-auth-token': token }, // Include token in headers
            });
            setProducts(products.map(p => (p.id === id ? data : p))); // Update the product list
            toast.success('Product updated successfully');
        } catch (error) {
            toast.error('Failed to update product');
            console.error('Failed to update product', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/products/${id}`, {
                headers: token ? { 'x-auth-token': token } : {}, 
            });
            setProducts(products.filter(product => product.id !== id)); // Update the product list
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
            console.error('Failed to delete product', error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const confirmed = window.confirm('Are you sure you want to add this product?');
        if (!confirmed) return; // Exit if not confirmed

        try {
            const { data } = await axios.post('/products', newProduct, {
                headers: { 'x-auth-token': token }, // Include token in headers
            });
            setProducts([...products, data]); // Add the new product to the list
            setNewProduct({ name: '', description: '', price: '', quantity: '' }); // Reset new product form
            setAddingProduct(false); // Hide add product form
            toast.success('Product added successfully');
        } catch (error) {
            toast.error('Failed to add product');
            console.error('Failed to add product', error);
        }
    };

    return (
        <div>
            <h1 className="text-center">Products</h1>
            {token && (
                <>
                    <button onClick={() => setAddingProduct(!addingProduct)} className="btn add-product-button my-3">
                        {addingProduct ? 'Cancel' : 'Add New Product'}
                    </button>
                    {addingProduct && (
                        <form onSubmit={handleAddProduct} className="product-card">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={newProduct.name} 
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    placeholder="Name" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={newProduct.description} 
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    placeholder="Description" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="number" 
                                    value={newProduct.price} 
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    placeholder="Price" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="number" 
                                    value={newProduct.quantity} 
                                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                    placeholder="Quantity" 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn update-button">Add Product</button>
                        </form>
                    )}
                </>
            )}

            {(token && <LogoutButton />) || (<button onClick={() => router.push('/login')} className="btn btn-outline-primary mt-3">Login</button>)}
            

            {products.map(product => (
                <div key={product.id} className="product-card">
                    {product.isEditing ? (
                        <form onSubmit={(e) => handleUpdate(e, product.id)}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={product.name} 
                                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, name: e.target.value } : p))}
                                    placeholder="Name" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={product.description} 
                                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, description: e.target.value } : p))}
                                    placeholder="Description" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="number" 
                                    value={product.price} 
                                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, price: e.target.value } : p))}
                                    placeholder="Price" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="number" 
                                    value={product.quantity} 
                                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, quantity: e.target.value } : p))}
                                    placeholder="Quantity" 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn update-button">Update</button>
                            <button type="button" className="btn cancel-button" onClick={() => handleEdit(product)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ₹{product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            {token && (
                                <div className="button-group">
                                    <button className="btn btn-sm add-product-button" onClick={() => handleEdit(product)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="btn btn-sm delete-button" onClick={() => handleDelete(product.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}

            
            
        </div>
    );
}
