import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './FormArticle.css';

export default function EditArticle() {
  const { urlId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const ref = doc(db, 'articles', urlId);
    getDoc(ref).then((snapshot) => {
      const data = snapshot.data();
      if (data) {
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
      }
    });
  }, [urlId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', urlId);
    await updateDoc(ref, { title, author, description });
    navigate(`/articles/${urlId}`);
  };

  return (
    <div className="form-article">
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Author:</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}
