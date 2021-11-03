const routes = [
  {
    path: '/autenticacao',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'registro',
        name: 'Signup',
        component: () => import('pages/Signup.vue')
      },
      {
        path: 'esqueci-a-senha',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'alterar-senha',
        name: 'RecoverPassword',
        component: () => import('pages/RecoverPassword.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Home.vue')
      },
      {
        path: 'atleticas',
        name: 'Athletics',
        component: () => import('pages/Athletics.vue')
      },
      {
        path: 'campeonatos',
        name: 'Championships',
        component: () => import('pages/Championships.vue')
      },
      {
        path: 'jogos',
        name: 'Matches',
        component: () => import('pages/Matches.vue')
      },
      {
        path: 'jogadores',
        name: 'Players',
        component: () => import('pages/Players.vue')
      },
      {
        path: 'noticias',
        name: 'News',
        component: () => import('pages/News.vue')
      },
      {
        path: 'parceiros',
        name: 'Partners',
        component: () => import('pages/Partners.vue')
      },
      {
        path: 'usuarios',
        name: 'Users',
        component: () => import('pages/Users.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
