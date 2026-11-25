// Translations are ordered as Ukrainian, Russian, English, Spanish.
const translations = {
  description: ["Розрахунок першого внеску, податків і щомісячного платежу за житло у Валенсійській громаді.","Расчёт первоначального взноса, налогов и ежемесячного платежа за жильё в Валенсийском сообществе.","Estimate the down payment, taxes and monthly mortgage payment for a home in the Valencian Community.","Calcula la entrada, los impuestos y la cuota mensual de una vivienda en la Comunitat Valenciana."],
  location: ["Іспанія · Валенсійська громада","Испания · Валенсийское сообщество","Spain · Valencian Community","España · Comunitat Valenciana"],
  heading: ["Калькулятор купівлі житла","Калькулятор покупки жилья","Home purchase calculator","Calculadora de compra de vivienda"],
  language: ["Мова","Язык","Language","Idioma"],
  settings: ["Параметри розрахунку","Параметры расчёта","Calculation settings","Parámetros del cálculo"],
  purchase: ["Житло та витрати","Жильё и расходы","Property and costs","Vivienda y gastos"],
  price: ["Ціна житла","Цена жилья","Property price","Precio de la vivienda"],
  propertyType: ["Тип житла","Тип жилья","Property type","Tipo de vivienda"],
  newBuild: ["Новобудова","Новостройка","New build","Obra nueva"],
  resale: ["Вторинне","Вторичное","Resale","Segunda mano"],
  agent: ["Ріелтор","Риелтор","Real estate agent","Agencia inmobiliaria"],
  agentRate: ["Комісія ріелтора","Комиссия риелтора","Agent commission","Comisión de la agencia"],
  agentVat: ["+ IVA 21% на комісію ріелтора","+ IVA 21% на комиссию риелтора","+ 21% VAT on agent commission","+ 21% de IVA sobre la comisión"],
  feesHeading: ["Нотаріус + реєстр + гестор + оцінка","Нотариус + реестр + хестория + оценка","Notary, registry, gestoría and valuation","Notaría, registro, gestoría y tasación"],
  fees: ["Витрати на оформлення","Расходы на оформление","Closing costs","Gastos de formalización"],
  scaleFees: ["Перераховувати зі зміною ціни житла","Пересчитывать при изменении цены жилья","Recalculate when the property price changes","Recalcular al cambiar el precio de la vivienda"],
  mortgage: ["Іпотека","Ипотека","Mortgage","Hipoteca"],
  ltv: ["Частка від ціни","Доля от цены","Share of property price","Porcentaje del precio"],
  baseRate: ["Базова річна ставка","Базовая годовая ставка","Base annual rate","Tipo anual sin bonificación"],
  term: ["Строк","Срок","Term","Plazo"],
  years: ["років","лет","years","años"],
  taxSettings: ["Податкові ставки","Налоговые ставки","Tax rates","Tipos impositivos"],
  taxHint: ["Для новобудови застосовуються IVA та AJD, для вторинного житла — ITP.","Для новостройки применяются IVA и AJD, для вторичного жилья — ITP.","New builds are subject to VAT (IVA) and stamp duty (AJD). Resales are subject to transfer tax (ITP).","La obra nueva tributa por IVA y AJD. La segunda mano tributa por ITP."],
  upfront: ["Потрібно на старті","Нужно на старте","Cash needed upfront","Total inicial necesario"],
  downPayment: ["Перший внесок","Первоначальный взнос","Down payment","Entrada"],
  tax: ["Податок","Налог","Tax","Impuesto"],
  closingFees: ["Нотаріус та інше","Нотариус и прочие расходы","Notary and other costs","Notaría y otros gastos"],
  monthly: ["Щомісячно","Ежемесячно","Monthly costs","Gastos mensuales"],
  finalRate: ["Фінальна річна ставка","Итоговая годовая ставка","Final annual rate","Tipo anual final"],
  payment: ["Платіж за кредитом","Платёж по кредиту","Mortgage payment","Cuota hipotecaria"],
  bankProducts: ["Продукти банку","Банковские продукты","Bank products","Productos bancarios"],
  monthlyTotal: ["Разом на місяць","Итого в месяц","Total per month","Total al mes"],
  effectiveRate: ["Фактична ставка з продуктами","Фактическая ставка с продуктами","Equivalent rate with products","Tipo equivalente con productos"],
  effectiveHint: ["Фактична ставка — річна ставка, за якої платіж за кредитом дорівнює сумі щомісячних витрат. За нульової суми іпотеки вона не визначається.","Фактическая ставка — годовая ставка, при которой платёж по кредиту равен общим ежемесячным расходам. При нулевой сумме ипотеки она не определяется.","The equivalent rate is the annual rate at which the mortgage payment equals total monthly costs. It is undefined when the loan amount is zero.","El tipo equivalente es el tipo anual con el que la cuota hipotecaria iguala los gastos mensuales totales. No se calcula si el importe de la hipoteca es cero."],
  credit: ["Сума іпотеки та відсотки","Сумма ипотеки и проценты","Loan amount and interest","Importe de la hipoteca e intereses"],
  principal: ["Сума іпотеки","Сумма ипотеки","Loan amount","Importe de la hipoteca"],
  interest: ["Переплата відсотків за весь строк","Переплата по процентам за весь срок","Total interest over the loan term","Intereses totales durante el plazo"],
  productHint: ["Вигода кожного продукту показує, як зміниться платіж, якщо додати або прибрати тільки його.","Выгода каждого продукта показывает, как изменится платёж, если добавить или убрать только его.","Each product shows how much the payment changes when you add or remove that product alone.","Cada producto muestra cuánto cambia la cuota al añadirlo o quitarlo por separado."],
  discountLimit: ["Максимальна сумарна знижка","Максимальная суммарная скидка","Maximum total rate discount","Bonificación total máxima"],
  points: ["в. п.","п. п.","pp","p. p."],
  addProduct: ["Додати свій продукт","Добавить свой продукт","Add a custom product","Añadir un producto propio"],
  productError: ["Перевірте максимальну знижку та значення в позначених полях увімкнених продуктів.","Проверьте максимальную скидку и значения в отмеченных полях включённых продуктов.","Check the maximum discount and the highlighted fields for enabled products.","Revisa la bonificación máxima y los campos marcados de los productos activados."],
  remove: ["Видалити","Удалить","Remove","Eliminar"],
  productName: ["Назва продукту","Название продукта","Product name","Nombre del producto"],
  discount: ["Знижка ставки","Скидка к ставке","Rate discount","Bonificación del tipo"],
  productCost: ["Ціна на місяць","Цена в месяц","Monthly cost","Coste mensual"],
  comparison: ["Порівняння цін","Сравнение цен","Price comparison","Comparación de precios"],
  atStart: ["На старті","На старте","Upfront","Total inicial"],
  paymentColumn: ["Платіж за кредитом / міс.","Платёж по кредиту / мес.","Mortgage / month","Cuota / mes"],
  totalColumn: ["Разом / міс.","Итого / мес.","Total / month","Total / mes"],
  note: ["Орієнтовний розрахунок. Податки: Валенсійська громада з 06.2026. Знижки по продуктах — за публічною пропозицією CaixaBank; точні умови — у FEIN.","Ориентировочный расчёт. Налоги: Валенсийское сообщество с 06.2026. Скидки по продуктам — по публичному предложению CaixaBank; точные условия — в FEIN.","Estimate only. Valencian Community tax rates from June 2026. Product discounts follow CaixaBank’s public offer. See the FEIN for the exact terms.","Cálculo orientativo. Impuestos de la Comunitat Valenciana desde junio de 2026. Bonificaciones según la oferta pública de CaixaBank. Consulta las condiciones exactas en la FEIN."],
  bankNote: ["Для знижки за надходження доходу й картку CaixaBank також вимагає оплату трьох рахунків через банк. Знижка за страхування життя залежить від суми покриття. Вартість продуктів у калькуляторі відповідає введеним сумам.","Для скидки за поступление дохода и использование карты CaixaBank также требует оплаты трёх счетов через банк. Скидка за страхование жизни зависит от суммы покрытия. Стоимость продуктов соответствует введённым суммам.","The income and card discount also requires three bills to be paid by direct debit through CaixaBank. The life insurance discount depends on the coverage amount. Product costs reflect the amounts entered.","La bonificación por ingresos y tarjeta también exige domiciliar tres recibos en CaixaBank. La bonificación por seguro de vida depende del capital asegurado. El coste de los productos corresponde a los importes introducidos."],
  taxNote: ["AJD 0,1% застосовується до основного місця проживання. Загальна ставка AJD — 1,4%. Загальна ставка ITP — 9%, для об’єктів вартістю понад 1 млн € — 11%. Можуть діяти пільги.","AJD 0,1% применяется к основному жилью. Общая ставка AJD — 1,4%. Общая ставка ITP — 9%, для объектов стоимостью свыше 1 млн € — 11%. Могут действовать льготы.","The 0.1% AJD rate applies to a main residence. The standard AJD rate is 1.4%. The standard ITP rate is 9%, or 11% for property valued above €1 million. Relief may apply.","El AJD del 0,1% se aplica a la vivienda habitual. El tipo general de AJD es del 1,4%. El tipo general de ITP es del 9%, o del 11% para inmuebles de valor superior a 1 millón de euros. Pueden aplicarse beneficios fiscales."],
  regionalLaw: ["Закон Валенсійської громади","Закон Валенсийского сообщества","Valencian Community law","Ley de la Comunitat Valenciana"],
  costNote: ["Калькулятор бере за податкову базу ціну купівлі. Для ITP і AJD база може бути вищою через довідкову вартість об’єкта. У полі витрат враховуйте оформлення купівлі та оцінку, які оплачуєте ви. Витрати на нотаріуса, реєстр і гестора за оформлення самого іпотечного договору покриває банк.","Калькулятор использует цену покупки как налоговую базу. Для ITP и AJD база может быть выше из-за справочной стоимости объекта. В расходы включайте оформление покупки и оценку, которые оплачиваете вы. Нотариальные, регистрационные и административные расходы по самому ипотечному договору оплачивает банк.","The calculator uses the purchase price as the tax base. For ITP and AJD, the property’s official reference value may result in a higher base. Include purchase closing costs and valuation fees that you pay. The bank covers notary, registry and gestoría costs for the mortgage contract itself.","La calculadora toma el precio de compra como base imponible. En ITP y AJD, el valor de referencia del inmueble puede elevar la base. Incluye los gastos de compraventa y la tasación que pagas tú. El banco asume los gastos de notaría, registro y gestoría de la escritura hipotecaria."],
  cadastre: ["Кадастр Іспанії","Кадастр Испании","Spanish Cadastre","Catastro de España"],
  bankOfSpain: ["Банк Іспанії","Банк Испании","Bank of Spain","Banco de España"],
  title: ["Калькулятор іпотеки · Валенсійська громада","Ипотечный калькулятор · Валенсийское сообщество","Mortgage calculator · Valencian Community","Calculadora hipotecaria · Comunitat Valenciana"],
  feesScaled: ["Орієнтовно, пропорційно ціні житла. Суму можна уточнити вручну.","Ориентировочно, пропорционально цене жилья. Сумму можно уточнить вручную.","Estimated in proportion to the property price. You can adjust the amount manually.","Estimación proporcional al precio de la vivienda. Puedes ajustar el importe manualmente."],
  feesFixed: ["Фіксована сума для поточної ціни та всіх сценаріїв.","Фиксированная сумма для текущей цены и всех сценариев.","A fixed amount for the current price and all comparison scenarios.","Importe fijo para el precio actual y todos los escenarios comparados."],
  invalidFields: ["Перевірте значення в полях: {fields}.","Проверьте значения в полях: {fields}.","Check the values in these fields: {fields}.","Revisa los valores de estos campos: {fields}."],
  priceShare: ["{percent} від ціни","{percent} от цены","{percent} of the price","{percent} del precio"],
  life: ["Страхування життя","Страхование жизни","Life insurance","Seguro de vida"],
  home: ["Страхування житла","Страхование жилья","Home insurance","Seguro de hogar"],
  alarm: ["Сигналізація (Verisure)","Сигнализация (Verisure)","Alarm (Verisure)","Alarma (Verisure)"],
  income: ["Надходження доходу + картка","Поступление дохода + карта","Income deposits + card","Domiciliación de ingresos y tarjeta"],
  custom: ["Мій продукт","Мой продукт","My product","Mi producto"],
  even: ["рівноцінно","без разницы в расходах","break-even","sin diferencia de coste"],
  gain: ["вигода {amount}/міс.","выгода {amount}/мес.","net saving of {amount}/month","ahorro neto de {amount}/mes"],
  loss: ["збиток {amount}/міс.","убыток {amount}/мес.","net cost of {amount}/month","coste neto de {amount}/mes"],
  impact: ["Знижка економить {saving}/міс., продукт коштує {cost}/міс. → ","Скидка экономит {saving}/мес., продукт стоит {cost}/мес. → ","The discount saves {saving}/month and the product costs {cost}/month → ","La bonificación ahorra {saving}/mes y el producto cuesta {cost}/mes → "]
};

const languages = ['uk', 'ru', 'en', 'es'];
const languagePreference = 'mortgage-calculator-language';
let currentLanguage = 'uk';

function savedLanguage() {
  try {
    return localStorage.getItem(languagePreference);
  } catch {
    return null;
  }
}

function setLanguage(language) {
  currentLanguage = languages.includes(language) ? language : 'uk';
  document.documentElement.lang = currentLanguage;
  translate(document);
}

function saveLanguage() {
  try {
    localStorage.setItem(languagePreference, currentLanguage);
  } catch {
    // The language still applies when storage is unavailable.
  }
}

function t(key, values = {}) {
  const message = translations[key][languages.indexOf(currentLanguage)];
  return message.replace(/\{(\w+)\}/g, (_, name) => values[name]);
}

function translate(root) {
  for (const node of root.querySelectorAll('[data-i18n]')) {
    node.textContent = t(node.dataset.i18n);
  }
  for (const node of root.querySelectorAll('[data-i18n-label]')) {
    node.setAttribute('aria-label', t(node.dataset.i18nLabel));
  }
  for (const node of root.querySelectorAll('[data-i18n-content]')) {
    node.setAttribute('content', t(node.dataset.i18nContent));
  }
}
