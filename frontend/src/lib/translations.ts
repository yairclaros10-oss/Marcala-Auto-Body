export type Lang = "en" | "es";

const en = {
  nav: {
    links: ["Home", "Services", "About", "Our Work", "Reviews", "Request an Estimate", "Contact"],
    callNow: "Call Now",
    toggleLabel: "ES",
    toggleAria: "Switch to Spanish",
    menuAria: "Open menu",
    menuTitle: "Menu",
  },
  hero: {
    badge: "Charlotte, NC — Auto Body & Collision Repair",
    h1a: "Quality Auto Body Repair",
    h1b: "You Can Trust.",
    description:
      "Marcala Auto Body is a Charlotte collision and auto body shop focused on doing the job right — precise metalwork, exact paint matching, and honest communication from estimate to delivery. From minor dents to full collision repair, your vehicle leaves looking like nothing ever happened.",
    ctaEstimate: "Request an Estimate",
    ctaCall: "Call Now",
    stat1a: "Google rating",
    stat1b: "verified reviews",
    stat2a: "Insurance claims",
    stat2b: "handled for you",
    stat3a: "Open Mon – Sat",
    stat3b: "walk-ins welcome",
    imageCaption: "Collision • Body • Paint",
    imageTag: "Est. Charlotte",
    imageAlt:
      "Vehicles being serviced on lifts inside the Marcala Auto Body workshop in Charlotte, NC",
  },
  services: {
    kicker: "What We Do",
    heading: "Auto Body & Collision Services in Charlotte, NC",
    sub: "From a parking-lot door ding to full post-collision reconstruction, every repair is measured, straightened, and refinished with the same standard: it should look like it never happened.",
    cta: "Get an estimate",
    items: [
      {
        title: "Collision Repair",
        category: "Structural & Safety",
        description:
          "Comprehensive structural realignment and body rebuilding after major or minor collisions, restored to factory specifications.",
        badge: "Core Specialty",
      },
      {
        title: "Auto Body Repair",
        category: "Body Work",
        description:
          "Full-spectrum metalwork, panel straightening, and seamless structural restoration for all makes and models.",
        badge: "Full Service",
      },
      {
        title: "Dent Repair",
        category: "Precision Removal",
        description:
          "Paintless dent repair and conventional dent pulling to eliminate door dings, creases, and hail damage.",
        badge: "PDR Available",
      },
      {
        title: "Bumper Repair",
        category: "Front & Rear",
        description:
          "Plastic welding, crack repair, dent reshaping, and complete bumper replacement with color-matched refinishing.",
        badge: "Fast Turnaround",
      },
      {
        title: "Fender Repair",
        category: "Panel Alignment",
        description:
          "Restoration and realignment of bent or crushed fenders, quarter panels, and wheel wells with tight seam gaps.",
        badge: "OEM Precision",
      },
      {
        title: "Automotive Painting",
        category: "Spray Booth Finish",
        description:
          "Professional spray booth finishes with premium multi-stage base and clear coats for a deep showroom gloss.",
        badge: "Full Refinish",
      },
      {
        title: "Paint Matching",
        category: "Color Precision",
        description:
          "Computerized color matching for invisible panel blending and exact factory tones on every repair.",
        badge: "Exact Match",
      },
      {
        title: "Scratch Repair",
        category: "Surface Refinishing",
        description:
          "Wet sanding, compound buffing, and clear-coat blending to remove key scratches and scuffs for flawless reflections.",
        badge: "Precision Buff",
      },
      {
        title: "Color Changes",
        category: "Custom Refinish",
        description:
          "Complete vehicle color conversions including door jambs and under-hood areas, custom metallics, and accent work.",
        badge: "Custom Finish",
      },
      {
        title: "Insurance Claim Assistance",
        category: "Claims Support",
        description:
          "Direct coordination with all major insurance carriers, itemized estimates, and supplement processing — zero hassle for you.",
        badge: "Zero Hassle",
      },
    ],
  },
  beforeAfter: {
    kicker: "Before & After",
    heading: "See the Difference a Proper Repair Makes",
    sub: "Drag the slider to compare the teardown with the finished repair — every case here is a real vehicle rebuilt and refinished at our shop.",
    caseTab: "Case",
    beforeLabel: "Before — Placeholder",
    afterLabel: "After — Placeholder",
    beforeRealLabel: "Before",
    afterRealLabel: "After",
    realNote: "Real repair — this vehicle was rebuilt and refinished right here at Marcala Auto Body. More real shop photos are on the way.",
    sliderAria: "Drag to compare before and after",
    beforeAlt: "before repair (placeholder photo)",
    afterAlt: "after repair (placeholder photo)",
    note: "Placeholder imagery — these photos demonstrate the layout only and will be replaced with real before-and-after photos of vehicles repaired at Marcala Auto Body.",
    damageHeading: "The Damage",
    repairHeading: "The Repair",
    cta: "Get This Done for Your Vehicle",
    cases: [
      {
        title: "Honda S2000 — Front-End Rebuild",
        service: "Collision Repair & Front Clip Restoration",
        damage:
          "Front clip torn down after collision damage — hood, bumper, and headlight assemblies removed with the engine bay exposed.",
        repair:
          "Complete front-end reassembly with refinished panels, fresh black paint and clear coat, restored lighting, and a final cut-and-buff detail.",
      },
      {
        title: "Pickup Truck — Full Repaint & Reassembly",
        service: "Automotive Painting & Body Work",
        damage:
          "Truck fully torn down for a complete refinish — wheels, trim and hardware off, panels prepped for the booth.",
        repair:
          "Complete black respray with fresh clear coat, machine cut and buff, then full reassembly — wheels, lights and trim back on.",
      },
      {
        title: "Chevy Suburban — Full Repaint",
        service: "Automotive Painting & Color Refinish",
        damage:
          "Full teardown and masking for a complete repaint — glass, trim and lights covered, panels prepped and sprayed in the booth.",
        repair:
          "Complete white respray with fresh clear coat, wet sand and machine polish, then full reassembly and a final detail.",
      },
    ],
  },
  about: {
    kicker: "About Marcala Auto Body",
    heading: "A Charlotte Body Shop That Sweats the Details",
    p1: "Located on South Tryon Street, Marcala Auto Body has built its name the old-fashioned way — one properly repaired vehicle at a time. Whether it is a full collision rebuild, a color change, or a scratch you cannot stop staring at, the standard never changes: the repair should be invisible.",
    p2: "We work on all makes and models, coordinate directly with every major insurance carrier, and keep you informed at every step — because an accident is stressful enough without wondering what is happening to your car.",
    imageAlt: "Technician hand-finishing paintwork at Marcala Auto Body (placeholder photo)",
    imageCaption: "Placeholder photo — real shop photos coming soon",
    pillars: [
      {
        title: "Quality Repairs",
        text: "Every vehicle is repaired to factory fit and finish — proper panel gaps, correct alignment, and paint that holds up for years, not weeks.",
      },
      {
        title: "Attention to Detail",
        text: "From the first measurement to the final buff, we sweat the small things: jambs, edges, trim lines, and blend transitions most shops skip.",
      },
      {
        title: "Honest Communication",
        text: "You get a straight answer on what your car needs, what it costs, and how long it takes. No surprises on the invoice, ever.",
      },
      {
        title: "Customer Satisfaction",
        text: "We treat your vehicle like our own and we are not done until you are happy. That is how a neighborhood shop earns its reputation.",
      },
    ],
    steps: [
      {
        title: "Free Estimate",
        text: "Bring the car by or send photos — we assess the damage and give you a clear, itemized quote.",
      },
      {
        title: "Approve & Book",
        text: "Approve the work and we coordinate with your insurance company directly if a claim is involved.",
      },
      {
        title: "Repair & Refinish",
        text: "Structural work, body work, and paint are completed in-house with quality checks at every stage.",
      },
      {
        title: "Final Inspection",
        text: "We walk the vehicle with you at pickup so you can see the finished repair before you drive away.",
      },
    ],
    banner: "Have damage you would like us to look at? Estimates are always free.",
    bannerCta: "Request an Estimate",
  },
  gallery: {
    kicker: "Our Work",
    heading: "Repairs & Paint Work From the Shop Floor",
    sub: "A look at the kind of work we do every day — collision rebuilds, refinishing, dent removal, and bumper repair.",
    note: "Placeholder imagery — this gallery is ready for real photos of vehicles repaired at Marcala Auto Body and will be updated as shop photos become available.",
    placeholderBadge: "Placeholder",
    altSuffix: " (placeholder photo)",
    filters: {
      all: "All",
      collision: "Collision",
      paint: "Paint & Color",
      dents: "Dents & Scratches",
      bumpers: "Bumpers",
    },
    items: [
      { title: "Multi-Stage Respray in Progress", category: "paint" },
      { title: "Booth Refinish & Clear Coat", category: "paint" },
      { title: "Structural Repair on the Lift", category: "collision" },
      { title: "Full Panel Restoration", category: "collision" },
      { title: "Deep Scratch Correction", category: "dents" },
      { title: "Cut, Buff & Polish Finish", category: "dents" },
      { title: "Bumper & Quarter Damage Intake", category: "bumpers" },
      { title: "Hand-Finished Paintwork", category: "paint" },
      { title: "Quarter Panel Body Work in Progress", category: "collision" },
      { title: "Full Respray in the Booth", category: "paint" },
      { title: "Prepping & Masking for Paint", category: "paint" },
    ],
  },
  reviews: {
    kicker: "Customer Reviews",
    heading: "What Charlotte Drivers Say",
    basedOn: "Based on {count} Google reviews",
    readAll: "Read all reviews on Google",
    chip: "Google review",
    dates: ["April 2026", "December 2025", "April 2025", "January 2026"],
  },
  estimate: {
    kicker: "Free Estimate",
    heading: "Request an Estimate",
    sub: "Tell us about your vehicle and the damage — photos help us give you a faster, more accurate quote. We typically respond during business hours.",
    point1a: "Fast turnaround.",
    point1b: "Most estimates are reviewed the same business day.",
    point2a: "Insurance-friendly.",
    point2b: "Filing a claim? We coordinate directly with your carrier.",
    point3a: "Rather talk?",
    point3b: "Call us at",
    point3c: "— walk-ins welcome too.",
    labels: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      year: "Vehicle Year",
      make: "Make",
      model: "Model",
      damageType: "Type of Damage",
      description: "Description of Damage",
      photos: "Photos of the Vehicle (optional, up to {max})",
    },
    placeholders: {
      name: "Your full name",
      phone: "(704) 555-0123",
      email: "you@example.com",
      year: "2019",
      make: "Honda",
      model: "Civic",
      description:
        "Tell us what happened and where the damage is (e.g. rear bumper cracked on the driver's side, scratch along the passenger door...)",
      damageType: "Select damage type",
    },
    damageTypes: {
      collision: "Collision damage",
      dent: "Dent / ding",
      bumper: "Bumper damage",
      fender: "Fender damage",
      scratches: "Scratches / paint damage",
      repaint: "Full repaint / color change",
      other: "Other / not sure",
    },
    uploadCta: "Click to add photos",
    uploadHint: "JPG, PNG or WebP, up to 10 MB each",
    submit: "Submit Estimate Request",
    submitting: "Sending...",
    disclaimer: "No obligation. Your information is only used to prepare your estimate.",
    successHeading: "Request Received",
    successBody:
      "Thank you, {name}. Your estimate request for your {year} {make} {model} has been sent to the shop. We will reach out at {phone} shortly.",
    successRef: "Reference:",
    successCall: "Need it faster? Call {phone}",
    toastSuccessTitle: "Estimate request sent",
    toastSuccessBody: "We will review your photos and get back to you shortly.",
    toastErrorTitle: "Could not send your request",
    errorFallback: "Submission failed — please check the form and try again.",
    photoLimit: "You can upload up to {max} photos.",
    removePhotoAria: "Remove photo {n}",
    uploadPreviewAlt: "Upload preview {n}",
  },
  contact: {
    kicker: "Contact",
    heading: "Visit the Shop on South Tryon Street",
    sub: "Stop by for a free in-person estimate, or give us a call — we are happy to answer questions about damage, timelines, and insurance claims.",
    callLabel: "Call the shop",
    callNow: "Call Now",
    addressLabel: "Address",
    directions: "Directions",
    emailLabel: "Email us",
    hoursLabel: "Business hours",
    openNow: "Open now",
    closed: "Closed",
    mapTitle: "Map to Marcala Auto Body, 2601 S Tryon St, Charlotte, NC 28203",
    hours: [
      { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
      { days: "Saturday", time: "9:00 AM – 4:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
  },
  footer: {
    tagline:
      "Quality auto body and collision repair in Charlotte, NC. Precise metalwork, exact paint matching, and honest communication on every job.",
    explore: "Explore",
    contact: "Contact",
    copyright: "© {year} Marcala Auto Body, Charlotte, NC. All rights reserved.",
    placeholderNote: "Some site imagery is placeholder pending real shop photos.",
  },
  social: {
    kicker: "Follow Us",
    heading: "Find Us on Social Media",
    sub: "Behind-the-scenes repairs, fresh paint jobs, and shop updates — follow along.",
    follow: "Follow",
  },
  mobile: {
    call: "Call Shop",
    estimate: "Get Estimate",
  },
};

export type Dict = typeof en;

const es: Dict = {
  nav: {
    links: ["Inicio", "Servicios", "Nosotros", "Nuestro Trabajo", "Reseñas", "Solicitar Presupuesto", "Contacto"],
    callNow: "Llamar Ahora",
    toggleLabel: "EN",
    toggleAria: "Cambiar a inglés",
    menuAria: "Abrir menú",
    menuTitle: "Menú",
  },
  hero: {
    badge: "Charlotte, NC — Carrocería y Reparación de Colisiones",
    h1a: "Reparación de Carrocería de Calidad",
    h1b: "en la Que Puede Confiar.",
    description:
      "Marcala Auto Body es un taller de carrocería y colisiones en Charlotte enfocado en hacer el trabajo bien: metalistería precisa, igualación exacta de pintura y comunicación honesta desde el presupuesto hasta la entrega. Desde abolladuras menores hasta la reparación completa de una colisión, su vehículo sale luciendo como si nada hubiera pasado.",
    ctaEstimate: "Solicitar Presupuesto",
    ctaCall: "Llamar Ahora",
    stat1a: "Calificación de Google",
    stat1b: "reseñas verificadas",
    stat2a: "Reclamos de seguro",
    stat2b: "los manejamos por usted",
    stat3a: "Abierto Lun – Sáb",
    stat3b: "visitas sin cita bienvenidas",
    imageCaption: "Colisión • Carrocería • Pintura",
    imageTag: "Est. Charlotte",
    imageAlt:
      "Vehículos en servicio sobre elevadores dentro del taller de Marcala Auto Body en Charlotte, NC",
  },
  services: {
    kicker: "Lo Que Hacemos",
    heading: "Servicios de Carrocería y Colisión en Charlotte, NC",
    sub: "Desde un golpe de estacionamiento hasta una reconstrucción completa después de una colisión, cada reparación se mide, endereza y pule con el mismo estándar: debe lucir como si nunca hubiera pasado.",
    cta: "Solicitar presupuesto",
    items: [
      {
        title: "Reparación de Colisiones",
        category: "Estructura y Seguridad",
        description:
          "Realineación estructural completa y reconstrucción de carrocería después de colisiones mayores o menores, restaurada a las especificaciones de fábrica.",
        badge: "Especialidad Principal",
      },
      {
        title: "Reparación de Carrocería",
        category: "Trabajo de Carrocería",
        description:
          "Trabajo completo de metal, enderezado de paneles y restauración estructural impecable para todas las marcas y modelos.",
        badge: "Servicio Completo",
      },
      {
        title: "Reparación de Abolladuras",
        category: "Remoción de Precisión",
        description:
          "Reparación de abolladuras sin pintura (PDR) y extracción convencional para eliminar golpes de puerta, pliegues y daño por granizo.",
        badge: "PDR Disponible",
      },
      {
        title: "Reparación de Defensas",
        category: "Delantera y Trasera",
        description:
          "Soldadura de plástico, reparación de grietas, remodelado de abolladuras y reemplazo completo de defensas con acabado de color igualado.",
        badge: "Entrega Rápida",
      },
      {
        title: "Reparación de Salpicaderas",
        category: "Alineación de Paneles",
        description:
          "Restauración y alineación de salpicaderas dobladas o aplastadas, paneles laterales y cavidades de ruedas con uniones precisas.",
        badge: "Precisión OEM",
      },
      {
        title: "Pintura Automotriz",
        category: "Acabado en Cabina",
        description:
          "Acabados profesionales en cabina de pintura con capas base y transparente premium de múltiples etapas para un brillo de sala de exhibición.",
        badge: "Repintado Completo",
      },
      {
        title: "Igualación de Pintura",
        category: "Precisión de Color",
        description:
          "Igualación computarizada de color para una mezcla de paneles invisible y tonos de fábrica exactos en cada reparación.",
        badge: "Color Exacto",
      },
      {
        title: "Reparación de Rayones",
        category: "Restauración de Superficies",
        description:
          "Lijado al agua, pulido con compuesto y mezcla de capa transparente para eliminar rayones profundos y rozaduras con reflejos impecables.",
        badge: "Pulido de Precisión",
      },
      {
        title: "Cambios de Color",
        category: "Acabado Personalizado",
        description:
          "Conversiones completas de color del vehículo incluyendo marcos de puertas y área del cofre, metálicos personalizados y detalles.",
        badge: "Personalizado",
      },
      {
        title: "Asistencia con Reclamos de Seguro",
        category: "Apoyo en Reclamos",
        description:
          "Coordinación directa con todas las aseguradoras principales, presupuestos detallados y procesamiento de suplementos — cero complicaciones para usted.",
        badge: "Sin Complicaciones",
      },
    ],
  },
  beforeAfter: {
    kicker: "Antes y Después",
    heading: "Vea la Diferencia que Hace una Reparación Bien Hecha",
    sub: "Arrastre el control deslizante para comparar el proceso con la reparación terminada — cada caso aquí es un vehículo real reconstruido y repintado en nuestro taller.",
    caseTab: "Caso",
    beforeLabel: "Antes — Ejemplo",
    afterLabel: "Después — Ejemplo",
    beforeRealLabel: "Antes",
    afterRealLabel: "Después",
    realNote: "Reparación real — este vehículo fue reconstruido y repintado aquí mismo en Marcala Auto Body. Más fotos reales del taller próximamente.",
    sliderAria: "Arrastre para comparar antes y después",
    beforeAlt: "antes de la reparación (foto de ejemplo)",
    afterAlt: "después de la reparación (foto de ejemplo)",
    note: "Imágenes de ejemplo — estas fotos solo demuestran el diseño y serán reemplazadas con fotos reales de antes y después de vehículos reparados en Marcala Auto Body.",
    damageHeading: "El Daño",
    repairHeading: "La Reparación",
    cta: "Haga Esto con Su Vehículo",
    cases: [
      {
        title: "Honda S2000 — Reconstrucción del Frente",
        service: "Reparación de Colisión y Restauración del Frente",
        damage:
          "Frente desarmado después de daño por colisión — cofre, defensa y faros removidos con el motor expuesto.",
        repair:
          "Reensamblaje completo del frente con paneles repintados, pintura negra nueva con capa transparente, iluminación restaurada y detallado final de corte y pulido.",
      },
      {
        title: "Camioneta — Repintado Completo y Reensamblaje",
        service: "Pintura Automotriz y Trabajo de Carrocería",
        damage:
          "Camioneta completamente desarmada para un repintado total — rines, molduras y herrajes removidos, paneles preparados para la cabina.",
        repair:
          "Repintado negro completo con capa transparente nueva, corte y pulido a máquina, y reensamblaje total — rines, luces y molduras instaladas.",
      },
      {
        title: "Chevy Suburban — Repintado Completo",
        service: "Pintura Automotriz y Restauración de Color",
        damage:
          "Desarmado y enmascarado completo para un repintado total — vidrios, molduras y luces cubiertos, paneles preparados y pintados en cabina.",
        repair:
          "Repintado blanco completo con capa transparente nueva, lijado al agua y pulido a máquina, y reensamblaje total con detallado final.",
      },
    ],
  },
  about: {
    kicker: "Acerca de Marcala Auto Body",
    heading: "Un Taller de Carrocería en Charlotte que Cuida Cada Detalle",
    p1: "Ubicado en South Tryon Street, Marcala Auto Body ha construido su nombre a la antigua: un vehículo bien reparado a la vez. Ya sea una reconstrucción completa por colisión, un cambio de color o un rayón que no puede dejar de mirar, el estándar nunca cambia: la reparación debe ser invisible.",
    p2: "Trabajamos con todas las marcas y modelos, coordinamos directamente con las principales aseguradoras y lo mantenemos informado en cada paso — porque un accidente ya es suficientemente estresante sin preguntarse qué está pasando con su auto.",
    imageAlt: "Técnico dando acabado a mano a la pintura en Marcala Auto Body (foto de ejemplo)",
    imageCaption: "Foto de ejemplo — fotos reales del taller próximamente",
    pillars: [
      {
        title: "Reparaciones de Calidad",
        text: "Cada vehículo se repara con ajuste y acabado de fábrica: espacios de panel correctos, alineación precisa y pintura que dura años, no semanas.",
      },
      {
        title: "Atención al Detalle",
        text: "Desde la primera medición hasta el pulido final, cuidamos lo pequeño: marcos, bordes, líneas de moldura y transiciones que la mayoría de los talleres omiten.",
      },
      {
        title: "Comunicación Honesta",
        text: "Usted recibe una respuesta directa sobre lo que necesita su auto, cuánto cuesta y cuánto tarda. Sin sorpresas en la factura, nunca.",
      },
      {
        title: "Satisfacción del Cliente",
        text: "Tratamos su vehículo como si fuera nuestro y no terminamos hasta que usted esté satisfecho. Así es como un taller de barrio se gana su reputación.",
      },
    ],
    steps: [
      {
        title: "Presupuesto Gratis",
        text: "Traiga el auto o envíe fotos — evaluamos el daño y le damos una cotización clara y detallada.",
      },
      {
        title: "Apruebe y Reserve",
        text: "Apruebe el trabajo y coordinamos directamente con su compañía de seguros si hay un reclamo de por medio.",
      },
      {
        title: "Reparación y Pintura",
        text: "El trabajo estructural, de carrocería y de pintura se completa en nuestro taller con controles de calidad en cada etapa.",
      },
      {
        title: "Inspección Final",
        text: "Revisamos el vehículo con usted al recogerlo para que vea la reparación terminada antes de irse.",
      },
    ],
    banner: "¿Tiene daños que le gustaría que revisáramos? Los presupuestos siempre son gratis.",
    bannerCta: "Solicitar Presupuesto",
  },
  gallery: {
    kicker: "Nuestro Trabajo",
    heading: "Reparaciones y Trabajos de Pintura del Taller",
    sub: "Un vistazo al tipo de trabajo que hacemos todos los días: reconstrucciones por colisión, repintados, remoción de abolladuras y reparación de defensas.",
    note: "Imágenes de ejemplo — esta galería está lista para fotos reales de vehículos reparados en Marcala Auto Body y se actualizará cuando haya fotos del taller disponibles.",
    placeholderBadge: "Ejemplo",
    altSuffix: " (foto de ejemplo)",
    filters: {
      all: "Todos",
      collision: "Colisión",
      paint: "Pintura y Color",
      dents: "Abolladuras y Rayones",
      bumpers: "Defensas",
    },
    items: [
      { title: "Repintado Multi-Etapa en Proceso", category: "paint" },
      { title: "Acabado en Cabina y Capa Transparente", category: "paint" },
      { title: "Reparación Estructural en el Elevador", category: "collision" },
      { title: "Restauración Completa de Paneles", category: "collision" },
      { title: "Corrección de Rayón Profundo", category: "dents" },
      { title: "Acabado de Corte y Pulido", category: "dents" },
      { title: "Recepción de Daño en Defensa y Lateral", category: "bumpers" },
      { title: "Pintura Terminada a Mano", category: "paint" },
      { title: "Trabajo de Panel Lateral en Proceso", category: "collision" },
      { title: "Repintado Completo en Cabina", category: "paint" },
      { title: "Preparación y Enmascarado para Pintura", category: "paint" },
    ],
  },
  reviews: {
    kicker: "Reseñas de Clientes",
    heading: "Lo Que Dicen los Conductores de Charlotte",
    basedOn: "Basado en {count} reseñas de Google",
    readAll: "Lea todas las reseñas en Google",
    chip: "Reseña de Google",
    dates: ["Abril 2026", "Diciembre 2025", "Abril 2025", "Enero 2026"],
  },
  estimate: {
    kicker: "Presupuesto Gratis",
    heading: "Solicitar un Presupuesto",
    sub: "Cuéntenos sobre su vehículo y el daño — las fotos nos ayudan a darle una cotización más rápida y precisa. Normalmente respondemos durante el horario de atención.",
    point1a: "Respuesta rápida.",
    point1b: "La mayoría de los presupuestos se revisan el mismo día hábil.",
    point2a: "Trabajamos con seguros.",
    point2b: "¿Va a hacer un reclamo? Coordinamos directamente con su aseguradora.",
    point3a: "¿Prefiere hablar?",
    point3b: "Llámenos al",
    point3c: "— visitas sin cita también son bienvenidas.",
    labels: {
      name: "Nombre",
      phone: "Teléfono",
      email: "Correo Electrónico",
      year: "Año del Vehículo",
      make: "Marca",
      model: "Modelo",
      damageType: "Tipo de Daño",
      description: "Descripción del Daño",
      photos: "Fotos del Vehículo (opcional, hasta {max})",
    },
    placeholders: {
      name: "Su nombre completo",
      phone: "(704) 555-0123",
      email: "usted@ejemplo.com",
      year: "2019",
      make: "Honda",
      model: "Civic",
      description:
        "Cuéntenos qué pasó y dónde está el daño (ej. defensa trasera agrietada del lado del conductor, rayón a lo largo de la puerta del pasajero...)",
      damageType: "Seleccione el tipo de daño",
    },
    damageTypes: {
      collision: "Daño por colisión",
      dent: "Abolladura / golpe",
      bumper: "Daño en defensa",
      fender: "Daño en salpicadera",
      scratches: "Rayones / daño de pintura",
      repaint: "Repintado completo / cambio de color",
      other: "Otro / no estoy seguro",
    },
    uploadCta: "Haga clic para agregar fotos",
    uploadHint: "JPG, PNG o WebP, hasta 10 MB cada una",
    submit: "Enviar Solicitud de Presupuesto",
    submitting: "Enviando...",
    disclaimer: "Sin compromiso. Su información solo se usa para preparar su presupuesto.",
    successHeading: "Solicitud Recibida",
    successBody:
      "Gracias, {name}. Su solicitud de presupuesto para su {year} {make} {model} ha sido enviada al taller. Nos comunicaremos con usted al {phone} pronto.",
    successRef: "Referencia:",
    successCall: "¿Lo necesita más rápido? Llame al {phone}",
    toastSuccessTitle: "Solicitud de presupuesto enviada",
    toastSuccessBody: "Revisaremos sus fotos y nos comunicaremos con usted pronto.",
    toastErrorTitle: "No se pudo enviar su solicitud",
    errorFallback: "Error al enviar — revise el formulario e intente de nuevo.",
    photoLimit: "Puede subir hasta {max} fotos.",
    removePhotoAria: "Eliminar foto {n}",
    uploadPreviewAlt: "Vista previa {n}",
  },
  contact: {
    kicker: "Contacto",
    heading: "Visite el Taller en South Tryon Street",
    sub: "Pase por un presupuesto gratis en persona, o llámenos — con gusto respondemos preguntas sobre daños, tiempos de entrega y reclamos de seguro.",
    callLabel: "Llame al taller",
    callNow: "Llamar Ahora",
    addressLabel: "Dirección",
    directions: "Cómo Llegar",
    emailLabel: "Escríbanos",
    hoursLabel: "Horario de atención",
    openNow: "Abierto ahora",
    closed: "Cerrado",
    mapTitle: "Mapa a Marcala Auto Body, 2601 S Tryon St, Charlotte, NC 28203",
    hours: [
      { days: "Lunes – Viernes", time: "9:00 AM – 6:00 PM" },
      { days: "Sábado", time: "9:00 AM – 4:00 PM" },
      { days: "Domingo", time: "Cerrado" },
    ],
  },
  footer: {
    tagline:
      "Reparación de carrocería y colisiones de calidad en Charlotte, NC. Metalistería precisa, igualación exacta de pintura y comunicación honesta en cada trabajo.",
    explore: "Explorar",
    contact: "Contacto",
    copyright: "© {year} Marcala Auto Body, Charlotte, NC. Todos los derechos reservados.",
    placeholderNote: "Algunas imágenes del sitio son de ejemplo en espera de fotos reales del taller.",
  },
  social: {
    kicker: "Síguenos",
    heading: "Encuéntrenos en Redes Sociales",
    sub: "Reparaciones detrás de cámaras, trabajos de pintura recién terminados y novedades del taller — acompáñenos.",
    follow: "Seguir",
  },
  mobile: {
    call: "Llamar",
    estimate: "Presupuesto",
  },
};

export const dict: Record<Lang, Dict> = { en, es };

export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
