export type Page = "home" | "apply" | "thank-you";
export interface PageState {
  type?: "institute" | "university";
}

interface NavStore {
  page: Page;
  state: PageState;
  listeners: Array<() => void>;
}

const store: NavStore = {
  page: "home",
  state: {},
  listeners: [],
};

export function navigate(page: Page, state: PageState = {}) {
  store.page = page;
  store.state = state;
  window.scrollTo({ top: 0, behavior: "smooth" });
  store.listeners.forEach((fn) => fn());
}

export function getNavState() {
  return { page: store.page, state: store.state };
}

export function subscribeNav(fn: () => void) {
  store.listeners.push(fn);
  return () => {
    const idx = store.listeners.indexOf(fn);
    if (idx > -1) store.listeners.splice(idx, 1);
  };
}

export function useNavigate() {
  return {
    go: navigate,
  };
}
