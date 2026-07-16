import { Badge, Button, Group } from '@mantine/core';

export function TagList({tags,onSelect}:{tags:string[];onSelect?:(tag:string)=>void}){
  return <Group component="ul" gap="xs" p={0} m={0} style={{listStyle:'none'}}>{tags.map(t=><li key={t}>{onSelect?<Button variant="light" color="gray" size="compact-sm" radius="xl" onClick={()=>onSelect(t)}>{t}</Button>:<Badge variant="light" color="gray" radius="xl">{t}</Badge>}</li>)}</Group>;
}
