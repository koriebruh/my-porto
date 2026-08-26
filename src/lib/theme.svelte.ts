type Theme = 'light' | 'dark';

function initial(): Theme {
	if (typeof document === 'undefined') return 'light';
	const attr = document.documentElement.getAttribute('data-theme');
	return attr === 'dark' ? 'dark' : 'light';
}

export const themeState = $state({ current: initial() });

export function toggleTheme() {
	themeState.current = themeState.current === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', themeState.current);
	localStorage.setItem('theme', themeState.current);
	window.dispatchEvent(new CustomEvent('themechange', { detail: themeState.current }));
}
