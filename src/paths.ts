export const paths = {
  home: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',
  auth: {
    custom: {
      signIn: '/auth/custom/sign-in',
      signUp: '/auth/custom/sign-up',
      resetPassword: '/auth/custom/reset-password',
    },
    auth0: {
      callback: '/auth/auth0/callback',
      signIn: '/auth/auth0/sign-in',
      signUp: '/auth/auth0/sign-up',
      signOut: '/auth/auth0/sign-out',
      profile: '/auth/auth0/profile',
    },
    cognito: {
      signIn: '/auth/cognito/sign-in',
      signUp: '/auth/cognito/sign-up',
      signUpConfirm: '/auth/cognito/sign-up-confirm',
      newPasswordRequired: '/auth/cognito/new-password-required',
      resetPassword: '/auth/cognito/reset-password',
      updatePassword: '/auth/cognito/update-password',
    },
    firebase: {
      signIn: '/auth/firebase/sign-in',
      signUp: '/auth/firebase/sign-up',
      resetPassword: '/auth/firebase/reset-password',
      recoveryLinkSent: '/auth/firebase/recovery-link-sent',
      updatePassword: '/auth/firebase/update-password',
    },
    supabase: {
      callback: { implicit: '/auth/supabase/callback/implicit', pkce: '/auth/supabase/callback/pkce' },
      signIn: '/auth/supabase/sign-in',
      signUp: '/auth/supabase/sign-up',
      signUpConfirm: '/auth/supabase/sign-up-confirm',
      resetPassword: '/auth/supabase/reset-password',
      recoveryLinkSent: '/auth/supabase/recovery-link-sent',
      updatePassword: '/auth/supabase/update-password',
    },
    samples: {
      signIn: { centered: '/auth/samples/sign-in/centered', split: '/auth/samples/sign-in/split' },
      signUp: { centered: '/auth/samples/sign-up/centered', split: '/auth/samples/sign-up/split' },
      updatePassword: {
        centered: '/auth/samples/update-password/centered',
        split: '/auth/samples/update-password/split',
      },
      resetPassword: { centered: '/auth/samples/reset-password/centered', split: '/auth/samples/reset-password/split' },
      verifyCode: { centered: '/auth/samples/verify-code/centered', split: '/auth/samples/verify-code/split' },
    },
  },
  dashboard: {
    overview: '/dashboard',
    settings: {
      account: '/dashboard/settings/account',
      billing: '/dashboard/settings/billing',
      integrations: '/dashboard/settings/integrations',
      notifications: '/dashboard/settings/notifications',
      security: '/dashboard/settings/security',
      team: '/dashboard/settings/team',
    },
    academy: { browse: '/dashboard/academy', details: (courseId: string) => `/dashboard/academy/courses/${courseId}` },
    analytics: '/dashboard/analytics',
    blank: '/dashboard/blank',
    blog: {
      list: '/dashboard/blog',
      details: (postId: string) => `/dashboard/blog/${postId}`,
      create: '/dashboard/blog/create',
    },
    calendar: '/dashboard/calendar',
    chat: {
      base: '/dashboard/chat',
      compose: '/dashboard/chat/compose',
      thread: (threadType: string, threadId: string) => `/dashboard/chat/${threadType}/${threadId}`,
    },
    crypto: '/dashboard/crypto',
    customers: {
      list: '/dashboard/customers',
      create: '/dashboard/customers/create',
      details: (customerId: string) => `/dashboard/customers/${customerId}`,
    },
    members: {
        list : '/dashboard/members',
        create: '/dashboard/members/create',
    },
    finance: {
      list : '/dashboard/finance/accounts',
      create: '/dashboard/finance/accounts/create',
  },
  invoice : {
      list: '/dashboard/invoice',
      create: '/dashboard/invoice/create'
  },
    eCommerce: '/dashboard/e-commerce',
    fileStorage: '/dashboard/file-storage',
    i18n: '/dashboard/i18n',
    invoices: {
      list: '/dashboard/invoices',
      create: '/dashboard/invoices/create',
      details: (invoiceId: string) => `/dashboard/invoices/${invoiceId}`,
    },
    jobs: {
      browse: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      companies: {
        overview: (companyId: string) => `/dashboard/jobs/companies/${companyId}`,
        reviews: (companyId: string) => `/dashboard/jobs/companies/${companyId}/reviews`,
        activity: (companyId: string) => `/dashboard/jobs/companies/${companyId}/activity`,
        team: (companyId: string) => `/dashboard/jobs/companies/${companyId}/team`,
        assets: (companyId: string) => `/dashboard/jobs/companies/${companyId}/assets`,
      },
    },
    logistics: { metrics: '/dashboard/logistics', fleet: '/dashboard/logistics/fleet' },
    mail: {
      list: (label: string) => `/dashboard/mail/${label}`,
      details: (label: string, emailId: string) => `/dashboard/mail/${label}/${emailId}`,
    },
    orders: {
      list: '/dashboard/orders',
      create: '/dashboard/orders/create',
      preview: (orderId: string) => `/dashboard/orders?previewId=${orderId}`,
      details: (orderId: string) => `/dashboard/orders/${orderId}`,
    },
    products: {
      list: '/dashboard/products',
      create: '/dashboard/products/create',
      preview: (productId: string) => `/dashboard/products?previewId=${productId}`,
      details: (productId: string) => `/dashboard/products/${productId}`,
    },
    social: {
      profile: { timeline: '/dashboard/social/profile', connections: '/dashboard/social/profile/connections' },
      feed: '/dashboard/social/feed',
    },
    tasks: '/dashboard/tasks',
  },
  pdf: { invoice: (invoiceId: string) => `/pdf/invoices/${invoiceId}` },
  components: {
    index: '/components',
    buttons: '/components/buttons',
    charts: '/components/charts',
    colors: '/components/colors',
    detailLists: '/components/detail-lists',
    forms: '/components/forms',
    gridLists: '/components/grid-lists',
    groupedLists: '/components/grouped-lists',
    inputs: '/components/inputs',
    modals: '/components/modals',
    quickStats: '/components/quick-stats',
    tables: '/components/tables',
    typography: '/components/typography',
  },
  notAuthorized: '/errors/not-authorized',
  notFound: '/errors/not-found',
  internalServerError: '/errors/internal-server-error',
  docs: 'https://material-kit-pro-react-docs.devias.io',
  purchase: 'https://mui.com/store/items/devias-kit-pro',
} as const;
