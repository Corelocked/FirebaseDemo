import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';

// styles
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = collection(db, 'articles');

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id);
    await deleteDoc(ref);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles.map((article) => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <img
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon}
            alt="delete icon"
          />
          <button onClick={() => handleEdit(article.id)} className="edit-btn">
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
