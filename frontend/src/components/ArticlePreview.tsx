import { Link } from 'react-router-dom';
import type { Article } from '../api/types';
import { ArticleMeta } from './ArticleMeta';
import { FavoriteButton } from './FavoriteButton';
import { TagList } from './TagList';
export function ArticlePreview({article}:{article:Article}){ return <article className="preview"><ArticleMeta article={article}/><FavoriteButton article={article}/><Link to={`/article/${article.slug}`}><h2>{article.title}</h2><p>{article.description}</p></Link><TagList tags={article.tagList}/></article>; }
