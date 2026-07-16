import { AppShell, MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../auth/AuthContext';
import { Header } from '../components/Header';
import { AppRoutes } from '../routes';
export const sampleUser={email:'a@example.com',token:'t',username:'alice',bio:null,image:null};
export const sampleProfile={username:'alice',bio:'bio',image:null,following:false};
export const sampleArticle={slug:'hello',title:'Hello',description:'Desc',body:'Body',tagList:['tag'],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),favorited:false,favoritesCount:0,author:sampleProfile};
export const sampleComment={id:1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),body:'Nice',author:sampleProfile};
const mocked = vi.hoisted(() => ({ apiMock:{register:vi.fn(),login:vi.fn(),currentUser:vi.fn(),updateUser:vi.fn(),listArticles:vi.fn(),feed:vi.fn(),getArticle:vi.fn(),createArticle:vi.fn(),updateArticle:vi.fn(),deleteArticle:vi.fn(),favorite:vi.fn(),unfavorite:vi.fn(),comments:vi.fn(),addComment:vi.fn(),deleteComment:vi.fn(),tags:vi.fn(),profile:vi.fn(),follow:vi.fn(),unfollow:vi.fn()} }));
vi.mock('../api/client',()=>({ api:mocked.apiMock, setTokenProvider:vi.fn() }));
export const apiMock = mocked.apiMock;
export function resetApi(){ localStorage.clear(); Object.values(apiMock).forEach(fn=>fn.mockReset()); apiMock.currentUser.mockRejectedValue({}); apiMock.tags.mockResolvedValue({tags:['tag','react']}); apiMock.listArticles.mockResolvedValue({articles:[sampleArticle],articlesCount:1}); apiMock.feed.mockResolvedValue({articles:[],articlesCount:0}); apiMock.getArticle.mockResolvedValue({article:sampleArticle}); apiMock.comments.mockResolvedValue({comments:[sampleComment]}); apiMock.profile.mockResolvedValue({profile:sampleProfile}); }
export function renderApp(path='/'){ return render(<MantineProvider defaultColorScheme="light" theme={{primaryColor:'green'}}><MemoryRouter initialEntries={[path]}><AuthProvider><AppShell header={{height:64}} padding="md"><Header/><AppShell.Main><AppRoutes/></AppShell.Main></AppShell></AuthProvider></MemoryRouter></MantineProvider>); }
