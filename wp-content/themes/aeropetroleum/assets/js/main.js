/* ==================================================
   GUÍA RÁPIDA DEL ARCHIVO
   01. Header, menú, hero y animaciones de entrada
   02. Navegación principal
   03. Galerías de servicios
   04. Pestañas de Acerca de nosotros
   05. Carrusel de certificaciones
   06. Pestañas y galerías del Manual de marca
================================================== */

/* 01. HEADER, MENÚ, HERO Y ANIMACIONES */
document.addEventListener('DOMContentLoaded',()=>{
 const header=document.getElementById('site-header');
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.getElementById('main-nav');
 const onScroll=()=>header&&header.classList.toggle('scrolled',window.scrollY>35);
 onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
 if(toggle&&nav) toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'));document.body.classList.toggle('menu-open',nav.classList.contains('open'))});
 document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.classList.remove('menu-open');toggle&&toggle.setAttribute('aria-expanded','false')}));
 const slides=[...document.querySelectorAll('.hero-slide')];
 const dots=[...document.querySelectorAll('.hero-dot')];
 const prev=document.querySelector('.hero-arrow--prev');
 const next=document.querySelector('.hero-arrow--next');
 let currentSlide=0;
 let carouselTimer;
 const showSlide=index=>{
   if(!slides.length)return;
   currentSlide=(index+slides.length)%slides.length;
   slides.forEach((slide,i)=>slide.classList.toggle('active',i===currentSlide));
   dots.forEach((dot,i)=>dot.classList.toggle('active',i===currentSlide));
 };
 const startCarousel=()=>{
   window.clearInterval(carouselTimer);
   if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){carouselTimer=window.setInterval(()=>showSlide(currentSlide+1),6000);}
 };
 prev&&prev.addEventListener('click',()=>{showSlide(currentSlide-1);startCarousel()});
 next&&next.addEventListener('click',()=>{showSlide(currentSlide+1);startCarousel()});
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>{showSlide(i);startCarousel()}));
 showSlide(0);startCarousel();
 if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
	});

/* MEJORAR MENÚ PRINCIPAL */
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.main-nav ul');

  if (!menu) return;

  const enlaces = Array.from(menu.querySelectorAll('a'));
  const enlaceContacto = enlaces.find(function (enlace) {
    return enlace.getAttribute('href')?.includes('#contacto');
  });

  /* Agregar Certificaciones antes de Contacto */
  const yaExisteCertificaciones = enlaces.some(function (enlace) {
    return enlace.textContent.trim().toLowerCase() === 'certificaciones';
  });

  if (!yaExisteCertificaciones && enlaceContacto) {
    const nuevoElemento = document.createElement('li');
    nuevoElemento.classList.add('menu-certificaciones');

    nuevoElemento.innerHTML =
      '<a href="#certificaciones">Certificaciones</a>';

    enlaceContacto.closest('li').before(nuevoElemento);
  }

  /* Convertir Contacto en botón */
  if (enlaceContacto) {
    enlaceContacto.textContent = 'Contáctenos';
    enlaceContacto.classList.add('menu-contact-button');
  }
});


/* ==================================================
   ICONOS Y GALERÍAS DE SERVICIOS
   ================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const tarjetas = document.querySelectorAll('#servicios .card');
  const logoTema = document.querySelector('.brand img');

  if (!tarjetas.length || !logoTema) return;

  const temaBase = logoTema.src.split('/assets/')[0];

  const servicios = [
    {
      icono: 'consultoria.png',
      titulo: 'Consultoría técnica',
      fotografias: [
        'servicios/consultoria/5167906956851743930_121.jpg',
        'servicios/consultoria/PHOTO-2026-07-22-19-10-06 35.jpg',
        'servicios/consultoria/PHOTO-2026-07-22-19-10-06 37.jpg'
      ]
    },
    {
      icono: 'auditoria.png',
      titulo: 'Auditorías',
      fotografias: [
        'servicios/auditorias/5167906956851743930_121.jpg',
        'servicios/auditorias/PHOTO-2026-07-22-19-08-59 32.jpg',
        'servicios/auditorias/PHOTO-2026-07-22-19-10-06 53.jpg'
      ]
    },
    {
      icono: 'verificacion.png',
      titulo: 'Verificación',
      fotografias: [
        'servicios/verificacion/PHOTO-2026-07-22-19-10-06 39.jpg',
        'servicios/verificacion/PHOTO-2026-07-22-19-10-06 48.jpg',
        'servicios/verificacion/PHOTO-2026-07-22-19-10-06 51.jpg'
      ]
    },
    {
      icono: 'inspeccion-ndt.png',
      titulo: 'Inspecciones END',
      fotografias: [
        'servicios/inspeccion/5167906956851743860_121.jpg_2K_202608230135.jpeg',
        'servicios/inspeccion/5167906956851743915_121.jpg',
        'servicios/inspeccion/5167906956851743924_121.jpg',
        'servicios/inspeccion/ChatGPT Image 22 ago 2026, 02_16_18 a.m..png',
        'servicios/inspeccion/PHOTO-2026-07-22-19-10-06 25.jpg',
        'servicios/inspeccion/PHOTO-2026-07-22-19-10-06 27.jpg',
        'servicios/inspeccion/PHOTO-2026-07-22-19-10-06 36.jpg'
      ]
    }
  ];

  /* Crear ventana de galería */
  const modal = document.createElement('div');

  modal.className = 'service-gallery-modal';
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="service-gallery-backdrop"></div>

    <div
      class="service-gallery-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-gallery-title"
    >
      <button
        class="service-gallery-close"
        type="button"
        aria-label="Cerrar galería"
      >
        &times;
      </button>

      <h3 id="service-gallery-title"></h3>

      <div class="service-gallery-viewer">
        <button
          class="service-gallery-arrow service-gallery-prev"
          type="button"
          aria-label="Fotografía anterior"
        >
          &#10094;
        </button>

        <img
          class="service-gallery-image"
          src=""
          alt=""
        >

        <button
          class="service-gallery-arrow service-gallery-next"
          type="button"
          aria-label="Fotografía siguiente"
        >
          &#10095;
        </button>
      </div>

      <div class="service-gallery-footer">
        <span class="service-gallery-counter"></span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const modalTitulo = modal.querySelector('#service-gallery-title');
  const modalImagen = modal.querySelector('.service-gallery-image');
  const modalContador = modal.querySelector('.service-gallery-counter');
  const cerrar = modal.querySelector('.service-gallery-close');
  const fondo = modal.querySelector('.service-gallery-backdrop');
  const anterior = modal.querySelector('.service-gallery-prev');
  const siguiente = modal.querySelector('.service-gallery-next');

  let galeriaActual = [];
  let indiceActual = 0;
  let tituloActual = '';

  function rutaImagen(ruta) {
    return temaBase + '/assets/images/' + ruta;
  }

  function mostrarFotografia(indice) {
    if (!galeriaActual.length) return;

    indiceActual =
      (indice + galeriaActual.length) % galeriaActual.length;

    modalImagen.src = rutaImagen(galeriaActual[indiceActual]);
    modalImagen.alt =
      tituloActual + ' - fotografía ' + (indiceActual + 1);

    modalContador.textContent =
      (indiceActual + 1) + ' de ' + galeriaActual.length;
  }

  function abrirGaleria(servicio) {
    galeriaActual = servicio.fotografias;
    tituloActual = servicio.titulo;
    indiceActual = 0;

    modalTitulo.textContent = servicio.titulo;
    mostrarFotografia(0);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-open');
    cerrar.focus();
  }

  function cerrarGaleria() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-open');
  }

  /* Incorporar iconos y botones en las tarjetas */
  tarjetas.forEach(function (tarjeta, indice) {
    const servicio = servicios[indice];
    const numero = tarjeta.querySelector('.card-icon');

    if (!servicio) return;

    if (numero) {
      numero.innerHTML = `
        <img
          src="${temaBase}/assets/images/icons/${servicio.icono}"
          alt=""
          aria-hidden="true"
        >
      `;
    }

    const boton = document.createElement('button');

    boton.type = 'button';
    boton.className = 'service-gallery-button';
    boton.textContent = 'Ver fotografías';

    boton.addEventListener('click', function () {
      abrirGaleria(servicio);
    });

    tarjeta.appendChild(boton);
  });

  cerrar.addEventListener('click', cerrarGaleria);
  fondo.addEventListener('click', cerrarGaleria);

  anterior.addEventListener('click', function () {
    mostrarFotografia(indiceActual - 1);
  });

  siguiente.addEventListener('click', function () {
    mostrarFotografia(indiceActual + 1);
  });

  document.addEventListener('keydown', function (evento) {
    if (!modal.classList.contains('open')) return;

    if (evento.key === 'Escape') cerrarGaleria();
    if (evento.key === 'ArrowLeft') mostrarFotografia(indiceActual - 1);
    if (evento.key === 'ArrowRight') mostrarFotografia(indiceActual + 1);
  });
});

/* ==================================================
   SECCIÓN NOSOTROS CON PESTAÑAS
================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const nosotros = document.querySelector("#nosotros");
    if (!nosotros) return;

    /* Obtiene automáticamente la dirección del tema */
    const imagenExistente = nosotros.querySelector("img");
    const rutaImagenes = imagenExistente
        ? imagenExistente.src.replace(/[^/]+$/, "")
        : "/wp-content/themes/aeropetroleum/assets/images/";
	
	const rutaCertificados = rutaImagenes.replace(
    /images\/?$/,
    "certificaciones/"
);

    nosotros.innerHTML = `
        <div class="container ap-nosotros">

            <div class="ap-nosotros-encabezado">
                <span class="eyebrow">AEROPETROLEUM</span>
                <h2>Acerca de nosotros</h2>
            </div>

            <div class="ap-tabs" role="tablist">
                <button class="ap-tab active" data-panel="ap-quienes">
                    Quiénes somos
                </button>

                <button class="ap-tab" data-panel="ap-equipo">
                    Nuestro equipo
                </button>

                <button class="ap-tab" data-panel="ap-certificaciones">
                    Certificaciones
                </button>
            </div>

            <div class="ap-panel active" id="ap-quienes">
                <div class="ap-institucional">

                    <div class="ap-institucional-imagen">
                        <img
                            src="${rutaImagenes}sector.jpg"
                            alt="Equipo y sectores de AeroPetroleum"
                        >
                    </div>

                    <div class="ap-institucional-contenido">
                        <h3>Quiénes somos</h3>

                        <p>
                            En <strong>AeroPetroleum</strong> nos especializamos en consultoría técnica, auditorías, verificación e inspecciones mediante ensayos no destructivos. Brindamos soluciones confiables que contribuyen a garantizar la seguridad, la calidad y el cumplimiento normativo en los sectores aeronáutico y petrolero.
                        </p>

                        <div class="ap-valores">
                            <span>Seguridad</span>
                            <span>Cumplimiento normativo</span>
                            <span>Responsabilidad</span>
                            <span>Ética</span>
                        </div>

                        <div class="ap-mision-vision">
                            <article>
                                <span>01</span>
                                <div>
                                    <h4>Misión</h4>
                                    <p>
Brindar soluciones especializadas para los sectores aeronáutico y petrolero, enfocadas en la seguridad, la calidad y el cumplimiento normativo, mediante personal capacitado y tecnología especializada.
                                    </p>
                                </div>
                            </article>

                            <article>
                                <span>02</span>
                                <div>
                                    <h4>Visión</h4>
                                    <p>
Ser una empresa líder en Bolivia y un referente regional, reconocida por su excelencia técnica, innovación y capacidad para responder a las necesidades del mercado.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>

                </div>
            </div>

            <div class="ap-panel" id="ap-equipo">
                <div class="ap-equipo-intro">
                    <span class="eyebrow">EXPERIENCIA Y ESPECIALIZACIÓN</span>
                    <h3>Nuestro equipo</h3>
                    <p>
Profesionales comprometidos con la seguridad, la precisión técnica y el cumplimiento normativo.
                    </p>
                </div>

                <div class="ap-equipo-grid">

                    <article class="ap-persona">
                        <div class="ap-persona-foto">
                            <img
                                src="${rutaImagenes}gustavo-godoy.png"
                                alt="Gustavo Godoy"
                            >
                        </div>
                        <div class="ap-persona-info">
                            <h4>Gustavo Godoy</h4>
                            <span>Auditor técnico</span>
                            <a href="https://wa.me/59178044480"
                               target="_blank"
                               rel="noopener">
                                Contactar
                            </a>
                        </div>
                    </article>

                    <article class="ap-persona">
                        <div class="ap-persona-foto">
                            <img
                                src="${rutaImagenes}brandon-severich.png"
                                alt="Brandon Severich"
                            >
                        </div>
                        <div class="ap-persona-info">
                            <h4>Brandon Severich</h4>
                            <span>Técnico e inspector en END</span>
                            <a href="https://wa.me/59178045057"
                               target="_blank"
                               rel="noopener">
                                Contactar
                            </a>
                        </div>
                    </article>

                    <article class="ap-persona">
                        <div class="ap-persona-foto">
                            <img
                                src="${rutaImagenes}darlyn-urgel.png"
                                alt="Darlyn Urgel"
                            >
                        </div>
                        <div class="ap-persona-info">
                            <h4>Darlyn Urgel</h4>
                            <span>Consultora técnica</span>
                            <a href="https://wa.me/59173135428"
                               target="_blank"
                               rel="noopener">
                                Contactar
                            </a>
                        </div>
                    </article>

                    <article class="ap-persona">
                        <div class="ap-persona-foto">
                            <img
                                src="${rutaImagenes}cirilo-godoy.png"
                                alt="Cirilo Godoy"
                            >
                        </div>
                        <div class="ap-persona-info">
                            <h4>Cirilo Godoy</h4>
                            <span>Especialista en verificación técnica</span>
                            <a href="https://wa.me/59167715116"
                               target="_blank"
                               rel="noopener">
                                Contactar
                            </a>
                        </div>
                    </article>

                </div>
            </div>

            <div class="ap-panel" id="ap-certificaciones">

    <div class="ap-certificados-encabezado">
        <span class="eyebrow">RESPALDO PROFESIONAL</span>
        <h3>Certificaciones y documentación técnica</h3>
        <p>
            Conoce las certificaciones, habilitaciones y documentos
            que respaldan nuestra experiencia profesional.
        </p>
    </div>

    <div class="ap-certificados-carrusel">

        <button
            class="ap-cert-flecha ap-cert-anterior"
            type="button"
            aria-label="Certificado anterior"
        >
            &#10094;
        </button>

        <div class="ap-certificados-ventana">

            <article class="ap-certificado active">
                <div class="ap-certificado-documento">
                    <iframe
                        src="${rutaCertificados}certificados-gustavo.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Certificados técnicos de Gustavo Godoy"
                        loading="lazy">
                    </iframe>
                </div>

                <div class="ap-certificado-info">
                    <span>01 / Certificación profesional</span>
                    <h4>Certificados técnicos END</h4>
                    <p>
Certificaciones profesionales relacionadas con la inspección y los ensayos no destructivos.
                    </p>
                    <a
                        href="${rutaCertificados}certificados-gustavo.pdf"
                        target="_blank"
                        rel="noopener"
                    >
                        Ver documento completo ↗
                    </a>
                </div>
            </article>

            <article class="ap-certificado">
                <div class="ap-certificado-documento">
                    <iframe
                        src="${rutaCertificados}certificados-brandon.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Certificados técnicos de Brandon Severich"
                        loading="lazy">
                    </iframe>
                </div>

                <div class="ap-certificado-info">
                    <span>02 / Certificación profesional</span>
                    <h4>Certificación de inspección END</h4>
                    <p>
Documentación técnica que respalda su formación y experiencia en inspección.
                    </p>
                    <a
                        href="${rutaCertificados}certificados-brandon.pdf"
                        target="_blank"
                        rel="noopener"
                    >
                        Ver documento completo ↗
                    </a>
                </div>
            </article>

            <article class="ap-certificado">
                <div class="ap-certificado-documento">
                    <iframe
                        src="${rutaCertificados}certificado-organizacion.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Certificado de organización de mantenimiento"
                        loading="lazy">
                    </iframe>
                </div>

                <div class="ap-certificado-info">
                    <span>03 / Respaldo institucional</span>
                    <h4>Organización de mantenimiento aprobada</h4>
                    <p>
                        Certificación institucional emitida por la
                        autoridad aeronáutica correspondiente.
                    </p>
                    <a
                        href="${rutaCertificados}certificado-organizacion.pdf"
                        target="_blank"
                        rel="noopener"
                    >
                        Ver documento completo ↗
                    </a>
                </div>
            </article>

            <article class="ap-certificado">
                <div class="ap-certificado-documento">
                    <iframe
                        src="${rutaCertificados}lista-capacidades.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Lista de capacidades técnicas"
                        loading="lazy">
                    </iframe>
                </div>

                <div class="ap-certificado-info">
                    <span>04 / Capacidades técnicas</span>
                    <h4>Lista de capacidades aprobadas</h4>
                    <p>
Documento que reúne las capacidades y los métodos técnicos autorizados.
                    </p>
                    <a
                        href="${rutaCertificados}lista-capacidades.pdf"
                        target="_blank"
                        rel="noopener"
                    >
                        Ver documento completo ↗
                    </a>
                </div>
            </article>

            <article class="ap-certificado">
                <div class="ap-certificado-documento">
                    <iframe
                        src="${rutaCertificados}certificados-faustino.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Certificados emitidos a Faustino Riffarachy"
                        loading="lazy">
                    </iframe>
                </div>

                <div class="ap-certificado-info">
                    <span>05 / Archivo técnico</span>
                    <h4>Certificaciones de inspección</h4>
                    <p>
Archivo de certificaciones técnicas emitidas originalmente a nombre de Faustino Riffarachy.
                    </p>
                    <a
                        href="${rutaCertificados}certificados-faustino.pdf"
                        target="_blank"
                        rel="noopener"
                    >
                        Ver documento completo ↗
                    </a>
                </div>
            </article>

        </div>

        <button
            class="ap-cert-flecha ap-cert-siguiente"
            type="button"
            aria-label="Certificado siguiente"
        >
            &#10095;
        </button>

    </div>

    <div class="ap-cert-indicadores">
        <button class="active" data-cert="0" aria-label="Certificado 1"></button>
        <button data-cert="1" aria-label="Certificado 2"></button>
        <button data-cert="2" aria-label="Certificado 3"></button>
        <button data-cert="3" aria-label="Certificado 4"></button>
        <button data-cert="4" aria-label="Certificado 5"></button>
    </div>

</div>
`;
    const botones = nosotros.querySelectorAll(".ap-tab");
    const paneles = nosotros.querySelectorAll(".ap-panel");

    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            botones.forEach(item => item.classList.remove("active"));
            paneles.forEach(item => item.classList.remove("active"));

            boton.classList.add("active");

            const panelActivo = nosotros.querySelector(
                "#" + boton.dataset.panel
            );

            if (panelActivo) {
                panelActivo.classList.add("active");
            }
        });
    });

    /* Abre Certificaciones desde el menú del header */
    document
        .querySelectorAll('a[href="#certificaciones"]')
        .forEach(function (enlace) {
            enlace.addEventListener("click", function (evento) {
                evento.preventDefault();

                const botonCertificados = nosotros.querySelector(
                    '[data-panel="ap-certificaciones"]'
                );

                if (botonCertificados) {
                    botonCertificados.click();
                }

                nosotros.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                const navegacion = document.querySelector(".main-nav");
                const botonMenu = document.querySelector(".menu-toggle");
                navegacion?.classList.remove("open");
                document.body.classList.remove("menu-open");
                botonMenu?.setAttribute("aria-expanded", "false");
            });
        });

    /* Abre cualquier pestaña de Nosotros desde el footer */
    document.querySelectorAll("[data-open-tab]").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            const destino = enlace.dataset.openTab;
            const botonDestino = nosotros.querySelector(
                '[data-panel="' + destino + '"]'
            );

            if (botonDestino) {
                botonDestino.click();
            }
        });
    });
		
		/* CARRUSEL DE CERTIFICACIONES */

const certificados = nosotros.querySelectorAll(".ap-certificado");
const indicadoresCert = nosotros.querySelectorAll(
    ".ap-cert-indicadores button"
);
const anteriorCert = nosotros.querySelector(".ap-cert-anterior");
const siguienteCert = nosotros.querySelector(".ap-cert-siguiente");

let certificadoActual = 0;

function mostrarCertificado(indice) {
    if (!certificados.length) return;

    if (indice < 0) {
        indice = certificados.length - 1;
    }

    if (indice >= certificados.length) {
        indice = 0;
    }

    certificadoActual = indice;

    certificados.forEach(function (certificado, posicion) {
        certificado.classList.toggle(
            "active",
            posicion === certificadoActual
        );
    });

    indicadoresCert.forEach(function (indicador, posicion) {
        indicador.classList.toggle(
            "active",
            posicion === certificadoActual
        );
    });
}

if (anteriorCert) {
    anteriorCert.addEventListener("click", function () {
        mostrarCertificado(certificadoActual - 1);
    });
}

if (siguienteCert) {
    siguienteCert.addEventListener("click", function () {
        mostrarCertificado(certificadoActual + 1);
    });
}

indicadoresCert.forEach(function (indicador) {
    indicador.addEventListener("click", function () {
        mostrarCertificado(Number(indicador.dataset.cert));
    });
});

mostrarCertificado(0);
});


/* ==================================================
   MANUAL DE MARCA — CONTENIDO DEFINITIVO
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const manual = document.querySelector("#manual");
    if (!manual) return;

    const panel = manual.querySelector("#manual-panel");
    const tabsOriginales = Array.from(
        manual.querySelectorAll(".manual-tab")
    );

    if (!panel || tabsOriginales.length < 4) return;

    const imagenTema = document.querySelector(
        'img[src*="/assets/images/"]'
    );

    const rutaImagenes = imagenTema
        ? imagenTema.src.replace(
            /assets\/images\/.*$/,
            "assets/images/"
        )
        : "/wp-content/themes/aeropetroleum/assets/images/";

    const configuracion = [
        {
            clave: "identidad",
            texto: "Identidad"
        },
        {
            clave: "concepto",
            texto: "Concepto"
        },
        {
            clave: "espacios",
            texto: "Diseño para espacios"
        },
        {
            clave: "aplicaciones",
            texto: "Aplicaciones"
        }
    ];

    /* Reemplaza las pestañas antiguas y elimina sus eventos */

    tabsOriginales.forEach(function (tab, indice) {
        const nuevoTab = tab.cloneNode(true);

        nuevoTab.textContent = configuracion[indice].texto;
        nuevoTab.dataset.manualFinal =
            configuracion[indice].clave;

        nuevoTab.classList.toggle(
            "active",
            indice === 0
        );

        tab.replaceWith(nuevoTab);
    });

    function crearImagen(nombre, descripcion, clase) {
        return `
            <button
                class="manual-gallery-item ${clase || ""}"
                type="button"
                aria-label="Ampliar imagen"
            >
                <img
                    src="${rutaImagenes}${nombre}"
                    alt="${descripcion}"
                    loading="lazy"
                >
            </button>
        `;
    }

    const contenido = {

        /* IDENTIDAD */

        identidad: `
            <div class="manual-final-section manual-identidad">

<div class="manual-identidad-encabezado">
    <span>EVOLUCIÓN DE LA MARCA</span>
    <h3>Logotipos anteriores</h3>
</div>
                <div
                    class="manual-logos-antiguos"
                    aria-label="Logotipos anteriores"
                >
                    <div>
                        <img
                            src="${rutaImagenes}logo-antiguo-ndt-engranaje.png"
                            alt="Logotipo anterior de NDT Especialistas"
                        >
                    </div>

                    <div>
                        <img
                            src="${rutaImagenes}logo-antiguo-gs-consulting.png"
                            alt="Logotipo anterior de GS Consulting"
                        >
                    </div>

                    <div>
                        <img
                            src="${rutaImagenes}logo-antiguo-ndt-linea-vida.png"
                            alt="Logotipo anterior de NDT Especialistas"
                        >
                    </div>
                </div>

<div class="manual-identidad-encabezado manual-identidad-nueva">
    <span>NUEVA PROPUESTA DE IDENTIDAD</span>
    <h3>AeroPetroleum</h3>
</div>
                <div class="manual-identidad-actual">
                    <div class="manual-identidad-logo">
                        

                        <img
                            src="${rutaImagenes}logo-color.png"
                            alt="Identidad actual de AeroPetroleum"
                        >
                    </div>

                    <div class="manual-identidad-info">
                        <h3>Identidad visual</h3>

                        <p>
                            La identidad de AeroPetroleum integra los
                            sectores aeronáutico y petrolero y transmite
                            precisión, seguridad y proyección.
                        </p>

                        <div class="manual-paleta">

                            <div>
                                <i style="background:#00004C"></i>
                                <span>
                                    Azul marino
                                    <small>#00004C</small>
                                </span>
                            </div>

                            <div>
                                <i style="background:#8C3F06"></i>
                                <span>
                                    Marrón rojizo
                                    <small>#8C3F06</small>
                                </span>
                            </div>

                            <div>
                                <i style="background:#FFFFFF"></i>
                                <span>
                                    Blanco
                                    <small>#FFFFFF</small>
                                </span>
                            </div>

                            <div>
                                <i style="background:#F1F3F6"></i>
                                <span>
                                    Gris claro
                                    <small>#F1F3F6</small>
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        `,

concepto: `
    <div class="manual-final-section manual-concepto-simple">

        <div class="manual-panel-heading">
    <p>
        Con base en los propósitos de la marca, se construyó
        una identidad que representa la integración de los
        sectores aeronáutico y petrolero y transmite
        <strong>innovación, precisión y proyección.</strong>
    </p>

</div>

        <div class="manual-concepto-imagen">
            <img
                src="${rutaImagenes}concepto-marca.png"
                alt="Construcción conceptual del isotipo de AeroPetroleum"
                loading="lazy"
            >
        </div>

    </div>
`,

        /* DISEÑO PARA ESPACIOS */

        espacios: `
            <div class="manual-final-section">

                <div class="manual-panel-heading">
                    <span class="manual-mini-label">
                        PRESENCIA CORPORATIVA
                    </span>

                    <h3>Diseño para espacios</h3>

                    <p>
                        Aplicación de la identidad en hangares,
                        talleres y entornos técnicos.
                    </p>
                </div>

                <div
                    class="manual-gallery manual-gallery-espacios"
                >
                    ${crearImagen(
                        "espacio-hangar-fachada.png",
                        "Identidad aplicada en la fachada de un hangar",
                        "manual-wide"
                    )}

                    ${crearImagen(
                        "espacio-hangar-interior.png",
                        "Identidad aplicada en el interior de un hangar",
                        ""
                    )}

                    ${crearImagen(
                        "espacio-taller.png",
                        "Identidad aplicada en un taller técnico",
                        ""
                    )}
                </div>

            </div>
        `,

        /* APLICACIONES */

        aplicaciones: `
            <div
                class="manual-final-section manual-aplicaciones"
            >

                <div class="manual-panel-heading">
                    <span class="manual-mini-label">
                        SISTEMA DE APLICACIONES
                    </span>

                    <h3>Aplicaciones de marca</h3>

                    <p>
                        La identidad se adapta de manera coherente a
                        soportes impresos, uniformes, merchandising
                        y medios digitales.
                    </p>
                </div>

                <h4 class="manual-subtitle">
                    Papelería corporativa
                </h4>

                <div
                    class="manual-gallery manual-gallery-masonry"
                >
                    ${crearImagen(
                        "mockup-papeleria-completa.jpeg",
                        "Conjunto completo de papelería corporativa",
                        "manual-wide"
                    )}

                    ${crearImagen(
                        "mockup-papeleria-corporativa.png",
                        "Papelería corporativa de AeroPetroleum",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-carpeta-corporativa.png",
                        "Carpeta corporativa",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-membrete-sobre.png",
                        "Membrete y sobre corporativo",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-tarjeta-personal.png",
                        "Tarjeta personal",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-sobres.png",
                        "Sobres corporativos",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-sello.png",
                        "Sello corporativo",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-credencial.png",
                        "Credencial corporativa",
                        ""
                    )}
                </div>

                <h4 class="manual-subtitle">
                    Uniformes y seguridad industrial
                </h4>

                <div
                    class="manual-gallery manual-gallery-featured"
                >
                    ${crearImagen(
                        "mockup-uniformes-operativos.png",
                        "Uniformes operativos",
                        "manual-wide"
                    )}

                    ${crearImagen(
                        "mockup-uniformes-corporativos.png",
                        "Uniformes corporativos",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-seguridad-industrial.png",
                        "Cascos y chalecos de seguridad industrial",
                        ""
                    )}
                </div>

                <h4 class="manual-subtitle">
                    Merchandising
                </h4>

                <div
                    class="manual-gallery manual-gallery-small"
                >
                    ${crearImagen(
                        "mockup-gorra.png",
                        "Gorra corporativa",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-pin-corporativo.png",
                        "Pin corporativo",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-pin-azul.png",
                        "Pin azul de AeroPetroleum",
                        ""
                    )}
                </div>

                <h4 class="manual-subtitle">
                    Aplicaciones digitales
                </h4>

                <div
                    class="manual-gallery manual-gallery-small"
                >
                    ${crearImagen(
                        "mockup-icono-aplicacion.png",
                        "Icono de aplicación móvil",
                        ""
                    )}

                    ${crearImagen(
                        "mockup-redes-sociales.png",
                        "Aplicación de la marca en redes sociales",
                        ""
                    )}
                </div>

            </div>
        `
    };

    function mostrarPanel(clave) {
        panel.innerHTML =
            contenido[clave] || contenido.identidad;

        activarGalerias();
    }

    const tabs = Array.from(
        manual.querySelectorAll(".manual-tab")
    );

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (otro) {
                otro.classList.remove("active");
            });

            tab.classList.add("active");

            mostrarPanel(
                tab.dataset.manualFinal
            );
        });
    });

    /* VISOR AMPLIADO */

    let modal = document.querySelector(
        ".manual-lightbox"
    );

    if (!modal) {
        modal = document.createElement("div");
        modal.className = "manual-lightbox";
        modal.setAttribute("aria-hidden", "true");

        modal.innerHTML = `
            <button
                type="button"
                class="manual-lightbox-close"
                aria-label="Cerrar imagen"
            >
                &times;
            </button>

            <img src="" alt="">
        `;

        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector("img");
    const cerrar = modal.querySelector(
        ".manual-lightbox-close"
    );

    function cerrarModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function activarGalerias() {
        panel
            .querySelectorAll(".manual-gallery-item")
            .forEach(function (boton) {
                boton.addEventListener(
                    "click",
                    function () {
                        const img =
                            boton.querySelector("img");

                        modalImg.src = img.src;
                        modalImg.alt = img.alt;

                        modal.classList.add("open");
                        modal.setAttribute(
                            "aria-hidden",
                            "false"
                        );

                        document.body.style.overflow =
                            "hidden";
                    }
                );
            });
    }

    cerrar.addEventListener(
        "click",
        cerrarModal
    );

    modal.addEventListener(
        "click",
        function (evento) {
            if (evento.target === modal) {
                cerrarModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        function (evento) {
            if (evento.key === "Escape") {
                cerrarModal();
            }
        }
    );

    mostrarPanel("identidad");
});
