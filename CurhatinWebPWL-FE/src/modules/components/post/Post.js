import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import CardFormPost from './card/CardFormPost';
import CardCommentar from './card/CardCommentar';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const user_id = localStorage.getItem('userId');

  useEffect(() => {
    fetchPosts();
    getCategory();
  }, []);

  const fetchPosts = () => {
    axios
      .get('http://localhost:8080/post')
      .then((response) => {
        console.log(response.data.data);
        const sortedPosts = response.data.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatPostDate = (postDate) => {
    const date = new Date(postDate);
    const now = new Date();
  
    const timeDifference = now.getTime() - date.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
    if (hoursDifference < 24) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-GB');
    }
  };

  const handleEdit = (postId) => {
    setEditingPostId(postId);
    const postToEdit = posts.find((post) => post.id === postId);
    setEditedPost(postToEdit.story);
  };

  const handleUpdatePost = (postId) => {
    // Cari postingan dengan postId yang sesuai dalam array posts
    const selectedPost = posts.find((post) => post.id === postId);
  
    if (selectedPost) {
      const { id: postId, category } = selectedPost;
      const categoryId = category.id;
      const postDate = new Date(selectedPost.postDate);
      const postData = {
        id: postId,
        user: { id: user_id },
        category: { id: categoryId },
        story: editedPost,
        postDate: postDate
      };
  
      axios
        .put(`http://localhost:8080/post`, postData)
        .then((response) => {
          console.log('Post updated successfully:', response.data);
          setEditingPostId(null);
          fetchPosts();
          alert('Post updated successfully');
        })
        .catch((error) => {
          console.error('Failed to update post:', error);
          alert('Failed to update post');
        });
    }
  };

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8080/post/${postId}`)
      .then((response) => {
        console.log('Post deleted successfully:', response.data);
        alert('Post deleted successfully')
        fetchPosts();
      })
      .catch((error) => {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post')
      });
  };

  const getCategory = () => {
    axios
      .get('http://localhost:8080/category')
      .then((response) => {
        console.log(response.data.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    sortByCategory(categoryId);
  };

  const sortByCategory = (categoryId) => {
    axios
      .post(`http://localhost:8080/post/findPostByCategory`, { category_id: categoryId })
      .then((response) => {
        console.log('Sorted posts by category successfully:', response.data);
        const sortedPosts = response.data.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        setPosts(sortedPosts);
        setEditingPostId(null);
      })
      .catch((error) => {
        console.error('Failed to sort posts by category:', error);
        alert('Failed to sort posts by category');
      });
  };
  
  return (
    <div className='p-5' style={{marginTop: "50px"}}>
        <div className='row'>
            <div className='row'>
                <p style={{fontWeight: "bold", fontSize: "20px"}}>Kategori</p>
            </div>
            <div className='row'>
                <div>
                <button
                  type='button'
                  className='btn btn-primary'
                  style={{ backgroundColor: '#1D82E3', marginRight: "10px", width: "125px" }}
                  onClick={fetchPosts}
                >
                  Semua
                </button>
                {categories.map((category) => (
                    <button
                    key={category.id}
                    type='button'
                    className={`btn btn-primary ${selectedCategory === category.id ? 'active' : ''}`}
                    style={{ backgroundColor: '#1D82E3', marginRight: "10px", width: "125px"}}
                    onClick={() => handleCategoryChange(category.id)}
                    >
                    {category.categoryName}
                    </button>
                ))}
                </div>
            </div>
        </div>
        <div className='mt-4 mb-2' style={{borderTop: "3px solid #DAEDFF"}}></div>
        <div className='row'>
            <div className='col-9'>
                {posts.length > 0 ? (
                    <div>
                    {posts.map((post) => (
                        <div key={post.id} className='Margin mt-3'>
                        <div className='card p-4' style={{ background: '#DAEDFF' }}>
                            <div className='row'>
                            <div className='col'>
                                <div style={{ fontSize: '14px' }}>
                                {formatPostDate(post.postDate)} - {post.user.username}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='d-flex justify-content-end'>
                                {editingPostId === post.id ? (
                                  <div className='d-flex'>
                                    <button
                                      type='button'
                                      className='btn btn-danger mx-1'
                                      style={{width: "125px"}}
                                      onClick={() => setEditingPostId(null)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-primary mx-1'
                                      style={{width: "125px"}}
                                      onClick={() => handleUpdatePost(post.id)}
                                    >
                                      Update Post
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      type='button'
                                      className='btn btn-outline-primary me-2'
                                      onClick={() => handleEdit(post.id)}
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-outline-danger'
                                      onClick={() => handleDelete(post.id)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  </div>
                                )}
                                </div>
                            </div>
                            </div>
                            <div className='my-2' style={{ fontWeight: '500' }}>
                            {post.category.categoryName}
                            </div>
                            <div>
                                {editingPostId === post.id ? (
                                    <div style={{ background: '#DAEDFF' }}>
                                    <textarea
                                        className='form-control mb-3'
                                        value={editedPost}
                                        onChange={(e) => setEditedPost(e.target.value)}
                                        required
                                    ></textarea>
                                    </div>
                                ) : (
                                    <div className='card-body' style={{ background: 'white', borderRadius: '0.375rem' }}>
                                    {post.story}
                                    </div>
                                )}
                                </div>

                            <div>{post.id && <CardCommentar postId={post.id}/>}</div>

                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div>Loading posts...</div>
                )}
            </div>
            <div className='col-3'>
                <CardFormPost fetchPosts={fetchPosts}/>
            </div>
        </div>
    </div>
  );
}

export default Post;
