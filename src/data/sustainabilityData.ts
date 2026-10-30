import { RoleKey, SchemeInfo, ViewContent, ViewMode } from '../types';

export const ROLES: Record<RoleKey, string> = {
  prod: 'Productor',
  com: 'Comercial',
  adm: 'Adm. Originación',
  log: 'Logística',
  pla: 'Planta LB',
  exp: 'Comprador',
};

export const TBD = 'A definir';
export const SUC = 'Gerente de sucursal';
export const TRD = TBD;
export const LYC = TBD;
export const RP = 'Responsable de planta';

export const SCHEMES: Record<string, SchemeInfo> = {
  eudr: {
    code: 'EUDR',
    dest: 'Unión Europea · harina y poroto',
    cut: '31/12/2020',
    ficha: [
      ['Quién la pide', 'Exportadoras, con cláusula VISEC/EUDR en contrato'],
      ['Dónde se registra', 'VISEC (Bolsa de Comercio de Rosario)'],
      ['En planta', 'Plantas habilitadas EUDR exclusivas'],
      ['Situación', 'Estándar comercial desde 2026/27'],
    ],
    cutText: 'Sin desmonte después del 31 de diciembre de 2020, y producida cumpliendo la Ley de Bosques.',
    validate: false,
    com: {
      qs: [
        '¿El campo tiene RENSPA?',
        '¿Se cuenta con el polígono del lote (KML o KMZ)?',
        '¿El lote no tuvo desmonte desde 2021?',
        '¿El productor cuenta con un correo electrónico para la conformidad de la vinculación?',
      ],
      ok: 'El campo está en condiciones de solicitar el alta en VISEC',
      okNote: 'Registrar la solicitud en la plataforma. Con el campo aprobado, la venta podrá cerrarse como soja EUDR.',
      noNote: 'Mientras tanto, la mercadería podrá comercializarse como soja sin cláusula, si existe comprador.',
      direct: {
        campo: [
          ['com', 'Informar al cliente que el contrato incluye la <strong>cláusula EUDR/VISEC</strong> y que el alta no tiene costo para él.', SUC],
          ['com', 'Registrar en la plataforma los datos del campo: RENSPA, polígono y correo electrónico del productor. <strong>El habilitador debe ser el exportador que vende (Bunge/Moa/LDC/Cofco).</strong>', SUC],
          ['com', '<strong>¿Qué pasa si el campo fue dado de alta en VISEC por otro acopio o exportador?</strong> Solo se necesita el RENSPA y pedir la vinculación a través de VISEC. En la plataforma LB se carga una orden nueva normal.', SUC],
          ['prod', 'Otorgamiento de la conformidad a la vinculación notificada por VISEC.', 'Productor'],
          ['com', 'Con el campo aprobado, acordar <strong>condiciones comerciales, precio y prima</strong>.', TRD],
          ['prod', 'Emisión de la carta de porte con el <strong>RENSPA del campo aprobado</strong>.', 'Productor'],
        ],
        puerto: [
          ['exp', 'Verificación del campo en VISEC y registro de la descarga.', 'Comprador'],
          ['adm', 'Control de la imputación de toneladas al RENSPA correspondiente.', TBD],
        ],
      },
      plant: {
        campo: [
          ['com', 'Informar al cliente la <strong>cláusula EUDR/VISEC</strong> y registrar el alta en la plataforma.', SUC],
          ['adm', 'Registro del campo en VISEC y seguimiento del estado.', TBD],
          ['com', 'Acordar <strong>condiciones comerciales, precio y prima</strong> con el campo aprobado.', TRD],
          ['log', 'Asignación de la <strong>planta habilitada EUDR</strong> de destino.', LYC],
          ['prod', 'Emisión de la carta de porte con el RENSPA y destino a esa planta.', 'Productor'],
        ],
        planta: [
          ['pla', 'Recepción y descarga como EUDR; ante cualquier inconsistencia, aviso previo al comercial.', RP],
        ],
        puerto: [
          ['pla', 'Despacho a puerto con la trazabilidad VISEC.', RP],
        ],
      },
    },
    pla: {
      qs: [
        '¿La carta de porte incluye el RENSPA del campo?',
        '¿El campo figura aprobado en la plataforma y sin tope superado?',
        '¿El contrato incluye la cláusula EUDR?',
        '¿La planta de destino está habilitada EUDR?',
      ],
      ok: 'El camión ingresa como soja EUDR',
      okNote: 'Descarga en la planta habilitada y registro del ingreso en VISEC.',
      noNote: 'Sin el cumplimiento de estos puntos, el camión no ingresa como EUDR y se deriva a una planta de soja sin cláusula, con aviso previo al comercial.',
      direct: {
        campo: [
          ['log', 'Asignación de cupo en puerto para soja EUDR.', LYC],
          ['log', 'Verificación previa a la salida: carta de porte con RENSPA y campo aprobado.', TBD],
        ],
        puerto: [
          ['exp', 'Descarga y registro en VISEC.', 'Comprador'],
          ['log', 'Seguimiento de descarga y calidad; informe de diferencias a Administración de Originación.', LYC],
        ],
      },
      plant: {
        campo: [
          ['log', 'Direccionamiento del camión a una <strong>planta habilitada EUDR</strong>.', LYC],
        ],
        planta: [
          ['pla', '<strong>Antes de la descarga</strong>: verificación del RENSPA y del estado del campo en la plataforma.', RP],
          ['pla', 'Si el campo no está aprobado, el camión no se descarga como EUDR y se deriva a una planta de soja sin cláusula.', RP],
          ['pla', 'Registro del ingreso en VISEC con la carta de porte.', TBD],
          ['pla', '<strong>Integridad de la planta</strong>: en una planta habilitada EUDR solo ingresa soja de campos aprobados.', RP],
        ],
        puerto: [
          ['pla', 'Registro de la salida en VISEC con toneladas por RENSPA.', TBD],
          ['log', 'Emisión de la carta de porte de salida y gestión del cupo en puerto.', LYC],
          ['exp', 'Recepción, verificación de la trazabilidad y registro del embarque.', 'Comprador'],
        ],
      },
    },
  },
  epa: {
    code: 'EPA',
    dest: 'Estados Unidos · biodiésel (RFS)',
    cut: '19/12/2007',
    ficha: [
      ['Quién la pide', 'Industria de biodiésel que exporta a EE.UU.'],
      ['Dónde se registra', 'Plan de seguimiento CARBIO aprobado por la EPA'],
      ['En planta', 'Control documental del origen'],
      ['Situación', 'Nicho: solo con comprador confirmado'],
    ],
    cutText: 'El lote tiene que haber sido agrícola antes del 19 de diciembre de 2007 (definición de biomasa renovable del RFS).',
    validate: true,
    com: {
      qs: [
        '¿El lote ya era agrícola antes del 19/12/2007?',
        '¿Tiene evidencia (remito, factura o carta de porte) donde figure el nombre del campo, anterior al 19/12/2007?',
        { q: '¿El productor firma la declaración requerida por el comprador?', ok: 0 },
        '¿Se cuenta con el polígono del lote (KML o KMZ)?',
        '¿El campo tiene RENSPA?',
      ],
      ok: 'La soja puede ofrecerse como EPA',
      okNote: 'Antes del cierre, Trading confirmará comprador y documentación.',
      noNote: 'La mercadería podrá comercializarse como soja sin cláusula o evaluarse para EUDR.',
      direct: {
        campo: [
          ['com', 'Confirmar la existencia de comprador EPA y la documentación requerida.', TRD],
          ['com', 'Acordar <strong>condiciones comerciales, precio y prima</strong>.', TRD],
          ['adm', 'Archivo de la documentación de origen.', TBD],
        ],
        puerto: [
          ['exp', 'La industria cubre la cadena mediante el relevamiento anual del plan CARBIO.', 'Comprador'],
        ],
      },
      plant: {
        campo: [
          ['com', 'Confirmar comprador y documentación.', TRD],
        ],
        planta: [
          ['pla', 'Recepción y resguardo de la documentación de origen.', TBD],
        ],
        puerto: [
          ['exp', 'Inclusión de la partida en el relevamiento anual.', 'Comprador'],
        ],
      },
    },
    pla: {
      qs: [
        '¿El contrato es EPA y fue confirmado por Trading?',
        '¿La documentación de origen acompaña la carta de porte?',
      ],
      ok: 'El camión se gestiona como EPA',
      okNote: 'Resguardo de la documentación de origen asociada a cada carta de porte.',
      noNote: 'Consulta con Trading antes del despacho.',
      direct: {
        campo: [
          ['log', 'Asignación de cupo en la industria compradora.', LYC],
        ],
        puerto: [
          ['exp', 'Recepción con la documentación de origen.', 'Comprador'],
        ],
      },
      plant: {
        campo: [
          ['log', 'Direccionamiento del camión a la planta.', LYC],
        ],
        planta: [
          ['pla', 'Registro del origen de cada carta de porte y resguardo de la documentación para el relevamiento.', TBD],
        ],
        puerto: [
          ['pla', 'Despacho con la documentación de origen asociada.', TBD],
          ['exp', 'Recepción e inclusión en el relevamiento.', 'Comprador'],
        ],
      },
    },
  },
  bs: {
    code: '2BSvs',
    dest: 'Unión Europea · biodiésel (RED)',
    cut: '01/01/2008',
    ficha: [
      ['Quién la pide', 'Industria de biodiésel que exporta a la UE'],
      ['Dónde se registra', 'Esquema 2BSvs, con auditoría'],
      ['En planta', 'Balance de masa documental'],
      ['Situación', 'En retroceso: la UE evalúa cerrar el biodiésel de soja'],
    ],
    cutText: 'Sin conversión de monte, humedal o pastizal de alta biodiversidad desde enero de 2008.',
    validate: true,
    com: {
      qs: [
        '¿El lote no tuvo conversión de monte o humedal desde 2008?',
        '¿El campo está incluido en el programa 2BSvs de La Bragadense?',
        '¿Existe comprador de biodiésel con destino a la UE?',
        '¿El productor firma la declaración requerida por el comprador?',
        '¿Se cuenta con fotocopia del DNI del productor?',
        '¿Se cuenta con el polígono del lote (KML o KMZ)?',
        '¿El campo tiene RENSPA?',
      ],
      ok: 'La soja puede ofrecerse como 2BSvs',
      okNote: 'Trading confirmará que el comprador mantenga la demanda de 2BSvs en la campaña.',
      noNote: 'La mercadería podrá comercializarse como soja sin cláusula o evaluarse para EUDR.',
      direct: {
        campo: [
          ['com', 'Verificar que el campo esté incluido en el programa 2BSvs.', TBD],
          ['com', 'Acordar <strong>condiciones comerciales, precio y prima</strong>.', TRD],
          ['prod', 'Declaración 2BSvs vigente del productor.', 'Productor'],
        ],
        puerto: [
          ['adm', 'Emisión de la declaración de sustentabilidad por las toneladas entregadas.', TBD],
          ['exp', 'Recepción con la declaración de sustentabilidad.', 'Comprador'],
        ],
      },
      plant: {
        campo: [
          ['com', 'Verificar que el campo esté incluido en el programa 2BSvs.', TBD],
          ['com', 'Acordar condiciones comerciales, precio y prima.', TRD],
        ],
        planta: [
          ['pla', 'Registro de las toneladas sustentables ingresadas.', TBD],
        ],
        puerto: [
          ['adm', 'Emisión de la declaración por lo despachado, sin superar lo ingresado.', TBD],
        ],
      },
    },
    pla: {
      qs: [
        '¿El campo está incluido en el programa 2BSvs?',
        '¿El contrato es 2BSvs?',
      ],
      ok: 'El camión se gestiona como 2BSvs',
      okNote: 'No requiere planta exclusiva: se aplica balance de masa documental.',
      noNote: 'Se gestiona como soja sin cláusula.',
      direct: {
        campo: [
          ['log', 'Asignación de cupo en la industria compradora.', LYC],
        ],
        puerto: [
          ['exp', 'Recepción con la declaración de sustentabilidad.', 'Comprador'],
        ],
      },
      plant: {
        campo: [
          ['log', 'Direccionamiento del camión a la planta.', LYC],
        ],
        planta: [
          ['pla', 'Registro de las toneladas 2BSvs ingresadas para el balance de masa.', TBD],
        ],
        puerto: [
          ['pla', 'Despacho con informe de toneladas a Administración de Originación.', RP],
          ['adm', 'Emisión de la declaración sin superar lo ingresado.', TBD],
        ],
      },
    },
  },
  comun: {
    code: 'Sin cláusula',
    dest: 'Cualquier destino sin cláusula de sustentabilidad',
    cut: 'Sin corte',
    ficha: [
      ['Quién la pide', 'Compradores que aceptan contratos sin cláusula EUDR'],
      ['Dónde se registra', 'No requiere registro'],
      ['En planta', 'Plantas de soja sin cláusula'],
      ['Situación', 'Puede cotizar por debajo de la soja EUDR'],
    ],
    cutText: 'No exige fecha de corte. La demanda de soja sin cláusula EUDR es cada vez menor.',
    validate: false,
    com: {
      qs: ['¿Existe comprador que acepte soja sin cláusula EUDR?'],
      ok: 'Se comercializa como soja sin cláusula',
      okNote: 'Si el campo puede calificar como EUDR, se recomienda solicitar el alta: amplía compradores y primas.',
      noNote: 'Consultar con Trading la disponibilidad de compradores.',
      direct: {
        campo: [
          ['com', 'Acordar <strong>condiciones comerciales, precio y prima</strong> con un comprador que acepte soja sin cláusula.', TRD],
          ['prod', 'Carta de porte habitual.', 'Productor'],
        ],
        puerto: [
          ['exp', 'Recepción como soja sin cláusula.', 'Comprador'],
        ],
      },
      plant: {
        campo: [
          ['com', 'Acordar condiciones comerciales y precio.', TRD],
          ['prod', 'Carta de porte habitual.', 'Productor'],
        ],
        planta: [
          ['pla', 'Descarga en una planta de soja sin cláusula.', RP],
        ],
        puerto: [
          ['pla', 'Despacho habitual.', RP],
        ],
      },
    },
    pla: {
      qs: ['¿La planta de destino recibe soja sin cláusula?'],
      ok: 'El camión ingresa como soja sin cláusula',
      okNote: 'La soja sin cláusula no debe descargarse en plantas habilitadas EUDR.',
      noNote: 'Derivación a una planta de soja sin cláusula.',
      direct: {
        campo: [
          ['log', 'Asignación de cupo en puerto.', LYC],
        ],
        puerto: [
          ['exp', 'Recepción como soja sin cláusula.', 'Comprador'],
        ],
      },
      plant: {
        campo: [
          ['log', 'Direccionamiento del camión a una planta de soja sin cláusula.', LYC],
        ],
        planta: [
          ['pla', 'Descarga habitual, <strong>nunca</strong> en una planta habilitada EUDR.', RP],
          ['log', 'Definición de plantas de soja sin cláusula y plantas EUDR.', TBD],
        ],
        puerto: [
          ['pla', 'Despacho habitual.', RP],
        ],
      },
    },
  },
};

export const VIEW_DATA: Record<ViewMode, ViewContent> = {
  com: {
    heroT: 'Un cliente tiene un camión de soja en el campo. <em>¿Cómo se comercializa?</em>',
    heroP: 'Guía del programa de sustentabilidad: esquema, requisitos del campo y responsabilidades de cada participante, en un solo lugar.',
    mk: '¿Bajo qué esquema se comercializará la soja?',
    chk: '¿El campo califica?',
    chkSub: 'Completar junto con el cliente, para el campo de origen del camión.',
    contacts: [
      ['var(--r-prod)', 'Información del programa al productor', SUC],
      ['var(--r-exp)', 'Condiciones comerciales, precio y primas', 'Mesa Originación'],
      ['var(--r-adm)', 'Alta del campo y estado en VISEC', 'S. Etchecopar y Luis Mendez'],
      ['var(--r-adm)', 'Campo rechazado: solicitud de revisión', 'S. Etchecopar y Luis Mendez'],
      ['var(--r-com)', 'Planta de destino del camión', 'Mateo Martinez e Hibal Sarroca'],
      ['var(--warn)', 'Documentación EPA y 2BSvs', 'S. Etchecopar y Luis Mendez'],
    ],
  },
  pla: {
    heroT: 'Ingresa un camión de soja. <em>¿Cómo se gestiona?</em>',
    heroP: 'Guía del programa de sustentabilidad: esquema del contrato, controles de ingreso y pasos de carga, descarga y despacho.',
    mk: '¿Bajo qué esquema se comercializó este camión?',
    chk: '¿El camión puede ingresar bajo este esquema?',
    chkSub: 'Verificación previa a la descarga.',
    contacts: [
      ['var(--r-com)', 'Cupos y destino del camión', LYC],
      ['var(--r-pla)', 'Recepción y despacho en planta', RP],
      ['var(--r-adm)', 'Estado del campo y tope de toneladas', TBD],
      ['var(--r-pla)', 'Registro de ingreso y salida en VISEC', TBD],
      ['var(--warn)', 'Habilitación de plantas EUDR', TBD],
      ['var(--warn)', 'Documentación EPA y 2BSvs', TBD],
    ],
  },
};
