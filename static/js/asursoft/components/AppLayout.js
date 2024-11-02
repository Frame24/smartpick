// AppLayout.js
import React from 'react';
import { Helmet } from 'react-helmet';

export default function AppLayout({ children }) {
    return (
        <html lang="cs">
            <Helmet>
                <title>Popnailscz - Manikúra a pedikúra v Praze</title>
                <meta name="description" content="Popnailscz – profesionální služby manikúry a pedikúry v centru Prahy." />
                <meta name="keywords" content="manikúra Praha, pedikúra Praha, nehtové studio, Popnailscz" />
                {/* Другие метатеги */}
            </Helmet>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
