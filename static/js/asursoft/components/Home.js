// Home.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const changeLanguage = (locale) => {
        // Ваш код для изменения языка
    };

    return (
        <div>
            {/* Header / Navigační menu */}

            <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <a href='#' className='text-xl sm:text-2xl font-bold text-gray-900'>
                        Popnailscz
                    </a>
                    <button
                        className='sm:hidden text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md'
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className='w-6 h-6' />
                        )}
                    </button>
                    <nav
                        className={`${isMenuOpen ? 'block' : 'hidden'
                            } sm:block absolute top-full left-0 w-full bg-white sm:relative sm:w-auto sm:flex sm:items-center sm:space-x-4 p-0 sm:p-0 sm:shadow-none border-t border-gray-200 sm:border-0`}
                    >
                        <ul className='flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6'>
                            <li>
                                <a
                                    href='#about'
                                    className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    O nás
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#services'
                                    className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    Služby
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#faq'
                                    className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    Často kladené otázky
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#blog'
                                    className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#contacts'
                                    className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    Kontakty
                                </a>
                            </li>

                            {/* Social Media Icons */}
                            <li className='flex justify-center space-x-6 mt-4 sm:mt-0'>
                                <a
                                    href='https://wa.me/message/4KCKSARUH5V4G1'
                                    className='text-gray-600 hover:text-green-500'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='WhatsApp'
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} className='w-6 h-6' />
                                </a>
                                <a
                                    href='https://www.instagram.com/popnails.cz?igsh=MXczaDZqd2Y2Zmo1eA=='
                                    className='text-gray-600 hover:text-purple-500'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='Instagram'
                                >
                                    <FontAwesomeIcon icon={faInstagram} className='w-6 h-6' />
                                </a>
                                <a
                                    href='https://www.facebook.com/profile.php?id=61557978369758'
                                    className='text-gray-600 hover:text-pink-500'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='Facebook'
                                >
                                    <FontAwesomeIcon icon={faFacebookF} className='w-6 h-6' />
                                </a>
                            </li>

                            <button className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                onClick={() => changeLanguage('cz')}>CZ</button>
                            <button className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                onClick={() => changeLanguage('en')}>EN</button>
                            <button className='text-lg sm:text-base text-gray-700 hover:text-pink-500 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                onClick={() => changeLanguage('ru')}>RU</button>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Hero Sekce / Hlavní sekce s pozadím */}
            <section
                className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/background_manicure.jpg')`,
                    backgroundColor: '#f0f0f0' // Zobrazuje se při chybě načtení pozadí
                }}
            >
                <div className='relative z-10 text-center px-2 sm:px-4'>
                    <h1 className='text-4xl sm:text-6xl font-bold mb-4 text-shadow'>
                        Popnailscz — Manikúra a Pedikúra v Praze
                    </h1>
                    <p className='mt-4 text-lg sm:text-xl mb-8 text-shadow'>
                        Vaše spokojenost, naše mise
                    </p>
                    <a
                        href='https://n995838.alteg.io'
                        className='mt-8 px-10 py-3 sm:px-20 sm:py-4 bg-pink-500 text-white text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-pink-700'
                    >
                        Objednat se online
                    </a>
                </div>
            </section>
            {/* Sekce s recenzemi */}
            <section id='reviews' className='py-6 sm:py-12 bg-gray-100 text-center'>
                <h2 className='text-4xl font-extrabold text-gray-800 mb-6'>Recenze</h2>
                <div className='flex flex-col items-center justify-center'>
                    <div className='swiper-container max-w-lg md:max-w-4xl mx-auto'>
                        <div className='swiper-wrapper flex flex-wrap space-y-2'>
                            <div className='swiper-slide p-4 bg-white rounded-lg shadow-md'>
                                <p className='text-gray-600 text-sm md:text-base'>
                                    &quot;Děkuji, Oksano, za skvělou manikúru! Doporučuji tento
                                    salon!&quot;
                                </p>
                                <p className='mt-4 text-right text-gray-800 font-semibold'>
                                    — Iana
                                </p>
                            </div>
                            <div className='swiper-slide p-4 bg-white rounded-lg shadow-md'>
                                <p className='text-gray-600 text-sm md:text-base'>
                                    &quot;Skvělé studio! Manikúra provedena rychle a kvalitně!
                                    Děkuji!&quot;
                                </p>
                                <p className='mt-4 text-right text-gray-800 font-semibold'>
                                    — Elizaveta
                                </p>
                            </div>
                        </div>
                    </div>
                    <a
                        href='https://g.page/r/CSsdh2Z8qCl1EBE/review'
                        className='mt-6 inline-block px-8 py-3 bg-pink-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105'
                    >
                        Zanechte recenzi
                    </a>
                </div>
            </section>

            {/* Často kladené otázky (FAQ) Sekce */}
            <section id='faq' className='py-8 sm:py-16 bg-white text-center'>
                <h2 className='text-5xl font-extrabold text-gray-800 mb-8'>Často kladené otázky</h2>
                <div className='mt-8 max-w-3xl mx-auto text-left px-4 sm:px-8'>
                    <details className='mb-4 border-b border-gray-300 pb-4'>
                        <summary className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700 cursor-pointer'>
                            Jaké služby nabízíte a jaké máte možnosti lakování nehtů?
                        </summary>
                        <p className='mt-2 text-gray-600'>
                            Nabízíme širokou škálu služeb, včetně klasické, přístrojové a kombinované manikúry a pedikúry.
                        </p>
                    </details>
                    <details className='mb-4 border-b border-gray-300 pb-4'>
                        <summary className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700 cursor-pointer'>
                            Jaká je cena služeb a máte nějaké speciální nabídky?
                        </summary>
                        <p className='mt-2 text-gray-600'>
                            Ceny závisí na druhu služby. Pravidelně nabízíme speciální akce, sledujte nás na webu nebo na sociálních sítích.
                        </p>
                    </details>
                    <details className='mb-4 border-b border-gray-300 pb-4'>
                        <summary className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700 cursor-pointer'>
                            Máte volné termíny na určitý den/čas?
                        </summary>
                        <p className='mt-2 text-gray-600'>
                            Zavolejte nám nebo napište, a společně najdeme volný termín.
                        </p>
                    </details>
                    <details className='mb-4 border-b border-gray-300 pb-4'>
                        <summary className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700 cursor-pointer'>
                            Jak dlouho trvá procedura?
                        </summary>
                        <p className='mt-2 text-gray-600'>
                            Záleží na konkrétní službě. Manikúra trvá 45 minut, gel lak až 1,5 hodiny.
                        </p>
                    </details>
                    <details className='mb-4 border-b border-gray-300 pb-4'>
                        <summary className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700 cursor-pointer'>
                            Jaká opatření přijímáte pro hygienu a bezpečnost?
                        </summary>
                        <p className='mt-2 text-gray-600'>
                            Dbáme na maximální hygienu, všechny nástroje jsou sterilizovány po každém použití.
                        </p>
                    </details>
                </div>
            </section>

            {/* Blog Sekce */}
            <section id='blog' className='py-8 sm:py-16 bg-gray-100 text-center'>
                <h2 className='text-5xl font-extrabold text-gray-800 mb-8'>Blog</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
                    <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
                        <h3 className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700'>
                            Trendy manikúry
                        </h3>
                        <p className='mt-4 text-gray-600'>
                            Dozvíte se o nejnovějších trendech v oblasti manikúry a pedikúry.
                        </p>
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
                        <h3 className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700'>
                            Jak vybrat barvu?
                        </h3>
                        <p className='mt-4 text-gray-600'>
                            Tipy pro výběr barvy laku na nehty.
                        </p>
                    </div>
                </div>
            </section>
            {/* Kontakty Sekce */}
            <section id='contacts' className='py-6 sm:py-12 bg-pink-100 text-center'>
                <h2 className='text-4xl font-extrabold text-gray-800 mb-6 text-center'>Kontakty</h2>

                <div className='flex justify-center mb-6'>
                    <div className='w-full max-w-xl'>
                        <div className='mb-4'>
                            <p className='text-lg text-gray-600'>
                                Kovářská 549/12, 190 00 Praha 9, Česká republika
                            </p>
                            <p className='text-lg text-gray-600'>Telefon: +420770649757</p>
                        </div>

                        <div className='mb-4'>
                            <p className='text-lg text-gray-600'>
                                <strong>Pracovní doba:</strong><br />
                                Pondělí: 9:00 - 20:00<br />
                                Středa: 9:00 - 20:00<br />
                                Čtvrtek: 9:00 - 20:00<br />
                                Sobota: 9:00 - 20:00
                            </p>
                        </div>

                        <div className='mb-4'>
                            <p className='text-lg text-gray-600'>
                                <strong>Majitelka podniku:</strong><br />
                                Fronek Oksana<br />
                                IČO 21429766
                            </p>
                        </div>
                    </div>
                </div>

                {/* Google Maps iframe */}
                <div className='mt-6'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1150.8866804480301!2d14.49033183444746!3d50.10688399427101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bed0c618eb39d%3A0x7529a87c66871d2b!2sPopnailscz!5e0!3m2!1scs!2sus!4v1726827052128!5m2!1scs!2sus'
                        width='100%'
                        height='500'
                        loading='lazy'
                        className='w-full h-96 lg:h-[600px] rounded-lg shadow-lg'
                    ></iframe>
                </div>
            </section>

            {/* Další sekce s tlačítkem */}
            <section
                className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 text-center py-16'
            >
                <h2 className='text-5xl sm:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow-lg'>
                    Chcete se objednat hned teď?
                </h2>
                <p className='text-gray-700 text-xl sm:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md'>
                    Rezervujte si termín manikúry nebo pedikúry v Popnailscz právě teď!
                </p>
                <a
                    href='https://n995838.alteg.io'
                    className='px-12 py-4 sm:px-24 sm:py-6 bg-pink-500 text-white text-lg sm:text-2xl font-semibold rounded-lg shadow-xl hover:bg-pink-700 transition-transform transform hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-md mx-auto'
                >
                    Objednat se online
                </a>
            </section>



            {/* Footer */}
            <footer className='py-2 sm:py-4 bg-gray-900 text-white'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left'>
                    <p className='mb-4 sm:mb-0'>&copy; 2024 Popnailscz. Všechna práva vyhrazena.</p>
                    <div className='flex justify-center sm:justify-start space-x-6'>
                        <a
                            href='https://www.facebook.com/profile.php?id=61557978369758'
                            className='text-white hover:text-blue-500'
                        >
                            <FontAwesomeIcon icon={faFacebookF} className='w-5 h-5' />
                        </a>
                        <a
                            href='https://www.instagram.com/popnails.cz?igsh=MXczaDZqd2Y2Zmo1eA=='
                            className='text-white hover:text-blue-500'
                        >
                            <FontAwesomeIcon icon={faInstagram} className='w-5 h-5' />
                        </a>
                        <a
                            href='https://wa.me/message/4KCKSARUH5V4G1'
                            className='text-white hover:text-blue-500'
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className='w-5 h-5' />
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
