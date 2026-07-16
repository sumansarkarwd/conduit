import { Anchor, Container, Paper, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
export function NotFoundPage(){ return <Container size="sm"><Paper withBorder shadow="sm" radius="md" p="xl"><Stack><Title order={1}>Not found</Title><Anchor component={Link} to="/">Go home</Anchor></Stack></Paper></Container>; }
