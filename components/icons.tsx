import React from 'react';

const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">{children}</svg>
);

export const WebAppIcon = () => <Icon><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"></path></Icon>;
export const MobileAppIcon = () => <Icon><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></Icon>;
export const ApiIcon = () => <Icon><path d="M12 8V4H8" /><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 12h4" /><path d="M12 16h4" /><path d="M8 12h.01" /><path d="M8 16h.01" /></Icon>;
export const DesktopAppIcon = () => <Icon><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></Icon>;
export const GameIcon = () => <Icon><path d="M3.85 3.85a2.121 2.121 0 0 1 3 0L12 9l5.15-5.15a2.121 2.121 0 0 1 3 0l2.12 2.12a2.121 2.121 0 0 1 0 3L17 12l5.15 5.15a2.121 2.121 0 0 1 0 3l-2.12 2.12a2.121 2.121 0 0 1-3 0L12 17l-5.15 5.15a2.121 2.121 0 0 1-3 0l-2.12-2.12a2.121 2.121 0 0 1 0-3L7 12 1.85 6.85a2.121 2.121 0 0 1 0-3z" /></Icon>;
export const AiIcon = () => <Icon><path d="M9.5 13.5c.31.25.65.44.91.7.4.37.98.37 1.38 0 .26-.26.6-.45.91-.7" /><path d="M12 11.5v-2" /><path d="M12 2a10 10 0 1 0 10 10" /><path d="M16.5 16.5c-1.33-2.17-2.5-3-2.5-3s-1.17.83-2.5 3" /><path d="M8 11.5c.5-.5 1.5-1 1.5-1" /><path d="M14.5 10.5c.5.5 1.5 1 1.5 1" /></Icon>;
export const DataIcon = () => <Icon><path d="M3 3v18h18" /><path d="M18.7 8a2.4 2.4 0 0 0-2.4-2.4H13.6a2.4 2.4 0 0 0-2.4 2.4V11a2.4 2.4 0 0 0 2.4 2.4h2.7a2.4 2.4 0 0 1 2.4 2.4V17a2.4 2.4 0 0 1-2.4 2.4h-2.7a2.4 2.4 0 0 1-2.4-2.4" /></Icon>;
export const EcommerceIcon = () => <Icon><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></Icon>;
export const SaasIcon = () => <Icon><path d="m12 2-7 5 7 5 7-5Z" /><path d="m5 7 7 5 7-5" /><path d="m5 12 7 5 7-5" /></Icon>;
export const MarketplaceIcon = () => <Icon><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7" /></Icon>;
export const CopyIcon = () => <Icon><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></Icon>;
export const CheckIcon = () => <Icon><polyline points="20 6 9 17 4 12"></polyline></Icon>;
export const EditIcon = () => <Icon><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></Icon>;
export const SunIcon = () => <Icon><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></Icon>;
export const MoonIcon = () => <Icon><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></Icon>;
export const ArrowLeftIcon = () => <Icon><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></Icon>;
export const ArrowRightIcon = () => <Icon><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></Icon>;
export const CheckCircleIcon = () => <Icon><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Icon>;
export const TrashIcon = () => <Icon><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></Icon>;
export const SaveIcon = () => <Icon><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></Icon>;
export const SparklesIcon = () => <Icon><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></Icon>;
export const SettingsIcon = () => <Icon><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Icon>;
