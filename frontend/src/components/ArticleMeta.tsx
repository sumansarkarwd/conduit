import { Link } from 'react-router-dom';
import type { Article } from '../api/types';
export function ArticleMeta({article}:{article:Article}){ return <p className="meta">By <Link to={`/profile/${article.author.username}`}>{article.author.username}</Link> on {new Date(article.createdAt).toLocaleDateString()}</p>; }
