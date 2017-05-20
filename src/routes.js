import DashView from './components/Dash.vue'
import AuthView from './components/Auth.vue'
import NotFoundView from './components/404.vue'

// Import Auth view
import LoginView from './components/auth/Login.vue'
import NewView from './components/auth/New.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import BlocksView from './components/views/Blocks.vue'
import TransactionsView from './components/views/Transactions.vue'
import PeersView from './components/views/Peers.vue'
import AssetsView from './components/views/Assets.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import PersonsView from './components/views/Persons.vue'
// Mail Views - Dash
import MailsView from './components/Mails.vue'
import InboxView from './components/mail/Inbox.vue'
import NewMailView from './components/mail/NewMail.vue'

// Routes
const routes = [
  {
    path: '/auth',
    component: AuthView,
    meta: {auth: false},
    children: [
      {
        path: '',
        component: LoginView,
        meta: {auth: false},
        beforeEnter: (to, from, next) => {
          var wallets = window.localStorage.getItem('wallets')
          if (wallets) {
            next()
          } else {
            next('/auth/new')
          }
        }
      }, {
        path: 'new',
        component: NewView,
        meta: {auth: false}
      }
    ]
  },
  {
    path: '/',
    component: DashView,
    meta: {auth: true},
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment', auth: true}
      }, {
        path: 'blocks',
        component: BlocksView,
        name: 'Blocks Explorer',
        meta: {description: 'Founded blocks', auth: true}
      }, {
        path: 'transactions',
        component: TransactionsView,
        name: 'Transactions',
        meta: {description: 'Transactions', auth: true}
      }, {
        path: 'peers',
        component: PeersView,
        name: 'Peers',
        meta: {description: 'Peers', auth: true}
      }, {
        path: 'assets',
        component: AssetsView,
        name: 'Assets',
        children: [
          {
            path: 'my',
            component: AssetsView,
            name: 'My Assets',
            meta: {description: 'My Assets', auth: true}
          }, {
            path: 'all',
            component: AssetsView,
            name: 'All Assets',
            meta: {description: 'All Assets', auth: true}
          }
        ]
      }, {
        path: 'mails',
        component: MailsView,
        children: [
          {
            path: '/',
            component: InboxView,
            name: 'Inbox',
            meta: {description: '', auth: true}
          }, {
            path: 'new',
            component: NewMailView,
            name: 'New Mail',
            meta: {description: '', auth: true}
          }
        ]
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline', auth: true}
      }, {
        path: 'persons',
        component: PersonsView,
        name: 'Persons',
        meta: {description: 'ERA persons', auth: true}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page', auth: true}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps', auth: true}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', auth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos', auth: true}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
