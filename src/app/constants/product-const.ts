export type ApiStatus = 'live' | 'early' | 'soon';

/** Public API availability. Flip to 'live' when the public API ships — drives home and pricing copy. */
export const API_STATUS: ApiStatus = 'soon';

/** "New: Buy button" pill above the home page H1. Set to false to remove it. */
export const SHOW_BUY_BUTTON_ANNOUNCEMENT = false;
