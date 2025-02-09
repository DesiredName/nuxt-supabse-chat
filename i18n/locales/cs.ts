import type { LocaleData } from '~~/types/locale';

export default {
    landing: {
        welcome: 'Vítejte na {app_name}',
        callout: 'Váš nový způsob online chatu. Rychlé, bezpečné a spolehlivé.',
        home: 'Domů',
        features: 'Funkce',
        contacts: 'Kontakty',
        feature_boxes: {
            f1: {
                title: 'Rychlý a spolehlivý',
                description:
                    'Zažijte bleskurychlé doručování zpráv s vysokou úrovní spolehlivosti pro vaše každodenní chaty.',
            },
            f2: {
                title: 'Snadná komunikace',
                description:
                    'Najděte přátele, připojte se ke skupinám, sdílejte soubory a dokumenty - to vše v jednom uživatelsky přívětivém rozhraní.',
            },
            f3: {
                title: 'Bezpečnost především',
                description:
                    'Šifrování end-to-end zajišťuje, že vaše soukromé konverzace zůstanou právě tak soukromé.',
            },
            f4: {
                title: 'Přizpůsobitelné motivy',
                description:
                    'Udělejte si {app_name} svůj díky plně přizpůsobitelným motivům a rozvržením, které odpovídají vašemu osobnímu stylu.',
            },
            f5: {
                title: 'Cross-Platform',
                description:
                    'Chatujte na jakémkoli zařízení. Podporujeme všechny hlavní platformy: počítače, mobilní zařízení a web.',
            },
            f6: {
                title: 'Bezproblémová integrace',
                description:
                    'Snadná integrace s dalšími aplikacemi a službami, díky které bude váš pracovní proces plynulejší a efektivnější.',
            },
        },
    },
    generic: {
        friends: 'Přátelé',
        chats: 'Chaty',
        signin: 'Přihlásit se',
        signup: 'Zaregistrovat se',
        logout: 'Odhlásit',
    },
} satisfies LocaleData;
