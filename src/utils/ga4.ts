import ReactGA from 'react-ga4';

export function gaInit(localhost?: boolean): void {
	// Skip initialize GA on localhost
	if (!localhost && (location.hostname == '127.0.0.1' || location.hostname == 'localhost')) {
		console.log('Google analytics is disabled on this host')
		return;
	}

	ReactGA.initialize('G-F9Y8FZ0KFE', {
		gtagOptions: {
			cookie_flags: 'max-age=7200;Secure=true;SameSite=none'
		},
		gaOptions: { cookieDomain: 'none' }
	});
}

export function gaEvent(category: string, action: string, label?: string, value?: number): void {
	ReactGA.event({
		category,
		action,
		label, // optional
		value, // optional, must be a number
		/* nonInteraction: true, // optional, true/false
		transport: 'xhr', // optional, beacon/xhr/image */
	});
}