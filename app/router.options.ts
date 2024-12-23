import type { RouterConfig } from '@nuxt/schema';
import scroll_to_element from './utils/scroll_to_element';

export default {
    scrollBehavior: async (to, _from, saved) => {
        if (to.hash) {
            scroll_to_element(to.hash);
            return {};
        }

        if (saved) {
            return saved;
        } else {
            return { top: 0 };
        }
    },
    scrollBehaviorType: 'smooth',
} satisfies RouterConfig;
