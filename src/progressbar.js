import NProgress from 'nprogress';
import auth from '@/auth'
const progressShowDelay = 100;
let routeResolved = false;
/**
 * Initializes NProgress after a specified delay only if the route was not resolved yet.
 */
function tryInitProgress() {
  routeResolved = false;
  setTimeout(()=> {
    if (!routeResolved) {
      NProgress.start();
    }
  }, progressShowDelay);
}
export default function initProgress(router) {
  router.beforeEach((to, from, next) => {
    console.log(JSON.stringify(to.meta));
    if (to.meta.auth && !auth.user.authenticated) {
      return next('Login');
    } else {
      tryInitProgress();
      return next();
    }
  });

  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    routeResolved = true;
    NProgress.done();
  });
}
