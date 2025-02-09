export type LocaleData = {
    landing: {
        welcome: string;
        callout: string;
        home: string;
        features: string;
        contacts: string;
        feature_boxes: Record<string, { title: string; description: string }>;
    };
    generic: {
        friends: string;
        chats: string;
        signin: string;
        signup: string;
        logout: string;
    };
};
