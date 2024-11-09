import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
// styles
import './Edit.css';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
      } else {
        navigate('/');
      }
    };
    fetchArticle();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', id);
    await updateDoc(ref, { title, author, description });
    navigate('/');
  };

  return (
    <div className="edit">
      <h2 className="page-title">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Author:</span>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">Save Changes</button>
      </form>
    </div>
  );
}
