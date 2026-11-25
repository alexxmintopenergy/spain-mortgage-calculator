const byId = (id) => document.getElementById(id);
const form = byId('calculator');
const agentOptions = byId('agent-options');
const productSettings = byId('product-settings');
const productList = byId('product-list');
const priceField = byId('price');
const feeField = byId('fees');
const scaleFees = byId('scale-fees');
const numericFields = [...form.querySelectorAll('input[type="text"]')];
const comparisonRows = [...byId('comparison').rows];
const wholeEuros = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 });
const editableEuros = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 2 });
const percentage = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 2 });
const euros = (value) => wholeEuros.format(value) + '\u00a0€';
const monthlyEuros = (value) => editableEuros.format(Math.round(value * 100) / 100) + '\u00a0€';
const percent = (value) => percentage.format(value) + '\u00a0%';
let feeReference = { price: readNumber(priceField), amount: readNumber(feeField) };

function readNumber(field) {
  const text = field.value.trim().replace(/[ \u00a0\u202f]/g, '').replace(',', '.');
  if (!/^\d+(?:\.\d*)?$|^\.\d+$/.test(text)) return NaN;
  if ('money' in field.dataset && /\.\d{3}/.test(text)) return NaN;
  const value = Number(text);
  const minimum = Number(field.dataset.min ?? 0);
  const maximum = Number(field.dataset.max ?? Number.MAX_SAFE_INTEGER);
  if (value < minimum || value > maximum || ('integer' in field.dataset && !Number.isInteger(value))) return NaN;
  return value;
}

function loanPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 1200;
  // log1p and expm1 preserve precision for rates close to zero.
  return monthlyRate === 0
    ? principal / months
    : principal * (monthlyRate / -Math.expm1(-months * Math.log1p(monthlyRate)));
}

function rateWithProducts(principal, rate, months, products) {
  if (principal === 0) return null;
  if (products === 0) return rate;
  const target = loanPayment(principal, rate, months) + products;
  let low = rate;
  // At a positive monthly rate the payment is at least principal times that rate.
  let high = target / principal * 1200;
  if (!Number.isFinite(high)) return null;
  for (let i = 0; i < 80; i++) {
    const midpoint = low + (high - low) / 2;
    if (loanPayment(principal, midpoint, months) < target) low = midpoint;
    else high = midpoint;
  }
  return high;
}

function calculate(price, settings) {
  const principal = price * settings.loanShare;
  const deposit = price - principal;
  const tax = price * settings.taxRate;
  const commission = price * settings.agentRate;
  const { rate, months, products, feeAmount, feePrice } = settings;
  const fees = feePrice === null ? feeAmount : price / feePrice * feeAmount;
  const start = deposit + tax + fees + commission;
  const payment = loanPayment(principal, rate, months);
  const monthly = payment + products;
  const interest = rate === 0 ? 0 : payment * months - principal;
  return { principal, deposit, tax, commission, start, payment, monthly, interest, 'closing-fees': fees };
}

function addProduct(name, discount, cost, custom = false) {
  const product = byId('product-template').content.firstElementChild.cloneNode(true);
  const title = product.querySelector('.product-title');
  const nameField = product.querySelector('.name-input');
  title.textContent = name;
  product.querySelector('.product-discount').value = discount;
  product.querySelector('.product-cost').value = cost;
  productList.append(product);
  if (custom) {
    nameField.closest('label').hidden = false;
    nameField.addEventListener('input', () => {
      title.textContent = nameField.value.trim() || name;
    });
    const remove = product.querySelector('.remove-product');
    remove.hidden = false;
    remove.addEventListener('click', () => {
      product.remove();
      update();
      byId('add-product').focus();
    });
    nameField.focus();
  }
}

function markInvalid(field, invalid) {
  if (invalid) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function readProducts() {
  return [...productList.children].map((row) => {
    const enabled = row.querySelector('.product-enabled').checked;
    const discountField = row.querySelector('.product-discount');
    const costField = row.querySelector('.product-cost');
    const discount = readNumber(discountField);
    const cost = readNumber(costField);
    markInvalid(discountField, enabled && !Number.isFinite(discount));
    markInvalid(costField, enabled && !Number.isFinite(cost));
    return { enabled, discount, cost, hint: row.querySelector('.product-hint') };
  });
}

function showProductImpact(product, principal, months, baseRate, discountLimit, totalDiscount) {
  if (!Number.isFinite(product.discount) || !Number.isFinite(product.cost)) {
    product.hint.textContent = '—';
    return;
  }
  const without = Math.max(0, totalDiscount - (product.enabled ? product.discount : 0));
  const withProduct = without + product.discount;
  const withoutRate = baseRate - Math.min(without, discountLimit);
  const withRate = baseRate - Math.min(withProduct, discountLimit);
  const saving = Math.max(0, loanPayment(principal, withoutRate, months) - loanPayment(principal, withRate, months));
  const benefit = Math.round((saving - product.cost) * 100) / 100;
  const outcome = document.createElement('strong');
  outcome.classList.toggle('loss', benefit < 0);
  outcome.textContent = benefit === 0 ? 'рівноцінно'
    : (benefit > 0 ? 'вигода ' : 'збиток ') + monthlyEuros(Math.abs(benefit)) + '/міс.';
  product.hint.replaceChildren(
    'Знижка економить ' + monthlyEuros(saving) + '/міс., продукт коштує '
    + monthlyEuros(product.cost) + '/міс. → ', outcome
  );
}

function update(event) {
  const edited = event?.target;
  const price = readNumber(priceField);
  const fee = readNumber(feeField);
  if ((edited === feeField || edited === scaleFees) && Number.isFinite(fee)) {
    feeReference = { price: Number.isFinite(price) ? price : feeReference.price, amount: fee };
  }
  if (edited === priceField && scaleFees.checked && Number.isFinite(price) && Number.isFinite(fee)) {
    feeField.value = editableEuros.format(price / feeReference.price * feeReference.amount);
  }
  byId('fees-hint').textContent = scaleFees.checked
    ? 'Орієнтовно, пропорційно ціні житла. Суму можна уточнити вручну.'
    : 'Фіксована сума для поточної ціни та всіх сценаріїв.';

  const hasAgent = byId('has-agent').checked;
  agentOptions.hidden = !hasAgent;
  const isNew = form.elements.property.value === 'new';
  const inactive = new Set(isNew ? ['itp'] : ['iva', 'ajd']);
  if (!hasAgent) inactive.add('agent-rate');

  const values = {};
  const invalid = [];
  for (const field of numericFields) {
    values[field.id] = readNumber(field);
    const isInvalid = !inactive.has(field.id) && !Number.isFinite(values[field.id]);
    markInvalid(field, isInvalid);
    if (isInvalid) invalid.push(field.labels[0].textContent);
  }

  const error = byId('error');
  const discountLimitField = byId('discount-limit');
  const discountLimit = readNumber(discountLimitField);
  const products = readProducts();
  const enabledProducts = products.filter((product) => product.enabled);
  const invalidProducts = !Number.isFinite(discountLimit) || enabledProducts.some(
    ({ discount, cost }) => !Number.isFinite(discount) || !Number.isFinite(cost)
  );
  markInvalid(discountLimitField, !Number.isFinite(discountLimit));
  byId('product-error').hidden = !invalidProducts;
  error.hidden = invalid.length === 0;
  error.textContent = invalid.length ? 'Перевірте значення в полях «' + invalid.join('», «') + '».' : '';
  byId('tax-label').textContent = isNew ? 'Податок (IVA + AJD)' : 'Податок (ITP)';
  if (invalid.length || invalidProducts) {
    for (const field of document.querySelectorAll('[data-result]')) field.textContent = '—';
    for (const row of comparisonRows) row.classList.remove('selected');
    return;
  }

  const totalDiscount = enabledProducts.reduce((sum, product) => sum + product.discount, 0);
  const bankCost = enabledProducts.reduce((sum, product) => sum + product.cost, 0);
  const settings = {
    loanShare: values.ltv / 100,
    taxRate: (isNew ? values.iva + values.ajd : values.itp) / 100,
    agentRate: hasAgent ? values['agent-rate'] / 100 * (byId('agent-iva').checked ? 1.21 : 1) : 0,
    feeAmount: scaleFees.checked ? feeReference.amount : values.fees,
    feePrice: scaleFees.checked ? feeReference.price : null,
    rate: values.rate - Math.min(totalDiscount, discountLimit),
    months: values.years * 12,
    products: bankCost
  };
  const result = calculate(values.price, settings);
  for (const [id, amount] of Object.entries(result)) byId(id).textContent = euros(amount);
  byId('share').textContent = percentage.format(result.start / values.price * 100) + '\u00a0% від ціни';
  byId('bank-products').textContent = euros(settings.products);
  byId('final-rate').textContent = percent(settings.rate);
  const effective = rateWithProducts(result.principal, settings.rate, settings.months, settings.products);
  byId('effective-rate').textContent = effective === null ? '—' : percent(effective);

  for (const product of products) {
    showProductImpact(product, result.principal, settings.months, values.rate, discountLimit, totalDiscount);
  }

  for (const row of comparisonRows) {
    const price = Number(row.dataset.price);
    const scenario = calculate(price, settings);
    row.cells[1].textContent = euros(scenario.start);
    row.cells[2].textContent = euros(scenario.payment);
    row.cells[3].textContent = euros(scenario.monthly);
    row.classList.toggle('selected', price === values.price);
  }
}

addProduct('Страхування життя', '0,35', '120,93');
addProduct('Страхування житла', '0,15', '50');
addProduct('Сигналізація (Verisure)', '0,15', '66');
addProduct('Надходження доходу + картка', '0,35', '0');
byId('add-product').addEventListener('click', () => {
  addProduct('Мій продукт', '0', '0', true);
  update();
});
productSettings.addEventListener('input', update);
form.addEventListener('input', update);
form.addEventListener('submit', (event) => event.preventDefault());
form.addEventListener('focusout', ({ target }) => {
  if (!target.matches('[data-money]')) return;
  const value = readNumber(target);
  if (Number.isFinite(value)) {
    target.value = editableEuros.format(value);
    update();
  }
});
update();
