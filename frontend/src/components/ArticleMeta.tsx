import { Anchor, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Article } from '../api/types';

export function ArticleMeta({article}:{article:Article}){
  return <Group gap={6} wrap="wrap"><Text c="dimmed" size="sm">By</Text><Anchor component={Link} to={`/profile/${article.author.username}`} size="sm" fw={600}>{article.author.username}</Anchor><Text c="dimmed" size="sm">on {new Date(article.createdAt).toLocaleDateString()}</Text></Group>;
}
