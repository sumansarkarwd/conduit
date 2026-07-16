import { Anchor, Card, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Article } from '../api/types';
import { ArticleMeta } from './ArticleMeta';
import { FavoriteButton } from './FavoriteButton';
import { TagList } from './TagList';

export function ArticlePreview({article}:{article:Article}){
  return <Card component="article" withBorder shadow="sm" radius="md" p="lg"><Stack gap="md"><Group justify="space-between" align="flex-start"><ArticleMeta article={article}/><FavoriteButton article={article}/></Group><Anchor component={Link} to={`/article/${article.slug}`} c="dark"><Stack gap={4}><Title order={2} size="h3">{article.title}</Title><Text c="dimmed">{article.description}</Text></Stack></Anchor><TagList tags={article.tagList}/></Stack></Card>;
}
