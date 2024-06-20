import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Tree from '../views/Tree.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id?',
    name: 'Product',
    component: Product,
    props: true
  },
  {
    path: '/tree',
    name: 'Tree',
    component: Tree
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
