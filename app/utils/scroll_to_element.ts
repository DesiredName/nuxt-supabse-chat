export default function scroll_to_element(hash: string) {
    const el = document.getElementById(hash.slice(1));

    if (el != null) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}
