import { Center, Pagination as MantinePagination } from '@mantine/core';

export function Pagination({count,limit,page,onPage}:{count:number;limit:number;page:number;onPage:(p:number)=>void}){
  const pages=Math.ceil(count/limit);
  if(pages<=1) return null;
  return <Center mt="lg"><MantinePagination aria-label="pagination" total={pages} value={page+1} onChange={p=>onPage(p-1)} color="green" /></Center>;
}
