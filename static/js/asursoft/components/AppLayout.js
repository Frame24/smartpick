// AppLayout.js
import React from 'react';
import { Helmet } from 'react-helmet';

export default function AppLayout({ children }) {
    return (
        <div>
            <Helmet>
                <title>АСУРСОФТ - Разработка IT-решений с использованием Искусственного интеллекта</title>
                <meta name="description" content="АСУРСОФТ – профессиональная разработка IT-решений с использованием Искусственного интеллекта." />
                <meta name="keywords" content="IT-решения, искусственный интеллект, АСУРСОФТ, разработка" />
                {/* Другие метатеги */}
            </Helmet>
            <body className="antialiased">
                {children}
            </body>
        </div>
    );
}
