import { Alert, List } from '@mantine/core';

export function ErrorList({errors}:{errors:any}){
  if(!errors) return null;
  const items=Object.entries(errors.errors ?? errors).flatMap(([k,v])=>(Array.isArray(v)?v:[String(v)]).map(m=>`${k} ${m}`));
  return <Alert color="red" title="Please check the form" role="alert" my="md"><List size="sm">{items.map(i=><List.Item key={i}>{i}</List.Item>)}</List></Alert>;
}
