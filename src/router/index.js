import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import Login from "../views/Login.vue";
import Tasks from "../views/tasks/Tasks.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/Tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/jobs/:id",
  //   name: "JobDetails",
  //   component: JobDetails,
  //   props: true,
  // },
  // redirect
  // {
  //   path: "/all-jobs",
  //   redirect: "/jobs",
  // },
  // 404 catchall
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
